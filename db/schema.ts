import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

// ─── users ────────────────────────────────────────────────────────────────────

export const users = sqliteTable('users', {
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

export const sessions = sqliteTable('sessions', {
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

export const maalems = sqliteTable('maalems', {
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

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  longDescription: text('long_description').notNull(),
  // price stored as integer (EUR, not cents — matches existing data shape)
  price: integer('price').notNull(),
  // JSON columns stored as text
  images: text('images').notNull(),               // string[]
  category: text('category').notNull(),
  dimensions: text('dimensions').notNull(),        // ProductDimensions
  materials: text('materials').notNull(),          // ProductMaterials
  maalemId: text('maalem_id').references(() => maalems.id, { onDelete: 'set null' }),
  fabricationHours: integer('fabrication_hours').notNull(),
  configurations: text('configurations').notNull(), // ProductConfigurations
  inStock: integer('in_stock', { mode: 'boolean' }).notNull().default(true),
  featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})

export type ProductRow = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert

// ─── articles ─────────────────────────────────────────────────────────────────

export const articles = sqliteTable('articles', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  category: text('category').notNull(),
  tags: text('tags').notNull(),   // string[] as JSON
  author: text('author').notNull(),
  featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
  publishedAt: text('published_at').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})

export type ArticleRow = typeof articles.$inferSelect
export type NewArticle = typeof articles.$inferInsert

// ─── pages ────────────────────────────────────────────────────────────────────

export const pages = sqliteTable('pages', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  sections: text('sections').notNull(), // PageSection[] as JSON
  updatedAt: text('updated_at').notNull(),
})

export type PageRow = typeof pages.$inferSelect
export type NewPage = typeof pages.$inferInsert

// ─── settings ─────────────────────────────────────────────────────────────────

export const settings = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(), // JSON-encoded value
})

export type SettingRow = typeof settings.$inferSelect
export type NewSetting = typeof settings.$inferInsert

// ─── orders ───────────────────────────────────────────────────────────────────

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  customerEmail: text('customer_email').notNull(),
  items: text('items').notNull(),           // CartItem[] as JSON
  total: integer('total').notNull(),
  status: text('status').notNull(),
  maalemName: text('maalem_name').notNull(),
  estimatedDelivery: text('estimated_delivery').notNull(),
  trackingSteps: text('tracking_steps').notNull(), // TrackingStep[] as JSON
  createdAt: text('created_at').notNull(),
})

export type OrderRow = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert
