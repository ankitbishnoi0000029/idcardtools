"use client";

import React, { useState, useRef, useEffect, useMemo, useDeferredValue } from "react";
import { Upload, Lock, Loader2, AlertCircle, CheckCircle2, Scissors, Download } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import jsPDF from "jspdf";
import { AnimatePresence, motion } from "framer-motion";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// ---------- Card ratio ----------
const RATIO = 1016 / 638;
const CORNER_RATIO = 48 / 1016;

// ---------- Output: 4K UHD ----------
const EXPORT_W = 3840;
const EXPORT_H = Math.round(EXPORT_W / RATIO); // 2411

// ---------- Live preview (chhota = fast) ----------
const PREVIEW_W = 640;

// ---------- Render: coordinates reference scale (3) mein, render scale (5) par crop ----------
const REF_SCALE = 3;
const RENDER_SCALE = 5;
const F = RENDER_SCALE / REF_SCALE;

// PVC card ka size (mm)
const CARD_W_MM = 85.6;
const CARD_H_MM = CARD_W_MM / RATIO;

type Box = { x: number; y: number; w: number; h: number };
type Crop = { front: Box; back: Box };
type Adjust = { brightness: number; contrast: number; saturation: number };

const boxFromPx = (x: number, y: number, w: number): Box => ({ x, y, w, h: w / RATIO });

// Default crop positions (reference px, scale 3)
const DEFAULT_CROP: Crop = {
  front: boxFromPx(148, 1723, 755),
  back: boxFromPx(935, 1723, 752),
};

const DEFAULT_ADJUST: Adjust = { brightness: 0, contrast: 20, saturation: 0 };

const applyAdjust = (ctx: CanvasRenderingContext2D, w: number, h: number, a: Adjust) => {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;

  const bAdd = a.brightness * 2.55;
  const cs = a.contrast * 2.55;
  const cf = (259 * (cs + 255)) / (255 * (259 - cs));
  const sk = 1 + a.saturation / 100;
  const clamp = (v: number) => (v < 0 ? 0 : v > 255 ? 255 : v);

  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] === 0) continue;

    let r = d[i] + bAdd;
    let g = d[i + 1] + bAdd;
    let b = d[i + 2] + bAdd;

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

  ctx.putImageData(img, 0, 0);
};

// Card ko given width par banata hai (rounded corners + adjustments ke saath)
// c: render-scale canvas ke coordinates
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

// Component ke BAHAR define hai, taaki typing na ruke
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
        <span className="text-xs text-[#ff6a00]">px</span>
      </div>
    </label>
  );
}

