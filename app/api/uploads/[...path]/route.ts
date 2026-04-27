import { NextRequest } from 'next/server'
import path from 'node:path'
import fs from 'node:fs'

type Ctx = { params: Promise<{ path: string[] }> }

function getUploadsDir(): string {
  if (fs.existsSync('/data')) return '/data/uploads'
  if (process.env.UPLOADS_DIR) return process.env.UPLOADS_DIR
  return path.join(process.cwd(), 'public', 'uploads')
}

// ─── GET /api/uploads/[...path] ───────────────────────────────────────────────
// Serves uploaded files from UPLOADS_DIR when it lives outside public/.
// If UPLOADS_DIR is inside public/, Next.js serves the files directly and
// this route is a harmless fallback.

export async function GET(_req: NextRequest, ctx: Ctx) {
  try {
    const { path: segments } = await ctx.params

    // Guard against path traversal
    const relativePath = segments.join('/')
    if (relativePath.includes('..')) {
      return new Response('Forbidden', { status: 403 })
    }

    const uploadsDir = getUploadsDir()
    const filePath = path.join(uploadsDir, relativePath)

    // Ensure the resolved path stays within uploadsDir
    const resolved = path.resolve(filePath)
    if (!resolved.startsWith(path.resolve(uploadsDir))) {
      return new Response('Forbidden', { status: 403 })
    }

    let fileBuffer: Buffer
    try {
      fileBuffer = await fs.promises.readFile(resolved)
    } catch {
      return new Response('Not found', { status: 404 })
    }

    // Determine content type from extension
    const ext = path.extname(resolved).toLowerCase()
    const contentTypeMap: Record<string, string> = {
      '.webp': 'image/webp',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
    }
    const contentType = contentTypeMap[ext] ?? 'application/octet-stream'

    return new Response(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': String(fileBuffer.length),
      },
    })
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.error('[api/uploads]', err)
    return new Response('Internal server error', { status: 500 })
  }
}
