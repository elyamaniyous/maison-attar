/**
 * db/index.ts
 *
 * Postgres connection via postgres-js + drizzle-orm.
 * Uses DATABASE_URL env var (Railway injects this automatically when a
 * Postgres service is linked to the web app).
 *
 * Lazy singleton: the connection is opened on first DB access, not at
 * module import time. This keeps `next build` fast and avoids opening
 * a connection during the build phase (helpers short-circuit to seed
 * data when NEXT_PHASE === 'phase-production-build').
 */

import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './schema'
import { initDb } from './migrate'

let _client: ReturnType<typeof postgres> | null = null
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null
let _initialized = false

function getClient(): ReturnType<typeof postgres> {
  if (_client) return _client

  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error(
      '[db] DATABASE_URL is not set. Set it in your .env or Railway env vars (Railway auto-injects when a Postgres service is linked).'
    )
  }

  // Detect Railway internal vs external URL — internal is plain TCP, external needs SSL.
  // Default to SSL for safety; Railway internal URLs accept SSL too.
  const url = new URL(connectionString)
  const isLocal =
    url.hostname === 'localhost' ||
    url.hostname === '127.0.0.1' ||
    url.hostname.endsWith('.local')

  _client = postgres(connectionString, {
    max: 10,                  // connection pool size
    idle_timeout: 20,         // close idle conns after 20s
    connect_timeout: 30,
    ssl: isLocal ? false : 'require',
    onnotice: () => {},       // suppress NOTICE logs
  })

  return _client
}

async function ensureInitialized(): Promise<void> {
  if (_initialized) return
  _initialized = true
  try {
    await initDb(getClient())
  } catch (err) {
    // initDb uses CREATE TABLE IF NOT EXISTS — safe to retry across instances.
    const msg = err instanceof Error ? err.message : String(err)
    if (!msg.includes('already exists')) {
      _initialized = false
      throw err
    }
  }
}

// Drizzle wrapper — connection opens lazily on first access.
// We don't await ensureInitialized() in the Proxy's get because callers
// don't await property access. Instead we run init at the entry points
// (instrumentation.ts) and on first query failure as a safety net.
export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_target, prop) {
    if (!_db) {
      _db = drizzle(getClient(), { schema })
      // Fire-and-forget init — safe because all DDL uses IF NOT EXISTS
      void ensureInitialized()
    }
    return Reflect.get(_db, prop)
  },
})

export { schema, ensureInitialized }
