/**
 * db/helpers.ts
 *
 * Thin query helpers that wrap Drizzle and handle JSON serialization so that
 * callers receive the same public-facing types that lib/types.ts defines.
 */

import { eq } from 'drizzle-orm'
import { db, schema } from './index'
import type {
  ProductRow,
  MaalemRow,
  ArticleRow,
  PageRow,
} from './schema'
// Seed data — used as a fallback during build phase to avoid SQLite contention
// across the 31 page-collection workers. Each worker would otherwise race on
// initDb() and produce SQLITE_BUSY errors, breaking the build.
import {
  products as seedProducts,
  maalems as seedMaalems,
} from '@/lib/data'
import { blogArticles as seedArticles } from '@/lib/blog-data'

/**
 * Detect Next.js build/page-collection phase.
 * During build, multiple workers race on the same SQLite file; we short-circuit
 * to seed data so the build is deterministic and contention-free.
 */
function isBuildPhase(): boolean {
  return process.env.NEXT_PHASE === 'phase-production-build'
}

// Re-export public types so callers can `import type { Product } from '@/db/helpers'`
export type {
  Product,
  Maalem,
  ProductCategory,
  ProductDimensions,
  ProductMaterials,
  ProductMaalem,
  ProductConfigurations,
  Order,
  TrackingStep,
  CartItem,
  CartItemConfiguration,
} from '@/lib/types'

export type { BlogArticle } from '@/lib/blog-data'

export type { PageContent, PageSection, PageSectionItem } from '@/lib/cms'
export type { PageSectionsMap, KnownSlug } from '@/lib/page-content'

import type { Product, Maalem } from '@/lib/types'
import type { BlogArticle } from '@/lib/blog-data'
import type { PageContent, PageSection } from '@/lib/cms'
import type { PageSectionsMap, KnownSlug } from '@/lib/page-content'
import { defaultPageContents } from '@/lib/page-content'

// ─── JSON helpers ─────────────────────────────────────────────────────────────
// Postgres jsonb columns return parsed values automatically via postgres-js.
// These helpers add a defensive cast with fallback in case the column was
// somehow stored as a string (e.g. legacy data, or unexpected input).

function asJson<T>(raw: unknown, fallback: T): T {
  if (raw == null) return fallback
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as T
    } catch {
      return fallback
    }
  }
  return raw as T
}

// ─── Row → public type mappers ────────────────────────────────────────────────

function maalemRowToMaalem(row: MaalemRow): Maalem {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    image: row.image,
    portrait: row.portrait,
    bio: row.bio,
    specialty: row.specialty,
    yearsExperience: row.yearsExperience,
    piecesCreated: row.piecesCreated,
    quote: row.quote,
  }
}

function productRowToProduct(
  row: ProductRow,
  maalemRow: MaalemRow | null
): Product {
  const maalem = maalemRow
    ? {
        id: maalemRow.id,
        name: maalemRow.name,
        image: maalemRow.image,
        bio: maalemRow.bio,
      }
    : {
        id: row.maalemId ?? '',
        name: '',
        image: '',
        bio: '',
      }

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    longDescription: row.longDescription,
    price: row.price,
    images: asJson<string[]>(row.images, []),
    category: row.category as Product['category'],
    dimensions: asJson(row.dimensions, {
      width: 0,
      height: 0,
      depth: 0,
      weight: 0,
    }),
    materials: asJson(row.materials, { zellige: '', base: '' }),
    maalem,
    fabricationHours: row.fabricationHours,
    availableConfigurations: asJson(row.configurations, {
      zelliges: [],
      sizes: [],
      bases: [],
    }),
    inStock: Boolean(row.inStock),
    featured: Boolean(row.featured),
  }
}

function articleRowToBlogArticle(row: ArticleRow): BlogArticle {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category as BlogArticle['category'],
    tags: asJson<string[]>(row.tags, []),
    author: row.author,
    publishedAt: row.publishedAt,
    // These fields aren't stored in DB — provide sensible defaults
    readingTime: Math.ceil(row.content.split(/\s+/).length / 200),
    featured: Boolean(row.featured),
    seoTitle: row.title,
    seoDescription: row.excerpt,
    geoKeywords: asJson<string[]>(row.tags, []),
  }
}

function pageRowToPageContent(row: PageRow): PageContent {
  return {
    id: row.id,
    slug: row.slug,
    title: row.slug, // pages table has no title column; use slug as fallback
    sections: asJson<PageSection[]>(row.sections, []),
    lastModified: row.updatedAt,
    modifiedBy: 'admin',
  }
}

// ─── Maalem query helpers ─────────────────────────────────────────────────────

export async function getMaalems(): Promise<Maalem[]> {
  if (isBuildPhase()) return seedMaalems as Maalem[]
  const rows = await db.select().from(schema.maalems)
  return rows.map(maalemRowToMaalem)
}

