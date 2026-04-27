import { requireAuth, AuthError, hashPassword } from '@/lib/auth'
import { db, schema } from '@/db/index'
import { eq } from 'drizzle-orm'
import type { User } from '@/db/schema'

function omitHash(user: User) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _ph, ...safe } = user
  return safe
}

// ─── GET /api/cms/users ───────────────────────────────────────────────────────

export async function GET() {
  try {
    await requireAuth('admin')
    const rows = await db.select().from(schema.users)
    return Response.json(rows.map(omitHash))
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[users GET]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ─── POST /api/cms/users ──────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    await requireAuth('admin')

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

    const required = ['email', 'password', 'name', 'role']
    for (const field of required) {
      if (!b[field]) {
        return Response.json({ error: `Field "${field}" is required` }, { status: 400 })
      }
    }

    if (b['role'] !== 'admin' && b['role'] !== 'editor') {
      return Response.json({ error: 'role must be "admin" or "editor"' }, { status: 400 })
    }

    const email = String(b['email']).toLowerCase().trim()

    // Check uniqueness
    const existing = await db.select().from(schema.users).where(eq(schema.users.email, email)).limit(1)
    if (existing[0]) {
      return Response.json({ error: 'A user with this email already exists' }, { status: 409 })
    }

    const passwordHash = await hashPassword(String(b['password']))
    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    const newUser: typeof schema.users.$inferInsert = {
      id,
      email,
      name: String(b['name']),
      role: b['role'] as 'admin' | 'editor',
      passwordHash,
      createdAt: now,
    }

    await db.insert(schema.users).values(newUser)
    const rows = await db.select().from(schema.users).where(eq(schema.users.id, id)).limit(1)
    return Response.json(omitHash(rows[0]), { status: 201 })
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[users POST]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
