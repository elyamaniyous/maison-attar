/**
 * instrumentation.ts
 *
 * Called once when the Next.js server starts (Node.js runtime only).
 * Seeds the database with initial data if the DB is empty.
 *
 * Skipped during build phase to avoid race conditions when multiple
 * page-collection workers spawn concurrently.
 */

export async function register() {
  // Only run in Node.js runtime (not Edge)
  if (process.env.NEXT_RUNTIME !== 'nodejs') return

  // Skip during the build / page-data-collection phase.
  // NEXT_PHASE is set to 'phase-production-build' during `next build`.
  if (process.env.NEXT_PHASE === 'phase-production-build') return

  try {
    const { seedIfEmpty } = await import('./db/seed')
    await seedIfEmpty()
  } catch (err) {
    // Don't crash the server if seed fails — log and continue.
    // The DB may already be seeded by another instance.
    console.error('[instrumentation] seedIfEmpty failed:', err)
  }
}
