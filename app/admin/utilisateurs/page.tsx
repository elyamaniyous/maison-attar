"use client";

import { useState, useEffect } from "react";
import { cmsApi, ApiError } from "@/lib/admin-api";
import type { AdminUser } from "@/lib/cms";

type Role = "admin" | "editor";

function formatDateTime(iso: string) {
  if (!iso || iso === "—") return "—";
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type FormState = { name: string; email: string; password: string; role: Role };
type FormErrors = Partial<FormState>;

const emptyForm: FormState = { name: "", email: "", password: "", role: "editor" };

export default function UtilisateursPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await cmsApi.users.list();
        if (!cancelled) setUsers(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof ApiError ? err.message : "Erreur de chargement");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const currentUser = users.find((u) => u.role === "admin");

  function updateForm<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Nom requis";
    if (!validateEmail(form.email)) errs.email = "Email invalide";
    if (form.password.length < 6) errs.password = "Minimum 6 caractères";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function createUser() {
    if (!validate()) return;
    setCreating(true);
    setError(null);
    try {
      const newUser = await cmsApi.users.create(form);
      setUsers((prev) => [...prev, newUser]);
      setCreating(false);
      setCreated(true);
      setTimeout(() => {
        setCreated(false);
        setShowForm(false);
        setForm(emptyForm);
      }, 1500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erreur lors de la création");
      setCreating(false);
    }
  }

  async function deleteUser(id: string) {
    setDeleting(id);
    setError(null);
    try {
      await cmsApi.users.delete(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erreur lors de la suppression");
    } finally {
      setDeleting(null);
    }
  }

  async function copyCredentials(user: AdminUser) {
    const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://maison-attar.com";
    const text = [
      "Votre accès Maison Attar Admin :",
      `URL : ${siteUrl}/admin`,
      `Email : ${user.email}`,
      "Mot de passe : (tel que défini)",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(user.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch { /* clipboard not available */ }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-white text-2xl font-display tracking-wide">Utilisateurs</h2>
          <p className="text-[#4A4A4A] text-sm mt-0.5">
            {loading ? "Chargement…" : `${users.length} compte${users.length > 1 ? "s" : ""} administrateur`}
          </p>
        </div>
        <button
          onClick={() => { setShowForm(true); setForm(emptyForm); setErrors({}); setCreated(false); setError(null); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#C4A265] hover:bg-[#D4B87A] text-[#0F0F0F] text-sm font-medium rounded transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Ajouter un utilisateur
        </button>
      </div>

      {error && (
        <div className="bg-[#B85C5C]/10 border border-[#B85C5C]/30 rounded p-3 text-[#B85C5C] text-sm">{error}</div>
      )}

      {/* User list */}
      <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-[#262626]">
          <span className="text-[#8A8A8A] text-xs uppercase tracking-widest">Comptes</span>
        </div>
        {loading ? (
          <div className="flex items-center gap-3 text-[#8A8A8A] text-sm p-6">
            <div className="w-5 h-5 border-2 border-[#C4A265]/30 border-t-[#C4A265] rounded-full animate-spin" />
            Chargement…
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#262626]">
                {["Utilisateur", "Rôle", "Dernière connexion", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] text-[#4A4A4A] uppercase tracking-widest font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-[#1F1F1F] last:border-b-0">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C4A265]/20 flex items-center justify-center text-[#C4A265] text-xs font-medium shrink-0">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <p className="text-white text-sm">{user.name}</p>
                        <p className="text-[#4A4A4A] text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${
                      user.role === "admin"
                        ? "bg-[#C4A265]/10 text-[#C4A265] border-[#C4A265]/20"
                        : "bg-white/5 text-[#8A8A8A] border-[#262626]"
                    }`}>
                      {user.role === "admin" ? "Administrateur" : "Éditeur"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-[#8A8A8A] text-xs">
                      {user.lastLogin ? formatDateTime(user.lastLogin) : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => copyCredentials(user)}
                        className="text-xs text-[#8A8A8A] hover:text-[#C4A265] border border-[#262626] hover:border-[#C4A265]/30 rounded px-2.5 py-1.5 transition-colors flex items-center gap-1.5"
                        title="Copier les identifiants"
                      >
                        {copiedId === user.id ? (
                          <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Copié
                          </>
                        ) : (
                          <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                            </svg>
                            Partager
                          </>
                        )}
                      </button>
                      {deleteConfirm === user.id ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-[#8A8A8A]">Confirmer ?</span>
                          <button
                            onClick={() => deleteUser(user.id)}
                            disabled={deleting === user.id}
                            className="text-xs text-[#B85C5C] hover:text-red-400 transition-colors disabled:opacity-60"
                          >
                            {deleting === user.id ? "…" : "Oui"}
                          </button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-xs text-[#4A4A4A] hover:text-white transition-colors">Non</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(user.id)}
                          disabled={user.role === "admin" && users.filter((u) => u.role === "admin").length <= 1}
                          className="text-xs text-[#4A4A4A] hover:text-[#B85C5C] border border-[#262626] hover:border-[#B85C5C]/30 rounded px-2.5 py-1.5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          title={user.role === "admin" && users.filter((u) => u.role === "admin").length <= 1 ? "Impossible de supprimer le seul administrateur" : "Supprimer"}
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-[#4A4A4A] text-sm">Aucun utilisateur.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add user form */}
      {showForm && (
        <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-[#262626] flex items-center justify-between">
            <span className="text-[#8A8A8A] text-xs uppercase tracking-widest">Nouvel utilisateur</span>
            <button onClick={() => setShowForm(false)} className="text-[#4A4A4A] hover:text-white transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest mb-1.5">Nom complet</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  className={`${inputCls} ${errors.name ? "border-[#B85C5C]" : ""}`}
                  placeholder="Prénom Nom"
                />
                {errors.name && <p className="text-[#B85C5C] text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest mb-1.5">Rôle</label>
                <select value={form.role} onChange={(e) => updateForm("role", e.target.value as Role)} className={inputCls}>
                  <option value="editor">Éditeur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateForm("email", e.target.value)}
                className={`${inputCls} ${errors.email ? "border-[#B85C5C]" : ""}`}
                placeholder="email@domaine.com"
              />
              {errors.email && <p className="text-[#B85C5C] text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest mb-1.5">Mot de passe</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => updateForm("password", e.target.value)}
                className={`${inputCls} ${errors.password ? "border-[#B85C5C]" : ""}`}
                placeholder="Minimum 6 caractères"
              />
              {errors.password && <p className="text-[#B85C5C] text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-[#262626] hover:border-[#444] text-[#8A8A8A] hover:text-white rounded text-sm transition-colors">
                Annuler
              </button>
              <button
                onClick={createUser}
                disabled={creating || created}
                className="flex items-center gap-2 px-4 py-2 bg-[#C4A265] hover:bg-[#D4B87A] disabled:opacity-60 text-[#0F0F0F] text-sm font-medium rounded transition-colors"
              >
                {created ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Créé !
                  </>
                ) : creating ? (
                  <><div className="w-3.5 h-3.5 border border-[#0F0F0F]/40 border-t-[#0F0F0F] rounded-full animate-spin" />Création…</>
                ) : "Créer l'utilisateur"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share access info */}
      <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-[#262626]">
          <span className="text-[#8A8A8A] text-xs uppercase tracking-widest">Partager l&apos;accès</span>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-[#8A8A8A] text-sm">
            Pour donner accès au back-office à un collaborateur, créez un compte ci-dessus puis copiez les identifiants.
          </p>
          <div className="bg-[#111111] border border-[#262626] rounded p-4 space-y-1 font-mono text-xs text-[#8A8A8A]">
            <p><span className="text-[#4A4A4A]">Votre accès Maison Attar Admin :</span></p>
            <p><span className="text-[#C4A265]">URL :</span> {typeof window !== "undefined" ? window.location.origin : "https://maison-attar.com"}/admin</p>
            <p><span className="text-[#C4A265]">Email :</span> {currentUser?.email ?? "admin@maisonattar.com"}</p>
            <p><span className="text-[#C4A265]">Mot de passe :</span> (tel que défini)</p>
          </div>
          {currentUser && (
            <button
              onClick={() => copyCredentials(currentUser)}
              className="flex items-center gap-2 px-4 py-2 border border-[#262626] hover:border-[#C4A265] text-[#8A8A8A] hover:text-[#C4A265] rounded text-sm transition-colors"
            >
              {copiedId === currentUser.id ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copié dans le presse-papiers
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  Copier les identifiants
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full bg-[#111111] border border-[#262626] rounded px-3 py-2 text-white text-sm outline-none focus:border-[#C4A265] transition-colors";
