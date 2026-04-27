import { NextRequest } from 'next/server'
import { db, schema } from '@/db/index'
import { eq } from 'drizzle-orm'
import { verifyPassword, createSession, setSessionCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (
    typeof body !== 'object' ||
    body === null ||
    typeof (body as Record<string, unknown>)['email'] !== 'string' ||
    typeof (body as Record<string, unknown>)['password'] !== 'string'
  ) {
    return Response.json(
      { error: 'email and password are required' },
      { status: 400 }
    )
  }

  const { email, password } = body as { email: string; password: string }

  try {
    const rows = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email.toLowerCase().trim()))
      .limit(1)

    const user = rows[0]
    if (!user) {
      return Response.json({ error: 'Identifiants invalides' }, { status: 401 })
    }

    const valid = await verifyPassword(password, user.passwordHash)
    if (!valid) {
      return Response.json({ error: 'Identifiants invalides' }, { status: 401 })
    }

    const token = await createSession(user.id)
    await setSessionCookie(token)

    return Response.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.error('[auth/login]', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
