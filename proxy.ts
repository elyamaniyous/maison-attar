/**
 * proxy.ts  (Next.js 16 — renamed from middleware.ts)
 *
 * Runs in the Node.js runtime (default in Next.js 16).
 * Protects /admin/* and /api/cms/* routes via JWT verification.
 *
 * - /api/cms/auth/login is always public
 * - Unauthenticated /api/cms/* → 401 JSON
 * - Unauthenticated /admin/* → let the page render (the login page lives at /admin)
 * - Bad/expired token on /admin/* → redirect to /admin with cookie cleared
 *
 * Uses jose for JWT (no bcrypt/DB here — keep this fast and stateless).
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const COOKIE_NAME = 'ma_session'
const JWT_ALG = 'HS256'

function getSecret(): Uint8Array {
  const secret =
    process.env.AUTH_SECRET ?? 'dev-secret-change-in-production-please'
  return new TextEncoder().encode(secret)
}

async function verifyToken(
  token: string
): Promise<{ userId: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: [JWT_ALG],
    })
    const userId = payload['userId']
    const role = payload['role']
    if (typeof userId !== 'string' || typeof role !== 'string') return null
    return { userId, role }
  } catch {
    return null
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Always allow the login endpoint through
  if (pathname === '/api/cms/auth/login') {
    return NextResponse.next()
  }

  // Determine if this path needs auth
  const isAdminPath = pathname.startsWith('/admin')
  const isCmsApi = pathname.startsWith('/api/cms')

  if (!isAdminPath && !isCmsApi) {
    return NextResponse.next()
  }

  const token = req.cookies.get(COOKIE_NAME)?.value

  if (!token) {
    if (isCmsApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    // Let /admin render — the login form lives there
    return NextResponse.next()
  }

  const session = await verifyToken(token)

  if (!session) {
    if (isCmsApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    // Invalid token: clear cookie and redirect to admin login
    const response = NextResponse.redirect(new URL('/admin', req.url))
    response.cookies.set(COOKIE_NAME, '', { maxAge: 0, path: '/' })
    return response
  }

  // Forward userId and role as request headers for downstream handlers
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-user-id', session.userId)
  requestHeaders.set('x-user-role', session.role)

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/admin/:path*', '/api/cms/:path*'],
}