export async function getMaalemBySlug(slug: string): Promise<Maalem | undefined> {
  if (isBuildPhase()) return (seedMaalems as Maalem[]).find((m) => m.slug === slug)
  const rows = await db
    .select()
    .from(schema.maalems)
    .where(eq(schema.maalems.slug, slug))
    .limit(1)
  return rows[0] ? maalemRowToMaalem(rows[0]) : undefined
}

export async function getMaalemById(id: string): Promise<Maalem | undefined> {
  if (isBuildPhase()) return (seedMaalems as Maalem[]).find((m) => m.id === id)
  const rows = await db
    .select()
    .from(schema.maalems)
    .where(eq(schema.maalems.id, id))
    .limit(1)
  return rows[0] ? maalemRowToMaalem(rows[0]) : undefined
}

// ─── Product query helpers ────────────────────────────────────────────────────

async function fetchProductsWithMaalems(
  productRows: ProductRow[]
): Promise<Product[]> {
  if (productRows.length === 0) return []

  const allMaalemRows = await db.select().from(schema.maalems)
  const maalemMap = new Map<string, MaalemRow>(
    allMaalemRows.map((m) => [m.id, m])
  )

  return productRows.map((row) =>
    productRowToProduct(row, row.maalemId ? (maalemMap.get(row.maalemId) ?? null) : null)
  )
}

export async function getProducts(): Promise<Product[]> {
  if (isBuildPhase()) return seedProducts as Product[]
  const rows = await db.select().from(schema.products)
  return fetchProductsWithMaalems(rows)
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (isBuildPhase()) return (seedProducts as Product[]).find((p) => p.slug === slug)
  const rows = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.slug, slug))
    .limit(1)
  if (!rows[0]) return undefined
  const [product] = await fetchProductsWithMaalems(rows)
  return product
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (isBuildPhase()) return (seedProducts as Product[]).filter((p) => p.featured)
  const rows = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.featured, true))
  return fetchProductsWithMaalems(rows)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (isBuildPhase())
    return (seedProducts as Product[]).filter((p) => p.category === category)
  const rows = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.category, category))
  return fetchProductsWithMaalems(rows)
}

// ─── Article query helpers ────────────────────────────────────────────────────

export async function getArticles(): Promise<BlogArticle[]> {
  if (isBuildPhase()) return seedArticles as BlogArticle[]
  const rows = await db.select().from(schema.articles)
  return rows.map(articleRowToBlogArticle)
}

export async function getArticleBySlug(slug: string): Promise<BlogArticle | undefined> {
  if (isBuildPhase()) return (seedArticles as BlogArticle[]).find((a) => a.slug === slug)
  const rows = await db
    .select()
    .from(schema.articles)
    .where(eq(schema.articles.slug, slug))
    .limit(1)
  return rows[0] ? articleRowToBlogArticle(rows[0]) : undefined
}

// ─── Page query helpers ───────────────────────────────────────────────────────

export async function getPageContent(slug: string): Promise<PageContent | null> {
  if (isBuildPhase()) return null
  try {
    const rows = await db
      .select()
      .from(schema.pages)
      .where(eq(schema.pages.slug, slug))
      .limit(1)
    return rows[0] ? pageRowToPageContent(rows[0]) : null
  } catch {
    return null
  }
}

/**
 * Returns the flat key-value sections object for a known page slug.
 * If the DB row is missing or its sections is an empty/legacy array,
 * falls back to the compile-time defaults from lib/page-content.ts.
 */
export async function getPageSections<S extends KnownSlug>(
  slug: S
): Promise<PageSectionsMap[S]> {
  const defaults = defaultPageContents[slug]
  if (isBuildPhase()) return defaults
  try {
    const rows = await db
      .select()
      .from(schema.pages)
      .where(eq(schema.pages.slug, slug))
      .limit(1)

    if (!rows[0]) return defaults

    const parsed = asJson<unknown>(rows[0].sections, null)

    // Accept only non-null, non-array objects with at least one key
    if (
      parsed !== null &&
      typeof parsed === 'object' &&
      !Array.isArray(parsed) &&
      Object.keys(parsed as object).length > 0
    ) {
      // Merge: defaults first so new keys are always present
      return { ...defaults, ...(parsed as PageSectionsMap[S]) }
    }

    return defaults
  } catch {
    return defaults
  }
}

// ─── Settings query helpers ───────────────────────────────────────────────────

export async function getSetting(key: string): Promise<unknown> {
  if (isBuildPhase()) return null
  try {
    const rows = await db
      .select()
      .from(schema.settings)
      .where(eq(schema.settings.key, key))
      .limit(1)
    if (!rows[0]) return null
    return asJson<unknown>(rows[0].value, null)
  } catch {
    return null
  }
}

export async function getSettings(): Promise<Record<string, unknown>> {
  if (isBuildPhase()) return {}
  try {
    const rows = await db.select().from(schema.settings)
    const result: Record<string, unknown> = {}
    for (const row of rows) {
      result[row.key] = asJson<unknown>(row.value, null)
    }
    return result
  } catch {
    return {}
  }
}
