import type { Metadata } from "next";
import { Suspense } from "react";
import { products } from "@/lib/data";
import type { Product, ProductCategory } from "@/lib/types";
import ProductCard from "@/components/product/ProductCard";
import CollectionFilters from "@/components/product/CollectionFilters";
import { CollectionPageSchema, BreadcrumbSchema } from "@/components/StructuredData";

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
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20 border-b border-border">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-2xl">
            <p className="animate-fade-up text-xs uppercase tracking-widest text-gold font-body mb-4">
              Maison Attar — Collection
            </p>
            <h1 className="animate-fade-up delay-100 font-display text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05] mb-6">
              La Collection
            </h1>
            <p className="animate-fade-up delay-200 font-body text-ink-muted text-lg leading-relaxed">
              Pièces uniques, fabriquées à la main à Fès
            </p>
          </div>
        </div>
      </section>

      {/* ── Filters + Grid ───────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-10">
        <div className="max-w-screen-xl mx-auto">
          {/* Filters (client component wrapped in Suspense for useSearchParams) */}
          <Suspense
            fallback={
              <div className="h-14 border-b border-border animate-pulse bg-warm-gray/30" />
            }
          >
            <CollectionFilters />
          </Suspense>

          {/* Results count */}
          <div className="mt-6 mb-8">
            <p className="text-sm text-ink-muted font-body">
              {filtered.length} {filtered.length === 1 ? "pièce" : "pièces"}
              {categorie && categorie !== "all" ? " dans cette catégorie" : " dans la collection"}
            </p>
          </div>

          {/* Product grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {filtered.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  animationDelay={index * 80}
                />
              ))}
            </div>
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

      {/* ── Editorial footer band ─────────────────────────────────────────── */}
      <section className="border-t border-border px-6 md:px-12 lg:px-20 py-20 mt-10">
        <div className="max-w-screen-xl mx-auto text-center">
          <p className="animate-fade-in font-display text-3xl md:text-4xl text-ink leading-relaxed italic max-w-2xl mx-auto">
            &ldquo;Chaque table naît d'un dialogue entre le feu, la terre
            et les mains d'un maalem.&rdquo;
          </p>
          <div className="mt-6 w-8 h-px bg-gold mx-auto" />
        </div>
      </section>
    </main>
  );
}
