import { requireAuth, AuthError } from '@/lib/auth'
import { db, schema } from '@/db/index'
import { eq } from 'drizzle-orm'

// ─── GET /api/cms/settings ────────────────────────────────────────────────────

export async function GET() {
  try {
    await requireAuth()
    const rows = await db.select().from(schema.settings)
    const result: Record<string, unknown> = {}
    for (const row of rows) {
      try {
        result[row.key] = JSON.parse(row.value) as unknown
      } catch {
        result[row.key] = row.value
      }
    }
    return Response.json(result)
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[settings GET]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ─── PUT /api/cms/settings ────────────────────────────────────────────────────

export async function PUT(req: Request) {
  try {
    await requireAuth()

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
      return Response.json({ error: 'Body must be a key/value object' }, { status: 400 })
    }

    const entries = Object.entries(body as Record<string, unknown>)

    for (const [key, value] of entries) {
      const encoded = JSON.stringify(value)
      const existing = await db
        .select()
        .from(schema.settings)
        .where(eq(schema.settings.key, key))
        .limit(1)

      if (existing[0]) {
        await db.update(schema.settings).set({ value: encoded }).where(eq(schema.settings.key, key))
      } else {
        await db.insert(schema.settings).values({ key, value: encoded })
      }
    }

    // Return updated state
    const rows = await db.select().from(schema.settings)
    const result: Record<string, unknown> = {}
    for (const row of rows) {
      try {
        result[row.key] = JSON.parse(row.value) as unknown
      } catch {
        result[row.key] = row.value
      }
    }
    return Response.json(result)
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[settings PUT]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
