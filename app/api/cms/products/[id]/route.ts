import { requireAuth, AuthError } from '@/lib/auth'
import { db, schema } from '@/db/index'
import { eq } from 'drizzle-orm'
import type { MaalemRow, ProductRow } from '@/db/schema'

type Ctx = { params: Promise<{ id: string }> }

function buildProductResponse(row: ProductRow, maalemRow: MaalemRow | null) {
  return {
    ...row,
    images: (() => { try { return JSON.parse(row.images) as unknown } catch { return [] } })(),
    dimensions: (() => { try { return JSON.parse(row.dimensions) as unknown } catch { return {} } })(),
    materials: (() => { try { return JSON.parse(row.materials) as unknown } catch { return {} } })(),
    configurations: (() => { try { return JSON.parse(row.configurations) as unknown } catch { return {} } })(),
    maalem: maalemRow
      ? { id: maalemRow.id, name: maalemRow.name, image: maalemRow.image, bio: maalemRow.bio }
      : null,
  }
}

async function getProductWithMaalem(id: string) {
  const rows = await db.select().from(schema.products).where(eq(schema.products.id, id)).limit(1)
  if (!rows[0]) return null
  const row = rows[0]
  const maalemRows = row.maalemId
    ? await db.select().from(schema.maalems).where(eq(schema.maalems.id, row.maalemId)).limit(1)
    : []
  return buildProductResponse(row, maalemRows[0] ?? null)
}

// ─── GET /api/cms/products/[id] ───────────────────────────────────────────────

export async function GET(_req: Request, ctx: Ctx) {
  try {
    await requireAuth()
    const { id } = await ctx.params
    const product = await getProductWithMaalem(id)
    if (!product) return Response.json({ error: 'Product not found' }, { status: 404 })
    return Response.json(product)
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[products/[id] GET]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ─── PUT /api/cms/products/[id] ───────────────────────────────────────────────

export async function PUT(req: Request, ctx: Ctx) {
  try {
    await requireAuth()
    const { id } = await ctx.params

    const existing = await db.select().from(schema.products).where(eq(schema.products.id, id)).limit(1)
    if (!existing[0]) return Response.json({ error: 'Product not found' }, { status: 404 })

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
    const now = new Date().toISOString()

    const updates: Partial<typeof schema.products.$inferInsert> = { updatedAt: now }

    if (typeof b['name'] === 'string') updates.name = b['name']
    if (typeof b['slug'] === 'string') updates.slug = b['slug']
    if (typeof b['description'] === 'string') updates.description = b['description']
    if (typeof b['longDescription'] === 'string') updates.longDescription = b['longDescription']
    if (typeof b['price'] === 'number') updates.price = b['price']
    if (typeof b['category'] === 'string') updates.category = b['category']
    if (typeof b['maalemId'] === 'string' || b['maalemId'] === null) updates.maalemId = b['maalemId'] as string | null
    if (typeof b['fabricationHours'] === 'number') updates.fabricationHours = b['fabricationHours']
    if (typeof b['inStock'] === 'boolean') updates.inStock = b['inStock']
    if (typeof b['featured'] === 'boolean') updates.featured = b['featured']
    if (Array.isArray(b['images'])) updates.images = JSON.stringify(b['images'])
    if (typeof b['dimensions'] === 'object' && b['dimensions'] !== null) updates.dimensions = JSON.stringify(b['dimensions'])
    if (typeof b['materials'] === 'object' && b['materials'] !== null) updates.materials = JSON.stringify(b['materials'])
    if (typeof b['configurations'] === 'object' && b['configurations'] !== null) updates.configurations = JSON.stringify(b['configurations'])

    await db.update(schema.products).set(updates).where(eq(schema.products.id, id))
    const product = await getProductWithMaalem(id)
    return Response.json(product)
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[products/[id] PUT]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ─── DELETE /api/cms/products/[id] ───────────────────────────────────────────

export async function DELETE(_req: Request, ctx: Ctx) {
  try {
    await requireAuth('admin')
    const { id } = await ctx.params

    const existing = await db.select().from(schema.products).where(eq(schema.products.id, id)).limit(1)
    if (!existing[0]) return Response.json({ error: 'Product not found' }, { status: 404 })

    await db.delete(schema.products).where(eq(schema.products.id, id))
    return Response.json({ ok: true })
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[products/[id] DELETE]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
