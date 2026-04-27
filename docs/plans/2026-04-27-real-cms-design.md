# Real CMS — Design Doc

**Date:** 2026-04-27
**Status:** Approved
**Goal:** Replace the in-memory mock CMS with a production-ready CMS where admin modifications persist (texts, images, prices, articles).

## Stack

| Layer | Choice |
|-------|--------|
| Database | SQLite via `better-sqlite3` |
| ORM | Drizzle ORM (`drizzle-orm`, `drizzle-kit`) |
| Auth | bcryptjs + JWT signed with `jose`, HTTP-only cookies |
| Uploads | `formidable` + filesystem (with `sharp` for resizing) |

## Storage layout

```
/data/                          (Railway persistent volume in prod)
├── maison-attar.db             (SQLite database)
└── uploads/                    (uploaded images)
    ├── products/
    ├── maalems/
    └── articles/
```

In dev: `./data/maison-attar.db` and uploads in `./public/uploads/`.

## Schema (8 tables)

- **users** — id, email (unique), password_hash, name, role (admin|editor), created_at
- **sessions** — id, user_id, expires_at, created_at
- **products** — id, name, slug, description, long_description, price, images (JSON), category, dimensions (JSON), materials (JSON), maalem_id (FK), fabrication_hours, configurations (JSON), in_stock, featured, created_at, updated_at
- **maalems** — id, name, slug, image, portrait, bio, specialty, years_experience, pieces_created, quote, created_at, updated_at
- **articles** — id, slug, title, excerpt, content, category, tags (JSON), author, featured, published_at, created_at, updated_at
- **pages** — id, slug, sections (JSON), updated_at
- **settings** — key (PK), value (JSON)
- **orders** — id, customer_email, items (JSON), total, status, maalem_name, estimated_delivery, tracking_steps (JSON), created_at

## API routes

```
POST   /api/cms/auth/login         email + password → cookie
POST   /api/cms/auth/logout
GET    /api/cms/auth/me

CRUD   /api/cms/products
CRUD   /api/cms/maalems
CRUD   /api/cms/articles
CRUD   /api/cms/pages
CRUD   /api/cms/settings
CRUD   /api/cms/users (admin role only)
POST   /api/cms/upload             multipart, returns { url }
```

## Auth flow

1. Login form POSTs email + password
2. Server verifies bcrypt hash
3. Server signs JWT with `jose` (HS256, 7-day expiry)
4. Response sets HTTP-only cookie `ma_session`
5. Subsequent admin requests carry the cookie
6. Middleware (`middleware.ts`) checks the cookie on `/admin/*` and `/api/cms/*` routes (except `/api/cms/auth/login`)
7. If invalid/missing → redirect to `/admin/login` (or 401 for API)

## Public site reading from DB

Replace direct imports of `lib/data.ts` with helper functions in `lib/db.ts`:

```ts
export async function getProducts(): Promise<Product[]>
export async function getProductBySlug(slug: string): Promise<Product | undefined>
export async function getMaalems(): Promise<Maalem[]>
// etc.
```

Server Components await these. Use Next.js `revalidate: 60` for cache.

## Seed strategy

On first server start, if the `users` table is empty:
1. Create default admin: `admin@maisonattar.com` / `attar2024` (hashed)
2. Insert all 12 products, 4 maalems, 6 articles from `lib/data.ts` and `lib/blog-data.ts`
3. Insert default page contents for Accueil, Notre Histoire, Livraison, Entretien, FAQ, CGV
4. Insert default site settings

## Image upload

- Component `<ImageUploader />` (existing admin pages get this widget)
- `<input type="file">` + drag-drop zone
- POSTs FormData to `/api/cms/upload` with field `image` and optional `category` (products|maalems|articles)
- Server validates MIME (jpg, jpeg, png, webp), max 10MB
- Resizes to max 2000px with `sharp`, generates 400px thumb
- Saves to `/data/uploads/<category>/<uuid>.webp`
- Returns `{ url: '/uploads/<category>/<uuid>.webp', thumbUrl: '...' }`
- Next.js serves via custom route `/uploads/*` that streams from `/data/uploads/*`

## Roles

- **admin** — full access (CRUD users, all content)
- **editor** — content CRUD only, cannot manage users

Enforced server-side in API handlers.

## Deployment notes

For Railway production:
- Add a Volume mounted at `/data` (Railway dashboard → service → Volumes → Add `/data`)
- Build runs migrations via `drizzle-kit migrate`
- First request triggers seed if empty
- Without volume → DB resets on each deploy (acceptable for dev/testing)

## Migration path to Postgres (future)

Drizzle schema is portable. To migrate later:
1. Add Postgres driver
2. Change connection in `db/index.ts`
3. Run `drizzle-kit push` to create tables
4. Run a one-time export/import script

## Out of scope

- Real-time collaboration
- Version history / undo
- Multi-language content (translations)
- Workflow approvals
- Webhooks
- Analytics dashboard

These can be added later when the brand grows.
