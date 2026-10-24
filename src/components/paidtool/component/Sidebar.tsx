"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PanelLeftClose, PanelLeftOpen, Home, FileText, Image as ImageIcon, Contact, Info, BookOpen } from "lucide-react";

const OPEN_W = 230;
const CLOSED_W = 60;
const SPRING = { type: "spring" as const, stiffness: 300, damping: 32 };

const NAV_ITEMS = [
  { href: "/e-aadhaar", label: "Aadhaar", icon: FileText },
  { href: "/pan-card-pvc", label: "Pan Card PVC", icon: ImageIcon },
  { href: "/voter-pvc", label: "Voter PVC", icon: Contact },
  { href: "/agri-pdf", label: "Agriculture PDF", icon: Info },
  { href: "/driver-license", label: "Driver License", icon: BookOpen },
  { href: "/vehicle-rc-pvc-card", label: "Vehicle RC PVC", icon: BookOpen },
  { href: "/all-type-ids", label: "All Type IDs", icon: BookOpen },
];

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export default function Sidebar({ open, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: open ? OPEN_W : CLOSED_W }}
      transition={SPRING}
      className="fixed  z-50 flex flex-col bg-white border-r border-black/[0.08] overflow-hidden shadow-[2px_0_10px_rgba(0,0,0,0.02)] rounded-4xl lg:left-20 md:left-0.5 mt-6"
    >
      {/* Header (Logo + Toggle Button) */}
      <div className={`flex items-center h-16 px-4 border-b border-black/[0.08] shrink-0 ${open ? "justify-between" : "justify-center"}`}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 min-w-0"
            >
              <div className="w-6 h-6 rounded-md bg-black flex items-center justify-center text-white text-[10px] font-bold shrink-0">ID</div>
              <span className="font-mono text-[12px] uppercase tracking-widest text-black font-semibold whitespace-nowrap">idcardtools</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={onToggle}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          className="w-9 h-9 rounded-lg hover:bg-black/[0.04] flex items-center justify-center text-black/70 transition-colors shrink-0"
        >
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.span
              key={open ? "close" : "open"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              {open ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={!open ? item.label : undefined} // Native tooltip when collapsed
              className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${open ? "" : "justify-center"} ${active ? "bg-orange-500 text-white" : "text-black/70 hover:bg-black/[0.04] hover:text-black"}`}
            >
              {/* Orange Indicator for Active State */}
              {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-black" />}

              <Icon
                size={18}
                strokeWidth={1.75}
                className="shrink-0"
              />

              {/* Text Label (Only shows when open) */}
              <AnimatePresence initial={false}>
                {open && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.12 }}
                    className="text-[13px] font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Sidebar
        open={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      />

      {/* Main content area jo sidebar collapse/expand par shift hoga */}
      <motion.main
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
      >
        {children}
      </motion.main>
    </>
  );
}
