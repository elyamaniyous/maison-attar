"use client";

import { useState } from "react";
import { cmsApi, ApiError } from "@/lib/admin-api";
import ImageUploader from "@/components/admin/ImageUploader";
import { defaultPageContents } from "@/lib/page-content";
import type { KnownSlug } from "@/lib/page-content";

// ─── Page cards list ──────────────────────────────────────────────────────────

type PageCard = {
  slug: KnownSlug;
  label: string;
  description: string;
};

const PAGES: PageCard[] = [
  { slug: "accueil", label: "Accueil", description: "Page d'accueil principale du site" },
  { slug: "notre-histoire", label: "Notre Histoire", description: "L'histoire de Maison Attar et ses artisans" },
  { slug: "livraison", label: "Livraison", description: "Informations sur la livraison et délais" },
  { slug: "entretien", label: "Entretien", description: "Guide d'entretien des tables en zellige" },
  { slug: "faq", label: "FAQ", description: "Questions fréquemment posées" },
  { slug: "cgv", label: "CGV", description: "Conditions Générales de Vente" },
];

// ─── Field heuristics ─────────────────────────────────────────────────────────

type FieldKind = "image" | "url" | "textarea" | "text";

function fieldKind(key: string): FieldKind {
  if (/image|photo|cover/.test(key)) return "image";
  if (/link|url$/.test(key)) return "url";
  if (/body|desc|text|manifesto|content|disclaimer|intro|quote(?!_author)|_a\d+$/.test(key)) return "textarea";
  return "text";
}

// ─── Group fields by prefix ───────────────────────────────────────────────────

/**
 * Group flat keys by their first segment (before the first `_`).
 * e.g. hero_title, hero_subtitle → group "hero"
 *      pillar_1_title → group "pillar_1"
 *      s1_title, s1_body_1 → group "s1"
 */
function groupByPrefix(fields: Record<string, string>): Array<{ group: string; keys: string[] }> {
  const groups = new Map<string, string[]>();

  for (const key of Object.keys(fields)) {
    // Use up to the second segment as group key for keys like pillar_1_* or cat_*
    const parts = key.split("_");
    const group = parts.length >= 3 && !isNaN(Number(parts[1]))
      ? `${parts[0]}_${parts[1]}`   // e.g. pillar_1
      : parts[0];                    // e.g. hero, newsletter, s1

    const list = groups.get(group) ?? [];
    list.push(key);
    groups.set(group, list);
  }

  return Array.from(groups.entries()).map(([group, keys]) => ({ group, keys }));
}

function groupLabel(group: string): string {
  const labels: Record<string, string> = {
    hero: "Hero",
    manifesto: "Manifeste",
    pillars: "Piliers — En-tête",
    pillar_1: "Pilier 1",
    pillar_2: "Pilier 2",
    pillar_3: "Pilier 3",
    collection: "Section Collection",
    maalem: "Section Maalem",
    process: "Section Processus",
    newsletter: "Newsletter",
    attar: "Chapitre I — L'Attar",
    zellige: "Chapitre II — Le Zellige",
    acier: "Chapitre III — L'Acier",
    tension: "Chapitre IV — Tension des Matières",
    cta: "Appel à l'action",
    stat: "Bannière chiffres",
    zones: "Zones de livraison",
    zone_1: "Zone 1 — France",
    zone_2: "Zone 2 — UE",
    zone_3: "Zone 3 — Royaume-Uni",
    zone_4: "Zone 4 — International",
    delays: "Délais — En-tête",
    timeline: "Chronologie",
    packaging: "Emballage",
    tracking: "Suivi de commande",
    faq: "FAQ",
    alert: "Alerte",
    section1: "Section 1 — Nettoyage quotidien",
    section2: "Section 2 — Protection du zellige",
    section3: "Section 3 — Entretien acier",
    section4: "Section 4 — Précautions d'usage",
    section5: "Section 5 — Produits recommandés",
    section6: "Section 6 — Garantie",
    cat: "Catégories FAQ",
    commandes: "FAQ — Commandes",
    fabrication: "FAQ — Fabrication",
    livraison: "FAQ — Livraison",
    paiement: "FAQ — Paiement",
    retours: "FAQ — Retours",
    entretien: "FAQ — Entretien",
    footer: "Bas de page",
    intro: "Introduction",
    s1: "Article 1 — Objet",
    s2: "Article 2 — Prix",
    s3: "Article 3 — Commandes",
    s4: "Article 4 — Fabrication sur mesure",
    s5: "Article 5 — Délais de livraison",
    s6: "Article 6 — Droit de rétractation",
    s7: "Article 7 — Garantie",
    s8: "Article 8 — Responsabilité",
    s9: "Article 9 — Données personnelles",
    s10: "Article 10 — Litiges",
    s11: "Article 11 — Droit applicable",
  };
  return labels[group] ?? group.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function fieldLabel(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bUrl\b/, "URL")
    .replace(/\bCta\b/, "CTA")
    .replace(/\bFaq\b/, "FAQ")
    .replace(/^([A-Z]\d+) /, "")   // strip leading s1, s2 prefix
    .trim();
}

