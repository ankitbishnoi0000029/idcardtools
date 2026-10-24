"use client";

import React, { useState, useRef, useEffect } from "react";
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

// ---------- Scales ----------
const RENDER_SCALE = 5; // crop quality ke liye (high-res page)
const DETECT_W = 1400; // detection ke liye chhota canvas (fast)
const PREVIEW_W = 480;
const PAGE_PREVIEW_W = 800;

// ---------- PDF / print layout (mm) ----------
const CARD_W_MM = 85.6;
const CARD_H_MM = CARD_W_MM / RATIO;
const PDF_TOP_MM = 12;
const PDF_GAP_MM = 10;

type Box = { x: number; y: number; w: number; h: number };
type Detected = { front: Box | null; back: Box | null };

// ---------- OpenCV loader (sirf ek baar load hota hai) ----------
let cvPromise: Promise<any> | null = null;
const loadCv = () => {
  if (!cvPromise) {
    cvPromise = import("@techstark/opencv-js").then(async (m: any) => await (m.default ?? m));
  }
  return cvPromise;
};

const iou = (a: Box, b: Box) => {
  const x1 = Math.max(a.x, b.x);
  const y1 = Math.max(a.y, b.y);
  const x2 = Math.min(a.x + a.w, b.x + b.w);
  const y2 = Math.min(a.y + a.h, b.y + b.h);
  const inter = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
  const union = a.w * a.h + b.w * b.h - inter;
  return union > 0 ? inter / union : 0;
};

