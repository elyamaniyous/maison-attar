/**
 * db/seed.ts
 *
 * Seeds the database from lib/data.ts and lib/blog-data.ts on first startup.
 * Only runs if the users table is empty.
 */

import { db, schema } from './index'
import { eq } from 'drizzle-orm'
import { hashPassword } from '@/lib/auth'
import { products as seedProducts, maalems as seedMaalems } from '@/lib/data'
import { blogArticles } from '@/lib/blog-data'

function uuid(): string {
  // Simple deterministic-ish UUID using crypto if available
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
}

function now(): string {
  return new Date().toISOString()
}

export async function seedIfEmpty(): Promise<void> {
  // Check if already seeded
  const existingUsers = await db.select().from(schema.users).limit(1)
  if (existingUsers.length > 0) return

  console.log('[seed] Database is empty — seeding initial data...')

  // ── 1. Default admin user ──────────────────────────────────────────────────
  const passwordHash = await hashPassword('attar2024')
  await db.insert(schema.users).values({
    id: uuid(),
    email: 'admin@maisonattar.com',
    passwordHash,
    name: 'Administrateur',
    role: 'admin',
    createdAt: now(),
  })

  // ── 2. Maalems ─────────────────────────────────────────────────────────────
  for (const m of seedMaalems) {
    await db.insert(schema.maalems).values({
      id: m.id,
      name: m.name,
      slug: m.slug,
      image: m.image,
      portrait: m.portrait,
      bio: m.bio,
      specialty: m.specialty,
      yearsExperience: m.yearsExperience,
      piecesCreated: m.piecesCreated,
      quote: m.quote,
      createdAt: now(),
      updatedAt: now(),
    })
  }

  // ── 3. Products ────────────────────────────────────────────────────────────
  for (const p of seedProducts) {
    await db.insert(schema.products).values({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      longDescription: p.longDescription,
      price: p.price,
      images: JSON.stringify(p.images),
      category: p.category,
      dimensions: JSON.stringify(p.dimensions),
      materials: JSON.stringify(p.materials),
      maalemId: p.maalem.id,
      fabricationHours: p.fabricationHours,
      configurations: JSON.stringify(p.availableConfigurations),
      inStock: p.inStock,
      featured: p.featured,
      createdAt: now(),
      updatedAt: now(),
    })
  }

  // ── 4. Articles ────────────────────────────────────────────────────────────
  for (const a of blogArticles) {
    await db.insert(schema.articles).values({
      id: a.id,
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      content: a.content,
      category: a.category,
      tags: JSON.stringify(a.tags),
      author: a.author,
      featured: a.featured,
      publishedAt: a.publishedAt,
      createdAt: now(),
      updatedAt: now(),
    })
  }

  // ── 5. Default page stubs ──────────────────────────────────────────────────
  const defaultPageSlugs = [
    'accueil',
    'notre-histoire',
    'livraison',
    'entretien',
    'faq',
    'cgv',
  ]

  for (const slug of defaultPageSlugs) {
    await db.insert(schema.pages).values({
      id: uuid(),
      slug,
      sections: JSON.stringify([]),
      updatedAt: now(),
    })
  }

  // ── 6. Default settings ────────────────────────────────────────────────────
  const defaultSettings: Array<{ key: string; value: unknown }> = [
    { key: 'site_name', value: 'Maison Attar' },
    { key: 'contact_email', value: 'contact@maisonattar.com' },
    { key: 'contact_phone', value: '+33 1 23 45 67 89' },
    { key: 'instagram', value: '@maisonattar' },
    { key: 'pinterest', value: 'maisonattar' },
    { key: 'tagline', value: 'Zellige de Fès, pour les intérieurs du monde' },
    {
      key: 'description',
      value:
        'Tables en zellige artisanal, fabriquées à Fès par nos maalems partenaires.',
    },
    { key: 'currency', value: 'EUR' },
    { key: 'free_shipping_threshold', value: 5000 },
    { key: 'fabrication_weeks', value: '6–10 semaines' },
  ]

  for (const setting of defaultSettings) {
    await db.insert(schema.settings).values({
      key: setting.key,
      value: JSON.stringify(setting.value),
    })
  }

  console.log(
    '[seed] Done. Admin: admin@maisonattar.com / attar2024'
  )
}
