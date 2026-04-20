"use client";

import { useState } from "react";
import { maalems as initialMaalems } from "@/lib/data";
import type { Maalem } from "@/lib/types";

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function MaalemsPage() {
  const [maalems, setMaalems] = useState<Maalem[]>(initialMaalems);
  const [editing, setEditing] = useState<Maalem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function newMaalem() {
    const blank: Maalem = {
      id: `maalem-${Date.now()}`,
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
    setEditing(blank);
    setIsNew(true);
    setSaved(false);
  }

  function openEditor(m: Maalem) {
    setEditing(JSON.parse(JSON.stringify(m)));
    setIsNew(false);
    setSaved(false);
  }

  function closeEditor() {
    setEditing(null);
    setIsNew(false);
    setSaved(false);
  }

  function updateField<K extends keyof Maalem>(key: K, value: Maalem[K]) {
    if (!editing) return;
    const updated = { ...editing, [key]: value };
    if (key === "name" && !editing.slug) {
      updated.slug = slugify(String(value));
    }
    setEditing(updated);
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    try {
      await fetch(`/api/cms/maalems/${editing.id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
    } catch { /* demo fallback */ }
    if (isNew) {
      setMaalems((prev) => [...prev, editing]);
    } else {
      setMaalems((prev) => prev.map((m) => (m.id === editing.id ? editing : m)));
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => { setSaved(false); closeEditor(); }, 1200);
  }

  // ── Editor ──────────────────────────────────────────────────────────────────
  if (editing) {
    return (
      <div className="max-w-2xl space-y-6">
        <div className="flex items-center gap-4">
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
            <ImageField
              label="Photo avatar (miniature)"
              value={editing.image}
              onChange={(v) => updateField("image", v)}
              placeholder="/images/maalems/nom/avatar.jpg"
            />
            <ImageField
              label="Photo portrait (pleine taille)"
              value={editing.portrait}
              onChange={(v) => updateField("portrait", v)}
              placeholder="/images/maalems/nom/portrait.jpg"
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
          <p className="text-[#4A4A4A] text-sm mt-0.5">{maalems.length} artisan{maalems.length > 1 ? "s" : ""} dans le catalogue</p>
        </div>
        <button onClick={newMaalem} className="flex items-center gap-2 px-4 py-2 bg-[#C4A265] hover:bg-[#D4B87A] text-[#0F0F0F] text-sm font-medium rounded transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Nouveau maalem
        </button>
      </div>

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
              <button
                onClick={() => openEditor(m)}
                className="mt-3 text-xs text-[#8A8A8A] hover:text-[#C4A265] border border-[#262626] hover:border-[#C4A265] rounded px-3 py-1.5 transition-colors"
              >
                Modifier
              </button>
            </div>
          </div>
        ))}
      </div>
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

function ImageField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <Field label={label}>
      <div className="flex gap-2 items-start">
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={inputCls}
          />
        </div>
        {value && (
          <div className="w-12 h-12 rounded bg-[#262626] overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </Field>
  );
}
