import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  blogArticles,
  getBlogBySlug,
  getBlogsByCategory,
  categoryLabels,
  type BlogArticle,
} from "@/lib/blog-data";

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogBySlug(slug);

  if (!article) {
    return { title: "Article introuvable" };
  }

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    keywords: [...article.tags, ...article.geoKeywords],
    authors: [{ name: article.author }],
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      type: "article",
      locale: "fr_FR",
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.seoDescription,
    },
    alternates: {
      canonical: `https://maisonattar.com/journal/${article.slug}`,
    },
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Parse the article content (plain text with ## headings) into structured
 * React elements for beautiful editorial rendering.
 */
function ArticleBody({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      const text = paragraphBuffer.join(" ").trim();
      if (text) {
        elements.push(
          <p
            key={key++}
            className="text-ink-light text-[16px] leading-[1.85] font-body mb-6"
          >
            {text}
          </p>
        );
      }
      paragraphBuffer = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      flushParagraph();
      const heading = line.replace("## ", "");
      elements.push(
        <h2
          key={key++}
          className="font-display text-[28px] md:text-[34px] leading-[1.15] text-ink mt-14 mb-5 font-light"
        >
          {heading}
        </h2>
      );
    } else if (line.trim() === "") {
      flushParagraph();
    } else {
      paragraphBuffer.push(line.trim());
    }
  }
  flushParagraph();

  return <>{elements}</>;
}

