import { requireAuth, AuthError } from '@/lib/auth'
import { db, schema } from '@/db/index'
import type { PageRow } from '@/db/schema'

function parsePage(row: PageRow) {
  return {
    ...row,
    sections: (() => { try { return JSON.parse(row.sections) as unknown } catch { return [] } })(),
  }
}

// ─── GET /api/cms/pages ───────────────────────────────────────────────────────

export async function GET() {
  try {
    await requireAuth()
    const rows = await db.select().from(schema.pages)
    return Response.json(rows.map(parsePage))
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[pages GET]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
