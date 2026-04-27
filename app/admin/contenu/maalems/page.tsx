"use client";

import { useState, useEffect } from "react";
import { cmsApi, ApiError } from "@/lib/admin-api";
import ImageUploader from "@/components/admin/ImageUploader";
import type { Maalem } from "@/lib/types";

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function blankMaalem(): Omit<Maalem, "id"> {
  return {
    name: "",
    slug: "",
    image: "",
    portrait: "",
    bio: "",
    specialty: "",
    yearsExperience: 0,
    piecesCreated: 0,
    quote: "",
  };
}

type EditingMaalem = Maalem | (Omit<Maalem, "id"> & { id?: string });

export default function MaalemsPage() {
  const [maalems, setMaalems] = useState<Maalem[]>([]);
  const [editing, setEditing] = useState<EditingMaalem | null>(null);
  const [isNew, setIsNew] = useState(false);
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
        const data = await cmsApi.maalems.list();
        if (!cancelled) setMaalems(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof ApiError ? err.message : "Erreur de chargement");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  function newMaalem() {
    setEditing(blankMaalem());
    setIsNew(true);
    setSaved(false);
    setError(null);
  }

  function openEditor(m: Maalem) {
    setEditing(JSON.parse(JSON.stringify(m)));
    setIsNew(false);
    setSaved(false);
    setError(null);
  }

  function closeEditor() {
    setEditing(null);
    setIsNew(false);
    setSaved(false);
    setError(null);
  }

  function updateField<K extends keyof Maalem>(key: K, value: Maalem[K]) {
    if (!editing) return;
    const updated = { ...editing, [key]: value } as EditingMaalem;
    if (key === "name" && isNew && !editing.slug) {
      (updated as Record<string, unknown>).slug = slugify(String(value));
    }
    setEditing(updated);
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setError(null);
    try {
      if (isNew) {
        const created = await cmsApi.maalems.create(editing as Omit<Maalem, "id">);
        setMaalems((prev) => [...prev, created]);
      } else if ((editing as Maalem).id) {
        const id = (editing as Maalem).id;
        const updated = await cmsApi.maalems.update(id, editing as Maalem);
        setMaalems((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
      }
      setSaved(true);
      setTimeout(() => { setSaved(false); closeEditor(); }, 1200);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  async function deleteMaalem(id: string) {
    setDeleting(id);
    setError(null);
    try {
      await cmsApi.maalems.delete(id);
      setMaalems((prev) => prev.filter((m) => m.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erreur lors de la suppression");
    } finally {
      setDeleting(null);
    }
  }

  // ── Editor ──────────────────────────────────────────────────────────────────
  if (editing) {
    return (
      <div className="max-w-2xl space-y-6">
        <div className="flex items-center gap-4 flex-wrap">
          <button onClick={closeEditor} className="flex items-center gap-1.5 text-[#8A8A8A] hover:text-white transition-colors text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
          <div className="h-4 w-px bg-[#262626]" />
          <h2 className="text-white text-xl font-display tracking-wide">
            {isNew ? "Nouveau maalem" : editing.name}
          </h2>
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
          {/* Identité */}
          <Panel title="Identité">
            <Field label="Nom complet">
              <input type="text" value={editing.name} onChange={(e) => updateField("name", e.target.value)} className={inputCls} placeholder="Prénom Nom" />
            </Field>
            <Field label="Slug (URL)">
              <input type="text" value={editing.slug} onChange={(e) => updateField("slug", e.target.value)} className={inputCls} />
            </Field>
            <Field label="Spécialité">
              <input type="text" value={editing.specialty} onChange={(e) => updateField("specialty", e.target.value)} className={inputCls} placeholder="Ex : Géométrie islamique, zellige blanc…" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Années d'expérience">
                <input type="number" value={editing.yearsExperience} onChange={(e) => updateField("yearsExperience", Number(e.target.value))} className={inputCls} min={0} />
              </Field>
              <Field label="Pièces créées">
                <input type="number" value={editing.piecesCreated} onChange={(e) => updateField("piecesCreated", Number(e.target.value))} className={inputCls} min={0} />
              </Field>
            </div>
          </Panel>

          {/* Biographie */}
          <Panel title="Biographie & Citation">
            <Field label="Biographie">
              <textarea
                value={editing.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                rows={7}
                className={`${inputCls} resize-y`}
                placeholder="Texte biographique du maalem…"
              />
            </Field>
            <Field label="Citation">
              <textarea
                value={editing.quote}
                onChange={(e) => updateField("quote", e.target.value)}
                rows={3}
                className={`${inputCls} resize-y`}
                placeholder="« Sa citation emblématique… »"
              />
            </Field>
          </Panel>

          {/* Images */}
          <Panel title="Images">
            <ImageUploader
              label="Photo avatar (miniature)"
              value={editing.image}
              onChange={(url) => updateField("image", url)}
              category="maalems"
            />
            <ImageUploader
              label="Photo portrait (pleine taille)"
              value={editing.portrait}
              onChange={(url) => updateField("portrait", url)}
              category="maalems"
            />
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
          <h2 className="text-white text-2xl font-display tracking-wide">Maalems</h2>
          <p className="text-[#4A4A4A] text-sm mt-0.5">
            {loading ? "Chargement…" : `${maalems.length} artisan${maalems.length > 1 ? "s" : ""} dans le catalogue`}
          </p>
        </div>
        <button onClick={newMaalem} className="flex items-center gap-2 px-4 py-2 bg-[#C4A265] hover:bg-[#D4B87A] text-[#0F0F0F] text-sm font-medium rounded transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Nouveau maalem
        </button>
      </div>

      {error && (
        <div className="bg-[#B85C5C]/10 border border-[#B85C5C]/30 rounded p-3 text-[#B85C5C] text-sm">{error}</div>
      )}

      {loading ? (
        <div className="flex items-center gap-3 text-[#8A8A8A] text-sm py-10">
          <div className="w-5 h-5 border-2 border-[#C4A265]/30 border-t-[#C4A265] rounded-full animate-spin" />
          Chargement des maalems…
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {maalems.map((m) => (
            <div key={m.id} className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-5 flex gap-4 hover:border-[#333] transition-colors">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-[#262626] shrink-0 overflow-hidden">
                {m.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#C4A265] font-display text-lg">
                    {m.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm font-medium">{m.name}</h3>
                <p className="text-[#8A8A8A] text-xs mt-0.5 truncate">{m.specialty}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[#4A4A4A] text-xs">{m.yearsExperience} ans d&apos;expérience</span>
                  <span className="text-[#4A4A4A] text-xs">{m.piecesCreated} pièces</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => openEditor(m)}
                    className="text-xs text-[#8A8A8A] hover:text-[#C4A265] border border-[#262626] hover:border-[#C4A265] rounded px-3 py-1.5 transition-colors"
                  >
                    Modifier
                  </button>
                  {deleteConfirm === m.id ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-[#8A8A8A]">Confirmer ?</span>
                      <button
                        onClick={() => deleteMaalem(m.id)}
                        disabled={deleting === m.id}
                        className="text-xs text-[#B85C5C] hover:text-red-400 transition-colors disabled:opacity-60"
                      >
                        {deleting === m.id ? "…" : "Oui"}
                      </button>
                      <button onClick={() => setDeleteConfirm(null)} className="text-xs text-[#4A4A4A] hover:text-white transition-colors">Non</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(m.id)}
                      className="text-xs text-[#4A4A4A] hover:text-[#B85C5C] border border-[#262626] hover:border-[#B85C5C]/30 rounded px-3 py-1.5 transition-colors"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {maalems.length === 0 && (
            <div className="col-span-2 bg-[#1A1A1A] border border-[#262626] rounded-lg p-10 text-center">
              <p className="text-[#4A4A4A] text-sm">Aucun maalem. Créez votre premier artisan !</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

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
