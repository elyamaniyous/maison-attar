import type { Metadata } from "next";
import Link from "next/link";
import {
  blogArticles,
  getFeaturedArticles,
  categoryLabels,
  type BlogArticle,
} from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Le Journal — Histoires d'Atelier",
  description:
    "Histoires d'atelier, de zellige et de Fès. Articles sur l'art du zellige marocain, les maalems de Fès, la décoration contemporaine et l'entretien de vos pièces artisanales.",
  openGraph: {
    title: "Le Journal — Histoires d'Atelier",
    description:
      "Histoires d'atelier, de zellige et de Fès. Le journal de Maison Attar.",
  },
};

const CATEGORIES: { value: BlogArticle["category"] | "all"; label: string }[] =
  [
    { value: "all", label: "Tout" },
    { value: "artisanat", label: "Artisanat" },
    { value: "zellige", label: "Zellige" },
    { value: "decoration", label: "Décoration" },
    { value: "guide", label: "Guide" },
    { value: "fes", label: "Fès" },
    { value: "entretien", label: "Entretien" },
  ];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ArticleCard({ article }: { article: BlogArticle }) {
  return (
    <Link href={`/journal/${article.slug}`} className="group block">
      {/* Image placeholder */}
      <div className="img-zoom aspect-[16/9] bg-warm-gray mb-5 overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "linear-gradient(135deg, #C4A265 0%, #8A7A5A 50%, #3d2b1a 100%)",
          }}
        />
        {/* Geometric zellige-inspired decorative overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 400 225"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={`p-${article.id}`}
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="20,2 38,11 38,29 20,38 2,29 2,11"
                fill="none"
                stroke="white"
                strokeWidth="0.8"
              />
              <polygon
                points="20,8 32,14 32,26 20,32 8,26 8,14"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="400" height="225" fill={`url(#p-${article.id})`} />
        </svg>
        <div className="absolute bottom-4 left-4">
          <span className="inline-block bg-cream/90 text-ink text-[9px] tracking-[0.18em] uppercase font-body font-medium px-3 py-1.5">
            {categoryLabels[article.category]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div>
        <h2 className="font-display text-[22px] leading-[1.25] text-ink group-hover:text-gold transition-colors duration-300 mb-3">
          {article.title}
        </h2>
        <p className="text-ink-muted text-[14px] leading-[1.7] line-clamp-2 mb-4 font-body">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-4 text-[11px] text-ink-muted tracking-[0.08em] font-body">
          <span>{formatDate(article.publishedAt)}</span>
          <span className="w-1 h-1 rounded-full bg-ink-muted/40" />
          <span>{article.readingTime} min de lecture</span>
        </div>
      </div>
    </Link>
  );
}

export default function JournalPage() {
  const featured = getFeaturedArticles()[0] ?? blogArticles[0];
  const rest = blogArticles.filter((a) => a.id !== featured.id);

  return (
    <div className="bg-cream text-ink min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="pt-24 pb-16 px-6 md:px-12 lg:px-20 border-b border-border">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-3xl">
            <p className="animate-fade-up text-[10px] uppercase tracking-[0.25em] text-gold font-body mb-6">
              Le Journal
            </p>
            <h1 className="animate-fade-up delay-100 font-display text-[52px] md:text-[72px] lg:text-[88px] leading-[0.95] font-light text-ink mb-6">
              Histoires<br />
              <em className="italic">d&apos;atelier</em>
            </h1>
            <p className="animate-fade-up delay-200 text-[16px] text-ink-light leading-[1.7] font-body max-w-xl">
              De zellige et de Fès — récits d&apos;artisans, guides de savoir-faire,
              inspirations décoration. Un regard sur l&apos;art qui prend forme entre
              nos mains.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Article ───────────────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 lg:px-20 border-b border-border">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.2em] text-ink-muted font-body mb-8">
            À la une
          </p>
          <Link
            href={`/journal/${featured.slug}`}
            className="group grid md:grid-cols-2 gap-10 items-center"
          >
            {/* Featured image placeholder */}
            <div className="img-zoom aspect-[4/3] bg-cream-dark overflow-hidden relative">
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background:
                    "linear-gradient(135deg, #C4A265 0%, #6b5332 40%, #1A1A1A 100%)",
                }}
              />
              {/* Large geometric pattern */}
              <svg
                className="absolute inset-0 w-full h-full opacity-15"
                viewBox="0 0 600 450"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="p-featured"
                    x="0"
                    y="0"
                    width="60"
                    height="60"
                    patternUnits="userSpaceOnUse"
                  >
                    <polygon
                      points="30,3 57,16.5 57,43.5 30,57 3,43.5 3,16.5"
                      fill="none"
                      stroke="white"
                      strokeWidth="1"
                    />
                    <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="0.6" />
                  </pattern>
                </defs>
                <rect width="600" height="450" fill="url(#p-featured)" />
              </svg>
              <div className="absolute bottom-6 left-6">
                <span className="inline-block bg-gold text-cream text-[9px] tracking-[0.18em] uppercase font-body font-medium px-3 py-1.5">
                  {categoryLabels[featured.category]}
                </span>
              </div>
            </div>

            {/* Featured content */}
            <div className="py-4">
              <h2 className="font-display text-[30px] md:text-[38px] leading-[1.15] text-ink group-hover:text-gold transition-colors duration-300 mb-5">
                {featured.title}
              </h2>
              <p className="text-ink-light text-[15px] leading-[1.8] font-body mb-6 max-w-lg">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 text-[11px] text-ink-muted tracking-[0.08em] font-body mb-8">
                <span>{formatDate(featured.publishedAt)}</span>
                <span className="w-1 h-1 rounded-full bg-ink-muted/40" />
                <span>{featured.readingTime} min de lecture</span>
              </div>
              <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] font-body font-medium text-ink group-hover:text-gold transition-colors duration-300">
                Lire l&apos;article
                <span className="w-8 h-px bg-current transition-all duration-300 group-hover:w-12" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Category Pills ─────────────────────────────────────────────────── */}
      <section className="py-10 px-6 md:px-12 lg:px-20 border-b border-border">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3 flex-wrap">
            {CATEGORIES.map((cat) => (
              <span
                key={cat.value}
                className={[
                  "inline-block px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-body font-medium border transition-colors duration-200 cursor-default",
                  cat.value === "all"
                    ? "bg-ink text-cream border-ink"
                    : "bg-transparent text-ink-muted border-border hover:border-ink hover:text-ink",
                ].join(" ")}
              >
                {cat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Article Grid ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
            {rest.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter / CTA ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-border bg-cream-dark">
        <div className="max-w-screen-xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold font-body mb-4">
            Maison Attar
          </p>
          <h2 className="font-display text-[36px] md:text-[48px] font-light text-ink mb-4">
            Découvrir nos créations
          </h2>
          <p className="text-ink-muted text-[15px] leading-[1.7] font-body mb-10 max-w-md mx-auto">
            Des tables en zellige et acier forgé, nées de la rencontre entre
            l&apos;héritage artisanal de Fès et une sensibilité contemporaine.
          </p>
          <Link
            href="/collection"
            className="inline-flex items-center gap-4 bg-ink text-cream text-[11px] tracking-[0.2em] uppercase font-body font-medium px-8 py-4 hover:bg-gold transition-colors duration-300"
          >
            Explorer la collection
          </Link>
        </div>
      </section>
    </div>
  );
}