function RelatedCard({ article }: { article: BlogArticle }) {
  return (
    <Link href={`/journal/${article.slug}`} className="group block">
      <div className="img-zoom aspect-[16/9] bg-warm-gray mb-4 overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            background:
              "linear-gradient(135deg, #C4A265 0%, #6b5332 50%, #1A1A1A 100%)",
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 400 225"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={`pr-${article.id}`}
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
            </pattern>
          </defs>
          <rect width="400" height="225" fill={`url(#pr-${article.id})`} />
        </svg>
        <div className="absolute bottom-3 left-3">
          <span className="inline-block bg-cream/90 text-ink text-[9px] tracking-[0.15em] uppercase font-body font-medium px-2.5 py-1">
            {categoryLabels[article.category]}
          </span>
        </div>
      </div>
      <h3 className="font-display text-[18px] leading-[1.25] text-ink group-hover:text-gold transition-colors duration-300 mb-2">
        {article.title}
      </h3>
      <p className="text-[11px] text-ink-muted font-body">
        {article.readingTime} min de lecture
      </p>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getBlogBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getBlogsByCategory(article.category)
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  // Fallback: pick from all articles if not enough in same category
  const otherRelated =
    related.length < 2
      ? blogArticles
          .filter(
            (a) =>
              a.id !== article.id && !related.find((r) => r.id === a.id)
          )
          .slice(0, 2 - related.length)
      : [];

  const relatedArticles = [...related, ...otherRelated].slice(0, 2);

  return (
    <div className="bg-cream text-ink min-h-screen">
      {/* ── Article Hero ──────────────────────────────────────────────────── */}
      <section className="pt-24 pb-16 px-6 md:px-12 lg:px-20 border-b border-border">
        <div className="max-w-screen-xl mx-auto">
          {/* Breadcrumb */}
          <nav
            aria-label="Fil d'Ariane"
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-ink-muted font-body mb-12"
          >
            <Link
              href="/journal"
              className="hover:text-ink transition-colors duration-200"
            >
              Journal
            </Link>
            <span className="text-ink-muted/40">/</span>
            <span className="text-gold">
              {categoryLabels[article.category]}
            </span>
          </nav>

          {/* Hero content */}
          <div className="max-w-3xl">
            <span className="inline-block bg-gold/10 text-gold text-[9px] tracking-[0.2em] uppercase font-body font-medium px-3 py-1.5 mb-6">
              {categoryLabels[article.category]}
            </span>
            <h1 className="animate-fade-up font-display text-[38px] md:text-[52px] lg:text-[60px] leading-[1.05] font-light text-ink mb-8">
              {article.title}
            </h1>
            <p className="animate-fade-up delay-100 text-ink-light text-[16px] leading-[1.8] font-body mb-8 max-w-2xl">
              {article.excerpt}
            </p>
            <div className="animate-fade-up delay-200 flex items-center gap-5 text-[11px] text-ink-muted tracking-[0.08em] font-body pb-8 border-b border-border">
              <span className="text-ink font-medium">{article.author}</span>
              <span className="w-1 h-1 rounded-full bg-ink-muted/40" />
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
              <span className="w-1 h-1 rounded-full bg-ink-muted/40" />
              <span>{article.readingTime} min de lecture</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article Hero Image ──────────────────────────────────────────────── */}
      <div className="relative h-[50vh] max-h-[500px] overflow-hidden bg-warm-gray">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #C4A265 0%, #8A7A5A 30%, #4a3728 70%, #1A1A1A 100%)",
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-12"
          viewBox="0 0 1440 500"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="p-hero"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="40,4 76,22 76,58 40,76 4,58 4,22"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
              <polygon
                points="40,16 64,28 64,52 40,64 16,52 16,28"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
              <circle cx="40" cy="40" r="6" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="1440" height="500" fill="url(#p-hero)" />
        </svg>
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-cream/20 to-transparent" />
      </div>

      {/* ── Article Body ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-[700px] mx-auto">

            {/* Pull quote — first sentence as a pull quote */}
            <blockquote className="border-l-2 border-gold pl-6 mb-12 mt-2">
              <p className="font-display text-[22px] md:text-[26px] italic leading-[1.4] text-ink-light font-light">
                &ldquo;{article.excerpt}&rdquo;
              </p>
            </blockquote>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-[0.12em] uppercase font-body text-ink-muted border border-border px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Article prose */}
            <article>
              <ArticleBody content={article.content} />
            </article>

            {/* Author byline */}
            <div className="mt-16 pt-10 border-t border-border flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-warm-gray flex items-center justify-center flex-shrink-0">
                <span className="font-display text-[16px] text-ink-muted">M</span>
              </div>
              <div>
                <p className="text-[13px] font-body font-medium text-ink">
                  {article.author}
                </p>
                <p className="text-[12px] text-ink-muted font-body">
                  Artisans du zellige, Fès & Paris
                </p>
              </div>
            </div>

            {/* Share placeholder */}
            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink-muted font-body mb-4">
                Partager cet article
              </p>
              <div className="flex items-center gap-3">
                {["Twitter", "LinkedIn", "Copier le lien"].map((platform) => (
                  <button
                    key={platform}
                    className="text-[10px] tracking-[0.12em] uppercase font-body text-ink-muted border border-border px-4 py-2 hover:border-ink hover:text-ink transition-colors duration-200"
                    aria-label={`Partager sur ${platform}`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-cream-dark border-t border-border">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-[700px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-body mb-2">
                Maison Attar
              </p>
              <h2 className="font-display text-[28px] md:text-[34px] leading-[1.15] font-light text-ink">
                Découvrir nos créations
              </h2>
              <p className="text-ink-muted text-[14px] font-body mt-2 max-w-sm">
                Tables en zellige et acier forgé, nées de la médina de Fès.
              </p>
            </div>
            <Link
              href="/collection"
              className="flex-shrink-0 inline-flex items-center gap-4 bg-ink text-cream text-[11px] tracking-[0.2em] uppercase font-body font-medium px-7 py-3.5 hover:bg-gold transition-colors duration-300"
            >
              Explorer
              <span className="w-6 h-px bg-current" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Related Articles ───────────────────────────────────────────────── */}
      {relatedArticles.length > 0 && (
        <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-border">
          <div className="max-w-screen-xl mx-auto">
            <div className="max-w-[700px] mx-auto">
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink-muted font-body mb-10">
                Articles similaires
              </p>
              <div className="grid md:grid-cols-2 gap-10">
                {relatedArticles.map((rel) => (
                  <RelatedCard key={rel.id} article={rel} />
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-border">
                <Link
                  href="/journal"
                  className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] font-body font-medium text-ink hover:text-gold transition-colors duration-300"
                >
                  <span className="w-6 h-px bg-current" />
                  Tous les articles
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
