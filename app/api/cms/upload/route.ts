import { requireAuth, AuthError } from '@/lib/auth'
import { NextRequest } from 'next/server'
import path from 'node:path'
import sharp from 'sharp'

// ─── Constants ────────────────────────────────────────────────────────────────

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp'])
const MAX_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB
const ALLOWED_CATEGORIES = new Set(['products', 'maalems', 'articles', 'general'])

// ─── Storage helpers ──────────────────────────────────────────────────────────

/**
 * Returns the uploads directory.
 * Prefers /data/uploads when /data exists (self-hosted production),
 * then UPLOADS_DIR env var, then public/uploads (local dev).
 */
async function getUploadsDir(): Promise<string | null> {
  const { existsSync } = await import('node:fs')
  if (existsSync('/data')) return '/data/uploads'
  if (process.env.UPLOADS_DIR) return process.env.UPLOADS_DIR
  // If we're in a serverless context without a writable dir, return null
  if (process.env.VERCEL && !process.env.UPLOADS_DIR) return null
  return path.join(process.cwd(), 'public', 'uploads')
}

function getUrlForLocalPath(uploadsDir: string, relativePath: string): string {
  const publicDir = path.join(process.cwd(), 'public')
  if (uploadsDir.startsWith(publicDir)) {
    // Served by Next.js static file serving
    const prefix = uploadsDir.slice(publicDir.length).replace(/\\/g, '/')
    return `${prefix}/${relativePath}`
  }
  // Served by /api/uploads/[...path]
  return `/api/uploads/${relativePath}`
}

async function uploadToBlob(
  fullBuffer: Buffer,
  thumbBuffer: Buffer,
  category: string,
  uuid: string
): Promise<{ url: string; thumbUrl: string }> {
  const { put } = await import('@vercel/blob')
  const [fullBlob, thumbBlob] = await Promise.all([
    put(`uploads/${category}/${uuid}.webp`, fullBuffer, {
      access: 'public',
      contentType: 'image/webp',
    }),
    put(`uploads/${category}/${uuid}-thumb.webp`, thumbBuffer, {
      access: 'public',
      contentType: 'image/webp',
    }),
  ])
  return { url: fullBlob.url, thumbUrl: thumbBlob.url }
}

async function uploadToLocalDisk(
  fullBuffer: Buffer,
  thumbBuffer: Buffer,
  uploadsDir: string,
  category: string,
  uuid: string
): Promise<{ url: string; thumbUrl: string }> {
  const { mkdir, writeFile } = await import('node:fs/promises')
  const categoryDir = path.join(uploadsDir, category)
  await mkdir(categoryDir, { recursive: true })
  const fullFilename = `${uuid}.webp`
  const thumbFilename = `${uuid}-thumb.webp`
  await writeFile(path.join(categoryDir, fullFilename), fullBuffer)
  await writeFile(path.join(categoryDir, thumbFilename), thumbBuffer)
  return {
    url: getUrlForLocalPath(uploadsDir, `${category}/${fullFilename}`),
    thumbUrl: getUrlForLocalPath(uploadsDir, `${category}/${thumbFilename}`),
  }
}

// ─── POST /api/cms/upload ─────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    await requireAuth()

    let formData: FormData
    try {
      formData = await req.formData()
    } catch {
      return Response.json({ error: 'Invalid multipart form data' }, { status: 400 })
    }

    const file = formData.get('image')
    if (!file || !(file instanceof File)) {
      return Response.json(
        { error: 'No image provided. Send a multipart/form-data field named "image".' },
        { status: 400 }
      )
    }

    // Validate MIME type
    if (!ALLOWED_TYPES.has(file.type)) {
      return Response.json(
        { error: `Unsupported file type "${file.type}". Allowed: jpeg, jpg, png, webp.` },
        { status: 415 }
      )
    }

    // Validate size
    if (file.size > MAX_SIZE_BYTES) {
      return Response.json(
        { error: `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum: 10 MB.` },
        { status: 413 }
      )
    }

    // Validate category
    const categoryRaw = formData.get('category')
    const category =
      typeof categoryRaw === 'string' && ALLOWED_CATEGORIES.has(categoryRaw)
        ? categoryRaw
        : 'general'

    // Convert File → Buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    const uuid = crypto.randomUUID()

    // Process with sharp: full-size + thumbnail
    const [fullBuffer, thumbBuffer] = await Promise.all([
      sharp(buffer)
        .resize({ width: 2000, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer(),
      sharp(buffer)
        .resize({ width: 400, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer(),
    ])

    let result: { url: string; thumbUrl: string }

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Vercel Blob — persistent, CDN-delivered
      result = await uploadToBlob(fullBuffer, thumbBuffer, category, uuid)
    } else {
      const uploadsDir = await getUploadsDir()
      if (!uploadsDir) {
        return Response.json(
          { error: 'No writable storage configured. Set UPLOADS_DIR or BLOB_READ_WRITE_TOKEN.' },
          { status: 500 }
        )
      }
      result = await uploadToLocalDisk(fullBuffer, thumbBuffer, uploadsDir, category, uuid)
    }

    return Response.json(result, { status: 201 })
  } catch (e) {
    if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status })
    if (process.env.NODE_ENV !== 'production') console.error('[cms/upload POST]', e)
    return Response.json({ error: 'Failed to process upload' }, { status: 500 })
  }
}
