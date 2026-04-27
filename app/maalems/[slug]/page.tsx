import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMaalems, getMaalemBySlug, getProducts } from "@/db/helpers";
import type { Maalem, Product } from "@/lib/types";

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const maalems = await getMaalems();
  return maalems.map((m) => ({ slug: m.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const maalem = await getMaalemBySlug(slug);
  if (!maalem) return {};
  const BASE_URL = "https://beautiful-charm-production-7244.up.railway.app";
  const desc = `${maalem.name} — ${maalem.specialty}. ${maalem.yearsExperience} ans de métier, ${maalem.piecesCreated} pièces créées à Fès. Maalem Maison Attar.`;
  return {
    title: `${maalem.name} — Maître Artisan Zelligeur de Fès`,
    description: desc.length > 160 ? desc.substring(0, 157) + "..." : desc,
    alternates: {
      canonical: `${BASE_URL}/maalems/${maalem.slug}`,
    },
    keywords: [
      maalem.name,
      "maalem zellige Fès",
      "artisan zelligeur marocain",
      maalem.specialty,
      "Maison Attar artisan",
    ],
    openGraph: {
      title: `${maalem.name} — Maître artisan zellige | Maison Attar`,
      description: maalem.quote,
      url: `${BASE_URL}/maalems/${maalem.slug}`,
    },
  };
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-border p-6 md:p-8 bg-cream">
      <p className="font-display text-[2.6rem] leading-none text-ink mb-2">{value}</p>
      <p className="font-body text-ink-muted text-[10px] tracking-[0.25em] uppercase">{label}</p>
    </div>
  );
}

// ─── Product card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produits/${product.slug}`} className="group block">
      <div className="img-zoom aspect-[4/5] bg-warm-gray relative overflow-hidden mb-4">
        {/* Product image placeholder */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: product.maalem.id === "maalem-01"
              ? "linear-gradient(160deg, #1A1A1A 0%, #3a2820 100%)"
              : product.maalem.id === "maalem-02"
              ? "linear-gradient(160deg, #1a3040 0%, #2a5060 100%)"
              : product.maalem.id === "maalem-03"
              ? "linear-gradient(160deg, #2a3a2a 0%, #4a6a4a 100%)"
              : "linear-gradient(160deg, #1A1A1A 0%, #2a2020 100%)",
            opacity: 0.6,
          }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`prod-${product.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" fill="none" stroke="#C4A265" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#prod-${product.id})`} />
        </svg>

        {/* Category tag */}
        <div className="absolute top-4 left-4">
          <span className="font-body text-[9px] tracking-[0.25em] uppercase text-cream/60 bg-ink/30 backdrop-blur-sm px-2.5 py-1">
            {product.category.replace(/-/g, " ")}
          </span>
        </div>

        {/* View arrow */}
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-cream/0 group-hover:bg-cream/10 transition-colors duration-300 flex items-center justify-center">
          <svg className="w-4 h-4 text-cream opacity-0 group-hover:opacity-60 transition-opacity duration-300 translate-x-0 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div>
        <h3 className="font-display text-[1.3rem] text-ink group-hover:text-gold transition-colors duration-300 mb-1 leading-tight">
          {product.name}
        </h3>
        <p className="font-body text-ink-muted text-[11px] tracking-[0.15em] uppercase mb-2">
          {product.fabricationHours}h de fabrication
        </p>
        <p className="font-display text-[1.4rem] text-ink">
          {product.price.toLocaleString("fr-FR")} €
        </p>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function MaalemProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [maalem, allMaalems, allProducts]: [Maalem | undefined, Maalem[], Product[]] =
    await Promise.all([getMaalemBySlug(slug), getMaalems(), getProducts()]);

  if (!maalem) {
    notFound();
  }

  // Products by this maalem
  const maalemProducts = allProducts.filter((p) => p.maalem.id === maalem.id);

  // Index for alternating styles
  const maalemIndex = allMaalems.findIndex((m) => m.id === maalem.id);

  // Bio paragraphs
  const bioParagraphs = maalem.bio.split(". ").reduce<string[]>((acc, sentence, i) => {
    const groupIndex = Math.floor(i / 2);
    if (!acc[groupIndex]) acc[groupIndex] = "";
    acc[groupIndex] += (acc[groupIndex] ? ". " : "") + sentence;
    return acc;
  }, []);

  return (
    <div className="bg-cream text-ink">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[85vh] flex items-end overflow-hidden">
        {/* Portrait background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: maalemIndex === 0
                ? "linear-gradient(135deg, #2a1f14 0%, #4a3520 60%, #3a2818 100%)"
                : maalemIndex === 1
                ? "linear-gradient(135deg, #0d1f2d 0%, #1a3a52 60%, #122840 100%)"
                : maalemIndex === 2
                ? "linear-gradient(135deg, #0d1f0d 0%, #1a3a28 60%, #12281a 100%)"
                : "linear-gradient(135deg, #1a1510 0%, #2a2218 60%, #201a14 100%)",
            }}
          />
          {/* Geometric pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-maalem" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="#C4A265" strokeWidth="0.8" />
                <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="#C4A265" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="8" fill="none" stroke="#C4A265" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-maalem)" />
          </svg>

          {/* Portrait placeholder */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 select-none pointer-events-none">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-4">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="14" r="7" stroke="#C4A265" strokeWidth="1.2" />
                  <path d="M5 36c0-8.3 6.7-15 15-15s15 6.7 15 15" stroke="#C4A265" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-body text-cream/50 text-[10px] tracking-[0.3em] uppercase">
                Portrait — {maalem.name}
              </span>
            </div>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 animate-fade-up">
            <Link href="/maalems" className="font-body text-cream/40 text-[11px] tracking-[0.3em] uppercase hover:text-cream/70 transition-colors duration-200">
              Les Maalems
            </Link>
            <span className="text-cream/25 text-[11px]">/</span>
            <span className="font-body text-cream/60 text-[11px] tracking-[0.3em] uppercase">
              {maalem.name}
            </span>
          </div>

          <p className="font-body text-gold text-[11px] tracking-[0.4em] uppercase mb-4 animate-fade-up">
            Maalem — Fès
          </p>
          <h1 className="font-display italic text-cream text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-tight mb-4 animate-fade-up delay-100">
            {maalem.name}
          </h1>
          <p className="font-display text-cream/60 text-[clamp(1rem,2vw,1.4rem)] animate-fade-up delay-200">
            {maalem.specialty}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute right-8 md:right-12 bottom-8 flex flex-col items-center gap-3 opacity-30">
          <div className="w-px h-16 bg-cream/60" />
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────────────── */}
      <section className="bg-ink border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/20">
            <StatCard value={`${maalem.yearsExperience}`} label="Années de métier" />
            <StatCard value={maalem.piecesCreated.toLocaleString("fr-FR")} label="Pièces créées" />
            <StatCard value={String(maalemProducts.length)} label="Modèles Maison Attar" />
            <StatCard
              value={`${Math.round(maalemProducts.reduce((a, p) => a + p.fabricationHours, 0) / Math.max(maalemProducts.length, 1))}h`}
              label="Heures par pièce (moy.)"
            />
          </div>
        </div>
      </section>

      {/* ── Quote ─────────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-cream-dark">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <div className="animate-fade-up">
            <svg
              className="mx-auto mb-8 text-gold opacity-60"
              width="32"
              height="24"
              viewBox="0 0 32 24"
              fill="currentColor"
            >
              <path d="M0 24V14.4C0 9.6 1.6 5.867 4.8 3.2 8 1.067 12.267 0 17.6 0v4C14.933 4 12.8 4.8 11.2 6.4 9.6 8 8.8 10.133 8.8 12.8H14.4V24H0zm17.6 0V14.4C17.6 9.6 19.2 5.867 22.4 3.2 25.6 1.067 29.867 0 35.2 0v4c-2.667 0-4.8.8-6.4 2.4-1.6 1.6-2.4 3.733-2.4 6.4H32V24H17.6z" />
            </svg>
            <blockquote className="font-display italic text-ink text-[clamp(1.4rem,4vw,2.8rem)] leading-[1.2] max-w-4xl mx-auto mb-8">
              {maalem.quote}
            </blockquote>
            <cite className="font-body text-ink-muted text-[11px] tracking-[0.35em] uppercase not-italic">
              {maalem.name} — Maalem, Fès
            </cite>
          </div>
        </div>
      </section>

      {/* ── Full bio ─────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">

            {/* Left: portrait placeholder */}
            <div className="animate-fade-up">
              <div className="img-zoom aspect-[3/4] bg-warm-gray relative overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: maalemIndex === 0
                      ? "linear-gradient(160deg, #2a1f14 0%, #5a3e28 100%)"
                      : maalemIndex === 1
                      ? "linear-gradient(160deg, #0d1f2d 0%, #1a3a52 100%)"
                      : maalemIndex === 2
                      ? "linear-gradient(160deg, #0d1f0d 0%, #1a3a28 100%)"
                      : "linear-gradient(160deg, #1a1510 0%, #2a2218 100%)",
                    opacity: 0.65,
                  }}
                />
                <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="bio-portrait" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                      <polygon points="25,3 47,14 47,36 25,47 3,36 3,14" fill="none" stroke="#C4A265" strokeWidth="0.6" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#bio-portrait)" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center opacity-15 select-none pointer-events-none">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-3">
                      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                        <circle cx="20" cy="14" r="7" stroke="#C4A265" strokeWidth="1.2" />
                        <path d="M5 36c0-8.3 6.7-15 15-15s15 6.7 15 15" stroke="#C4A265" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="font-body text-cream/40 text-[9px] tracking-[0.3em] uppercase">Portrait</span>
                  </div>
                </div>
              </div>

              {/* Specialty tag below portrait */}
              <div className="mt-6 flex items-start gap-4">
                <div className="w-8 h-px bg-gold mt-3 shrink-0" />
                <div>
                  <p className="font-body text-gold text-[11px] tracking-[0.3em] uppercase mb-1">Spécialité</p>
                  <p className="font-display italic text-ink text-xl">{maalem.specialty}</p>
                </div>
              </div>
            </div>

            {/* Right: bio text */}
            <div className="animate-fade-up delay-100">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-8 h-px bg-gold" />
                <span className="font-body text-gold text-[11px] tracking-[0.4em] uppercase">Biographie</span>
              </div>

              <div className="space-y-6 font-body text-ink-light text-[1.0625rem] leading-[1.9]">
                {/* Display full bio split into readable paragraphs */}
                {maalem.bio.split(". ").reduce<string[][]>((acc, s, i) => {
                  const gi = Math.floor(i / 2);
                  if (!acc[gi]) acc[gi] = [];
                  acc[gi].push(s);
                  return acc;
                }, []).map((sentences, i) => (
                  <p key={i}>{sentences.join(". ").replace(/\.$/, "")}.</p>
                ))}
              </div>

              {/* Experience timeline */}
              <div className="mt-12 pt-12 border-t border-border">
                <p className="font-body text-ink-muted text-[11px] tracking-[0.3em] uppercase mb-6">
                  Parcours
                </p>
                <div className="space-y-4">
                  {[
                    {
                      year: new Date().getFullYear() - maalem.yearsExperience,
                      event: "Début de l'apprentissage",
                    },
                    {
                      year: new Date().getFullYear() - Math.round(maalem.yearsExperience * 0.6),
                      event: "Titre de Maalem obtenu",
                    },
                    {
                      year: new Date().getFullYear() - 3,
                      event: "Partenariat Maison Attar",
                    },
                  ].map((item) => (
                    <div key={item.event} className="flex items-start gap-4">
                      <span className="font-display text-gold text-sm shrink-0 w-12">{item.year}</span>
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                        <span className="font-body text-ink-light text-sm">{item.event}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Products by this maalem ───────────────────────────────────────────── */}
      {maalemProducts.length > 0 && (
        <section className="py-24 md:py-32 bg-cream-dark border-t border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12">

            {/* Section header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
              <div>
                <div className="flex items-center gap-4 mb-6 animate-fade-up">
                  <div className="w-8 h-px bg-gold" />
                  <span className="font-body text-gold text-[11px] tracking-[0.4em] uppercase">
                    Créations
                  </span>
                </div>
                <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight text-ink animate-fade-up delay-100">
                  Les pièces de {maalem.name.split(" ")[0]}
                </h2>
              </div>
              <Link
                href={`/collection?maalem=${maalem.slug}`}
                className="animate-fade-up delay-200 link-underline font-body text-ink text-[12px] tracking-[0.2em] uppercase shrink-0"
              >
                Voir toutes ses créations
              </Link>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {maalemProducts.map((product, i) => (
                <div key={product.id} className={`animate-fade-up ${i === 0 ? "" : i === 1 ? "delay-100" : "delay-200"}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Fabrication note */}
            {maalemProducts.length > 0 && (
              <div className="mt-16 p-8 md:p-10 border border-border bg-cream flex flex-col md:flex-row items-start gap-6">
                <div className="shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold mt-1">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" />
                    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-body text-ink-muted text-[11px] tracking-[0.25em] uppercase mb-2">
                    Fabrication sur commande
                  </p>
                  <p className="font-body text-ink-light text-sm leading-relaxed">
                    Chaque pièce est fabriquée après confirmation de votre commande. {maalem.name.split(" ")[0]} commence la taille du zellige dans les jours qui suivent. Délai estimé : 4 à 6 semaines selon la complexité du motif.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Other maalems ────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-12 animate-fade-up">
            <div className="w-8 h-px bg-gold" />
            <span className="font-body text-gold text-[11px] tracking-[0.4em] uppercase">
              Les autres maalems
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allMaalems
              .filter((m) => m.id !== maalem.id)
              .map((other, i) => (
                <Link
                  key={other.id}
                  href={`/maalems/${other.slug}`}
                  className={`group block p-6 md:p-8 border border-border hover:border-gold/40 transition-all duration-300 bg-cream hover:bg-cream-dark animate-fade-up ${i === 0 ? "" : i === 1 ? "delay-100" : "delay-200"}`}
                >
                  <div className="flex items-start gap-4 mb-5">
                    {/* Mini portrait */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-warm-gray shrink-0 relative">
                      <div
                        className="absolute inset-0"
                        style={{
                          background: allMaalems.indexOf(other) === 0
                            ? "linear-gradient(135deg, #3a2818 0%, #5a3e28 100%)"
                            : allMaalems.indexOf(other) === 1
                            ? "linear-gradient(135deg, #122840 0%, #1a3a52 100%)"
                            : allMaalems.indexOf(other) === 2
                            ? "linear-gradient(135deg, #12281a 0%, #1a3a28 100%)"
                            : "linear-gradient(135deg, #201a14 0%, #2a2218 100%)",
                          opacity: 0.8,
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-40">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="8" r="4" stroke="#C4A265" strokeWidth="1.2" />
                          <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#C4A265" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-[1.2rem] text-ink group-hover:text-gold transition-colors duration-300 leading-tight mb-1">
                        {other.name}
                      </h3>
                      <p className="font-body text-ink-muted text-[10px] tracking-[0.2em] uppercase">
                        {other.yearsExperience} ans de métier
                      </p>
                    </div>
                  </div>
                  <p className="font-body text-ink-light text-sm leading-relaxed line-clamp-2 mb-4">
                    {other.specialty}
                  </p>
                  <div className="flex items-center gap-2 text-gold">
                    <span className="font-body text-[11px] tracking-[0.2em] uppercase">Voir le portrait</span>
                    <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-ink relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <polygon points="40,4 76,22 76,58 40,76 4,58 4,22" fill="none" stroke="#C4A265" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-pattern)" />
        </svg>
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center animate-fade-up">
          <h2 className="font-display italic text-cream text-[clamp(1.8rem,4vw,3rem)] leading-tight mb-6">
            Commander une pièce de {maalem.name.split(" ")[0]}
          </h2>
          <p className="font-body text-cream/55 text-[1.0625rem] leading-relaxed mb-10">
            Chaque commande est un acte de confiance placé directement dans les mains du maalem. Votre pièce sera unique — car aucune n'est identique à une autre.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/collection?maalem=${maalem.slug}`}
              className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-ink font-body text-[12px] tracking-[0.2em] uppercase px-9 py-4 transition-all duration-300 group"
            >
              Voir ses créations
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/notre-histoire"
              className="link-underline font-body text-cream/50 hover:text-cream/80 text-[12px] tracking-[0.2em] uppercase transition-colors duration-200"
            >
              Notre histoire
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
