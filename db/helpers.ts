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

import type { Product, Maalem } from '@/lib/types'
import type { BlogArticle } from '@/lib/blog-data'
import type { PageContent, PageSection } from '@/lib/cms'

// ─── JSON parse helpers ───────────────────────────────────────────────────────

function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
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
    images: parseJson<string[]>(row.images, []),
    category: row.category as Product['category'],
    dimensions: parseJson(row.dimensions, {
      width: 0,
      height: 0,
      depth: 0,
      weight: 0,
    }),
    materials: parseJson(row.materials, { zellige: '', base: '' }),
    maalem,
    fabricationHours: row.fabricationHours,
    availableConfigurations: parseJson(row.configurations, {
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
    tags: parseJson<string[]>(row.tags, []),
    author: row.author,
    publishedAt: row.publishedAt,
    // These fields aren't stored in DB — provide sensible defaults
    readingTime: Math.ceil(row.content.split(/\s+/).length / 200),
    featured: Boolean(row.featured),
    seoTitle: row.title,
    seoDescription: row.excerpt,
    geoKeywords: parseJson<string[]>(row.tags, []),
  }
}

function pageRowToPageContent(row: PageRow): PageContent {
  return {
    id: row.id,
    slug: row.slug,
    title: row.slug, // pages table has no title column; use slug as fallback
    sections: parseJson<PageSection[]>(row.sections, []),
    lastModified: row.updatedAt,
    modifiedBy: 'admin',
  }
}

// ─── Maalem query helpers ─────────────────────────────────────────────────────

export async function getMaalems(): Promise<Maalem[]> {
  const rows = await db.select().from(schema.maalems)
  return rows.map(maalemRowToMaalem)
}

export async function getMaalemBySlug(slug: string): Promise<Maalem | undefined> {
  const rows = await db
    .select()
    .from(schema.maalems)
    .where(eq(schema.maalems.slug, slug))
    .limit(1)
  return rows[0] ? maalemRowToMaalem(rows[0]) : undefined
}

export async function getMaalemById(id: string): Promise<Maalem | undefined> {
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
  const rows = await db.select().from(schema.products)
  return fetchProductsWithMaalems(rows)
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
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
  const rows = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.featured, true))
  return fetchProductsWithMaalems(rows)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const rows = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.category, category))
  return fetchProductsWithMaalems(rows)
}

// ─── Article query helpers ────────────────────────────────────────────────────

export async function getArticles(): Promise<BlogArticle[]> {
  const rows = await db.select().from(schema.articles)
  return rows.map(articleRowToBlogArticle)
}

export async function getArticleBySlug(slug: string): Promise<BlogArticle | undefined> {
  const rows = await db
    .select()
    .from(schema.articles)
    .where(eq(schema.articles.slug, slug))
    .limit(1)
  return rows[0] ? articleRowToBlogArticle(rows[0]) : undefined
}

// ─── Page query helpers ───────────────────────────────────────────────────────

export async function getPageContent(slug: string): Promise<PageContent | null> {
  const rows = await db
    .select()
    .from(schema.pages)
    .where(eq(schema.pages.slug, slug))
    .limit(1)
  return rows[0] ? pageRowToPageContent(rows[0]) : null
}

// ─── Settings query helpers ───────────────────────────────────────────────────

export async function getSetting(key: string): Promise<unknown> {
  const rows = await db
    .select()
    .from(schema.settings)
    .where(eq(schema.settings.key, key))
    .limit(1)
  if (!rows[0]) return null
  return parseJson<unknown>(rows[0].value, null)
}

export async function getSettings(): Promise<Record<string, unknown>> {
  const rows = await db.select().from(schema.settings)
  const result: Record<string, unknown> = {}
  for (const row of rows) {
    result[row.key] = parseJson<unknown>(row.value, null)
  }
  return result
}
