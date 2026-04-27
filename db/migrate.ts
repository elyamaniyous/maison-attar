import type { Database } from 'better-sqlite3'

/**
 * Creates all tables if they don't already exist.
 * Uses raw SQL with CREATE TABLE IF NOT EXISTS — no migration tooling needed.
 */
export function initDb(sqlite: Database): void {
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id           TEXT PRIMARY KEY,
      email        TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name         TEXT NOT NULL,
      role         TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
      created_at   TEXT NOT NULL
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
      images            TEXT NOT NULL,
      category          TEXT NOT NULL,
      dimensions        TEXT NOT NULL,
      materials         TEXT NOT NULL,
      maalem_id         TEXT REFERENCES maalems(id) ON DELETE SET NULL,
      fabrication_hours INTEGER NOT NULL,
      configurations    TEXT NOT NULL,
      in_stock          INTEGER NOT NULL DEFAULT 1,
      featured          INTEGER NOT NULL DEFAULT 0,
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
      tags         TEXT NOT NULL,
      author       TEXT NOT NULL,
      featured     INTEGER NOT NULL DEFAULT 0,
      published_at TEXT NOT NULL,
      created_at   TEXT NOT NULL,
      updated_at   TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS pages (
      id         TEXT PRIMARY KEY,
      slug       TEXT NOT NULL UNIQUE,
      sections   TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS orders (
      id                 TEXT PRIMARY KEY,
      customer_email     TEXT NOT NULL,
      items              TEXT NOT NULL,
      total              INTEGER NOT NULL,
      status             TEXT NOT NULL,
      maalem_name        TEXT NOT NULL,
      estimated_delivery TEXT NOT NULL,
      tracking_steps     TEXT NOT NULL,
      created_at         TEXT NOT NULL
    );
  `)
}
