"use client";

import React, { useState, useRef, useEffect, useMemo, useDeferredValue } from "react";
import { Upload, Lock, Loader2, AlertCircle, CheckCircle2, Scissors, Download, RotateCcw } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import jsPDF from "jspdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// ---------- Card ratio ----------
const RATIO = 1016 / 638;
const CORNER_RATIO = 48 / 1016;

// ---------- Output (download) ----------
const EXPORT_W = 3840; // 4K UHD width
const EXPORT_H = Math.round(EXPORT_W / RATIO);

// ---------- Preview (live, chhota size = fast) ----------
const PREVIEW_W = 640;

// ---------- Render: PDF high resolution par, coordinates reference scale (3) mein ----------
const REF_SCALE = 3;
const RENDER_SCALE = 5;
const F = RENDER_SCALE / REF_SCALE;

// PVC card ka size (mm)
const CARD_W_MM = 85.6;
const CARD_H_MM = CARD_W_MM / RATIO;

type Box = { x: number; y: number; w: number; h: number };
type Side = "front" | "back";
type Crop = Record<Side, Box>;

type Adjust = {
  brightness: number;
  contrast: number;
  saturation: number;
  warmth: number;
  sharpness: number;
};

const boxFromPx = (x: number, y: number, w: number): Box => ({ x, y, w, h: w / RATIO });

// Default positions (reference px, scale 3)
const DEFAULT_CROP: Crop = {
  front: boxFromPx(208, 1955, 698),
  back: boxFromPx(926, 1955, 698),
};

const DEFAULT_ADJUST: Adjust = {
   brightness: 8,
  contrast: 2,
  saturation: 5,
  warmth: 0,
  sharpness: 100,
};

const applyAdjust = (ctx: CanvasRenderingContext2D, w: number, h: number, a: Adjust) => {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;

  const bAdd = a.brightness * 2.55;
  const cs = a.contrast * 2.55;
  const cf = (259 * (cs + 255)) / (255 * (259 - cs));
  const sk = 1 + a.saturation / 100;
  const warm = a.warmth * 0.5;
  const clamp = (v: number) => (v < 0 ? 0 : v > 255 ? 255 : v);

  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] === 0) continue;

    let r = d[i] + bAdd + warm;
    let g = d[i + 1] + bAdd;
    let b = d[i + 2] + bAdd - warm;

    r = cf * (r - 128) + 128;
    g = cf * (g - 128) + 128;
    b = cf * (b - 128) + 128;

    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    r = gray + (r - gray) * sk;
    g = gray + (g - gray) * sk;
    b = gray + (b - gray) * sk;

    d[i] = clamp(r);
    d[i + 1] = clamp(g);
    d[i + 2] = clamp(b);
  }

  if (a.sharpness > 0) {
    const amount = (a.sharpness / 100) * 0.8;
    const src = new Uint8ClampedArray(d);
    const stride = w * 4;
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * stride + x * 4;
        if (src[i + 3] === 0) continue;
        for (let c = 0; c < 3; c++) {
          const center = src[i + c];
          const blur = (src[i - 4 + c] + src[i + 4 + c] + src[i - stride + c] + src[i + stride + c]) / 4;
          d[i + c] = clamp(center + (center - blur) * amount);
        }
      }
    }
  }

  ctx.putImageData(img, 0, 0);
};

// Card ko given width par banata hai (rounded corners + adjustments ke saath)
const buildCard = (source: HTMLCanvasElement, c: Box, adj: Adjust, outW: number): HTMLCanvasElement => {
  const outH = Math.round(outW / RATIO);
  const out = document.createElement("canvas");
  out.width = outW;
  out.height = outH;
  const ctx = out.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas context nahi mila");

  ctx.beginPath();
  ctx.roundRect(0, 0, outW, outH, outW * CORNER_RATIO);
  ctx.clip();

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, c.x, c.y, c.w, c.h, 0, 0, outW, outH);

  applyAdjust(ctx, outW, outH, adj);
  return out;
};

