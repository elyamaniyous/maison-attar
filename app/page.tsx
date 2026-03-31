import Link from "next/link";
import { getFeaturedProducts } from "@/lib/data";
import type { Product } from "@/lib/types";
import NewsletterForm from "@/components/NewsletterForm";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const categoryLabels: Record<string, string> = {
  "table-basse": "Table basse",
  "table-a-manger": "Table à manger",
  "table-d-appoint": "Table d'appoint",
  console: "Console",
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(price);
}

// ─── Section 1: Hero ──────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative w-full h-[100svh] min-h-[600px] flex flex-col overflow-hidden">
      {/* Background image placeholder */}
      <div className="absolute inset-0 bg-warm-gray">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-ink-muted">
            Photo Hero
          </span>
        </div>
        {/* Gradient overlay: bottom fade to near-black for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 items-center justify-end pb-24 px-6 text-center">
        {/* Tagline */}
        <p
          className="
            font-display italic text-cream
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            leading-tight max-w-3xl mb-6
            animate-fade-up
          "
        >
          Ce que les mains distillent,
          <br />
          le temps ne peut pas l&apos;effacer.
        </p>

        {/* Provenance */}
        <p
          className="
            font-body text-cream/70 text-xs sm:text-sm
            tracking-[0.35em] uppercase mb-10
            animate-fade-up delay-200
          "
        >
          Fabriqué à la main à Fès
        </p>

        {/* CTA */}
        <div className="animate-fade-up delay-400">
          <Link
            href="/collection"
            className="
              inline-block font-body text-xs tracking-[0.25em] uppercase
              border border-cream/60 text-cream
              px-10 py-4
              hover:border-gold hover:text-gold
              transition-all duration-400
            "
          >
            Découvrir la collection
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-fade-in delay-600">
        <span className="font-body text-[10px] tracking-[0.25em] uppercase text-cream/40">
          Défiler
        </span>
        <ChevronDown />
      </div>
    </section>
  );
}

function ChevronDown() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="text-cream/40 animate-bounce"
      aria-hidden="true"
    >
      <path
        d="M3 5.5L8 10.5L13 5.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Section 2: Philosophy pillars ───────────────────────────────────────────

function ZelligeIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      className="text-gold"
      aria-hidden="true"
    >
      {/* Stylised zellige tile: octagon with inner star */}
      <polygon
        points="14,4 26,4 36,14 36,26 26,36 14,36 4,26 4,14"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <polygon
        points="20,10 23.5,16.5 30.6,15.3 26,21 30.6,26.7 23.5,25.5 20,32 16.5,25.5 9.4,26.7 14,21 9.4,15.3 16.5,16.5"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  );
}

function HammerIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      className="text-gold"
      aria-hidden="true"
    >
      {/* Hammer head */}
      <rect
        x="6"
        y="8"
        width="18"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      {/* Handle */}
      <line
        x1="20"
        y1="18"
        x2="34"
        y2="33"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Grip lines */}
      <line
        x1="23"
        y1="21.5"
        x2="25.5"
        y2="19"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />
      <line
        x1="26"
        y1="24.5"
        x2="28.5"
        y2="22"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

function CertificateIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      className="text-gold"
      aria-hidden="true"
    >
      {/* Document */}
      <rect
        x="8"
        y="5"
        width="20"
        height="26"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      {/* Lines */}
      <line
        x1="12"
        y1="12"
        x2="24"
        y2="12"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="16"
        x2="24"
        y2="16"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="20"
        x2="20"
        y2="20"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      {/* Seal */}
      <circle
        cx="30"
        cy="31"
        r="6"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M27.5 31.2L29.3 33L32.8 29"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const pillars = [
  {
    icon: <ZelligeIcon />,
    title: "Zellige de Fès",
    text: "Chaque fragment est taillé à la main par nos maalems selon les 360 formes géométriques de la tradition fassienne — transmises depuis le XIVe siècle sans rupture.",
    delay: "delay-100",
  },
  {
    icon: <HammerIcon />,
    title: "Acier Forgé",
    text: "Les bases sont forgées à froid, martelées une à une pour révéler les traces du geste. L'acier n'est pas peint — il est ciré, vivant, appelé à se patiner avec le temps.",
    delay: "delay-300",
  },
  {
    icon: <CertificateIcon />,
    title: "Pièce Unique",
    text: "Aucune table ne ressemble à une autre. Chaque composition naît d'une commande, d'une conversation, d'un maalem. Un certificat d'authenticité accompagne chaque pièce.",
    delay: "delay-500",
  },
];

