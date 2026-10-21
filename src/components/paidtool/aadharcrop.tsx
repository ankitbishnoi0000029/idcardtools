"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Upload, Lock, Loader2, AlertCircle, CheckCircle2, Scissors, Download } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const OUT_W = 1016;
const OUT_H = 638;
const RATIO = OUT_W / OUT_H;

// Output PNG ke corner ka radius (pixels). 0 karne par corners square rahenge.
const CORNER_RADIUS = 48;

// Page render scale (canvas pixels ke liye)
const RENDER_SCALE = 3;

type Box = { x: number; y: number; w: number; h: number };
type Adjust = { brightness: number; contrast: number; saturation: number };

// Fixed crop positions (canvas pixels). Height ratio 1016:638 se apne aap aati hai.
const boxFromPx = (x: number, y: number, w: number): Box => ({ x, y, w, h: w / RATIO });

const CROP: { front: Box; back: Box } = {
  front: boxFromPx(106, 1716, 768),
  back: boxFromPx(907, 1717, 768),
};

// Contrast default 20 par set hai. Brightness aur saturation default 0 hain.
const DEFAULT_ADJUST: Adjust = { brightness: 0, contrast: 20, saturation: 0 };

// Pixels par brightness, contrast aur saturation lagata hai (-100 se 100)
const applyAdjust = (ctx: CanvasRenderingContext2D, w: number, h: number, a: Adjust) => {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;

  const bAdd = a.brightness * 2.55;
  const cs = a.contrast * 2.55;
  const cf = (259 * (cs + 255)) / (255 * (259 - cs));
  const sk = 1 + a.saturation / 100;
  const clamp = (v: number) => (v < 0 ? 0 : v > 255 ? 255 : v);

  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] === 0) continue; // transparent corners ko chhod do

    // Brightness
    let r = d[i] + bAdd;
    let g = d[i + 1] + bAdd;
    let b = d[i + 2] + bAdd;

    // Contrast
    r = cf * (r - 128) + 128;
    g = cf * (g - 128) + 128;
    b = cf * (b - 128) + 128;

    // Saturation
    
    d[i] = clamp(r);
    d[i + 1] = clamp(g);
    d[i + 2] = clamp(b);
  }

  ctx.putImageData(img, 0, 0);
};

const cropToPng = (source: HTMLCanvasElement, c: Box, adj: Adjust) => {
  const out = document.createElement("canvas");
  out.width = OUT_W;
  out.height = OUT_H;
  const ctx = out.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas context nahi mila");

  // Rounded corners: bahar ka hissa transparent rahega
  if (CORNER_RADIUS > 0) {
    ctx.beginPath();
    ctx.roundRect(0, 0, OUT_W, OUT_H, CORNER_RADIUS);
    ctx.clip();
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, c.x, c.y, c.w, c.h, 0, 0, OUT_W, OUT_H);

  applyAdjust(ctx, OUT_W, OUT_H, adj);
  return out.toDataURL("image/png");
};

function AdjustSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block text-sm">
      <div className="flex justify-between text-slate-600 mb-1">
        <span>{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <input
        type="range"
        min={-100}
        max={100}
        step={1}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full"
      />
    </label>
  );
}

export default function AadhaarCropPage() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<HTMLCanvasElement | null>(null);
  const [adjust, setAdjust] = useState<Adjust>(DEFAULT_ADJUST);

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

      setPage(canvas);
    } catch (err: any) {
      console.error("PDF Error:", err);
      if (err?.name === "PasswordException") {
        setError("Galat password! Kripya Aadhaar PDF ka sahi password daalein.");
      } else {
        setError("PDF read karne mein error aayi. File check karein.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Page preview, fixed crop boxes ke saath
  useEffect(() => {
    const disp = displayRef.current;
    if (!page || !disp) return;
    const PREVIEW_W = 800;
    const s = PREVIEW_W / page.width;
    disp.width = PREVIEW_W;
    disp.height = Math.round(page.height * s);
    const ctx = disp.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(page, 0, 0, disp.width, disp.height);
    ctx.lineWidth = 3;

    ctx.strokeStyle = "red";
    ctx.strokeRect(CROP.front.x * s, CROP.front.y * s, CROP.front.w * s, CROP.front.h * s);
    ctx.strokeStyle = "blue";
    ctx.strokeRect(CROP.back.x * s, CROP.back.y * s, CROP.back.w * s, CROP.back.h * s);
  }, [page]);

  // Har adjustment change par PNG live update
  const result = useMemo(() => {
    if (!page) return null;
    return {
      front: cropToPng(page, CROP.front, adjust),
      back: cropToPng(page, CROP.back, adjust),
    };
  }, [page, adjust]);

  const downloadPng = (dataUrl: string, name: string) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = name;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Upload */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-100 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">Upload & Crop Aadhaar</h2>
            <p className="text-sm text-slate-500">Your file is processed 100% locally on your device.</p>
          </div>

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors mb-6 ${
              file ? "border-green-400 bg-green-50/30" : "border-slate-200 bg-slate-50/50 hover:bg-slate-100"
            }`}
          >
            <input type="file" accept="application/pdf" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              {file ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : <Upload className="w-8 h-8 text-slate-400" />}
            </div>
            <p className="font-semibold text-slate-700">{file ? file.name : "Click or drag & drop PDF here"}</p>
            <p className="text-xs text-slate-400 mt-1">{file ? "Click again to change file" : "Only official e-Aadhaar PDFs"}</p>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="PDF Password (e.g. SURE1990)"
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
            className={`w-full font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-colors ${
              !file || isLoading ? "bg-slate-300 text-slate-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
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

        {page && (
          <>
            {/* Page preview */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-8">
              <p className="font-semibold text-slate-700 mb-1">Page Preview</p>
              <canvas ref={displayRef} className="w-full h-auto border rounded-lg" />
              <p className="text-xs text-slate-400 mt-2">Red = front, Blue = back</p>
            </div>

            {/* Image adjustments */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800">Image Adjustments</h3>
                <button
                  onClick={() => setAdjust(DEFAULT_ADJUST)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100"
                >
                  Reset
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <AdjustSlider
                  label="Brightness"
                  value={adjust.brightness}
                  onChange={(v) => setAdjust((p) => ({ ...p, brightness: v }))}
                />
                <AdjustSlider
                  label="Contrast"
                  value={adjust.contrast}
                  onChange={(v) => setAdjust((p) => ({ ...p, contrast: v }))}
                />
              
              </div>
            </div>

            {/* Result */}
            {result && (
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-blue-600" /> Cropped Result (1016 × 638 PNG)
                </h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  {[
                    { label: "Front Side", src: result.front, name: "aadhaar-front.png" },
                    { label: "Back Side", src: result.back, name: "aadhaar-back.png" },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center">
                      <p className="font-semibold text-sm mb-2 text-slate-600">{item.label}</p>
                      <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
                        <img src={item.src} alt={item.label} className="w-full max-w-[320px] h-auto rounded-xl" />
                      </div>
                      <button
                        onClick={() => downloadPng(item.src, item.name)}
                        className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700"
                      >
                        <Download className="w-4 h-4" /> Download PNG
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}