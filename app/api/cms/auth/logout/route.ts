import { clearSessionCookie } from '@/lib/auth'

export async function POST() {
  try {
    await clearSessionCookie()
    return Response.json({ ok: true })
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.error('[auth/logout]', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
