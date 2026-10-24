"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Zap, Truck, Lock } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#f4f1ea] text-[#0a0a0a] overflow-hidden mt-24 container mx-auto">
      
      {/* Fine vertical rules (editorial grid) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="container mx-auto px-8 h-full relative max-w-[1400px]">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-black/[0.06]" />
          <div className="absolute left-1/3 top-0 bottom-0 w-px bg-black/[0.06]" />
          <div className="absolute left-2/3 top-0 bottom-0 w-px bg-black/[0.06]" />
          <div className="absolute right-8 top-0 bottom-0 w-px bg-black/[0.06]" />
        </div>
      </div>

      {/* ===== TOP META ROW ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-between pb-6 mb-16 border-b border-black/[0.12]"
      >
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ff6a00]" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-black/60">
            E-Aadhaar → PVC Print Service
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.2em] text-black/40">
          <span>UIDAI Compliant</span>
          <span>·</span>
          <span>India</span>
        </div>
      </motion.div>

      {/* ===== MAIN GRID ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        
        {/* ===== LEFT: HEADLINE & CONTENT (7 cols) ===== */}
        <div className="lg:col-span-7 flex flex-col">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-mono uppercase tracking-[0.25em] text-black/40 mb-6"
          >
            № 01 — Digital Identity
          </motion.div>

          {/* ✅ FIXED: Added 'PDF' for better SEO */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[52px] md:text-[72px] lg:text-[88px] leading-[0.98] tracking-[-0.02em] mb-10"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Print E-Aadhaar PDF
            <br />
            on a <span className="italic text-[#ff6a00]">PVC card</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[17px] md:text-[18px] leading-[1.65] text-black/70 max-w-[560px] mb-10"
          >
            Turn your digital E-Aadhaar into a premium PVC card — the size of a credit card, 
            the quality of a bank card. Waterproof, durable, delivered to your door in 24 hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-12 max-w-[640px]"
          >
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-black/40 mb-3 pb-3 border-b border-black/[0.1]">
                Material
              </div>
              <p className="text-[14px] leading-[1.7] text-black/70">
                600-micron PVC, same grade as bank cards. Will not fade, tear, or peel.
              </p>
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-black/40 mb-3 pb-3 border-b border-black/[0.1]">
                Delivery
              </div>
              <p className="text-[14px] leading-[1.7] text-black/70">
                Printed and dispatched within 24 hours. Tracked shipping across India.
              </p>
            </div>
          </motion.div>

          {/* ✅ FIXED: Corrected Links */}
          {/* ✅ REDESIGNED CTA WITH ANIMATION LOOP */}
                    {/* ✅ PREMIUM LANDING PAGE CTA WITH ANIMATIONS */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center mt-auto pt-6"
          >
            <Link 
              href="/e-aadhaar" 
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#ff6a00] rounded-full overflow-hidden shadow-[20px_20px_40px_5px_rgba(255,106,0,0.6)] hover:shadow-[0_15px_40px_-10px_rgba(255,106,0,0.8)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Shimmer Effect (चमकती हुई लाइट) */}
              <motion.div
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1, // हर 1 सेकंड के बाद दोबारा चलेगा
                }}
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none"
              />

              {/* Text */}
              <span className="relative z-10 text-[15px] md:text-[16px] font-bold text-white tracking-wide uppercase">
                Convert E-Aadhaar PDF to PVC Card
              </span>

              {/* Arrow Circle with Continuous Bounce */}
              <span className="relative z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center ml-2 group-hover:scale-110 transition-transform duration-300">
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                    x: [0, 2, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowUpRight
                    size={18}
                    strokeWidth={2.5}
                    className="text-[#ff6a00]"
                  />
                </motion.div>
              </span>
            </Link>
          </motion.div>
        </div>

        {/* ===== RIGHT: IMAGE (5 cols) ===== */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative bg-white p-3 border border-black/[0.1] shadow-[0_2px_0_rgba(0,0,0,0.04)]">
            <div className="relative overflow-hidden aspect-[4/3]">
              <Image
                src="/aadhaar-to-pvc.png"
                alt="Sample of E-Aadhaar printed on premium PVC card by idcardtools"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3 text-[12px] text-black/50 leading-[1.6]">
            <span className="font-mono uppercase tracking-wider text-black/40 shrink-0 mt-0.5">
              Fig. 01
            </span>
            <p>
              The transformation. Paper E-Aadhaar on the left, our printed PVC card on the right. 
              Same information, form factor that survives your wallet.
            </p>
          </div>

          <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-[#ff6a00] text-white flex items-center justify-center text-[10px] font-mono uppercase tracking-widest text-center leading-tight rotate-12 shadow-lg">
            100%<br />Secure
          </div>
        </motion.div>
      </div>

      {/* ✅ FIXED: Replaced fake stats with Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mt-24 pt-8 border-t border-black/[0.12]"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: ShieldCheck, label: 'UIDAI Compliant' },
            { icon: Zap, label: 'Instant Processing' },
            { icon: Truck, label: '24H Dispatch' },
            { icon: Lock, label: 'Secure & Private' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ff6a00]/10 flex items-center justify-center">
                  <Icon size={16} className="text-[#ff6a00]" />
                </div>
                <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-black/70">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

    </section>
  );
};