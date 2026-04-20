import { notFound } from "next/navigation";
import Link from "next/link";
import { products, maalems } from "@/lib/data";
import type { Maalem } from "@/lib/types";
import ProductGallery from "@/components/product/ProductGallery";
import AddToCartPanel from "@/components/product/AddToCartPanel";
import ProductCard from "@/components/product/ProductCard";
import { ProductSchema, BreadcrumbSchema } from "@/components/StructuredData";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ParallaxImage from "@/components/animations/ParallaxImage";
import MagneticButton from "@/components/animations/MagneticButton";
import StaggerChildren from "@/components/animations/StaggerChildren";

// ─── Constants ──────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  "table-basse":     "Table Basse",
  "table-a-manger":  "Table à Manger",
  "table-d-appoint": "Table d'Appoint",
  "console":         "Console",
};

// ─── Static params ──────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  const BASE_URL = "https://beautiful-charm-production-7244.up.railway.app";
  return {
    title: `${product.name} — Table en Zellige Artisanal`,
    description: product.description.length > 160
      ? product.description.substring(0, 157) + "..."
      : product.description,
    alternates: {
      canonical: `${BASE_URL}/collection/${product.slug}`,
    },
    keywords: [
      product.name,
      "zellige marocain",
      "table zellige",
      "acier forgé",
      "artisanat Fès",
      "pièce unique",
      "décoration luxe",
      CATEGORY_LABELS[product.category] ?? product.category,
    ],
    openGraph: {
      title: `${product.name} | Maison Attar`,
      description: product.description,
      url: `${BASE_URL}/collection/${product.slug}`,
      type: "website",
      images: product.images[0]
        ? [{ url: `${BASE_URL}${product.images[0]}`, alt: product.name }]
        : [],
    },
  };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getEstimatedDelivery(): string {
  // 6–7 weeks from today
  const weeksFromNow = 6;
  const delivery = new Date();
  delivery.setDate(delivery.getDate() + weeksFromNow * 7);
  // Round to Monday of that week
  const day = delivery.getDay();
  const daysToMonday = day === 0 ? 1 : (8 - day) % 7 || 7;
  delivery.setDate(delivery.getDate() + (day === 1 ? 0 : daysToMonday));
  return delivery.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  // Get full maalem data
  const maalem: Maalem | undefined = maalems.find((m) => m.id === product.maalem.id);

  // Related products: same category, exclude current
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const estimatedDelivery = getEstimatedDelivery();

  return (
    <main className="min-h-screen bg-cream">
      <ProductSchema product={product} />
      <BreadcrumbSchema
        items={[
          { name: "Maison Attar", href: "/" },
          { name: "Collection", href: "/collection" },
          { name: product.name, href: `/collection/${product.slug}` },
        ]}
      />

      {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
      <nav className="px-6 md:px-12 lg:px-20 pt-28 pb-6">
        <div className="max-w-screen-xl mx-auto">
          <ol className="flex items-center gap-2 text-xs font-body text-ink-muted">
            <li>
              <Link href="/" className="link-underline hover:text-ink transition-colors">
                Maison Attar
              </Link>
            </li>
            <li className="text-border">/</li>
            <li>
              <Link href="/collection" className="link-underline hover:text-ink transition-colors">
                Collection
              </Link>
            </li>
            <li className="text-border">/</li>
            <li className="text-ink">{product.name}</li>
          </ol>
        </div>
      </nav>

      {/* ── Hero: Gallery + Info ──────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 xl:gap-20">

            {/* Left: Gallery with subtle parallax entrance */}
            <ScrollReveal direction="left" duration={0.8}>
              <ProductGallery images={product.images} productName={product.name} />
            </ScrollReveal>

            {/* Right: Product Info */}
            <ScrollReveal direction="right" delay={0.15} duration={0.8}>
              <div className="lg:pt-4">
                {/* Category */}
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-body mb-4">
                  {CATEGORY_LABELS[product.category]}
                </p>

                {/* Name */}
                <h1 className="font-display text-4xl md:text-5xl text-ink leading-[1.08] mb-4">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-4 mb-6">
                  <p className="font-body text-2xl font-medium text-ink">
                    {product.price.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                      minimumFractionDigits: 0,
                    })}
                  </p>
                  <p className="text-sm text-ink-muted font-body">
                    Pièce unique
                  </p>
                </div>

                {/* Short description */}
                <p className="font-body text-ink-light leading-relaxed text-base mb-8 pr-4">
                  {product.description}
                </p>

                {/* Gold divider */}
                <div className="w-8 h-px bg-gold mb-8" />

                {/* Add to cart panel (client) — wrapped in MagneticButton for the CTA */}
                <AddToCartPanel
                  productId={product.id}
                  productName={product.name}
                  productSlug={product.slug}
                  productPrice={product.price}
                  productImage={product.images[0] ?? ""}
                  fabricationHours={product.fabricationHours}
                  zelliges={product.availableConfigurations.zelliges}
                  sizes={product.availableConfigurations.sizes}
                  bases={product.availableConfigurations.bases}
                  estimatedDelivery={estimatedDelivery}
                  inStock={product.inStock}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Section: Votre Maalem ─────────────────────────────────────────── */}
      {maalem && (
        <section className="border-t border-border/60 bg-cream-dark">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-20">
            <ScrollReveal direction="up" delay={0}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-body mb-14">
                L'Artisan
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-center">

              {/* Maalem portrait with parallax effect */}
              <ScrollReveal direction="left" delay={0.1} duration={0.9}>
                <ParallaxImage
                  src={maalem.portrait}
                  alt={maalem.name}
                  speed={0.2}
                  placeholder={true}
                  className="aspect-[3/4]"
                >
                  {/* Monogram overlay when no real image */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none">
                    <div className="w-20 h-20 rounded-full bg-warm-gray-light/80 border border-border flex items-center justify-center backdrop-blur-sm">
                      <span className="font-display text-3xl text-ink-muted">
                        {maalem.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <p className="font-display italic text-ink-muted text-sm">
                      {maalem.name}
                    </p>
                  </div>
                  {/* Corner ornaments */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/40 z-20" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/40 z-20" />
                </ParallaxImage>
              </ScrollReveal>

              {/* Maalem info */}
              <ScrollReveal direction="right" delay={0.25} duration={0.8}>
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl text-ink mb-1">
                      {maalem.name}
                    </h2>
                    <p className="text-[10px] text-gold font-body uppercase tracking-[0.18em]">
                      Maalem — {maalem.specialty}
                    </p>
                  </div>

                  {/* Quote */}
                  <blockquote className="relative pl-6 border-l-2 border-gold/40">
                    <p className="font-display text-xl md:text-2xl text-ink italic leading-relaxed">
                      &ldquo;{maalem.quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Bio excerpt */}
                  <p className="font-body text-ink-light leading-relaxed text-sm">
                    {maalem.bio.substring(0, 280).trim()}
                    {maalem.bio.length > 280 ? "…" : ""}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 pt-2">
                    <div>
                      <p className="font-display text-3xl text-ink">{maalem.yearsExperience}</p>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-ink-muted font-body mt-1">
                        Ans de métier
                      </p>
                    </div>
                    <div>
                      <p className="font-display text-3xl text-ink">{maalem.piecesCreated.toLocaleString("fr-FR")}</p>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-ink-muted font-body mt-1">
                        Pièces créées
                      </p>
                    </div>
                    <div>
                      <p className="font-display text-3xl text-ink">Fès</p>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-ink-muted font-body mt-1">
                        Atelier
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/maalems/${maalem.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-body text-ink link-underline group mt-2"
                  >
                    Voir le profil complet
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                    </svg>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* ── Section: Le Geste ─────────────────────────────────────────────── */}
      <section className="border-t border-border/60">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">

            {/* Text */}
            <ScrollReveal direction="up" delay={0} duration={0.8}>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-body mb-4">
                    Le Processus
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-6">
                    Le Geste
                  </h2>
                </div>

                <p className="font-body text-ink-light leading-relaxed">
                  {product.longDescription}
                </p>

                <div className="flex items-center gap-4 pt-4">
                  <div className="flex-1 h-px bg-border/60" />
                  <div className="text-center px-4">
                    <p className="font-display text-4xl text-ink">{product.fabricationHours}</p>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-gold font-body mt-1">
                      Heures de travail
                    </p>
                  </div>
                  <div className="flex-1 h-px bg-border/60" />
                </div>

                <p className="font-body text-sm text-ink-muted italic leading-relaxed">
                  Chaque pièce Maison Attar est fabriquée à la main dans les ateliers
                  de la médina de Fès, selon des techniques transmises de génération
                  en génération depuis le XIVe siècle. Aucune machine. Aucun
                  raccourci. Uniquement les mains du maalem, son marteau, et des
                  décennies de savoir-faire.
                </p>
              </div>
            </ScrollReveal>

            {/* Video placeholder — ImageReveal treatment */}
            <ScrollReveal direction="up" delay={0.2} duration={0.9}>
              <div className="relative aspect-video bg-warm-gray overflow-hidden group cursor-pointer">
                {/* Subtle background texture */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-5">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          45deg,
                          currentColor 0,
                          currentColor 1px,
                          transparent 0,
                          transparent 50%
                        )`,
                        backgroundSize: "20px 20px",
                      }}
                    />
                  </div>

                  {/* Play button with MagneticButton effect */}
                  <MagneticButton strength={0.2} className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-cream/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-gold/90 transition-all duration-500 shadow-lg">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="text-ink ml-1 transition-colors duration-300 group-hover:text-cream"
                      >
                        <path d="M6 4l12 6-12 6V4z" />
                      </svg>
                    </div>
                  </MagneticButton>
                </div>

                {/* Caption gradient */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent p-5">
                  <p className="text-cream font-body text-sm">
                    Le travail du zellige — Atelier Hassan Bensouda, Fès
                  </p>
                  <p className="text-cream/60 font-body text-xs mt-0.5">
                    {product.fabricationHours} heures de fabrication
                  </p>
                </div>

                {/* Corner ornaments on hover */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </div>

              <p className="text-[11px] text-ink-muted font-body mt-3 text-center tracking-wide">
                Vidéo de fabrication disponible à la commande
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Section: Détails Techniques ───────────────────────────────────── */}
      <section className="border-t border-border/60 bg-cream-dark">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <ScrollReveal direction="up" delay={0}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-body mb-4">
              Spécifications
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-ink mb-12">
              Détails Techniques
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15} duration={0.8}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-0">
              {/* Left column */}
              <div>
                <TechRow label="Dimensions" value={`${product.dimensions.width} × ${product.dimensions.depth} × ${product.dimensions.height} cm`} />
                <TechRow label="Poids" value={`${product.dimensions.weight} kg`} />
                <TechRow label="Zellige" value={product.materials.zellige} />
                <TechRow label="Structure" value={product.materials.base} />
              </div>

              {/* Right column */}
              <div>
                <TechRow label="Fabrication" value={`${product.fabricationHours} heures · Fès, Maroc`} />
                <TechRow label="Finition joints" value="Ciment traditionnel, application à la main" />
                <TechRow
                  label="Entretien"
                  value="Nettoyage avec chiffon légèrement humide. Éviter les produits acides. Appliquer une cire naturelle 1 fois par an."
                />
                <TechRow label="Garantie" value="5 ans pièces & main d'œuvre" />
              </div>
            </div>

            {/* Care instructions note */}
            <div className="mt-12 p-6 border border-border/60 bg-cream">
              <div className="flex gap-4 items-start">
                <div className="shrink-0 mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8.5" stroke="#C4A265" strokeWidth="1"/>
                    <path d="M10 9v5" stroke="#C4A265" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="10" cy="6.5" r="0.75" fill="#C4A265"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-body font-medium text-ink mb-1">Note sur le zellige artisanal</p>
                  <p className="text-sm font-body text-ink-muted leading-relaxed">
                    Les légères variations de couleur, les micro-irrégularités de surface et les
                    différences d'épaisseur entre carreaux ne sont pas des défauts — elles sont
                    la signature du travail à la main. Chaque pièce est unique et ces variations
                    attestent de son authenticité.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section: Pièces Similaires ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-border/60">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-20">
            <ScrollReveal direction="up" delay={0}>
              <div className="flex items-baseline justify-between mb-14">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-body mb-3">
                    Découvrir aussi
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl text-ink">
                    Pièces Similaires
                  </h2>
                </div>
                <Link
                  href="/collection"
                  className="text-sm font-body text-ink-muted link-underline hidden sm:block"
                >
                  Voir toute la collection
                </Link>
              </div>
            </ScrollReveal>

            {/* StaggerChildren wraps related cards for staggered entrance */}
            <StaggerChildren
              staggerDelay={0.1}
              className="flex gap-8 overflow-x-auto no-scrollbar pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0"
            >
              {related.map((p, i) => (
                <div key={p.id} className="min-w-[280px] lg:min-w-0">
                  <ProductCard product={p} index={i} />
                </div>
              ))}
            </StaggerChildren>
          </div>
        </section>
      )}

    </main>
  );
}

// ─── TechRow sub-component ───────────────────────────────────────────────────

function TechRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-6 py-4 border-b border-border/50 last:border-b-0">
      <dt className="text-[10px] uppercase tracking-[0.12em] text-ink-muted font-body shrink-0 w-28 pt-0.5">
        {label}
      </dt>
      <dd className="text-sm font-body text-ink leading-relaxed">{value}</dd>
    </div>
  );
}
