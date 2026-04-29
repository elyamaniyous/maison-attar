"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cmsApi, ApiError } from "@/lib/admin-api";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
  children?: { href: string; label: string }[];
};

const NAV_LINKS: NavLink[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    href: "/admin/contenu",
    label: "Contenu",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    children: [
      { href: "/admin/contenu", label: "Pages" },
      { href: "/admin/contenu/produits", label: "Produits" },
      { href: "/admin/contenu/blog", label: "Blog" },
      { href: "/admin/contenu/maalems", label: "Maalems" },
      { href: "/admin/contenu/settings", label: "Paramètres" },
    ],
  },
  {
    href: "/admin/configurateur",
    label: "Configurateur",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    href: "/admin/commandes",
    label: "Commandes",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    href: "/admin/utilisateurs",
    label: "Utilisateurs",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

type UserInfo = { name: string; email: string; role: string } | null;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function AuthGate({ onAuth }: { onAuth: (user: UserInfo) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await cmsApi.auth.login(email, password);
      const user: UserInfo = {
        name: data.user.name ?? email.split("@")[0],
        email: data.user.email ?? email,
        role: data.user.role ?? "admin",
      };
      localStorage.setItem("admin_user", JSON.stringify(user));
      onAuth(user);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setError("Identifiants incorrects");
      } else {
        setError("Erreur de connexion. Veuillez réessayer.");
      }
      setPassword("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
      <div className="w-full max-w-sm p-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#C4A265]/30 mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4A265" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
          <h1 className="font-display text-2xl text-white tracking-wide">Maison Attar</h1>
          <p className="text-[#8A8A8A] text-sm mt-1 font-body">Administration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest mb-2 font-body">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className={`w-full bg-[#1A1A1A] border rounded px-4 py-3 text-white font-body text-sm outline-none transition-colors focus:border-[#C4A265] ${
                error ? "border-[#B85C5C]" : "border-[#2A2A2A]"
              }`}
              placeholder="votre@email.com"
              autoFocus
              required
            />
          </div>
          <div>
            <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest mb-2 font-body">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className={`w-full bg-[#1A1A1A] border rounded px-4 py-3 text-white font-body text-sm outline-none transition-colors focus:border-[#C4A265] ${
                error ? "border-[#B85C5C]" : "border-[#2A2A2A]"
              }`}
              placeholder="••••••••"
              required
            />
            {error && (
              <p className="text-[#B85C5C] text-xs mt-1.5 font-body">{error}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C4A265] hover:bg-[#D4B87A] disabled:opacity-60 text-[#0F0F0F] font-body text-sm font-medium py-3 rounded transition-colors"
          >
            {loading ? "Connexion…" : "Accéder au back-office"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<UserInfo>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [contenuOpen, setContenuOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function checkAuth() {
      try {
        const me = await cmsApi.auth.me();
        if (cancelled) return;
        const userInfo: UserInfo = { name: me.name, email: me.email, role: me.role };
        localStorage.setItem("admin_user", JSON.stringify(userInfo));
        setUser(userInfo);
        setAuthenticated(true);
      } catch {
        if (cancelled) return;
        // Auth check failed (401) — clear stale localStorage and force re-login.
        // Never trust localStorage as source of truth for auth state.
        localStorage.removeItem("admin_user");
        setUser(null);
        setAuthenticated(false);
      }
    }
    checkAuth();
    return () => { cancelled = true; };
  }, []);

  // Auto-expand Contenu when on a contenu sub-route
  useEffect(() => {
    if (pathname.startsWith("/admin/contenu")) setContenuOpen(true);
  }, [pathname]);

  if (authenticated === null) {
    return <div className="min-h-screen bg-[#0F0F0F]" />;
  }

  if (!authenticated) {
    return (
      <AuthGate
        onAuth={(u) => {
          setUser(u);
          setAuthenticated(true);
        }}
      />
    );
  }

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    if (href === "/admin/contenu") return pathname === "/admin/contenu";
    return pathname.startsWith(href);
  }

  function getActiveLabel(): string {
    for (const link of NAV_LINKS) {
      if (link.children) {
        for (const child of link.children) {
          if (isActive(child.href)) return child.label;
        }
        if (isActive(link.href)) return link.label;
      } else {
        if (isActive(link.href)) return link.label;
      }
    }
    return "Admin";
  }

  const initials = user?.name ? getInitials(user.name) : "A";

  return (
    <div className="min-h-screen bg-[#111111] flex font-body">
      {/* Sidebar */}
      <aside
        className="flex flex-col bg-[#1A1A1A] border-r border-[#262626] transition-all duration-200 shrink-0"
        style={{ width: sidebarCollapsed ? 64 : 260 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-[#262626] h-[64px]">
          {!sidebarCollapsed && (
            <span className="font-display text-white text-lg tracking-wide whitespace-nowrap">
              Maison <span className="text-[#C4A265]">Attar</span>
            </span>
          )}
          {sidebarCollapsed && (
            <span className="font-display text-[#C4A265] text-lg mx-auto">M</span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {!sidebarCollapsed && (
            <p className="px-5 text-[10px] text-[#4A4A4A] uppercase tracking-widest mb-2">
              Navigation
            </p>
          )}
          <ul className="space-y-0.5 px-2">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              const hasChildren = !!link.children;
              const isContenuOpen = hasChildren && contenuOpen && !sidebarCollapsed;

              return (
                <li key={link.href}>
                  {hasChildren ? (
                    <>
                      <button
                        onClick={() => setContenuOpen((v) => !v)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded transition-colors text-sm ${
                          active || pathname.startsWith("/admin/contenu")
                            ? "bg-[#C4A265]/10 text-[#C4A265]"
                            : "text-[#8A8A8A] hover:text-white hover:bg-white/5"
                        }`}
                        title={sidebarCollapsed ? link.label : undefined}
                      >
                        <span className="shrink-0">{link.icon}</span>
                        {!sidebarCollapsed && (
                          <>
                            <span className="font-body flex-1 text-left">{link.label}</span>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`transition-transform ${contenuOpen ? "rotate-180" : ""}`}
                            >
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </>
                        )}
                      </button>
                      {isContenuOpen && (
                        <ul className="mt-0.5 ml-4 pl-3 border-l border-[#262626] space-y-0.5">
                          {link.children!.map((child) => {
                            const childActive = isActive(child.href);
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className={`flex items-center px-3 py-2 rounded text-sm transition-colors ${
                                    childActive
                                      ? "text-[#C4A265]"
                                      : "text-[#8A8A8A] hover:text-white hover:bg-white/5"
                                  }`}
                                >
                                  {child.label}
                                  {childActive && (
                                    <span className="ml-auto w-1 h-1 rounded-full bg-[#C4A265]" />
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded transition-colors text-sm ${
                        active
                          ? "bg-[#C4A265]/10 text-[#C4A265]"
                          : "text-[#8A8A8A] hover:text-white hover:bg-white/5"
                      }`}
                      title={sidebarCollapsed ? link.label : undefined}
                    >
                      <span className={`shrink-0 ${active ? "text-[#C4A265]" : ""}`}>
                        {link.icon}
                      </span>
                      {!sidebarCollapsed && (
                        <span className="font-body">{link.label}</span>
                      )}
                      {active && !sidebarCollapsed && (
                        <span className="ml-auto w-1 h-1 rounded-full bg-[#C4A265]" />
                      )}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-[#262626] px-2 py-3 space-y-1">
          <button
            onClick={() => setSidebarCollapsed((v) => !v)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-[#4A4A4A] hover:text-white hover:bg-white/5 transition-colors text-sm"
            title={sidebarCollapsed ? "Expand" : "Collapse"}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${sidebarCollapsed ? "rotate-180" : ""}`}
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            {!sidebarCollapsed && <span>Réduire</span>}
          </button>

          <button
            onClick={async () => {
              try {
                await cmsApi.auth.logout();
              } catch { /* ignore */ }
              localStorage.removeItem("admin_user");
              setAuthenticated(false);
              setUser(null);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-[#4A4A4A] hover:text-[#B85C5C] hover:bg-[#B85C5C]/5 transition-colors text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            {!sidebarCollapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Top bar */}
        <header className="h-[64px] border-b border-[#262626] bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-between px-6 shrink-0">
          <div>
            <h1 className="text-white text-sm font-medium">{getActiveLabel()}</h1>
            <p className="text-[#4A4A4A] text-xs">
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-[#8A8A8A] hover:text-white transition-colors flex items-center gap-1.5"
              target="_blank"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
              Voir le site
            </Link>
            <div
              className="w-8 h-8 rounded-full bg-[#C4A265]/20 flex items-center justify-center text-[#C4A265] text-xs font-medium cursor-default"
              title={user ? `${user.name} — ${user.role}` : "Admin"}
            >
              {initials}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
