"use client"

import Link from "next/link"
import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "motion/react"
import { MagneticButton } from "@/components/animations"

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 7L10 13L16 7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 9H15M15 9L10 4M15 9L10 14"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.85])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const springBgY = useSpring(bgY, { stiffness: 60, damping: 20 })

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[640px] flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax — zellige star pattern */}
      <motion.div
        style={{ y: springBgY, scale: bgScale }}
        className="absolute inset-0 zellige-pattern-star origin-center"
      />

      {/* Subtle additional star ornaments overlay */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23C4A265' stroke-width='0.6' fill='none'%3E%3Cpolygon points='80,20 92,60 132,60 100,84 112,124 80,100 48,124 60,84 28,60 68,60'/%3E%3Ccircle cx='80' cy='80' r='40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Dark gradient overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/80 pointer-events-none"
      />

      {/* Radial vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(26,26,26,0.5)_100%)] pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.45em" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-[10px] text-cream/50 uppercase mb-8 tracking-[0.45em]"
        >
          Zellige & Acier Artisanal · Fès
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light text-cream tracking-[0.18em] uppercase leading-none mb-6"
          style={{
            fontSize: "clamp(3rem, 8vw, 10rem)",
          }}
        >
          Maison Attar
        </motion.h1>

        {/* Gold separator line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-24 h-px bg-gold mb-8 origin-center"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display italic text-cream/80 mb-12 max-w-2xl leading-relaxed"
          style={{ fontSize: "clamp(1rem, 2.2vw, 1.6rem)" }}
        >
          Ce que les mains distillent, le temps ne peut pas l&apos;effacer
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticButton strength={0.35}>
            <Link
              href="/collection"
              className="relative inline-flex items-center gap-3 font-body text-xs tracking-[0.3em] uppercase border border-gold/70 text-cream px-10 py-5 overflow-hidden group transition-colors duration-500 hover:text-ink"
            >
              {/* Gold fill on hover */}
              <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <span className="relative z-10">Découvrir la collection</span>
              <ArrowRightIcon className="relative z-10 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[9px] tracking-[0.35em] uppercase text-cream/30">
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDownIcon className="text-gold/60" />
        </motion.div>
      </motion.div>

      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 w-10 h-10 border-t border-l border-gold/25 pointer-events-none" />
      <div className="absolute top-8 right-8 w-10 h-10 border-t border-r border-gold/25 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-10 h-10 border-b border-l border-gold/25 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-10 h-10 border-b border-r border-gold/25 pointer-events-none" />
    </section>
  )
}
