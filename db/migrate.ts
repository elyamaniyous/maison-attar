/**
 * db/migrate.ts
 *
 * Creates all tables if they don't already exist.
 * Uses raw SQL with CREATE TABLE IF NOT EXISTS — idempotent and safe to
 * call across multiple processes.
 */

import type { Sql } from 'postgres'

export async function initDb(sql: Sql): Promise<void> {
  // Postgres allows multiple statements in a single query call.
  // CREATE TABLE IF NOT EXISTS makes this idempotent across deploys.

  await sql.unsafe(`
    CREATE TABLE IF NOT EXISTS users (
      id            TEXT PRIMARY KEY,
      email         TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name          TEXT NOT NULL,
      role          TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
      created_at    TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id         TEXT PRIMARY KEY,
      user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS maalems (
      id               TEXT PRIMARY KEY,
      name             TEXT NOT NULL,
      slug             TEXT NOT NULL UNIQUE,
      image            TEXT NOT NULL,
      portrait         TEXT NOT NULL,
      bio              TEXT NOT NULL,
      specialty        TEXT NOT NULL,
      years_experience INTEGER NOT NULL,
      pieces_created   INTEGER NOT NULL,
      quote            TEXT NOT NULL,
      created_at       TEXT NOT NULL,
      updated_at       TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id                TEXT PRIMARY KEY,
      name              TEXT NOT NULL,
      slug              TEXT NOT NULL UNIQUE,
      description       TEXT NOT NULL,
      long_description  TEXT NOT NULL,
      price             INTEGER NOT NULL,
      images            JSONB NOT NULL,
      category          TEXT NOT NULL,
      dimensions        JSONB NOT NULL,
      materials         JSONB NOT NULL,
      maalem_id         TEXT REFERENCES maalems(id) ON DELETE SET NULL,
      fabrication_hours INTEGER NOT NULL,
      configurations    JSONB NOT NULL,
      in_stock          BOOLEAN NOT NULL DEFAULT TRUE,
      featured          BOOLEAN NOT NULL DEFAULT FALSE,
      created_at        TEXT NOT NULL,
      updated_at        TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS articles (
      id           TEXT PRIMARY KEY,
      slug         TEXT NOT NULL UNIQUE,
      title        TEXT NOT NULL,
      excerpt      TEXT NOT NULL,
      content      TEXT NOT NULL,
      category     TEXT NOT NULL,
      tags         JSONB NOT NULL,
      author       TEXT NOT NULL,
      featured     BOOLEAN NOT NULL DEFAULT FALSE,
      published_at TEXT NOT NULL,
      created_at   TEXT NOT NULL,
      updated_at   TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS pages (
      id         TEXT PRIMARY KEY,
      slug       TEXT NOT NULL UNIQUE,
      sections   JSONB NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
      key   TEXT PRIMARY KEY,
      value JSONB NOT NULL
    );

    CREATE TABLE IF NOT EXISTS orders (
      id                 TEXT PRIMARY KEY,
      customer_email     TEXT NOT NULL,
      items              JSONB NOT NULL,
      total              INTEGER NOT NULL,
      status             TEXT NOT NULL,
      maalem_name        TEXT NOT NULL,
      estimated_delivery TEXT NOT NULL,
      tracking_steps     JSONB NOT NULL,
      created_at         TEXT NOT NULL
    );
  `)
}
