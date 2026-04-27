import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts } from "@/db/helpers";
import type { Product, ProductCategory } from "@/lib/types";

export const revalidate = 60;
import ProductCard from "@/components/product/ProductCard";
import CollectionFilters from "@/components/product/CollectionFilters";
import { CollectionPageSchema, BreadcrumbSchema } from "@/components/StructuredData";
import CollectionHero from "@/components/collection/CollectionHero";
import StaggerChildren from "@/components/animations/StaggerChildren";
import ScrollReveal from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "Collection — Tables en Zellige & Acier Artisanal",
  description:
    "Découvrez la collection complète Maison Attar : tables basses, tables à manger, tables d'appoint et consoles en zellige marocain et acier forgé. Pièces uniques, créées à la main à Fès.",
  alternates: {
    canonical: "https://beautiful-charm-production-7244.up.railway.app/collection",
  },
  keywords: [
    "collection zellige marocain",
    "table basse zellige",
    "table à manger zellige",
    "console zellige",
    "mobilier artisanal Fès",
    "pièces uniques zellige",
    "acier forgé table",
    "décoration luxe marocaine",
  ],
  openGraph: {
    title: "Collection Maison Attar | Tables en Zellige & Acier Artisanal",
    description:
      "Tables basses, à manger, d'appoint et consoles en zellige marocain et acier forgé. Chaque pièce est unique, créée à Fès.",
    url: "https://beautiful-charm-production-7244.up.railway.app/collection",
    type: "website",
  },
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function filterAndSort(
  items: Product[],
  categorie: string | undefined,
  tri: string | undefined
): Product[] {
  let result = [...items];

  if (categorie && categorie !== "all") {
    result = result.filter((p) => p.category === (categorie as ProductCategory));
  }

  if (tri === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (tri === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  } else {
    // Default: featured first
    result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return result;
}

// ─── Page ─────────────────────────────────────────────────────────────────

interface CollectionPageProps {
  searchParams: Promise<{ categorie?: string; tri?: string }>;
}

export default async function CollectionPage({ searchParams }: CollectionPageProps) {
  const params = await searchParams;
  const { categorie, tri } = params;

  const products = await getProducts();
  const filtered = filterAndSort(products, categorie, tri);

  return (
    <main className="min-h-screen bg-cream">
      <CollectionPageSchema />
      <BreadcrumbSchema
        items={[
          { name: "Maison Attar", href: "/" },
          { name: "Collection", href: "/collection" },
        ]}
      />

      {/* ── Hero Banner ───────────────────────────────────────────────────── */}
      <CollectionHero />

      {/* ── Filters + Grid ───────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-10">
        <div className="max-w-screen-xl mx-auto">
          {/* Filters (client component wrapped in Suspense for useSearchParams) */}
          <Suspense
            fallback={
              <div className="h-14 border-b border-border/60 animate-pulse bg-warm-gray/20" />
            }
          >
            <CollectionFilters />
          </Suspense>

          {/* Results count */}
          <ScrollReveal direction="none" delay={0.1} className="mt-6 mb-10">
            <p className="text-[11px] uppercase tracking-[0.12em] text-ink-muted font-body">
              <span className="font-display text-base text-ink not-italic normal-case tracking-normal mr-2">
                {filtered.length}
              </span>
              {filtered.length === 1 ? "pièce" : "pièces"}
              {categorie && categorie !== "all" ? " dans cette catégorie" : " dans la collection"}
            </p>
          </ScrollReveal>

          {/* Product grid */}
          {filtered.length > 0 ? (
            <StaggerChildren
              staggerDelay={0.08}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
            >
              {filtered.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </StaggerChildren>
          ) : (
            <div className="py-24 text-center">
              <p className="font-display text-2xl text-ink-muted italic mb-3">
                Aucune pièce dans cette catégorie
              </p>
              <p className="text-sm text-ink-muted font-body">
                Essayez une autre sélection
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Editorial quote ───────────────────────────────────────────────── */}
      <section className="border-t border-border/60 px-6 md:px-12 lg:px-20 py-28 mt-10">
        <div className="max-w-screen-xl mx-auto text-center">
          <ScrollReveal direction="up" delay={0}>
            <p className="font-display italic leading-[1.3] text-ink max-w-3xl mx-auto"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
            >
              &ldquo;Chaque table naît d'un dialogue entre le feu, la terre
              et les mains d'un maalem.&rdquo;
            </p>
          </ScrollReveal>
          <ScrollReveal direction="none" delay={0.3}>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-gold/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
              <div className="w-12 h-px bg-gold/40" />
            </div>
            <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-gold font-body">
              Maison Attar — Fès, Maroc
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