// Card jaisi rectangular shapes dhoondhta hai (landscape, card ka aspect ratio, page ka sahi hissa)
function findCardRects(cv: any, canvas: HTMLCanvasElement): Box[] {
  const W = canvas.width;
  const H = canvas.height;

  const src = cv.imread(canvas);
  const gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
  cv.GaussianBlur(gray, gray, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);

  const kernel = cv.Mat.ones(3, 3, cv.CV_8U);

  // Mask 1: edges (border lines se card ka outline)
  const edges = new cv.Mat();
  cv.Canny(gray, edges, 50, 150);
  cv.dilate(edges, edges, kernel, new cv.Point(-1, -1), 2);

  // Mask 2: non-white area (card ka background white page se alag)
  const ink = new cv.Mat();
  cv.threshold(gray, ink, 245, 255, cv.THRESH_BINARY_INV);
  cv.morphologyEx(ink, ink, cv.MORPH_CLOSE, kernel, new cv.Point(-1, -1), 2);

  const rects: Box[] = [];
  for (const mask of [edges, ink]) {
    const contours = new cv.MatVector();
    const hier = new cv.Mat();
    cv.findContours(mask, contours, hier, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

    for (let i = 0; i < contours.size(); i++) {
      const c = contours.get(i);
      const r = cv.boundingRect(c);
      const area = cv.contourArea(c);
      c.delete();

      const frac = (r.width * r.height) / (W * H);
      const ratio = r.width / r.height;
      const fill = area / (r.width * r.height);

      if (
        frac > 0.02 &&
        frac < 0.6 &&
        ratio > 1.35 &&
        ratio < 1.9 &&
        fill > 0.6 &&
        r.width > W * 0.15
      ) {
        rects.push({ x: r.x, y: r.y, w: r.width, h: r.height });
      }
    }
    contours.delete();
    hier.delete();
  }

  src.delete();
  gray.delete();
  edges.delete();
  ink.delete();
  kernel.delete();

  // Duplicates hatao, bade rectangles pehle
  rects.sort((p, q) => q.w * q.h - p.w * p.h);
  const uniq: Box[] = [];
  for (const r of rects) {
    if (!uniq.some((u) => iou(u, r) > 0.5)) uniq.push(r);
  }
  if (uniq.length === 0) return [];

  // Sabse bada card = pehla. Doosra = wo jo us se alag ho aur side par ho.
  const first = uniq[0];
  const fcx = first.x + first.w / 2;
  const second = uniq
    .slice(1)
    .find((r) => iou(first, r) < 0.1 && Math.abs(r.x + r.w / 2 - fcx) > W * 0.15);

  const out = second ? [first, second] : [first];
  return out.sort((a, b) => a.x - b.x); // left = front, right = back
}

// Box ko exact card ratio par laata hai (center se)
const fitRatio = (b: Box): Box => {
  let { x, y, w, h } = b;
  if (w / h > RATIO) {
    const nw = h * RATIO;
    x += (w - nw) / 2;
    w = nw;
  } else {
    const nh = w / RATIO;
    y += (h - nh) / 2;
    h = nh;
  }
  return { x, y, w, h };
};

// Card ko given width par draw karta hai (rounded corners ke saath, koi color change nahi)
const drawCard = (source: HTMLCanvasElement, c: Box, outW: number, target?: HTMLCanvasElement) => {
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

// Canvas par seedha draw hota hai (preview)
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

export const AutomatiCropId = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<HTMLCanvasElement | null>(null);
  const [detected, setDetected] = useState<Detected | null>(null);

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
    setDetected(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) validateAndSetFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) validateAndSetFile(e.dataTransfer.files[0]);
  };

  // PDF read + render + automatic card detection
  const processPdf = async () => {
    if (!file) {
      setError("Pehle koi PDF file select karein.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setDetected(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer, password }).promise;
      const pdfPage = await pdf.getPage(1);

      // 1. High-res page (crop ke liye)
      const viewport = pdfPage.getViewport({ scale: RENDER_SCALE });
      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context nahi mila");
      await pdfPage.render({ canvas, canvasContext: ctx, viewport }).promise;

      // 2. Chhota canvas (detection ke liye)
      const s = DETECT_W / canvas.width;
      const small = document.createElement("canvas");
      small.width = DETECT_W;
      small.height = Math.round(canvas.height * s);
      small.getContext("2d")!.drawImage(canvas, 0, 0, small.width, small.height);

      // 3. OpenCV se card dhoondhna
      const cv = await loadCv();
      const rects = findCardRects(cv, small);

      if (rects.length === 0) {
        setError("Card automatically detect nahi hue. Ye PDF ka layout alag hai. Is PDF ka screenshot bhejein.");
        setPage(canvas);
        return;
      }

      // Small canvas ke coordinates ko high-res canvas mein badlo, phir ratio fit
      const k = canvas.width / small.width;
      const scaled = rects.map((r) =>
        fitRatio({ x: r.x * k, y: r.y * k, w: r.w * k, h: r.h * k })
      );

      setDetected({
        front: scaled[0] ?? null,
        back: scaled[1] ?? null,
      });
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

  // Page preview: detected boxes draw karta hai (sirf dikhane ke liye, edit nahi)
  useEffect(() => {
    const disp = displayRef.current;
    if (!page || !disp) return;
    const s = PAGE_PREVIEW_W / page.width;
    disp.width = PAGE_PREVIEW_W;
    disp.height = Math.round(page.height * s);
    const ctx = disp.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(page, 0, 0, disp.width, disp.height);
    ctx.lineWidth = 3;
    if (detected?.front) {
      const b = detected.front;
      ctx.strokeStyle = "red";
      ctx.strokeRect(b.x * s, b.y * s, b.w * s, b.h * s);
    }
    if (detected?.back) {
      const b = detected.back;
      ctx.strokeStyle = "blue";
      ctx.strokeRect(b.x * s, b.y * s, b.w * s, b.h * s);
    }
  }, [page, detected]);

  const exportCard = (box: Box) => {
    if (!page) throw new Error("Page load nahi hua");
    return drawCard(page, box, EXPORT_W).toDataURL("image/png");
  };

  const downloadPng = (side: "front" | "back") => {
    const box = detected?.[side];
    if (!box) return;
    setIsExporting(true);
    setTimeout(() => {
      try {
        const a = document.createElement("a");
        a.href = exportCard(box);
        a.download = `id-${side}-4k.png`;
        a.click();
      } finally {
        setIsExporting(false);
      }
    }, 50);
  };

  // Jo side mili hai wahi A4 par ek line mein aati hai
  const downloadA4Pdf = () => {
    if (!detected) return;
    setIsExporting(true);
    setTimeout(() => {
      try {
        const sides = [detected.front, detected.back].filter(Boolean) as Box[];
        const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
        const pageW = pdf.internal.pageSize.getWidth();

        const totalW = CARD_W_MM * sides.length + PDF_GAP_MM * (sides.length - 1);
        let x = (pageW - totalW) / 2;

        sides.forEach((box) => {
          pdf.addImage(exportCard(box), "PNG", x, PDF_TOP_MM, CARD_W_MM, CARD_H_MM, undefined, "FAST");
          x += CARD_W_MM + PDF_GAP_MM;
        });

        pdf.save("id-card-A4.pdf");
      } finally {
        setIsExporting(false);
      }
    }, 50);
  };

  const sides = [
    { key: "front" as const, label: "Front Side", box: detected?.front ?? null },
    { key: "back" as const, label: "Back Side", box: detected?.back ?? null },
  ].filter((s) => s.box);

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
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">Automatic ID Card Crop</h2>
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
          <p className="font-semibold text-slate-700">{file ? file.name : "Click or drag & drop any ID PDF here"}</p>
          <p className="text-xs text-slate-400 mt-1">{file ? "Click again to change file" : "Aadhaar, PAN, Voter, RC, DL, Krishi card, etc."}</p>
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
          onClick={processPdf}
          disabled={!file || isLoading}
          className={`w-full font-bold text-lg py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 ${!file || isLoading ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-[#ff6a00] text-white shadow-lg shadow-orange-500/30"}`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Detecting card...
            </>
          ) : (
            <>
              <Scissors className="w-5 h-5" /> Read & Auto Crop
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
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm"
            >
              <p className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff6a00]" /> Detected Cards
              </p>
              <canvas ref={displayRef} className="w-full h-auto border rounded-lg bg-slate-50" />
              <p className="text-xs text-slate-500 mt-3 font-mono">Red = front, Blue = back (auto detected)</p>
            </motion.div> */}

            {sides.length > 0 && (
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
                  {sides.map((s, index) => (
                    <motion.div
                      key={s.key}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex flex-col items-center group"
                    >
                      <p className="font-semibold text-sm mb-3 text-slate-700">{s.label}</p>
                      <motion.div
                        whileHover={{ scale: 1.03, rotate: index === 0 ? -1 : 1 }}
                        className="bg-slate-50 rounded-2xl border border-slate-200 shadow-sm p-2 transition-all duration-300 group-hover:shadow-md"
                      >
                        <CardPreview source={page} box={s.box!} />
                      </motion.div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => downloadPng(s.key)}
                        disabled={isExporting}
                        className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold shadow-lg shadow-slate-900/20 hover:bg-black transition-colors disabled:opacity-60"
                      >
                        <Download className="w-4 h-4" /> Download 4K PNG
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AutomatiCropId;