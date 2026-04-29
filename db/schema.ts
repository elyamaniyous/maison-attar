import { pgTable, text, integer, boolean, jsonb } from 'drizzle-orm/pg-core'

// ─── users ────────────────────────────────────────────────────────────────────

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  role: text('role', { enum: ['admin', 'editor'] }).notNull().default('editor'),
  createdAt: text('created_at').notNull(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

// ─── sessions ─────────────────────────────────────────────────────────────────

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: text('expires_at').notNull(),
  createdAt: text('created_at').notNull(),
})

export type Session = typeof sessions.$inferSelect
export type NewSession = typeof sessions.$inferInsert

// ─── maalems ─────────────────────────────────────────────────────────────────

export const maalems = pgTable('maalems', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  image: text('image').notNull(),
  portrait: text('portrait').notNull(),
  bio: text('bio').notNull(),
  specialty: text('specialty').notNull(),
  yearsExperience: integer('years_experience').notNull(),
  piecesCreated: integer('pieces_created').notNull(),
  quote: text('quote').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})

export type MaalemRow = typeof maalems.$inferSelect
export type NewMaalem = typeof maalems.$inferInsert

// ─── products ─────────────────────────────────────────────────────────────────

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  longDescription: text('long_description').notNull(),
  // price stored as integer (EUR, not cents — matches existing data shape)
  price: integer('price').notNull(),
  // JSON columns stored as jsonb (Postgres native, indexable, queryable)
  images: jsonb('images').notNull(),               // string[]
  category: text('category').notNull(),
  dimensions: jsonb('dimensions').notNull(),        // ProductDimensions
  materials: jsonb('materials').notNull(),          // ProductMaterials
  maalemId: text('maalem_id').references(() => maalems.id, { onDelete: 'set null' }),
  fabricationHours: integer('fabrication_hours').notNull(),
  configurations: jsonb('configurations').notNull(), // ProductConfigurations
  inStock: boolean('in_stock').notNull().default(true),
  featured: boolean('featured').notNull().default(false),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})

export type ProductRow = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert

// ─── articles ─────────────────────────────────────────────────────────────────

export const articles = pgTable('articles', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  category: text('category').notNull(),
  tags: jsonb('tags').notNull(),   // string[] as jsonb
  author: text('author').notNull(),
  featured: boolean('featured').notNull().default(false),
  publishedAt: text('published_at').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})

export type ArticleRow = typeof articles.$inferSelect
export type NewArticle = typeof articles.$inferInsert

// ─── pages ────────────────────────────────────────────────────────────────────

export const pages = pgTable('pages', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  sections: jsonb('sections').notNull(), // PageSections object as jsonb
  updatedAt: text('updated_at').notNull(),
})

export type PageRow = typeof pages.$inferSelect
export type NewPage = typeof pages.$inferInsert

// ─── settings ─────────────────────────────────────────────────────────────────

export const settings = pgTable('settings', {
  key: text('key').primaryKey(),
  value: jsonb('value').notNull(), // JSON-encoded value
})

export type SettingRow = typeof settings.$inferSelect
export type NewSetting = typeof settings.$inferInsert

// ─── orders ───────────────────────────────────────────────────────────────────

export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  customerEmail: text('customer_email').notNull(),
  items: jsonb('items').notNull(),           // CartItem[] as jsonb
  total: integer('total').notNull(),
  status: text('status').notNull(),
  maalemName: text('maalem_name').notNull(),
  estimatedDelivery: text('estimated_delivery').notNull(),
  trackingSteps: jsonb('tracking_steps').notNull(), // TrackingStep[] as jsonb
  createdAt: text('created_at').notNull(),
})

export type OrderRow = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert
