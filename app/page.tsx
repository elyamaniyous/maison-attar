import Link from "next/link"
import { getFeaturedProducts, getPageSections } from "@/db/helpers"
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
import HeroSection from "@/components/home/HeroSection"
import type { AccueilSections } from "@/lib/page-content"

export const revalidate = 60

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

// ─── Section 2: Brand Manifesto ───────────────────────────────────────────────────

function ManifestoSection({ content }: { content: AccueilSections }) {
  return (
    <section className="relative bg-cream py-32 overflow-hidden">
      {/* Decorative large letter in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-display text-warm-gray/30 font-light select-none"
          style={{ fontSize: "clamp(10rem, 22vw, 22rem)", lineHeight: 1 }}
          aria-hidden="true"
        >
          I
        </span>
      </div>

      <div className="relative flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <ScrollReveal direction="none" delay={0}>
            <p className="font-body text-[10px] tracking-[0.45em] uppercase text-gold mb-12">
              {content.manifesto_eyebrow}
            </p>
          </ScrollReveal>

          {/* Text reveal manifesto */}
          <TextReveal
            text={content.manifesto_text}
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

function PillarsSection({ content }: { content: AccueilSections }) {
  const pillars = [
    { number: 1, label: content.pillar_1_label, title: content.pillar_1_title, description: content.pillar_1_desc, delay: 0 },
    { number: 2, label: content.pillar_2_label, title: content.pillar_2_title, description: content.pillar_2_desc, delay: 0.15 },
    { number: 3, label: content.pillar_3_label, title: content.pillar_3_title, description: content.pillar_3_desc, delay: 0.3 },
  ]

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
              {content.pillars_eyebrow}
            </p>
            <h2
              className="font-display font-light text-ink leading-none"
              style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" }}
            >
              {content.pillars_title}
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
        <div
          className={`absolute inset-0 ${
            ["zellige-pattern-ecaille", "zellige-pattern-star", "zellige-pattern-diamond", "zellige-pattern-hexagon", "zellige-pattern-cream", "zellige-pattern-mosaic"][index % 6]
          }`}
        >
          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: index % 2 === 0
                ? "radial-gradient(ellipse at center, transparent 30%, rgba(255,255,255,0.4) 100%)"
                : "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)",
            }}
          />
          {/* Centered name */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <svg
              className="w-12 h-12 opacity-50"
              viewBox="0 0 64 64"
              fill="none"
              stroke={index % 2 === 0 ? "#1A1A1A" : "#C4A265"}
              strokeWidth="1"
            >
              <polygon points="32,4 60,20 60,44 32,60 4,44 4,20" />
              <polygon points="32,16 48,24 48,40 32,48 16,40 16,24" />
              <circle cx="32" cy="32" r="3" />
            </svg>
            <span
              className={`font-display italic text-base ${
                index % 2 === 0 ? "text-ink/60" : "text-cream/80"
              }`}
            >
              {product.name}
            </span>
          </div>
        </div>
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

function CollectionSection({ featured, content }: { featured: Product[]; content: AccueilSections }) {
  return (
    <section className="bg-cream overflow-hidden">
      {/* Header */}
      <div className="py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <ScrollReveal direction="up">
            <div>
              <p className="font-body text-[10px] tracking-[0.45em] uppercase text-gold mb-5">
                {content.collection_eyebrow}
              </p>
              <h2
                className="font-display font-light text-ink leading-none"
                style={{ fontSize: "clamp(3rem, 7vw, 8rem)" }}
              >
                {content.collection_title}
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="font-body text-sm text-ink-muted max-w-xs leading-loose">
              {content.collection_subtitle}
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

function MaalemSection({ content }: { content: AccueilSections }) {
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
              {content.maalem_eyebrow}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h2
              className="font-display font-light text-cream mb-10 leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {content.maalem_title}
            </h2>
          </ScrollReveal>

          {/* Pull quote */}
          <ScrollReveal direction="up" delay={0.3}>
            <blockquote className="relative mb-10 pl-6 border-l border-gold/40">
              <p
                className="font-display italic text-gold leading-snug"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
              >
                &ldquo;{content.maalem_quote}&rdquo;
              </p>
              <cite className="block font-body text-[10px] tracking-[0.3em] uppercase text-cream/40 mt-3 not-italic">
                {content.maalem_quote_author}
              </cite>
            </blockquote>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <p className="font-body text-sm text-cream/60 leading-loose mb-10 max-w-md">
              {content.maalem_body}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.5}>
            <Link
              href={content.maalem_link_url}
              className="group inline-flex items-center gap-3 font-body text-xs tracking-[0.3em] uppercase text-cream/50 hover:text-gold transition-colors duration-400"
            >
              {content.maalem_link_label}
              <span className="inline-block w-8 h-px bg-current transition-all duration-400 group-hover:w-16" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

// ─── Section 6: Process / Timeline ────────────────────────────────────────────────

function ProcessSection({ content }: { content: AccueilSections }) {
  const processSteps = [
    { value: 48, unit: "h",      label: content.process_step1_label, description: content.process_step1_desc, delay: 0 },
    { value: 7,  unit: " sem.",  label: content.process_step2_label, description: content.process_step2_desc, delay: 0.15 },
    { value: 1,  unit: " maalem",label: content.process_step3_label, description: content.process_step3_desc, delay: 0.3 },
    { value: 0,  unit: "∞",      label: content.process_step4_label, description: content.process_step4_desc, delay: 0.45 },
  ]

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
              {content.process_eyebrow}
            </p>
            <h2
              className="font-display font-light text-ink leading-none"
              style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" }}
            >
              {content.process_title}
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

function NewsletterSection({ content }: { content: AccueilSections }) {
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
            {content.newsletter_title}
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="font-body text-sm text-cream/40 mb-12 tracking-wide max-w-sm mx-auto leading-loose">
            {content.newsletter_body}
          </p>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal direction="up" delay={0.3}>
          <NewsletterForm />
        </ScrollReveal>

        <ScrollReveal direction="none" delay={0.4}>
          <p className="mt-6 font-body text-[10px] text-cream/20 tracking-wide">
            {content.newsletter_disclaimer}
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

export default async function HomePage() {
  const [featured, content] = await Promise.all([
    getFeaturedProducts(),
    getPageSections("accueil"),
  ])

  return (
    <>
      <HeroSection
        eyebrow={content.hero_eyebrow}
        title={content.hero_title}
        subtitle={content.hero_subtitle}
        ctaLabel={content.hero_cta_label}
        ctaLink={content.hero_cta_link}
      />
      <ManifestoSection content={content} />
      <PillarsSection content={content} />
      <CollectionSection featured={featured} content={content} />
      <MaalemSection content={content} />
      <ProcessSection content={content} />
      <NewsletterSection content={content} />
      <LocalBusinessSchema />
      <CollectionPageSchema />
    </>
  )
}
