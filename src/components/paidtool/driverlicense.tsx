"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Upload, Lock, Loader2, AlertCircle, CheckCircle2, Scissors, Download } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import jsPDF from "jspdf";
import { AnimatePresence, motion } from "framer-motion";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// ---------- Card ratio (PVC standard 85.6 x 54 mm) ----------
const RATIO = 1016 / 638;
const CORNER_RATIO = 48 / 1016;

// ---------- Output: 4K UHD ----------
const EXPORT_W = 3840;
const EXPORT_H = Math.round(EXPORT_W / RATIO);

// ---------- Live preview ----------
const PREVIEW_W = 480;
const PAGE_PREVIEW_W = 800;

// ---------- Render: coordinates reference scale (3), render scale (5) ----------
const REF_SCALE = 3;
const RENDER_SCALE = 5;
const F = RENDER_SCALE / REF_SCALE;

// ---------- PDF / print layout (mm) ----------
const CARD_W_MM = 85.6;
const CARD_H_MM = CARD_W_MM / RATIO;
const PDF_TOP_MM = 12; // page ke upar ka margin
const PDF_GAP_MM = 10; // front aur back ke beech ka gap (side by side)

type Box = { x: number; y: number; w: number; h: number };
type Side = "front" | "back";
type Crop = Record<Side, Box>;

const boxFromPx = (x: number, y: number, w: number): Box => ({ x, y, w, h: w / RATIO });

// Reference px (scale 3). PDF ke hisaab se px inputs se set karein.
const DEFAULT_CROP: Crop = {
  front: boxFromPx(650, 200, 3000),
  back: boxFromPx(3800, 200, 3000),
};

// Card ko original rang ke saath draw karta hai (koi color adjustment nahi)
const drawCard = (source: HTMLCanvasElement, c: Box, outW: number, target?: HTMLCanvasElement): HTMLCanvasElement => {
  const outH = Math.round(outW / RATIO);
  const out = target ?? document.createElement("canvas");
  out.width = outW;
  out.height = outH;

  const ctx = out.getContext("2d");
  if (!ctx) throw new Error("Canvas context nahi mila");

  ctx.clearRect(0, 0, outW, outH);
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(0, 0, outW, outH, outW * CORNER_RATIO);
  ctx.clip();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, c.x, c.y, c.w, c.h, 0, 0, outW, outH);
  ctx.restore();

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
          className={`w-full px-3 py-2 rounded-lg border border-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-[#ff6a00]/30 ${readOnly ? "bg-slate-100 text-slate-500" : "bg-white"}`}
        />
        <span className="text-xs text-[#ff6a00]">px</span>
      </div>
    </label>
  );
}

// Canvas par seedha draw hota hai. Har frame mein sirf ek baar chalta hai.
function CardPreview({ source, box }: { source: HTMLCanvasElement; box: Box }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (ref.current) drawCard(source, box, PREVIEW_W, ref.current);
    });
    return () => cancelAnimationFrame(raf);
  }, [source, box]);

  return <canvas ref={ref} className="w-full max-w-[320px] h-auto rounded-xl" />;
}

export const DriverLicense = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<HTMLCanvasElement | null>(null);
  const [crop, setCrop] = useState<Crop>(DEFAULT_CROP);

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
        setError(
          err.code === 2
            ? "Galat password! Kripya sahi PDF password daalein."
            : "Is PDF ko password chahiye. Password field mein daalein."
        );
      } else {
        setError(`PDF read error: ${String(err?.message ?? err)}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Input reference px (scale 3) mein. Box page ke andar rehta hai aur ratio lock rehta hai.
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

  const renderCrop = useMemo(
    () => ({ front: toRender(crop.front), back: toRender(crop.back) }),
    [crop]
  );

  // Page preview: page + dono boxes
  useEffect(() => {
    const disp = displayRef.current;
    if (!page || !disp) return;
    const refW = page.width / F;
    const s = PAGE_PREVIEW_W / refW;
    disp.width = PAGE_PREVIEW_W;
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

  // 4K sirf download ke time banti hai
  const exportCard = (side: Side) => {
    if (!page) throw new Error("Page load nahi hua");
    return drawCard(page, toRender(crop[side]), EXPORT_W).toDataURL("image/png");
  };

  const downloadPng = (side: Side) => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        const a = document.createElement("a");
        a.href = exportCard(side);
        a.download = `driver-license-${side}-4k.png`;
        a.click();
      } finally {
        setIsExporting(false);
      }
    }, 50);
  };

  // A4 par front aur back ek hi line mein (side by side), top par
  const downloadA4Pdf = () => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        const front = exportCard("front");
        const back = exportCard("back");

        const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
        const pageW = pdf.internal.pageSize.getWidth(); // 210 mm

        const totalW = CARD_W_MM * 2 + PDF_GAP_MM;
        const startX = (pageW - totalW) / 2;
        const y = PDF_TOP_MM;

        pdf.addImage(front, "PNG", startX, y, CARD_W_MM, CARD_H_MM, undefined, "FAST");
        pdf.addImage(back, "PNG", startX + CARD_W_MM + PDF_GAP_MM, y, CARD_W_MM, CARD_H_MM, undefined, "FAST");

        pdf.save("driver-license-A4.pdf");
      } finally {
        setIsExporting(false);
      }
    }, 50);
  };

  return (
    <div className="text-slate-800 font-sans max-w-2xl mx-auto">
      {/* UPLOAD CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 mb-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">Driving License PDF to PVC Card</h2>
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
          <motion.div initial={false} animate={{ scale: file ? [1, 1.2, 1] : 1 }} className="bg-white p-4 rounded-full shadow-sm mb-4">
            {file ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : <Upload className="w-8 h-8 text-[#ff6a00]" />}
          </motion.div>
          <p className="font-semibold text-slate-700">{file ? file.name : "Click or drag & drop Driving License PDF here"}</p>
          <p className="text-xs text-slate-400 mt-1">{file ? "Click again to change file" : "Only official Driving License PDFs"}</p>
        </motion.div>

        <div className="mb-6">
          <label htmlFor="pdf-password" className="block text-[11px] font-mono uppercase tracking-[0.2em] text-black/50 mb-2">
            PDF Password (Optional)
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-black/30 group-focus-within:text-[#ff6a00] transition-colors duration-300" />
            </div>
            <input
              id="pdf-password"
              type="text"
              placeholder="Agar PDF locked hai to password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-black/[0.1] focus:outline-none focus:ring-2 focus:ring-[#ff6a00]/20 focus:border-[#ff6a00] bg-slate-50/50 text-slate-800 font-mono text-lg transition-all duration-300 placeholder:text-black/20 placeholder:font-sans placeholder:text-base"
            />
          </div>
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
        {page && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            className="space-y-8"
          >
           

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
                  Download A4 PDF (Print)
                </motion.button>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                {(["front", "back"] as const).map((side, index) => (
                  <motion.div
                    key={side}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex flex-col items-center group"
                  >
                    <p className="font-semibold text-sm mb-3 text-slate-700">{side === "front" ? "Front Side" : "Back Side"}</p>
                    <motion.div
                      whileHover={{ scale: 1.03, rotate: index === 0 ? -1 : 1 }}
                      className="bg-slate-50 rounded-2xl border border-slate-200 shadow-sm p-2 transition-all duration-300 group-hover:shadow-md"
                    >
                      <CardPreview source={page} box={renderCrop[side]} />
                    </motion.div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => downloadPng(side)}
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
};

export default DriverLicense;