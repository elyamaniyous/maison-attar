import { requireAuth, AuthError } from '@/lib/auth'
import { db, schema } from '@/db/index'
import { eq } from 'drizzle-orm'
import type { PageRow } from '@/db/schema'

type Ctx = { params: Promise<{ slug: string }> }

function parsePage(row: PageRow) {
  return {
    ...row,
    sections: (() => { try { return JSON.parse(row.sections) as unknown } catch { return [] } })(),
  }
}

// ─── GET /api/cms/pages/[slug] ────────────────────────────────────────────────

export async function GET(_req: Request, ctx: Ctx) {
  try {
    await requireAuth()
    const { slug } = await ctx.params
    const rows = await db.select().from(schema.pages).where(eq(schema.pages.slug, slug)).limit(1)
    if (!rows[0]) return Response.json({ error: 'Page not found' }, { status: 404 })
    return Response.json(parsePage(rows[0]))
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[pages/[slug] GET]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ─── PUT /api/cms/pages/[slug] ────────────────────────────────────────────────

export async function PUT(req: Request, ctx: Ctx) {
  try {
    await requireAuth()
    const { slug } = await ctx.params

    const existing = await db.select().from(schema.pages).where(eq(schema.pages.slug, slug)).limit(1)
    if (!existing[0]) return Response.json({ error: 'Page not found' }, { status: 404 })

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

    const sections = b['sections'] !== undefined ? JSON.stringify(b['sections']) : existing[0].sections

    await db
      .update(schema.pages)
      .set({ sections, updatedAt: now })
      .where(eq(schema.pages.slug, slug))

    const rows = await db.select().from(schema.pages).where(eq(schema.pages.slug, slug)).limit(1)
    return Response.json(parsePage(rows[0]))
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[pages/[slug] PUT]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