function AdjustSlider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
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
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<HTMLCanvasElement | null>(null);
  const [crop, setCrop] = useState<Crop>(DEFAULT_CROP);
  const [adjust, setAdjust] = useState<Adjust>(DEFAULT_ADJUST);

  // Slider drag ke dauran UI smooth rahe
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
        setError("Galat password! Kripya Aadhaar PDF ka sahi password daalein.");
      } else {
        setError("PDF read karne mein error aayi. File check karein.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Input reference px (scale 3) mein. Box page ke andar rehta hai aur ratio lock rehta hai.
  const setSidePx = (side: keyof Crop, key: "x" | "y" | "w", v: number) => {
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

  // Page preview: page + dono boxes
  useEffect(() => {
    const disp = displayRef.current;
    if (!page || !disp) return;
    const refW = page.width / F;
    const s = 800 / refW;
    disp.width = 800;
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

  // Live preview (640 px). 4K yahan nahi banta.
  const previews = useMemo(() => {
    if (!page) return null;
    return {
      front: buildCard(page, toRender(crop.front), deferredAdjust, PREVIEW_W).toDataURL("image/png"),
      back: buildCard(page, toRender(crop.back), deferredAdjust, PREVIEW_W).toDataURL("image/png"),
    };
  }, [page, crop, deferredAdjust]);

  // 4K sirf download ke time banti hai
  const exportCard = (side: keyof Crop) => {
    if (!page) throw new Error("Page load nahi hua");
    return buildCard(page, toRender(crop[side]), adjust, EXPORT_W).toDataURL("image/png");
  };

  const downloadPng = (side: keyof Crop) => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        const a = document.createElement("a");
        a.href = exportCard(side);
        a.download = `aadhaar-${side}-4k.png`;
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
        pdf.save("aadhaar-card-A4.pdf");
      } finally {
        setIsExporting(false);
      }
    }, 50);
  };

  return (
    <div className="text-slate-800 font-sans max-w-2xl mx-auto">
      {/* MAIN UPLOAD CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 mb-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">Upload & Crop Aadhaar</h2>
          <p className="text-sm text-slate-500">Your file is processed 100% locally on your device.</p>
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors mb-6 ${file ? "border-green-400 bg-green-50/30" : "border-slate-200 bg-slate-50/50 hover:bg-slate-100"}`}
        >
          <input type="file" accept="application/pdf" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          <motion.div
            initial={false}
            animate={{ scale: file ? [1, 1.2, 1] : 1 }}
            className="bg-white p-4 rounded-full shadow-sm mb-4"
          >
            {file ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : <Upload className="w-8 h-8 text-[#ff6a00]" />}
          </motion.div>
          <p className="font-semibold text-slate-700">{file ? file.name : "Click or drag & drop PDF here"}</p>
          <p className="text-xs text-slate-400 mt-1">{file ? "Click again to change file" : "Only official e-Aadhaar PDFs"}</p>
        </motion.div>

        <div className="mb-6">
          <label htmlFor="pdf-password" className="block text-[11px] font-mono uppercase tracking-[0.2em] text-black/50 mb-2">
            PDF Password (Required)
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-black/30 group-focus-within:text-[#ff6a00] transition-colors duration-300" />
            </div>
            <input
              id="pdf-password"
              type="text"
              placeholder="e.g. SURE1990"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-black/[0.1] focus:outline-none focus:ring-2 focus:ring-[#ff6a00]/20 focus:border-[#ff6a00] bg-slate-50/50 text-slate-800 font-mono text-lg transition-all duration-300 placeholder:text-black/20 placeholder:font-sans placeholder:text-base"
            />
          </div>
          <p className="text-[12px] text-slate-500 mt-2 font-light leading-relaxed">Hint: Usually the first 4 letters of your name (UPPERCASE) + birth year.</p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-start gap-2 text-sm overflow-hidden"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={!file || isLoading ? {} : { scale: 1.02, boxShadow: "0px 10px 20px rgba(255,106,0,0.3)" }}
          whileTap={!file || isLoading ? {} : { scale: 0.98 }}
          onClick={loadPage}
          disabled={!file || isLoading}
          className={`w-full font-bold text-lg py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 ${!file || isLoading ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-[#ff6a00] text-white shadow-lg shadow-orange-500/30"}`}
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
        </motion.button>
      </motion.div>

      {/* RESULTS */}
      <AnimatePresence>
        {page && previews && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            className="space-y-8"
          >
            {/* Page preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm"
            >
              <p className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff6a00]" /> Page Preview
              </p>
              <canvas ref={displayRef} className="w-full h-auto border rounded-lg bg-slate-50" />
              <p className="text-xs text-slate-500 mt-3 font-mono">Red = front, Blue = back</p>
            </motion.div>

            {/* Position inputs */}
            <div className="grid md:grid-cols-2 gap-6">
              {(["front", "back"] as const).map((side, index) => {
                const b = crop[side];
                return (
                  <motion.div
                    key={side}
                    initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-bold text-slate-800 text-lg border-b pb-2">{side === "front" ? "Front Card" : "Back Card"}</h3>
                    <PxInput label="Left (X) px" value={b.x} onCommit={(v) => setSidePx(side, "x", v)} />
                    <PxInput label="Top (Y) px" value={b.y} onCommit={(v) => setSidePx(side, "y", v)} />
                    <PxInput label="Width (W) px" value={b.w} onCommit={(v) => setSidePx(side, "w", v)} />
                    <PxInput label="Height (H) px (auto)" value={b.h} readOnly />
                    <p className="text-xs text-[#ff6a00] font-mono bg-orange-50 p-2 rounded-lg inline-block">
                      Output: {EXPORT_W} × {EXPORT_H} px (4K UHD)
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Image adjustments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800">Image Adjustments</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAdjust(DEFAULT_ADJUST)}
                  className="text-xs px-4 py-2 rounded-lg bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 transition-colors"
                >
                  Reset Defaults
                </motion.button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <AdjustSlider label="Brightness" value={adjust.brightness} onChange={(v) => setAdjust((p) => ({ ...p, brightness: v }))} />
                <AdjustSlider label="Contrast" value={adjust.contrast} onChange={(v) => setAdjust((p) => ({ ...p, contrast: v }))} />
                <AdjustSlider label="Saturation" value={adjust.saturation} onChange={(v) => setAdjust((p) => ({ ...p, saturation: v }))} />
              </div>
            </motion.div>

            {/* Result */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b pb-4">
                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                  <Scissors className="w-5 h-5 text-[#ff6a00]" /> Cropped Result (4K)
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadA4Pdf}
                  disabled={isExporting}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#ff6a00] text-white text-sm font-semibold shadow-lg shadow-orange-500/30 hover:bg-[#e65c00] transition-colors disabled:opacity-60"
                >
                  {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  Download A4 PDF
                </motion.button>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                {[
                  { label: "Front Side", side: "front" as const, src: previews.front },
                  { label: "Back Side", side: "back" as const, src: previews.back },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex flex-col items-center group"
                  >
                    <p className="font-semibold text-sm mb-3 text-slate-700">{item.label}</p>
                    <motion.div
                      whileHover={{ scale: 1.03, rotate: index === 0 ? -1 : 1 }}
                      className="bg-slate-50 rounded-2xl border border-slate-200 shadow-sm p-2 transition-all duration-300 group-hover:shadow-md"
                    >
                      <img src={item.src} alt={item.label} className="w-full max-w-[320px] h-auto rounded-xl" />
                    </motion.div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => downloadPng(item.side)}
                      disabled={isExporting}
                      className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold shadow-lg shadow-slate-900/20 hover:bg-black transition-colors disabled:opacity-60"
                    >
                      <Download className="w-4 h-4" /> Download 4K PNG
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}