function PxInput({ label, value, onCommit, readOnly = false }: { label: string; value: number; onCommit?: (v: number) => void; readOnly?: boolean }) {
  const [text, setText] = useState(String(Math.round(value)));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setText(String(Math.round(value)));
  }, [value, focused]);

  return (
    <label className="block text-sm">
      <div className="text-slate-600 mb-1">{label}</div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          step={1}
          value={text}
          readOnly={readOnly}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setText(String(Math.round(value)));
          }}
          onChange={(e) => {
            setText(e.target.value);
            const v = parseFloat(e.target.value);
            if (!isNaN(v) && onCommit) onCommit(v);
          }}
          className={`w-full px-3 py-2 rounded-lg border border-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${readOnly ? "bg-slate-100 text-slate-500" : "bg-white"}`}
        />
        <span className="text-xs text-slate-400">px</span>
      </div>
    </label>
  );
}

function AdjustSlider({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <label className="block text-sm">
      <div className="flex justify-between text-slate-600 mb-1">
        <span>{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full"
      />
    </label>
  );
}

export const Pan = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<HTMLCanvasElement | null>(null);
  const [crop, setCrop] = useState<Crop>(DEFAULT_CROP);
  const [adjust, setAdjust] = useState<Adjust>(DEFAULT_ADJUST);

  // Slider drag ke dauran UI smooth rahe, preview thoda peeche chal sakta hai
  const deferredAdjust = useDeferredValue(adjust);

  const displayRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (f: File) => {
    if (f.type !== "application/pdf") {
      setError("Kripya sirf PDF file upload karein.");
      return;
    }
    setFile(f);
    setError(null);
    setPage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) validateAndSetFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) validateAndSetFile(e.dataTransfer.files[0]);
  };

  const loadPage = async () => {
    if (!file) {
      setError("Pehle koi PDF file select karein.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer, password }).promise;
      const pdfPage = await pdf.getPage(1);

      const viewport = pdfPage.getViewport({ scale: RENDER_SCALE });
      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context nahi mila");
      await pdfPage.render({ canvas, canvasContext: ctx, viewport }).promise;

      setCrop(DEFAULT_CROP);
      setPage(canvas);
    } catch (err: any) {
      console.error("PDF Error:", err);
      if (err?.name === "PasswordException") {
        setError(err.code === 2 ? "Galat password! Kripya sahi PDF password daalein." : "Is PDF ko password chahiye. Password field mein daalein.");
      } else {
        setError(`PDF read error: ${String(err?.message ?? err)}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Input reference px mein (scale 3). Box page ke andar rehta hai aur ratio lock rehta hai.
  const setPx = (side: Side, key: "x" | "y" | "w", v: number) => {
    if (!page) return;
    const refW = page.width / F;
    const refH = page.height / F;

    setCrop((prev) => {
      let w = key === "w" ? v : prev[side].w;
      w = Math.max(50, Math.min(w, refW));
      const h = w / RATIO;

      let x = key === "x" ? v : prev[side].x;
      let y = key === "y" ? v : prev[side].y;

      x = Math.max(0, Math.min(x, refW - w));
      y = Math.max(0, Math.min(y, refH - h));

      return { ...prev, [side]: { x, y, w, h } };
    });
  };

  // Reference box ko render-scale canvas coordinates mein badalna
  const toRender = (b: Box): Box => ({ x: b.x * F, y: b.y * F, w: b.w * F, h: b.h * F });

  // Page preview: page + dono boxes (sirf crop change par)
  useEffect(() => {
    const disp = displayRef.current;
    if (!page || !disp) return;
    const refW = page.width / F;
    const s = PREVIEW_W / refW;
    disp.width = PREVIEW_W;
    disp.height = Math.round((page.height / F) * s);
    const ctx = disp.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(page, 0, 0, disp.width, disp.height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "red";
    ctx.strokeRect(crop.front.x * s, crop.front.y * s, crop.front.w * s, crop.front.h * s);
    ctx.strokeStyle = "blue";
    ctx.strokeRect(crop.back.x * s, crop.back.y * s, crop.back.w * s, crop.back.h * s);
  }, [page, crop]);

  // Chhota preview (640 px). Ye hi live update hota hai, 4K nahi banta.
  const previews = useMemo(() => {
    if (!page) return null;
    return {
      front: buildCard(page, toRender(crop.front), deferredAdjust, PREVIEW_W).toDataURL("image/png"),
      back: buildCard(page, toRender(crop.back), deferredAdjust, PREVIEW_W).toDataURL("image/png"),
    };
  }, [page, crop, deferredAdjust]);

  // 4K sirf download ke time banti hai
  const exportCard = (side: Side) => {
    if (!page) throw new Error("Page load nahi hua");
    return buildCard(page, toRender(crop[side]), adjust, EXPORT_W).toDataURL("image/png");
  };

  const downloadPng = (side: Side) => {
    setIsExporting(true);
    // UI ko pehle busy dikhane ke liye thoda wait
    setTimeout(() => {
      try {
        const a = document.createElement("a");
        a.href = exportCard(side);
        a.download = `pan-${side}-4k.png`;
        a.click();
      } finally {
        setIsExporting(false);
      }
    }, 50);
  };

  const downloadA4Pdf = () => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        const front = exportCard("front");
        const back = exportCard("back");

        const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
        const pageW = pdf.internal.pageSize.getWidth();
        const x = (pageW - CARD_W_MM) / 2;
        const frontY = 30;
        const backY = frontY + CARD_H_MM + 15;

        pdf.addImage(front, "PNG", x, frontY, CARD_W_MM, CARD_H_MM);
        pdf.addImage(back, "PNG", x, backY, CARD_W_MM, CARD_H_MM);
        pdf.save("pan-card-A4.pdf");
      } finally {
        setIsExporting(false);
      }
    }, 50);
  };

  return (
    <div className=" text-slate-800 font-sans">
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Upload */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-100 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">Upload & Crop PAN</h2>
            <p className="text-sm text-slate-500">Your file is processed 100% locally on your device.</p>
          </div>

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors mb-6 ${file ? "border-green-400 bg-green-50/30" : "border-slate-200 bg-slate-50/50 hover:bg-slate-100"}`}
          >
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">{file ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : <Upload className="w-8 h-8 text-slate-400" />}</div>
            <p className="font-semibold text-slate-700">{file ? file.name : "Click or drag & drop PAN PDF here"}</p>
            <p className="text-xs text-slate-400 mt-1">{file ? "Click again to change file" : "Only official e-PAN PDFs"}</p>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="PDF Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 text-slate-700"
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-start gap-2 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <button
            onClick={loadPage}
            disabled={!file || isLoading}
            className={`w-full font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-colors ${!file || isLoading ? "bg-slate-300 text-slate-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Reading PDF...
              </>
            ) : (
              <>
                <Scissors className="w-5 h-5" /> Load PDF Page
              </>
            )}
          </button>
        </div>

        {page && previews && (
          <>
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-blue-600" /> Preview (download par {EXPORT_W} × {EXPORT_H} 4K)
                </h3>
                <button
                  onClick={downloadA4Pdf}
                  disabled={isExporting}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60"
                >
                  {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  Download A4 PDF
                </button>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                {[
                  { label: "Front Side", side: "front" as Side, src: previews.front },
                  { label: "Back Side", side: "back" as Side, src: previews.back },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center"
                  >
                    <p className="font-semibold text-sm mb-2 text-slate-600">{item.label}</p>
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-sm ">
                      <img
                        src={item.src}
                        alt={item.label}
                        className="w-full max-w-[320px] h-auto rounded-xl"
                      />
                    </div>
                    <button
                      onClick={() => downloadPng(item.side)}
                      disabled={isExporting}
                      className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-60"
                    >
                      <Download className="w-4 h-4" /> Download 4K PNG
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Pan;