function PhilosophySection() {
  return (
    <section className="py-28 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="font-body text-xs tracking-[0.35em] uppercase text-gold mb-4">
            Notre philosophie
          </p>
          <div className="w-px h-12 bg-border mx-auto" />
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className={`flex flex-col items-center text-center animate-fade-up ${pillar.delay}`}
            >
              {/* Icon */}
              <div className="mb-7">{pillar.icon}</div>

              {/* Gold rule */}
              <div className="w-8 h-px bg-gold mb-7" />

              {/* Title */}
              <h3 className="font-display text-2xl text-ink mb-5 tracking-wide">
                {pillar.title}
              </h3>

              {/* Body */}
              <p className="font-body text-sm text-ink-light leading-relaxed max-w-xs">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Featured Collection ──────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/collection/${product.slug}`}
      className="group block"
      aria-label={`Voir ${product.name}`}
    >
      {/* Image */}
      <div className="img-zoom relative aspect-[4/3] bg-warm-gray mb-5 overflow-hidden">
        <div className="absolute inset-0 flex items-end justify-start p-4">
          {product.featured && (
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-ink-muted bg-cream/80 px-2.5 py-1">
              Pièce phare
            </span>
          )}
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-500" />
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p className="font-body text-[10px] tracking-[0.25em] uppercase text-ink-muted">
          {categoryLabels[product.category] ?? product.category}
        </p>
        <h3 className="font-display text-xl text-ink group-hover:text-ink-light transition-colors duration-300">
          {product.name}
        </h3>
        <p className="font-body text-sm text-ink-light">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}

function CollectionSection() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-28 px-6 bg-cream-dark">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="font-display text-5xl md:text-6xl text-ink mb-5 animate-fade-up">
            La Collection
          </h2>
          <p className="font-body text-sm text-ink-muted tracking-wide max-w-sm mx-auto animate-fade-up delay-200">
            Chaque pièce est une conversation entre la terre et le feu.
          </p>
        </div>

        {/* Gold rule */}
        <div className="flex items-center justify-center gap-4 mb-20 animate-fade-up delay-300">
          <div className="w-16 h-px bg-border" />
          <div className="w-1 h-1 rounded-full bg-gold" />
          <div className="w-16 h-px bg-border" />
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {featured.map((product, i) => (
            <div
              key={product.id}
              className={`animate-fade-up`}
              style={{ animationDelay: `${100 + i * 80}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <Link
            href="/collection"
            className="
              inline-block font-body text-xs tracking-[0.25em] uppercase
              border border-ink/30 text-ink
              px-10 py-4
              hover:border-gold hover:text-gold
              transition-all duration-400
            "
          >
            Voir toute la collection
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: Maalem Story ──────────────────────────────────────────────────

function MaalemSection() {
  return (
    <section className="py-0 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Left: text */}
        <div className="flex flex-col justify-center px-8 py-24 lg:px-16 xl:px-24 order-2 lg:order-1">
          {/* Gold accent line */}
          <div className="w-12 h-px bg-gold mb-10" />

          <p className="font-body text-xs tracking-[0.35em] uppercase text-gold mb-5">
            Héritage vivant
          </p>

          <h2 className="font-display text-4xl md:text-5xl text-ink mb-8 leading-tight max-w-sm">
            Le geste du maalem
          </h2>

          <p className="font-body text-sm text-ink-light leading-loose mb-5 max-w-md">
            Le maalem ne travaille pas avec des gabarits. Sa main est son outil
            le plus précis — formée par des dizaines d&apos;années de martèle,
            de taille, d&apos;ajustage. La marteline frappe le zellige à
            l&apos;angle exact, et le fragment se détache avec la forme juste.
            Pas d&apos;une fraction de millimètre de plus.
          </p>

          <p className="font-body text-sm text-ink-light leading-loose mb-12 max-w-md">
            Sept siècles de tradition transmise de maître à apprenti dans les
            ateliers de la médina de Fès. Chez Maison Attar, nos maalems
            prolongent cette chaîne ininterrompue — et la portent dans votre
            intérieur.
          </p>

          <Link
            href="/maalems"
            className="
              group inline-flex items-center gap-3
              font-body text-xs tracking-[0.25em] uppercase text-ink
              hover:text-gold transition-colors duration-300
            "
          >
            Rencontrer nos artisans
            <span className="inline-block w-8 h-px bg-current transition-all duration-300 group-hover:w-12" />
          </Link>
        </div>

        {/* Right: image placeholder */}
        <div className="relative order-1 lg:order-2 min-h-[400px] lg:min-h-0 bg-warm-gray">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-ink-muted">
              Portrait maalem
            </span>
          </div>
          {/* Decorative gold corner */}
          <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-gold/40" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-gold/40" />
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: The Promise / Process ────────────────────────────────────────

const processSteps = [
  {
    number: "01",
    title: "Votre commande",
    detail: "48h pour débuter",
    description:
      "Nous accusons réception et votre maalem est sélectionné selon votre pièce.",
  },
  {
    number: "02",
    title: "Fabrication",
    detail: "Le maalem commence votre pièce",
    description:
      "La forge de la base en acier commence. Chaque soudure, à la main.",
  },
  {
    number: "03",
    title: "Zellige posé",
    detail: "Chaque fragment, à la main",
    description:
      "Les carreaux sont taillés, ajustés et incrustés un à un dans le mortier.",
  },
  {
    number: "04",
    title: "Livraison",
    detail: "6 à 8 semaines, chez vous",
    description:
      "Emballage sur mesure, livraison sécurisée et montage inclus en France.",
  },
];

function ProcessSection() {
  return (
    <section className="py-28 px-6 bg-cream-dark">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="font-body text-xs tracking-[0.35em] uppercase text-gold mb-5">
            De l&apos;atelier à votre intérieur
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-ink">
            La promesse Maison Attar
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-8 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px bg-border" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6">
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                className={`relative flex flex-col items-center text-center animate-fade-up`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Number bubble */}
                <div className="relative z-10 w-16 h-16 rounded-full border border-gold/40 bg-cream-dark flex items-center justify-center mb-7">
                  <span className="font-display text-xl text-gold">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl text-ink mb-2">
                  {step.title}
                </h3>

                {/* Detail */}
                <p className="font-body text-xs tracking-wide text-gold mb-4 uppercase">
                  {step.detail}
                </p>

                {/* Description */}
                <p className="font-body text-xs text-ink-muted leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 6: Newsletter / CTA ─────────────────────────────────────────────

function NewsletterSection() {
  return (
    <section className="py-28 px-6 bg-ink">
      <div className="max-w-2xl mx-auto text-center">
        {/* Ornament */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-12 h-px bg-cream/10" />
          <div className="w-1 h-1 rounded-full bg-gold" />
          <div className="w-12 h-px bg-cream/10" />
        </div>

        {/* Heading */}
        <h2 className="font-display text-4xl md:text-5xl text-cream mb-5 leading-tight animate-fade-up">
          Recevez les nouvelles
          <br />
          <span className="italic text-gold/90">de l&apos;atelier</span>
        </h2>

        <p className="font-body text-sm text-cream/50 mb-12 tracking-wide animate-fade-up delay-200">
          Nouvelles pièces, portraits de maalems, coulisses de fabrication.
        </p>

        {/* Form */}
        <div className="animate-fade-up delay-300">
          <NewsletterForm />
        </div>

        {/* Fine print */}
        <p className="mt-7 font-body text-[11px] text-cream/25 tracking-wide animate-fade-up delay-400">
          Pas de spam. Juste des nouvelles de Fès, une fois par mois.
        </p>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <div className="w-12 h-px bg-cream/10" />
          <div className="w-1 h-1 rounded-full bg-gold/30" />
          <div className="w-12 h-px bg-cream/10" />
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <CollectionSection />
      <MaalemSection />
      <ProcessSection />
      <NewsletterSection />
    </>
  );
}
