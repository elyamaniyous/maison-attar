import type { Product, Maalem } from "./types";
import type { AdminUser, SiteSettings, PageContent } from "./cms";
import type { BlogArticle } from "./blog-data";

// ─── API error ────────────────────────────────────────────────────────────────

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// ─── Base fetch wrapper ───────────────────────────────────────────────────────

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    credentials: "include",
    headers: {
      ...(init?.body && !(init.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      ...init?.headers,
    },
  });

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      message = body?.error ?? body?.message ?? message;
    } catch {
      // ignore json parse errors
    }
    throw new ApiError(message, res.status);
  }

  // Handle 204 No Content
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

// ─── Auth types ───────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  user: AuthUser;
}

// ─── Page types used by admin ─────────────────────────────────────────────────

export interface CmsPage {
  slug: string;
  sections: PageContent["sections"];
  [key: string]: unknown;
}

// ─── CMS API client ───────────────────────────────────────────────────────────

export const cmsApi = {
  // ── Auth ────────────────────────────────────────────────────────────────────
  auth: {
    login: (email: string, password: string): Promise<LoginResponse> =>
      api<LoginResponse>("/api/cms/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),

    logout: (): Promise<void> =>
      api<void>("/api/cms/auth/logout", { method: "POST" }),

    me: (): Promise<AuthUser> => api<AuthUser>("/api/cms/auth/me"),
  },

  // ── Products ─────────────────────────────────────────────────────────────────
  products: {
    list: (): Promise<Product[]> => api<Product[]>("/api/cms/products"),

    get: (id: string): Promise<Product> =>
      api<Product>(`/api/cms/products/${id}`),

    create: (data: Omit<Product, "id">): Promise<Product> =>
      api<Product>("/api/cms/products", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    update: (id: string, data: Partial<Product>): Promise<Product> =>
      api<Product>(`/api/cms/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),

    delete: (id: string): Promise<void> =>
      api<void>(`/api/cms/products/${id}`, { method: "DELETE" }),
  },

  // ── Maalems ──────────────────────────────────────────────────────────────────
  maalems: {
    list: (): Promise<Maalem[]> => api<Maalem[]>("/api/cms/maalems"),

    get: (id: string): Promise<Maalem> =>
      api<Maalem>(`/api/cms/maalems/${id}`),

    create: (data: Omit<Maalem, "id">): Promise<Maalem> =>
      api<Maalem>("/api/cms/maalems", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    update: (id: string, data: Partial<Maalem>): Promise<Maalem> =>
      api<Maalem>(`/api/cms/maalems/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),

    delete: (id: string): Promise<void> =>
      api<void>(`/api/cms/maalems/${id}`, { method: "DELETE" }),
  },

  // ── Articles ─────────────────────────────────────────────────────────────────
  articles: {
    list: (): Promise<BlogArticle[]> => api<BlogArticle[]>("/api/cms/articles"),

    get: (id: string): Promise<BlogArticle> =>
      api<BlogArticle>(`/api/cms/articles/${id}`),

    create: (data: Omit<BlogArticle, "id">): Promise<BlogArticle> =>
      api<BlogArticle>("/api/cms/articles", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    update: (id: string, data: Partial<BlogArticle>): Promise<BlogArticle> =>
      api<BlogArticle>(`/api/cms/articles/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),

    delete: (id: string): Promise<void> =>
      api<void>(`/api/cms/articles/${id}`, { method: "DELETE" }),
  },

  // ── Pages ────────────────────────────────────────────────────────────────────
  pages: {
    list: (): Promise<CmsPage[]> => api<CmsPage[]>("/api/cms/pages"),

    get: (slug: string): Promise<CmsPage> =>
      api<CmsPage>(`/api/cms/pages/${slug}`),

    update: (
      slug: string,
      data: { sections: PageContent["sections"] }
    ): Promise<CmsPage> =>
      api<CmsPage>(`/api/cms/pages/${slug}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  },

  // ── Settings ─────────────────────────────────────────────────────────────────
  settings: {
    get: (): Promise<SiteSettings> => api<SiteSettings>("/api/cms/settings"),

    update: (data: Partial<SiteSettings>): Promise<SiteSettings> =>
      api<SiteSettings>("/api/cms/settings", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  },

  // ── Users ────────────────────────────────────────────────────────────────────
  users: {
    list: (): Promise<AdminUser[]> => api<AdminUser[]>("/api/cms/users"),

    get: (id: string): Promise<AdminUser> =>
      api<AdminUser>(`/api/cms/users/${id}`),

    create: (data: {
      name: string;
      email: string;
      password: string;
      role: "admin" | "editor";
    }): Promise<AdminUser> =>
      api<AdminUser>("/api/cms/users", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    update: (id: string, data: Partial<AdminUser>): Promise<AdminUser> =>
      api<AdminUser>(`/api/cms/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),

    delete: (id: string): Promise<void> =>
      api<void>(`/api/cms/users/${id}`, { method: "DELETE" }),
  },

  // ── Upload ───────────────────────────────────────────────────────────────────
  upload: async (
    file: File,
    category?: "products" | "maalems" | "articles" | "general"
  ): Promise<{ url: string; thumbUrl: string }> => {
    const form = new FormData();
    form.append("image", file);
    if (category) form.append("category", category);
    return api<{ url: string; thumbUrl: string }>("/api/cms/upload", {
      method: "POST",
      body: form,
    });
  },
};
