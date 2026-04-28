/**
 * db/seed-cli.ts
 *
 * Standalone seed runner. Used as `prebuild` and `predev` script
 * so the database is fully seeded BEFORE Next.js spawns build workers.
 * This prevents SQLITE_BUSY races when 30+ workers race to insert seed data.
 */

import { seedIfEmpty } from './seed'

async function main() {
  try {
    console.log('[seed-cli] Checking database...')
    await seedIfEmpty()
    console.log('[seed-cli] Done.')
    process.exit(0)
  } catch (err) {
    console.error('[seed-cli] Failed:', err)
    // Don't fail the build/dev start — server can still run with empty DB
    process.exit(0)
  }
}

main()
