"use client";

import { useState, useEffect } from "react";
import { cmsApi, ApiError } from "@/lib/admin-api";
import ImageUploader from "@/components/admin/ImageUploader";
import type { BlogArticle } from "@/lib/blog-data";

const CATEGORIES: BlogArticle["category"][] = [
  "artisanat",
  "zellige",
  "decoration",
  "guide",
  "fes",
  "entretien",
];

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function blankArticle(): Omit<BlogArticle, "id"> {
  return {
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    category: "artisanat",
    tags: [],
    author: "",
    publishedAt: new Date().toISOString().split("T")[0],
    readingTime: 5,
    featured: false,
    seoTitle: "",
    seoDescription: "",
    geoKeywords: [],
  };
}

type EditingArticle = BlogArticle | (Omit<BlogArticle, "id"> & { id?: string });

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [editing, setEditing] = useState<EditingArticle | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [geoInput, setGeoInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await cmsApi.articles.list();
        if (!cancelled) setArticles(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof ApiError ? err.message : "Erreur de chargement");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  function newArticle() {
    setEditing(blankArticle());
    setIsNew(true);
    setTagInput("");
    setGeoInput("");
    setSaved(false);
    setError(null);
  }

  function openEditor(article: BlogArticle) {
    setEditing(JSON.parse(JSON.stringify(article)));
    setIsNew(false);
    setTagInput("");
    setGeoInput("");
    setSaved(false);
    setError(null);
  }

  function closeEditor() {
    setEditing(null);
    setIsNew(false);
    setSaved(false);
    setError(null);
  }

  function updateField<K extends keyof BlogArticle>(key: K, value: BlogArticle[K]) {
    if (!editing) return;
    const updated = { ...editing, [key]: value } as EditingArticle;
    if (key === "title" && isNew && !editing.slug) {
      (updated as Record<string, unknown>).slug = slugify(String(value));
    }
    setEditing(updated);
  }

  function addTag() {
    if (!editing || !tagInput.trim()) return;
    const tag = tagInput.trim().toLowerCase();
    if (!editing.tags.includes(tag)) {
      setEditing({ ...editing, tags: [...editing.tags, tag] });
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    if (!editing) return;
    setEditing({ ...editing, tags: editing.tags.filter((t) => t !== tag) });
  }

  function addGeoKeyword() {
    if (!editing || !geoInput.trim()) return;
    const kw = geoInput.trim().toLowerCase();
    if (!editing.geoKeywords.includes(kw)) {
      setEditing({ ...editing, geoKeywords: [...editing.geoKeywords, kw] });
    }
    setGeoInput("");
  }

  function removeGeoKeyword(kw: string) {
    if (!editing) return;
    setEditing({ ...editing, geoKeywords: editing.geoKeywords.filter((k) => k !== kw) });
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setError(null);
    try {
      if (isNew) {
        const created = await cmsApi.articles.create(editing as Omit<BlogArticle, "id">);
        setArticles((prev) => [created, ...prev]);
      } else if ((editing as BlogArticle).id) {
        const id = (editing as BlogArticle).id;
        const updated = await cmsApi.articles.update(id, editing as BlogArticle);
        setArticles((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      }
      setSaved(true);
      setTimeout(() => { setSaved(false); closeEditor(); }, 1200);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  async function deleteArticle(id: string) {
    setDeleting(id);
    setError(null);
    try {
      await cmsApi.articles.delete(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erreur lors de la suppression");
    } finally {
      setDeleting(null);
    }
  }

  // ── Editor view ─────────────────────────────────────────────────────────────
  if (editing) {
    return (
      <div className="max-w-3xl space-y-6">
        <div className="flex items-center gap-4 flex-wrap">
          <button onClick={closeEditor} className="flex items-center gap-1.5 text-[#8A8A8A] hover:text-white transition-colors text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
          <div className="h-4 w-px bg-[#262626]" />
          <h2 className="text-white text-xl font-display tracking-wide">{isNew ? "Nouvel article" : "Modifier l'article"}</h2>
          <div className="ml-auto flex items-center gap-3">
            {saved && (
              <span className="text-emerald-400 text-xs flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Sauvegardé
              </span>
            )}
            <button onClick={closeEditor} className="px-4 py-2 border border-[#262626] hover:border-[#444] text-[#8A8A8A] hover:text-white rounded text-sm transition-colors">
              Annuler
            </button>
            <button onClick={save} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-[#C4A265] hover:bg-[#D4B87A] disabled:opacity-60 text-[#0F0F0F] text-sm font-medium rounded transition-colors">
              {saving ? <><div className="w-3.5 h-3.5 border border-[#0F0F0F]/40 border-t-[#0F0F0F] rounded-full animate-spin" />Sauvegarde…</> : "Sauvegarder"}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-[#B85C5C]/10 border border-[#B85C5C]/30 rounded p-3 text-[#B85C5C] text-sm">{error}</div>
        )}

        <div className="space-y-4">
          {/* Article */}
          <Panel title="Article">
            <Field label="Titre">
              <input type="text" value={editing.title} onChange={(e) => updateField("title", e.target.value)} className={inputCls} placeholder="Titre de l'article" />
            </Field>
            <Field label="Slug (URL)">
              <input type="text" value={editing.slug} onChange={(e) => updateField("slug", e.target.value)} className={inputCls} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Catégorie">
                <select value={editing.category} onChange={(e) => updateField("category", e.target.value as BlogArticle["category"])} className={inputCls}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Auteur">
                <input type="text" value={editing.author} onChange={(e) => updateField("author", e.target.value)} className={inputCls} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date de publication">
                <input type="date" value={editing.publishedAt} onChange={(e) => updateField("publishedAt", e.target.value)} className={inputCls} />
              </Field>
              <Field label="Temps de lecture (min)">
                <input type="number" value={editing.readingTime} onChange={(e) => updateField("readingTime", Number(e.target.value))} className={inputCls} min={1} />
              </Field>
            </div>
            <Field label="Extrait">
              <textarea value={editing.excerpt} onChange={(e) => updateField("excerpt", e.target.value)} rows={2} className={`${inputCls} resize-none`} placeholder="Courte description affichée dans les listes" />
            </Field>
          </Panel>

          {/* Image de couverture */}
          <Panel title="Image de couverture">
            <ImageUploader
              value={(editing as Record<string, unknown>).coverImage as string | undefined ?? ""}
              onChange={(url) => updateField("coverImage" as keyof BlogArticle, url as BlogArticle[keyof BlogArticle])}
              category="articles"
              label="Image principale"
            />
          </Panel>

          {/* Content */}
          <Panel title="Contenu (Markdown)">
            <textarea
              value={editing.content}
              onChange={(e) => updateField("content", e.target.value)}
              rows={14}
              className={`${inputCls} resize-y font-mono text-xs`}
              placeholder="# Titre&#10;&#10;Rédigez votre article en Markdown..."
            />
          </Panel>

          {/* Tags */}
          <Panel title="Tags">
            <div className="flex flex-wrap gap-2 mb-2">
              {editing.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C4A265]/10 border border-[#C4A265]/30 text-[#C4A265] text-xs">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-white transition-colors">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                placeholder="Ajouter un tag…"
                className={`${inputCls} flex-1`}
              />
              <button type="button" onClick={addTag} className="px-3 py-2 border border-[#262626] hover:border-[#C4A265] text-[#8A8A8A] hover:text-[#C4A265] rounded text-sm transition-colors">
                Ajouter
              </button>
            </div>
          </Panel>

          {/* GEO Keywords */}
          <Panel title="Mots-clés GEO">
            <div className="flex flex-wrap gap-2 mb-2">
              {editing.geoKeywords.map((kw) => (
                <span key={kw} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-[#262626] text-[#8A8A8A] text-xs">
                  {kw}
                  <button type="button" onClick={() => removeGeoKeyword(kw)} className="hover:text-white transition-colors">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={geoInput}
                onChange={(e) => setGeoInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addGeoKeyword(); } }}
                placeholder="Ex : zellige paris, table marocaine…"
                className={`${inputCls} flex-1`}
              />
              <button type="button" onClick={addGeoKeyword} className="px-3 py-2 border border-[#262626] hover:border-[#C4A265] text-[#8A8A8A] hover:text-[#C4A265] rounded text-sm transition-colors">
                Ajouter
              </button>
            </div>
          </Panel>

          {/* SEO */}
          <Panel title="SEO">
            <Field label="Titre SEO">
              <input type="text" value={editing.seoTitle} onChange={(e) => updateField("seoTitle", e.target.value)} className={inputCls} placeholder="Titre optimisé pour les moteurs de recherche" />
            </Field>
            <Field label="Description SEO">
              <textarea value={editing.seoDescription} onChange={(e) => updateField("seoDescription", e.target.value)} rows={2} className={`${inputCls} resize-none`} placeholder="Description meta (150-160 caractères recommandés)" />
              <p className={`text-xs mt-1 ${editing.seoDescription.length > 160 ? "text-[#B85C5C]" : "text-[#4A4A4A]"}`}>
                {editing.seoDescription.length}/160 caractères
              </p>
            </Field>
          </Panel>

          {/* Options */}
          <Panel title="Options">
            <div
              className={`flex items-center justify-between p-3 rounded border cursor-pointer transition-colors ${
                editing.featured ? "border-[#C4A265]/30 bg-[#C4A265]/5" : "border-[#262626] hover:border-[#333]"
              }`}
              onClick={() => updateField("featured", !editing.featured)}
            >
              <div>
                <p className="text-white text-sm">Article mis en avant</p>
                <p className="text-[#4A4A4A] text-xs">Affiché en priorité sur la page blog</p>
              </div>
              <div className={`relative w-9 h-5 rounded-full transition-colors ${editing.featured ? "bg-[#C4A265]" : "bg-[#333]"}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${editing.featured ? "translate-x-4" : "translate-x-0.5"}`} />
              </div>
            </div>
          </Panel>
        </div>

        <div className="flex justify-end gap-3 pb-6">
          <button onClick={closeEditor} className="px-4 py-2 border border-[#262626] hover:border-[#444] text-[#8A8A8A] hover:text-white rounded text-sm transition-colors">Annuler</button>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-[#C4A265] hover:bg-[#D4B87A] disabled:opacity-60 text-[#0F0F0F] text-sm font-medium rounded transition-colors">
            {saving ? <><div className="w-3.5 h-3.5 border border-[#0F0F0F]/40 border-t-[#0F0F0F] rounded-full animate-spin" />Sauvegarde…</> : "Sauvegarder"}
          </button>
        </div>
      </div>
    );
  }

  // ── List view ────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-white text-2xl font-display tracking-wide">Blog</h2>
          <p className="text-[#4A4A4A] text-sm mt-0.5">
            {loading ? "Chargement…" : `${articles.length} article${articles.length > 1 ? "s" : ""} publié${articles.length > 1 ? "s" : ""}`}
          </p>
        </div>
        <button onClick={newArticle} className="flex items-center gap-2 px-4 py-2 bg-[#C4A265] hover:bg-[#D4B87A] text-[#0F0F0F] text-sm font-medium rounded transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Nouvel article
        </button>
      </div>

      {error && (
        <div className="bg-[#B85C5C]/10 border border-[#B85C5C]/30 rounded p-3 text-[#B85C5C] text-sm">{error}</div>
      )}

      {loading ? (
        <div className="flex items-center gap-3 text-[#8A8A8A] text-sm py-10">
          <div className="w-5 h-5 border-2 border-[#C4A265]/30 border-t-[#C4A265] rounded-full animate-spin" />
          Chargement des articles…
        </div>
      ) : (
        <div className="grid gap-3">
          {articles.map((article) => (
            <div key={article.id} className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-5 flex items-start justify-between gap-4 hover:border-[#333] transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] text-[#8A8A8A] uppercase tracking-widest border border-[#262626] rounded px-1.5 py-0.5">
                    {article.category}
                  </span>
                  {article.featured && (
                    <span className="text-[10px] text-[#C4A265] uppercase tracking-widest">✦ Mis en avant</span>
                  )}
                </div>
                <h3 className="text-white text-sm font-medium truncate">{article.title || "Sans titre"}</h3>
                <p className="text-[#4A4A4A] text-xs mt-0.5 truncate">{article.excerpt}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[#4A4A4A] text-xs">{formatDate(article.publishedAt)}</span>
                  <span className="text-[#4A4A4A] text-xs">par {article.author}</span>
                  {article.tags.length > 0 && (
                    <div className="flex gap-1">
                      {article.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] text-[#8A8A8A] bg-[#262626] rounded-full px-2 py-0.5">{t}</span>
                      ))}
                      {article.tags.length > 3 && (
                        <span className="text-[10px] text-[#4A4A4A]">+{article.tags.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEditor(article)}
                  className="text-xs text-[#8A8A8A] hover:text-[#C4A265] border border-[#262626] hover:border-[#C4A265] rounded px-3 py-1.5 transition-colors"
                >
                  Modifier
                </button>
                {deleteConfirm === article.id ? (
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-[#8A8A8A]">Confirmer ?</span>
                    <button
                      onClick={() => deleteArticle(article.id)}
                      disabled={deleting === article.id}
                      className="text-xs text-[#B85C5C] hover:text-red-400 transition-colors disabled:opacity-60"
                    >
                      {deleting === article.id ? "…" : "Oui"}
                    </button>
                    <button onClick={() => setDeleteConfirm(null)} className="text-xs text-[#4A4A4A] hover:text-white transition-colors">Non</button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(article.id)}
                    className="text-xs text-[#4A4A4A] hover:text-[#B85C5C] border border-[#262626] hover:border-[#B85C5C]/30 rounded px-3 py-1.5 transition-colors"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          ))}
          {articles.length === 0 && (
            <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-10 text-center">
              <p className="text-[#4A4A4A] text-sm">Aucun article. Créez votre premier article !</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const inputCls =
  "w-full bg-[#111111] border border-[#262626] rounded px-3 py-2 text-white text-sm outline-none focus:border-[#C4A265] transition-colors";

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg overflow-hidden">
      <div className="px-5 py-3 border-b border-[#262626]">
        <span className="text-[#8A8A8A] text-xs uppercase tracking-widest">{title}</span>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest mb-1.5">{label}</label>
      {children}
    </div>
  );
}
