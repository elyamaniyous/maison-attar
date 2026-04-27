import { requireAuth, AuthError, hashPassword } from '@/lib/auth'
import { db, schema } from '@/db/index'
import { eq } from 'drizzle-orm'
import type { User } from '@/db/schema'

type Ctx = { params: Promise<{ id: string }> }

function omitHash(user: User) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _ph, ...safe } = user
  return safe
}

// ─── PUT /api/cms/users/[id] ──────────────────────────────────────────────────

export async function PUT(req: Request, ctx: Ctx) {
  try {
    await requireAuth('admin')
    const { id } = await ctx.params

    const existing = await db.select().from(schema.users).where(eq(schema.users.id, id)).limit(1)
    if (!existing[0]) return Response.json({ error: 'User not found' }, { status: 404 })

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

    const updates: Partial<typeof schema.users.$inferInsert> = {}

    if (typeof b['name'] === 'string') updates.name = b['name']
    if (b['role'] === 'admin' || b['role'] === 'editor') updates.role = b['role']
    if (typeof b['password'] === 'string' && b['password']) {
      updates.passwordHash = await hashPassword(b['password'])
    }

    if (Object.keys(updates).length === 0) {
      return Response.json({ error: 'No updatable fields provided' }, { status: 400 })
    }

    await db.update(schema.users).set(updates).where(eq(schema.users.id, id))
    const rows = await db.select().from(schema.users).where(eq(schema.users.id, id)).limit(1)
    return Response.json(omitHash(rows[0]))
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[users/[id] PUT]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ─── DELETE /api/cms/users/[id] ───────────────────────────────────────────────

export async function DELETE(_req: Request, ctx: Ctx) {
  try {
    await requireAuth('admin')
    const { id } = await ctx.params

    const existing = await db.select().from(schema.users).where(eq(schema.users.id, id)).limit(1)
    if (!existing[0]) return Response.json({ error: 'User not found' }, { status: 404 })

    // Refuse to delete if it's the last admin
    if (existing[0].role === 'admin') {
      const allAdmins = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.role, 'admin'))
      if (allAdmins.length <= 1) {
        return Response.json(
          { error: 'Cannot delete the last admin account' },
          { status: 409 }
        )
      }
    }

    await db.delete(schema.users).where(eq(schema.users.id, id))
    return Response.json({ ok: true })
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[users/[id] DELETE]', e)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