// ─── Single field renderer ────────────────────────────────────────────────────

function FieldEditor({
  fieldKey,
  value,
  onChange,
}: {
  fieldKey: string;
  value: string;
  onChange: (val: string) => void;
}) {
  const kind = fieldKind(fieldKey);
  const label = fieldLabel(fieldKey);
  const baseInput =
    "w-full bg-[#111111] border border-[#262626] rounded px-3 py-2 text-white text-sm outline-none focus:border-[#C4A265] transition-colors";

  if (kind === "image") {
    return (
      <ImageUploader
        label={label}
        value={value}
        onChange={onChange}
        category="general"
      />
    );
  }

  if (kind === "textarea") {
    return (
      <div>
        <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest mb-1.5">
          {label}
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className={`${baseInput} resize-y`}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <input
        type={kind === "url" ? "url" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={baseInput}
      />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ContenuPage() {
  const [editingSlug, setEditingSlug] = useState<KnownSlug | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [loadingPage, setLoadingPage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function openEditor(slug: KnownSlug) {
    setLoadingPage(true);
    setEditingSlug(slug);
    setError(null);
    setSaved(false);

    // Start with the compile-time defaults so fields are never missing
    const defaults = defaultPageContents[slug] as Record<string, string>;

    try {
      const data = await cmsApi.pages.get(slug);
      // data.sections is the parsed flat object from DB (or [] if empty/legacy)
      const dbSections = data.sections as unknown;
      if (
        dbSections !== null &&
        typeof dbSections === "object" &&
        !Array.isArray(dbSections) &&
        Object.keys(dbSections as object).length > 0
      ) {
        // DB has real flat content — merge over defaults so new keys are present
        setFields({ ...defaults, ...(dbSections as Record<string, string>) });
      } else {
        // DB is empty/legacy array — fall back to defaults
        setFields({ ...defaults });
      }
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setFields({ ...defaults });
      } else {
        setError(err instanceof ApiError ? err.message : "Erreur de chargement");
        setFields({ ...defaults });
      }
    } finally {
      setLoadingPage(false);
    }
  }

  function closeEditor() {
    setEditingSlug(null);
    setFields({});
    setError(null);
    setSaved(false);
  }

  function updateField(key: string, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function saveAll() {
    if (!editingSlug) return;
    setSaving(true);
    setError(null);
    try {
      await cmsApi.pages.update(editingSlug, { sections: fields });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  // ── Editor view ──────────────────────────────────────────────────────────────

  if (editingSlug !== null) {
    const page = PAGES.find((p) => p.slug === editingSlug);
    const groups = groupByPrefix(fields);

    return (
      <div className="max-w-3xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={closeEditor}
            className="flex items-center gap-1.5 text-[#8A8A8A] hover:text-white transition-colors text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
          <div className="h-4 w-px bg-[#262626]" />
          <div>
            <h2 className="text-white text-xl font-display tracking-wide">{page?.label}</h2>
            <p className="text-[#4A4A4A] text-xs mt-0.5">{page?.description}</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {saved && (
              <span className="text-emerald-400 text-xs flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Sauvegardé
              </span>
            )}
            <a
              href={editingSlug === "accueil" ? "/" : `/${editingSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#8A8A8A] hover:text-[#C4A265] transition-colors border border-[#262626] rounded px-3 py-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
              Aperçu
            </a>
            <button
              onClick={saveAll}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-[#C4A265] hover:bg-[#D4B87A] disabled:opacity-60 text-[#0F0F0F] text-sm font-medium rounded transition-colors"
            >
              {saving ? (
                <>
                  <div className="w-3.5 h-3.5 border border-[#0F0F0F]/40 border-t-[#0F0F0F] rounded-full animate-spin" />
                  Sauvegarde…
                </>
              ) : (
                "Sauvegarder tout"
              )}
            </button>
          </div>
        </div>

        {loadingPage && (
          <div className="flex items-center gap-2 text-[#8A8A8A] text-sm">
            <div className="w-4 h-4 border border-[#C4A265]/40 border-t-[#C4A265] rounded-full animate-spin" />
            Chargement…
          </div>
        )}

        {error && (
          <div className="bg-[#B85C5C]/10 border border-[#B85C5C]/30 rounded p-3 text-[#B85C5C] text-sm">
            {error}
          </div>
        )}

        {/* Field groups */}
        {!loadingPage && (
          <div className="space-y-4">
            {groups.map(({ group, keys }) => (
              <div key={group} className="bg-[#1A1A1A] border border-[#262626] rounded-lg overflow-hidden">
                {/* Group header */}
                <div className="px-5 py-3 border-b border-[#262626]">
                  <span className="text-[#8A8A8A] text-xs uppercase tracking-widest">
                    {groupLabel(group)}
                  </span>
                </div>

                {/* Fields */}
                <div className="p-5 space-y-4">
                  {keys.map((key) => (
                    <FieldEditor
                      key={key}
                      fieldKey={key}
                      value={fields[key] ?? ""}
                      onChange={(val) => updateField(key, val)}
                    />
                  ))}
                </div>
              </div>
            ))}

            {groups.length === 0 && (
              <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-10 text-center">
                <p className="text-[#4A4A4A] text-sm">Aucune section trouvée pour cette page.</p>
              </div>
            )}
          </div>
        )}

        {/* Footer save */}
        <div className="flex justify-between items-center pb-6">
          <span className="text-[#4A4A4A] text-xs">
            {Object.keys(fields).length} champ{Object.keys(fields).length !== 1 ? "s" : ""} éditables
          </span>
          <button
            onClick={saveAll}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#C4A265] hover:bg-[#D4B87A] disabled:opacity-60 text-[#0F0F0F] text-sm font-medium rounded transition-colors"
          >
            {saving ? (
              <>
                <div className="w-3.5 h-3.5 border border-[#0F0F0F]/40 border-t-[#0F0F0F] rounded-full animate-spin" />
                Sauvegarde…
              </>
            ) : (
              "Sauvegarder tout"
            )}
          </button>
        </div>
      </div>
    );
  }

  // ── Page grid view ───────────────────────────────────────────────────────────

  return (
    <div className="max-w-4xl space-y-5">
      <div>
        <h2 className="text-white text-2xl font-display tracking-wide">Gestion du Contenu</h2>
        <p className="text-[#4A4A4A] text-sm mt-0.5">Modifiez le contenu des pages de votre site</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PAGES.map((page) => {
          const fieldCount = Object.keys(defaultPageContents[page.slug]).length;
          return (
            <div key={page.slug} className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-5 flex flex-col gap-3 hover:border-[#333333] transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-white text-sm font-medium">{page.label}</h3>
                  <p className="text-[#4A4A4A] text-xs mt-0.5">{page.description}</p>
                </div>
                <div className="w-8 h-8 rounded bg-[#C4A265]/10 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4A265" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
              </div>
              <p className="text-[#4A4A4A] text-xs">/{page.slug === "accueil" ? "" : page.slug}</p>
              <p className="text-[#4A4A4A] text-xs">{fieldCount} champs éditables</p>
              <button
                onClick={() => openEditor(page.slug)}
                className="mt-auto w-full py-2 text-sm border border-[#262626] hover:border-[#C4A265] hover:text-[#C4A265] text-[#8A8A8A] rounded transition-colors"
              >
                Modifier
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
