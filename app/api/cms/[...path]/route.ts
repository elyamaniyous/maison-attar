import { NextRequest, NextResponse } from "next/server";
import {
  getContent,
  getContentById,
  updateContent,
  getSiteSettings,
  updateSiteSettings,
  getPageContent,
  updatePageContent,
  getUsers,
  createUser,
  authenticateUser,
  simpleHash,
  type AdminUser,
} from "@/lib/cms";

// ─── Auth helpers ─────────────────────────────────────────────────────────────

function getAuthUser(req: NextRequest): AdminUser | null {
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

function requireAuth(req: NextRequest): NextResponse | null {
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }
  return null;
}

function requireAdmin(req: NextRequest): NextResponse | null {
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }
  if (user.role !== "admin") {
    return NextResponse.json(
      { error: "Admin access required" },
      { status: 403 }
    );
  }
  return null;
}

// ─── Route dispatcher ─────────────────────────────────────────────────────────

type Context = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, context: Context) {
  const { path } = await context.params;
  const [resource, id] = path;

  // Auth check (all GET routes require auth)
  const authError = requireAuth(req);
  if (authError) return authError;

  // GET /api/cms/products
  // GET /api/cms/products/[id]
  if (resource === "products") {
    if (!id) {
      return NextResponse.json(getContent("products"));
    }
    const item = getContentById("products", id);
    if (!item) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json(item);
  }

  // GET /api/cms/maalems
  // GET /api/cms/maalems/[id]
  if (resource === "maalems") {
    if (!id) {
      return NextResponse.json(getContent("maalems"));
    }
    const item = getContentById("maalems", id);
    if (!item) return NextResponse.json({ error: "Maalem not found" }, { status: 404 });
    return NextResponse.json(item);
  }

  // GET /api/cms/blog
  // GET /api/cms/blog/[id]
  if (resource === "blog") {
    if (!id) {
      return NextResponse.json(getContent("blog"));
    }
    const item = getContentById("blog", id);
    if (!item) return NextResponse.json({ error: "Article not found" }, { status: 404 });
    return NextResponse.json(item);
  }

  // GET /api/cms/pages/[slug]
  if (resource === "pages") {
    if (!id) {
      return NextResponse.json(getContent("pages"));
    }
    const page = getPageContent(id);
    if (!page) return NextResponse.json({ error: "Page not found" }, { status: 404 });
    return NextResponse.json(page);
  }

  // GET /api/cms/settings
  if (resource === "settings") {
    return NextResponse.json(getSiteSettings());
  }

  // GET /api/cms/users  (admin only)
  if (resource === "users") {
    const adminError = requireAdmin(req);
    if (adminError) return adminError;
    return NextResponse.json(getUsers());
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req: NextRequest, context: Context) {
  const { path } = await context.params;
  const [resource, id] = path;

  // Auth check
  const authError = requireAuth(req);
  if (authError) return authError;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // PUT /api/cms/products/[id]
  if (resource === "products") {
    if (!id) return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    const existing = getContentById("products", id);
    if (!existing) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    updateContent("products", id, body);
    return NextResponse.json(getContentById("products", id));
  }

  // PUT /api/cms/maalems/[id]
  if (resource === "maalems") {
    if (!id) return NextResponse.json({ error: "Maalem ID required" }, { status: 400 });
    const existing = getContentById("maalems", id);
    if (!existing) return NextResponse.json({ error: "Maalem not found" }, { status: 404 });
    updateContent("maalems", id, body);
    return NextResponse.json(getContentById("maalems", id));
  }

  // PUT /api/cms/blog/[id]
  if (resource === "blog") {
    if (!id) return NextResponse.json({ error: "Article ID required" }, { status: 400 });
    const existing = getContentById("blog", id);
    if (!existing) return NextResponse.json({ error: "Article not found" }, { status: 404 });
    updateContent("blog", id, body);
    return NextResponse.json(getContentById("blog", id));
  }

  // PUT /api/cms/pages/[slug]
  if (resource === "pages") {
    if (!id) return NextResponse.json({ error: "Page slug required" }, { status: 400 });
    updatePageContent(id, body as Parameters<typeof updatePageContent>[1]);
    return NextResponse.json(getPageContent(id));
  }

  // PUT /api/cms/settings
  if (resource === "settings") {
    updateSiteSettings(body as Parameters<typeof updateSiteSettings>[0]);
    return NextResponse.json(getSiteSettings());
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function POST(req: NextRequest, context: Context) {
  const { path } = await context.params;
  const [resource, action] = path;

  // POST /api/cms/auth/login  — public, no auth needed
  if (resource === "auth" && action === "login") {
    let body: { email?: string; password?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = authenticateUser(email, password);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Return a Basic auth token the client can store and send on future requests
    const token = btoa(`${email}:${password}`);
    return NextResponse.json({ user, token });
  }

  // POST /api/cms/users  (admin only)
  if (resource === "users") {
    const adminError = requireAdmin(req);
    if (adminError) return adminError;

    let body: {
      email?: string;
      name?: string;
      role?: "admin" | "editor";
      password?: string;
    };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { email, name, role, password } = body;
    if (!email || !name || !role || !password) {
      return NextResponse.json(
        { error: "email, name, role, and password are required" },
        { status: 400 }
      );
    }

    const newUser = createUser({
      email,
      name,
      role,
      passwordHash: simpleHash(password),
    });
    return NextResponse.json(newUser, { status: 201 });
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
