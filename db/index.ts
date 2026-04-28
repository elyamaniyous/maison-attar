import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'
import { initDb } from './migrate'
import path from 'node:path'
import fs from 'node:fs'

const DB_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), 'data')
const DB_PATH = path.join(DB_DIR, 'maison-attar.db')

// Lazy singleton: defer DB opening until first access.
// This avoids multiple Next.js build workers racing on initDb() at module load.
let _sqlite: Database.Database | null = null
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null
let _initialized = false

function getSqlite(): Database.Database {
  if (_sqlite) return _sqlite

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true })
  }

  const sqlite = new Database(DB_PATH)

  // Concurrency-safe configuration:
  //   - WAL mode allows multiple readers + 1 writer concurrently
  //   - busy_timeout makes operations wait up to 10s for a lock instead of erroring
  //   - synchronous = NORMAL is the recommended setting for WAL mode
  sqlite.pragma('journal_mode = WAL')
  sqlite.pragma('busy_timeout = 10000')
  sqlite.pragma('synchronous = NORMAL')
  sqlite.pragma('foreign_keys = ON')

  // Initialize schema once per process
  if (!_initialized) {
    try {
      initDb(sqlite)
      _initialized = true
    } catch (err) {
      // If another worker created tables first, IF NOT EXISTS makes this idempotent.
      // Only rethrow if it's not a benign concurrency error.
      const msg = err instanceof Error ? err.message : String(err)
      if (!msg.includes('already exists')) throw err
      _initialized = true
    }
  }

  _sqlite = sqlite
  return sqlite
}

// Drizzle wrapper with lazy connection
export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_target, prop) {
    if (!_db) {
      _db = drizzle(getSqlite(), { schema })
    }
    return Reflect.get(_db, prop)
  },
})

export { schema }
