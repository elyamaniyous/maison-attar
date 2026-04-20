"use client";

import { motion } from "motion/react";

export default function CollectionHero() {
  return (
    <section className="relative pt-40 pb-24 px-6 md:px-12 lg:px-20 border-b border-border/60 overflow-hidden">
      {/* Background decorative geometric — faint zellige motif */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] max-w-[600px] opacity-[0.03]"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <polygon points="200,20 380,110 380,290 200,380 20,290 20,110" stroke="#1A1A1A" strokeWidth="2" fill="none" />
          <polygon points="200,60 340,130 340,270 200,340 60,270 60,130" stroke="#1A1A1A" strokeWidth="1.5" fill="none" />
          <polygon points="200,100 300,150 300,250 200,300 100,250 100,150" stroke="#1A1A1A" strokeWidth="1" fill="none" />
          <polygon points="200,140 260,170 260,230 200,260 140,230 140,170" stroke="#1A1A1A" strokeWidth="0.75" fill="none" />
          <circle cx="200" cy="200" r="30" stroke="#1A1A1A" strokeWidth="0.75" fill="none" />
          <line x1="200" y1="20" x2="200" y2="380" stroke="#1A1A1A" strokeWidth="0.5" />
          <line x1="20" y1="200" x2="380" y2="200" stroke="#1A1A1A" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-screen-xl mx-auto relative">
        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10px] uppercase tracking-[0.25em] text-gold font-body mb-6"
        >
          Maison Attar — Collection
        </motion.p>

        {/* Massive headline */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-ink leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
          >
            La Collection
          </motion.h1>
        </div>

        {/* Subtitle italic */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-display italic text-ink-muted mt-5 leading-snug"
          style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
        >
          Pièces uniques, fabriquées à la main à Fès
        </motion.p>

        {/* Gold accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
          className="mt-8 w-16 h-px bg-gold"
        />
      </div>
    </section>
  );
}
