import { requireAuth, AuthError } from '@/lib/auth'
import { db, schema } from '@/db/index'
import { eq } from 'drizzle-orm'
import type { MaalemRow, ProductRow } from '@/db/schema'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function buildProductResponse(row: ProductRow, maalemRow: MaalemRow | null) {
  return {
    ...row,
    images: row.images,
    dimensions: row.dimensions,
    materials: row.materials,
    configurations: row.configurations,
    maalem: maalemRow
      ? { id: maalemRow.id, name: maalemRow.name, image: maalemRow.image, bio: maalemRow.bio }
      : null,
  }
}

async function attachMaalems(rows: ProductRow[]) {
  if (rows.length === 0) return []
  const allMaalems = await db.select().from(schema.maalems)
  const map = new Map<string, MaalemRow>(allMaalems.map((m) => [m.id, m]))
  return rows.map((r) => buildProductResponse(r, r.maalemId ? (map.get(r.maalemId) ?? null) : null))
}

// ─── GET /api/cms/products ────────────────────────────────────────────────────

export async function GET() {
  try {
    await requireAuth()
    const rows = await db.select().from(schema.products)
    const products = await attachMaalems(rows)
    return Response.json(products)
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[products GET]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ─── POST /api/cms/products ───────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    await requireAuth()

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    if (typeof body !== 'object' || body === null) {
      return Response.json({ error: 'Body must be an object' }, { status: 400 })
    }

    const b = body as Record<string, unknown>

    // Validate required fields
    const required = ['name', 'description', 'longDescription', 'price', 'category', 'fabricationHours']
    for (const field of required) {
      if (b[field] === undefined || b[field] === null || b[field] === '') {
        return Response.json({ error: `Field "${field}" is required` }, { status: 400 })
      }
    }

    const name = String(b['name'])
    const slug = typeof b['slug'] === 'string' && b['slug'] ? b['slug'] : slugify(name)
    const now = new Date().toISOString()
    const id = crypto.randomUUID()

    const images = Array.isArray(b['images']) ? b['images'] : []
    const dimensions = typeof b['dimensions'] === 'object' && b['dimensions'] !== null ? b['dimensions'] : {}
    const materials = typeof b['materials'] === 'object' && b['materials'] !== null ? b['materials'] : {}
    const configurations = typeof b['configurations'] === 'object' && b['configurations'] !== null ? b['configurations'] : { zelliges: [], sizes: [], bases: [] }

    const newProduct = {
      id,
      name,
      slug,
      description: String(b['description'] ?? ''),
      longDescription: String(b['longDescription'] ?? ''),
      price: Number(b['price']),
      images: images,
      category: String(b['category']),
      dimensions: dimensions,
      materials: materials,
      maalemId: typeof b['maalemId'] === 'string' ? b['maalemId'] : null,
      fabricationHours: Number(b['fabricationHours']),
      configurations: configurations,
      inStock: b['inStock'] !== false,
      featured: b['featured'] === true,
      createdAt: now,
      updatedAt: now,
    }

    await db.insert(schema.products).values(newProduct)
    const rows = await db.select().from(schema.products).where(eq(schema.products.id, id)).limit(1)
    const maalemRows = newProduct.maalemId
      ? await db.select().from(schema.maalems).where(eq(schema.maalems.id, newProduct.maalemId)).limit(1)
      : []
    return Response.json(buildProductResponse(rows[0], maalemRows[0] ?? null), { status: 201 })
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[products POST]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
