import { requireAuth, AuthError } from '@/lib/auth'
import { db, schema } from '@/db/index'
import { eq } from 'drizzle-orm'
import type { ArticleRow } from '@/db/schema'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseArticle(row: ArticleRow) {
  return {
    ...row,
    tags: (() => { try { return JSON.parse(row.tags) as unknown } catch { return [] } })(),
  }
}

// ─── GET /api/cms/articles ────────────────────────────────────────────────────

export async function GET() {
  try {
    await requireAuth()
    const rows = await db.select().from(schema.articles)
    return Response.json(rows.map(parseArticle))
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[articles GET]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ─── POST /api/cms/articles ───────────────────────────────────────────────────

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

    const required = ['title', 'excerpt', 'content', 'category', 'author']
    for (const field of required) {
      if (b[field] === undefined || b[field] === null || b[field] === '') {
        return Response.json({ error: `Field "${field}" is required` }, { status: 400 })
      }
    }

    const title = String(b['title'])
    const slug = typeof b['slug'] === 'string' && b['slug'] ? b['slug'] : slugify(title)
    const now = new Date().toISOString()
    const id = crypto.randomUUID()
    const tags = Array.isArray(b['tags']) ? b['tags'] : []

    const newArticle = {
      id,
      slug,
      title,
      excerpt: String(b['excerpt']),
      content: String(b['content']),
      category: String(b['category']),
      tags: JSON.stringify(tags),
      author: String(b['author']),
      featured: b['featured'] === true,
      publishedAt: typeof b['publishedAt'] === 'string' ? b['publishedAt'] : now,
      createdAt: now,
      updatedAt: now,
    }

    await db.insert(schema.articles).values(newArticle)
    const rows = await db.select().from(schema.articles).where(eq(schema.articles.id, id)).limit(1)
    return Response.json(parseArticle(rows[0]), { status: 201 })
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[articles POST]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
