/**
 * instrumentation.ts
 *
 * Called once when the Next.js server starts (Node.js runtime only).
 * Seeds the database with initial data if the DB is empty.
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { seedIfEmpty } = await import('./db/seed')
    await seedIfEmpty()
  }
}
