/**
 * lib/auth.ts
 *
 * Authentication utilities: bcrypt password hashing, JWT session tokens,
 * and Next.js cookie helpers.
 *
 * Uses: bcryptjs (10 rounds) + jose (HS256 JWT, 7-day expiry).
 * Cookie name: ma_session (HTTP-only, Secure in prod, SameSite=Lax).
 */

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { db, schema } from '@/db/index'
import { eq } from 'drizzle-orm'
import type { User } from '@/db/schema'

// Re-export Node-safe password helpers
export { hashPassword, verifyPassword } from './password'

// ─── Constants ────────────────────────────────────────────────────────────────

const COOKIE_NAME = 'ma_session'
const JWT_ALG = 'HS256'
const SESSION_DAYS = 7

function getSecret(): Uint8Array {
  const secret =
    process.env.AUTH_SECRET ?? 'dev-secret-change-in-production-please'
  return new TextEncoder().encode(secret)
}

// (verifyPassword, hashPassword: re-exported above from ./password)

// ─── JWT session ──────────────────────────────────────────────────────────────

interface SessionPayload {
  userId: string
  role: string
}

/**
 * Creates a signed JWT for the given userId.
 * Also persists a session row in the DB.
 * Returns the signed JWT string.
 */
export async function createSession(userId: string): Promise<string> {
  // Fetch user role for embedding in token
  const userRows = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.id, userId))
    .limit(1)

  const user = userRows[0]
  if (!user) throw new Error('User not found')

  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)

  const token = await new SignJWT({ userId, role: user.role } satisfies SessionPayload)
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getSecret())

  // Persist session row
  const sessionId = crypto.randomUUID()
  await db.insert(schema.sessions).values({
    id: sessionId,
    userId,
    expiresAt: expiresAt.toISOString(),
    createdAt: new Date().toISOString(),
  })

  return token
}

/**
 * Verifies a JWT and returns the payload, or null if invalid/expired.
 * This is safe for both Edge (middleware) and Node (API routes).
 */
export async function verifySession(
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

// ─── Cookie helpers (Node.js / RSC only) ─────────────────────────────────────

/**
 * Sets the session cookie. Call this from a Server Action or Route Handler
 * after verifying credentials.
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
    path: '/',
  })
}

/**
 * Clears the session cookie and deletes the DB session if possible.
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (token) {
    const payload = await verifySession(token)
    if (payload) {
      // Best-effort: delete all sessions for this user
      await db
        .delete(schema.sessions)
        .where(eq(schema.sessions.userId, payload.userId))
    }
  }

  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
}

/**
 * Returns the currently authenticated user, or null.
 * Reads from the ma_session cookie. Node runtime only (uses next/headers).
 */
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null

  const payload = await verifySession(token)
  if (!payload) return null

  const rows = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.id, payload.userId))
    .limit(1)

  return rows[0] ?? null
}

/**
 * Returns the current user or throws a 401-style error.
 * Optionally enforces a minimum role.
 */
export async function requireAuth(role?: 'admin' | 'editor'): Promise<User> {
  const user = await getCurrentUser()
  if (!user) {
    throw new AuthError('Not authenticated', 401)
  }
  if (role === 'admin' && user.role !== 'admin') {
    throw new AuthError('Insufficient permissions', 403)
  }
  return user
}

// ─── Auth error ────────────────────────────────────────────────────────────────

export class AuthError extends Error {
  constructor(
    message: string,
    public readonly status: 401 | 403 = 401
  ) {
    super(message)
    this.name = 'AuthError'
  }
}
