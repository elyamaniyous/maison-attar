import { requireAuth, AuthError } from '@/lib/auth'
import { db, schema } from '@/db/index'
import { eq } from 'drizzle-orm'
import type { ArticleRow } from '@/db/schema'

type Ctx = { params: Promise<{ id: string }> }

function parseArticle(row: ArticleRow) {
  return {
    ...row,
    tags: row.tags,
  }
}

// ─── GET /api/cms/articles/[id] ───────────────────────────────────────────────

export async function GET(_req: Request, ctx: Ctx) {
  try {
    await requireAuth()
    const { id } = await ctx.params
    const rows = await db.select().from(schema.articles).where(eq(schema.articles.id, id)).limit(1)
    if (!rows[0]) return Response.json({ error: 'Article not found' }, { status: 404 })
    return Response.json(parseArticle(rows[0]))
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[articles/[id] GET]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ─── PUT /api/cms/articles/[id] ───────────────────────────────────────────────

export async function PUT(req: Request, ctx: Ctx) {
  try {
    await requireAuth()
    const { id } = await ctx.params

    const existing = await db.select().from(schema.articles).where(eq(schema.articles.id, id)).limit(1)
    if (!existing[0]) return Response.json({ error: 'Article not found' }, { status: 404 })

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

    const updates: Partial<typeof schema.articles.$inferInsert> = { updatedAt: now }

    if (typeof b['slug'] === 'string') updates.slug = b['slug']
    if (typeof b['title'] === 'string') updates.title = b['title']
    if (typeof b['excerpt'] === 'string') updates.excerpt = b['excerpt']
    if (typeof b['content'] === 'string') updates.content = b['content']
    if (typeof b['category'] === 'string') updates.category = b['category']
    if (Array.isArray(b['tags'])) updates.tags = b['tags']
    if (typeof b['author'] === 'string') updates.author = b['author']
    if (typeof b['featured'] === 'boolean') updates.featured = b['featured']
    if (typeof b['publishedAt'] === 'string') updates.publishedAt = b['publishedAt']

    await db.update(schema.articles).set(updates).where(eq(schema.articles.id, id))
    const rows = await db.select().from(schema.articles).where(eq(schema.articles.id, id)).limit(1)
    return Response.json(parseArticle(rows[0]))
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[articles/[id] PUT]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ─── DELETE /api/cms/articles/[id] ───────────────────────────────────────────

export async function DELETE(_req: Request, ctx: Ctx) {
  try {
    await requireAuth('admin')
    const { id } = await ctx.params

    const existing = await db.select().from(schema.articles).where(eq(schema.articles.id, id)).limit(1)
    if (!existing[0]) return Response.json({ error: 'Article not found' }, { status: 404 })

    await db.delete(schema.articles).where(eq(schema.articles.id, id))
    return Response.json({ ok: true })
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[articles/[id] DELETE]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
