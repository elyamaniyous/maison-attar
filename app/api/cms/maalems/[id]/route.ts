import { requireAuth, AuthError } from '@/lib/auth'
import { db, schema } from '@/db/index'
import { eq } from 'drizzle-orm'

type Ctx = { params: Promise<{ id: string }> }

// ─── GET /api/cms/maalems/[id] ────────────────────────────────────────────────

export async function GET(_req: Request, ctx: Ctx) {
  try {
    await requireAuth()
    const { id } = await ctx.params
    const rows = await db.select().from(schema.maalems).where(eq(schema.maalems.id, id)).limit(1)
    if (!rows[0]) return Response.json({ error: 'Maalem not found' }, { status: 404 })
    return Response.json(rows[0])
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[maalems/[id] GET]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ─── PUT /api/cms/maalems/[id] ────────────────────────────────────────────────

export async function PUT(req: Request, ctx: Ctx) {
  try {
    await requireAuth()
    const { id } = await ctx.params

    const existing = await db.select().from(schema.maalems).where(eq(schema.maalems.id, id)).limit(1)
    if (!existing[0]) return Response.json({ error: 'Maalem not found' }, { status: 404 })

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

    const updates: Partial<typeof schema.maalems.$inferInsert> = { updatedAt: now }

    if (typeof b['name'] === 'string') updates.name = b['name']
    if (typeof b['slug'] === 'string') updates.slug = b['slug']
    if (typeof b['image'] === 'string') updates.image = b['image']
    if (typeof b['portrait'] === 'string') updates.portrait = b['portrait']
    if (typeof b['bio'] === 'string') updates.bio = b['bio']
    if (typeof b['specialty'] === 'string') updates.specialty = b['specialty']
    if (typeof b['yearsExperience'] === 'number') updates.yearsExperience = b['yearsExperience']
    if (typeof b['piecesCreated'] === 'number') updates.piecesCreated = b['piecesCreated']
    if (typeof b['quote'] === 'string') updates.quote = b['quote']

    await db.update(schema.maalems).set(updates).where(eq(schema.maalems.id, id))
    const rows = await db.select().from(schema.maalems).where(eq(schema.maalems.id, id)).limit(1)
    return Response.json(rows[0])
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[maalems/[id] PUT]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ─── DELETE /api/cms/maalems/[id] ────────────────────────────────────────────

export async function DELETE(_req: Request, ctx: Ctx) {
  try {
    await requireAuth('admin')
    const { id } = await ctx.params

    const existing = await db.select().from(schema.maalems).where(eq(schema.maalems.id, id)).limit(1)
    if (!existing[0]) return Response.json({ error: 'Maalem not found' }, { status: 404 })

    await db.delete(schema.maalems).where(eq(schema.maalems.id, id))
    return Response.json({ ok: true })
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[maalems/[id] DELETE]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
