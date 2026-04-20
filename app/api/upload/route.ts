import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "@/lib/cms";

// ─── Constants ────────────────────────────────────────────────────────────────

const ALLOWED_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

// ─── Auth ─────────────────────────────────────────────────────────────────────

function getAuthUser(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) return null;

  let decoded: string;
  try {
    decoded = atob(authHeader.slice(6));
  } catch {
    return null;
  }

  const colonIdx = decoded.indexOf(":");
  if (colonIdx === -1) return null;

  const email = decoded.slice(0, colonIdx);
  const password = decoded.slice(colonIdx + 1);
  return authenticateUser(email, password);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildFilename(originalName: string): string {
  const ext = originalName.split(".").pop()?.toLowerCase() ?? "jpg";
  const safeName = originalName
    .replace(/\.[^.]+$/, "")          // strip extension
    .replace(/[^a-z0-9_-]/gi, "-")   // only safe chars
    .slice(0, 60)                      // cap length
    .toLowerCase();
  return `${Date.now()}-${safeName}.${ext}`;
}

// ─── Upload strategies ────────────────────────────────────────────────────────

/**
 * Production path: store in Vercel Blob.
 * Requires BLOB_READ_WRITE_TOKEN to be set (auto-injected by Vercel Marketplace).
 */
async function uploadToBlob(file: File, filename: string): Promise<string> {
  const { put } = await import("@vercel/blob");
  const blob = await put(`uploads/${filename}`, file, { access: "public" });
  return blob.url;
}

/**
 * Development / self-hosted fallback: write to /public/images/uploads/.
 * This path is ephemeral on Vercel serverless — only use locally.
 */
async function uploadToLocalDisk(file: File, filename: string): Promise<string> {
  const { writeFile, mkdir } = await import("fs/promises");
  const { join } = await import("path");

  const uploadDir = join(process.cwd(), "public", "images", "uploads");
  await mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(join(uploadDir, filename), buffer);
  return `/images/uploads/${filename}`;
}

// ─── POST /api/upload ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Require auth
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  // Parse multipart form data
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("image");
  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: 'No image file provided. Send a multipart/form-data field named "image".' },
      { status: 400 }
    );
  }

  // Validate MIME type
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      {
        error: `Unsupported file type "${file.type}". Allowed: jpg, jpeg, png, webp.`,
      },
      { status: 415 }
    );
  }

  // Validate size
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json(
      {
        error: `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum allowed: 5 MB.`,
      },
      { status: 413 }
    );
  }

  const filename = buildFilename(file.name);

  let url: string;
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Vercel production: use Blob storage (persistent, CDN-delivered)
      url = await uploadToBlob(file, filename);
    } else {
      // Local dev / self-hosted: write to public directory
      url = await uploadToLocalDisk(file, filename);
    }
  } catch (err) {
    console.error("[upload] Failed to store file:", err);
    return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
  }

  return NextResponse.json(
    { url, filename, size: file.size, type: file.type },
    { status: 201 }
  );
}
