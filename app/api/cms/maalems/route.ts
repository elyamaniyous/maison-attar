import { requireAuth, AuthError } from '@/lib/auth'
import { db, schema } from '@/db/index'
import { eq } from 'drizzle-orm'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// ─── GET /api/cms/maalems ─────────────────────────────────────────────────────

export async function GET() {
  try {
    await requireAuth()
    const rows = await db.select().from(schema.maalems)
    return Response.json(rows)
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[maalems GET]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ─── POST /api/cms/maalems ────────────────────────────────────────────────────

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

    const required = ['name', 'image', 'portrait', 'bio', 'specialty', 'yearsExperience', 'piecesCreated', 'quote']
    for (const field of required) {
      if (b[field] === undefined || b[field] === null || b[field] === '') {
        return Response.json({ error: `Field "${field}" is required` }, { status: 400 })
      }
    }

    const name = String(b['name'])
    const slug = typeof b['slug'] === 'string' && b['slug'] ? b['slug'] : slugify(name)
    const now = new Date().toISOString()
    const id = crypto.randomUUID()

    const newMaalem = {
      id,
      name,
      slug,
      image: String(b['image']),
      portrait: String(b['portrait']),
      bio: String(b['bio']),
      specialty: String(b['specialty']),
      yearsExperience: Number(b['yearsExperience']),
      piecesCreated: Number(b['piecesCreated']),
      quote: String(b['quote']),
      createdAt: now,
      updatedAt: now,
    }

    await db.insert(schema.maalems).values(newMaalem)
    const rows = await db.select().from(schema.maalems).where(eq(schema.maalems.id, id)).limit(1)
    return Response.json(rows[0], { status: 201 })
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[maalems POST]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
