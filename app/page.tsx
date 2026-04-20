"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react"
import { getFeaturedProducts } from "@/lib/data"
import type { Product } from "@/lib/types"
import NewsletterForm from "@/components/NewsletterForm"
import { LocalBusinessSchema, CollectionPageSchema } from "@/components/StructuredData"
import {
  ScrollReveal,
  TextReveal,
  ParallaxImage,
  MagneticButton,
  SmoothCounter,
  ImageReveal,
  HorizontalScroll,
} from "@/components/animations"

// ─── Helpers ────────────────────────────────────────────────────────────────────

const categoryLabels: Record<string, string> = {
  "table-basse": "Table basse",
  "table-a-manger": "Table à manger",
  "table-d-appoint": "Table d'appoint",
  console: "Console",
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(price)
}

// ─── SVG Icons ──────────────────────────────────────────────────────────────────

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

// ─── Section 1: Hero ─────────────────────────────────────────────────────────────

function HeroSection() {
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
      {/* Background with parallax */}
      <motion.div
        style={{ y: springBgY, scale: bgScale }}
        className="absolute inset-0 bg-warm-gray origin-center"
      >
        {/* Decorative geometric pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='80' height='80' fill='none' stroke='%231A1A1A' stroke-width='0.5'/%3E%3Cline x1='0' y1='40' x2='80' y2='40' stroke='%231A1A1A' stroke-width='0.5'/%3E%3Cline x1='40' y1='0' x2='40' y2='80' stroke='%231A1A1A' stroke-width='0.5'/%3E%3Ccircle cx='40' cy='40' r='20' stroke='%231A1A1A' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-body text-xs tracking-[0.4em] uppercase text-ink/20">
            Fès, Maroc
          </span>
        </div>
      </motion.div>

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

// ─── Section 2: Brand Manifesto ───────────────────────────────────────────────────

function ManifestoSection() {
  return (
    <section
      className="relative bg-cream py-32 overflow-hidden"
      style={{ minHeight: "200vh" }}
    >
      {/* Decorative large number in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-display text-warm-gray/40 font-light select-none"
          style={{ fontSize: "clamp(12rem, 30vw, 28rem)", lineHeight: 1 }}
          aria-hidden="true"
        >
          I
        </span>
      </div>

      <div className="sticky top-0 flex items-center justify-center min-h-screen px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <ScrollReveal direction="none" delay={0}>
            <p className="font-body text-[10px] tracking-[0.45em] uppercase text-gold mb-12">
              Notre origine
            </p>
          </ScrollReveal>

          {/* Text reveal manifesto */}
          <TextReveal
            text="A Fes, dans la medina la plus ancienne du monde, deux matieres se font face depuis des siecles. La terre cuite emaillee. Le fer forge. Maison Attar est nee du jour ou un artisan a ose les unir."
            className="font-display italic text-ink leading-relaxed"
          />

          {/* Gold line below */}
          <ScrollReveal direction="none" delay={0.2}>
            <div className="flex items-center justify-center gap-6 mt-16">
              <div className="w-16 h-px bg-gold/40" />
              <div className="w-2 h-2 border border-gold/60 rotate-45" />
              <div className="w-16 h-px bg-gold/40" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

// ─── Section 3: Three Pillars ────────────────────────────────────────────────────

const pillars = [
  {
    number: 1,
    label: "01",
    title: "Zellige de Fès",
    description:
      "Chaque fragment est taillé à la main par nos maalems selon les 360 formes géométriques de la tradition fassienne, transmises depuis le XIVe siècle sans rupture.",
    delay: 0,
  },
  {
    number: 2,
    label: "02",
    title: "Acier Forgé",
    description:
      "Les bases sont forgées à froid, martelées une à une pour révéler les traces du geste. L'acier n'est pas peint — il est ciré, vivant, appelé à se patiner avec le temps.",
    delay: 0.15,
  },
  {
    number: 3,
    label: "03",
    title: "Pièce Unique",
    description:
      "Aucune table ne ressemble à une autre. Chaque composition naît d'une commande, d'une conversation, d'un maalem. Un certificat accompagne chaque pièce.",
    delay: 0.3,
  },
]

function PillarsSection() {
  return (
    <section className="py-32 md:py-48 px-6 bg-cream-dark relative overflow-hidden">
      {/* Background texture lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              #1A1A1A 0px,
              #1A1A1A 1px,
              transparent 1px,
              transparent 120px
            )`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <ScrollReveal direction="up">
          <div className="mb-24 md:mb-32">
            <p className="font-body text-[10px] tracking-[0.45em] uppercase text-gold mb-6">
              La philosophie
            </p>
            <h2
              className="font-display font-light text-ink leading-none"
              style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" }}
            >
              Trois principes
            </h2>
          </div>
        </ScrollReveal>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-20">
          {pillars.map((pillar) => (
            <ScrollReveal key={pillar.label} direction="up" delay={pillar.delay}>
              <div className="flex flex-col">
                {/* Large gold number */}
                <div className="mb-8">
                  <span
                    className="font-display text-gold font-light leading-none tabular-nums"
                    style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
                  >
                    <SmoothCounter
                      target={pillar.number}
                      duration={1.5}
                      prefix="0"
                    />
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-display text-ink mb-4 tracking-wide"
                  style={{ fontSize: "clamp(1.4rem, 2vw, 1.8rem)" }}
                >
                  {pillar.title}
                </h3>

                {/* Gold rule */}
                <div className="w-10 h-px bg-gold mb-6" />

                {/* Description */}
                <p className="font-body text-sm text-ink-light leading-loose max-w-xs">
                  {pillar.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 4: Featured Collection ──────────────────────────────────────────────

function FeaturedProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <Link
      href={`/collection/${product.slug}`}
      className="group block flex-shrink-0"
      style={{ width: "clamp(260px, 28vw, 400px)" }}
      aria-label={`Voir ${product.name}`}
    >
      {/* Image container */}
      <ImageReveal
        placeholder
        alt={product.name}
        direction={index % 2 === 0 ? "left" : "right"}
        className="aspect-[3/4] mb-6"
      >
        <div className="absolute inset-0 bg-warm-gray" />
      </ImageReveal>

      {/* Hover overlay on image area */}
      <div className="relative -mt-6 mb-6 overflow-hidden" style={{ height: 0 }} />

      {/* Info */}
      <div className="space-y-2">
        <p className="font-body text-[9px] tracking-[0.35em] uppercase text-gold">
          {categoryLabels[product.category] ?? product.category}
        </p>
        <h3
          className="font-display text-ink group-hover:text-gold transition-colors duration-400"
          style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-3">
          <p className="font-body text-sm text-ink-light">{formatPrice(product.price)}</p>
          <span className="w-px h-3 bg-border" />
          <p className="font-body text-[10px] tracking-wide text-ink-muted uppercase">
            Pièce unique
          </p>
        </div>
      </div>
    </Link>
  )
}

function CollectionSection() {
  const featured = getFeaturedProducts()

  return (
    <section className="bg-cream overflow-hidden">
      {/* Header */}
      <div className="py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <ScrollReveal direction="up">
            <div>
              <p className="font-body text-[10px] tracking-[0.45em] uppercase text-gold mb-5">
                La collection
              </p>
              <h2
                className="font-display font-light text-ink leading-none"
                style={{ fontSize: "clamp(3rem, 7vw, 8rem)" }}
              >
                La Collection
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="font-body text-sm text-ink-muted max-w-xs leading-loose">
              Chaque pièce est une conversation entre la terre et le feu.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Horizontal scroll section */}
      <HorizontalScroll containerClassName="bg-cream">
        {featured.map((product, i) => (
          <FeaturedProductCard key={product.id} product={product} index={i} />
        ))}
        {/* End card CTA */}
        <div
          className="flex-shrink-0 flex items-center justify-center"
          style={{ width: "clamp(200px, 22vw, 320px)" }}
        >
          <MagneticButton>
            <Link
              href="/collection"
              className="relative inline-flex flex-col items-center gap-4 group"
            >
              <div className="w-16 h-16 border border-gold/40 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-all duration-500">
                <ArrowRightIcon className="text-gold" />
              </div>
              <span className="font-body text-[10px] tracking-[0.35em] uppercase text-ink-muted group-hover:text-gold transition-colors duration-300">
                Tout voir
              </span>
            </Link>
          </MagneticButton>
        </div>
      </HorizontalScroll>
    </section>
  )
}

// ─── Section 5: Maalem Story ──────────────────────────────────────────────────────

function MaalemSection() {
  return (
    <section className="bg-ink overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
        {/* Left: image with parallax */}
        <div className="relative order-1 min-h-[480px] lg:min-h-0">
          <ParallaxImage
            placeholder
            alt="Portrait d'un maalem"
            speed={0.2}
            className="absolute inset-0 w-full h-full"
          />
          {/* Decorative gold corners */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-gold/30 pointer-events-none z-10" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-gold/30 pointer-events-none z-10" />
        </div>

        {/* Right: content */}
        <div className="flex flex-col justify-center px-8 py-20 lg:px-16 xl:px-20 order-2">
          <ScrollReveal direction="left" delay={0.1}>
            <div className="w-10 h-px bg-gold mb-10" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <p className="font-body text-[10px] tracking-[0.45em] uppercase text-gold mb-5">
              Héritage vivant
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h2
              className="font-display font-light text-cream mb-10 leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Le geste du maalem
            </h2>
          </ScrollReveal>

          {/* Pull quote */}
          <ScrollReveal direction="up" delay={0.3}>
            <blockquote className="relative mb-10 pl-6 border-l border-gold/40">
              <p
                className="font-display italic text-gold leading-snug"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
              >
                &ldquo;Chaque carreau est une prière&rdquo;
              </p>
              <cite className="block font-body text-[10px] tracking-[0.3em] uppercase text-cream/40 mt-3 not-italic">
                — Hassan Bensouda, Maalem
              </cite>
            </blockquote>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <p className="font-body text-sm text-cream/60 leading-loose mb-10 max-w-md">
              Le maalem ne travaille pas avec des gabarits. Sa main est son outil
              le plus précis — formée par des décennies de martèle, de taille,
              d&apos;ajustage. Sept siècles de tradition transmise dans les ateliers
              de la médina de Fès.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.5}>
            <Link
              href="/maalems"
              className="group inline-flex items-center gap-3 font-body text-xs tracking-[0.3em] uppercase text-cream/50 hover:text-gold transition-colors duration-400"
            >
              Rencontrer nos artisans
              <span className="inline-block w-8 h-px bg-current transition-all duration-400 group-hover:w-16" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

// ─── Section 6: Process / Timeline ────────────────────────────────────────────────

const processSteps = [
  {
    value: 48,
    unit: "h",
    label: "Votre commande",
    description: "Nous accusons réception et votre maalem est sélectionné selon votre pièce.",
    delay: 0,
  },
  {
    value: 7,
    unit: " sem.",
    label: "De fabrication",
    description: "La forge de la base en acier commence. Chaque soudure, à la main.",
    delay: 0.15,
  },
  {
    value: 1,
    unit: " maalem",
    label: "Dédié à votre pièce",
    description: "Un seul artisan, du premier coup de marteau au dernier carreau de zellige.",
    delay: 0.3,
  },
  {
    value: 0,
    unit: "∞",
    label: "Pièces identiques",
    description: "Chaque table est unique. Elle portera les traces du geste, pour toujours.",
    delay: 0.45,
  },
]

function ProcessSection() {
  return (
    <section className="py-32 md:py-48 px-6 bg-cream relative overflow-hidden">
      {/* Decorative dot grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle, #1A1A1A 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="mb-24 text-center">
            <p className="font-body text-[10px] tracking-[0.45em] uppercase text-gold mb-5">
              De l&apos;atelier à votre intérieur
            </p>
            <h2
              className="font-display font-light text-ink leading-none"
              style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" }}
            >
              La promesse
            </h2>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6">
          {/* Connecting line desktop */}
          <div className="hidden lg:block absolute top-[2.5rem] left-[12.5%] right-[12.5%] h-px">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </div>

          {processSteps.map((step, i) => (
            <ScrollReveal key={i} direction="up" delay={step.delay}>
              <div className="flex flex-col items-center text-center">
                {/* Animated counter in circle */}
                <div className="relative w-20 h-20 mb-8">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border border-gold/20" />
                  {/* Inner ring */}
                  <div className="absolute inset-2 rounded-full border border-gold/10" />
                  {/* Number */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {step.value === 0 ? (
                      <span className="font-display text-2xl text-gold">∞</span>
                    ) : (
                      <span className="font-display text-xl text-gold leading-none">
                        <SmoothCounter
                          target={step.value}
                          duration={1.8}
                          suffix={step.unit}
                        />
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl text-ink mb-2 tracking-wide">
                  {step.label}
                </h3>

                {/* Thin gold line */}
                <div className="w-8 h-px bg-gold/50 mb-4" />

                {/* Description */}
                <p className="font-body text-xs text-ink-muted leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 7: Newsletter ────────────────────────────────────────────────────────

function NewsletterSection() {
  return (
    <section className="relative py-32 md:py-40 px-6 bg-ink overflow-hidden">
      {/* Grain texture - extra visible on dark bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Large decorative text in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-display text-cream/[0.02] font-light select-none"
          style={{ fontSize: "clamp(8rem, 22vw, 22rem)", lineHeight: 1 }}
          aria-hidden="true"
        >
          Attar
        </span>
      </div>

      <div className="relative max-w-2xl mx-auto text-center">
        {/* Top ornament */}
        <ScrollReveal direction="none">
          <div className="flex items-center justify-center gap-5 mb-14">
            <div className="w-16 h-px bg-cream/10" />
            <div className="w-1.5 h-1.5 border border-gold/40 rotate-45" />
            <div className="w-16 h-px bg-cream/10" />
          </div>
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal direction="up" delay={0.1}>
          <h2
            className="font-display font-light text-cream leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Les nouvelles
            <br />
            <span className="italic text-gold">de l&apos;atelier</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="font-body text-sm text-cream/40 mb-12 tracking-wide max-w-sm mx-auto leading-loose">
            Nouvelles pièces, portraits de maalems, coulisses de fabrication.
            Une lettre par mois depuis Fès.
          </p>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal direction="up" delay={0.3}>
          <NewsletterForm />
        </ScrollReveal>

        <ScrollReveal direction="none" delay={0.4}>
          <p className="mt-6 font-body text-[10px] text-cream/20 tracking-wide">
            Pas de spam. Juste des nouvelles de Fès, une fois par mois.
          </p>
        </ScrollReveal>

        {/* Bottom ornament */}
        <ScrollReveal direction="none" delay={0.5}>
          <div className="flex items-center justify-center gap-5 mt-16">
            <div className="w-16 h-px bg-cream/10" />
            <div className="w-1.5 h-1.5 border border-gold/20 rotate-45" />
            <div className="w-16 h-px bg-cream/10" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <PillarsSection />
      <CollectionSection />
      <MaalemSection />
      <ProcessSection />
      <NewsletterSection />
      <LocalBusinessSchema />
      <CollectionPageSchema />
    </>
  )
}
