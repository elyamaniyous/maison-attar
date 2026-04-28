/**
 * lib/password.ts
 *
 * Pure bcrypt helpers — Node-runtime safe (no Next.js dependencies).
 * Used by both lib/auth.ts (Next runtime) and db/seed-cli.ts (standalone CLI).
 */

import bcrypt from 'bcryptjs'

const BCRYPT_ROUNDS = 10

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS)
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
