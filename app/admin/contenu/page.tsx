"use client";

import { useState, useEffect } from "react";
import { cmsApi, ApiError } from "@/lib/admin-api";
import ImageUploader from "@/components/admin/ImageUploader";
import type { PageContent } from "@/lib/cms";

type PageCard = {
  slug: string;
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

type Section = PageContent["sections"][number];

type PageData = {
  slug: string;
  sections: Section[];
};

export default function ContenuPage() {
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loadingPage, setLoadingPage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function openEditor(slug: string) {
    setLoadingPage(true);
    setEditingSlug(slug);
    setError(null);
    setSaved(false);
    try {
      const data = await cmsApi.pages.get(slug);
      setPageData({ slug: data.slug as string, sections: data.sections });
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setPageData({ slug, sections: [] });
      } else {
        setError(err instanceof ApiError ? err.message : "Erreur de chargement");
        setPageData({ slug, sections: [] });
      }
    } finally {
      setLoadingPage(false);
    }
  }

  function closeEditor() {
    setEditingSlug(null);
    setPageData(null);
    setError(null);
    setSaved(false);
  }

  function updateSection(sectionId: string, field: keyof Section, value: string) {
    if (!pageData) return;
    setPageData({
      ...pageData,
      sections: pageData.sections.map((s) =>
        s.id === sectionId ? { ...s, [field]: value } : s
      ),
    });
    setSaved(false);
  }

  async function saveAll() {
    if (!pageData) return;
    setSaving(true);
    setError(null);
    try {
      await cmsApi.pages.update(pageData.slug, { sections: pageData.sections });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  if (editingSlug && pageData !== null) {
    const page = PAGES.find((p) => p.slug === editingSlug);
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
          <div className="bg-[#B85C5C]/10 border border-[#B85C5C]/30 rounded p-3 text-[#B85C5C] text-sm">{error}</div>
        )}

        {/* Sections */}
        <div className="space-y-4">
          {pageData.sections.map((section) => (
            <div key={section.id} className="bg-[#1A1A1A] border border-[#262626] rounded-lg overflow-hidden">
              <div className="px-5 py-3 border-b border-[#262626] flex items-center justify-between">
                <span className="text-[#8A8A8A] text-xs uppercase tracking-widest">{section.id}</span>
                <span className="text-[#4A4A4A] text-xs border border-[#262626] rounded px-1.5 py-0.5">{section.type}</span>
              </div>
              <div className="p-5 space-y-4">
                {/* Title */}
                {section.title !== undefined && (
                  <div>
                    <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest mb-1.5">Titre</label>
                    <input
                      type="text"
                      value={section.title ?? ""}
                      onChange={(e) => updateSection(section.id, "title", e.target.value)}
                      className="w-full bg-[#111111] border border-[#262626] rounded px-3 py-2 text-white text-sm outline-none focus:border-[#C4A265] transition-colors"
                    />
                  </div>
                )}

                {/* Subtitle */}
                {section.subtitle !== undefined && (
                  <div>
                    <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest mb-1.5">Sous-titre</label>
                    <input
                      type="text"
                      value={section.subtitle ?? ""}
                      onChange={(e) => updateSection(section.id, "subtitle", e.target.value)}
                      className="w-full bg-[#111111] border border-[#262626] rounded px-3 py-2 text-white text-sm outline-none focus:border-[#C4A265] transition-colors"
                    />
                  </div>
                )}

                {/* Content */}
                {section.content !== undefined && (
                  <div>
                    <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest mb-1.5">Contenu (Markdown)</label>
                    <textarea
                      value={section.content ?? ""}
                      onChange={(e) => updateSection(section.id, "content", e.target.value)}
                      rows={5}
                      className="w-full bg-[#111111] border border-[#262626] rounded px-3 py-2 text-white text-sm outline-none focus:border-[#C4A265] transition-colors resize-y font-mono"
                    />
                  </div>
                )}

                {/* Image */}
                {section.image !== undefined && (
                  <ImageUploader
                    label="Image"
                    value={section.image ?? ""}
                    onChange={(url) => updateSection(section.id, "image", url)}
                    category="general"
                  />
                )}

                {/* CTA */}
                {(section.ctaText !== undefined || section.ctaLink !== undefined) && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest mb-1.5">Texte CTA</label>
                      <input
                        type="text"
                        value={section.ctaText ?? ""}
                        onChange={(e) => updateSection(section.id, "ctaText", e.target.value)}
                        className="w-full bg-[#111111] border border-[#262626] rounded px-3 py-2 text-white text-sm outline-none focus:border-[#C4A265] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest mb-1.5">Lien CTA</label>
                      <input
                        type="text"
                        value={section.ctaLink ?? ""}
                        onChange={(e) => updateSection(section.id, "ctaLink", e.target.value)}
                        className="w-full bg-[#111111] border border-[#262626] rounded px-3 py-2 text-white text-sm outline-none focus:border-[#C4A265] transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {pageData.sections.length === 0 && !loadingPage && (
            <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-10 text-center">
              <p className="text-[#4A4A4A] text-sm">Aucune section trouvée pour cette page.</p>
            </div>
          )}
        </div>

        {/* Footer save */}
        <div className="flex justify-end pb-6">
          <button
            onClick={saveAll}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#C4A265] hover:bg-[#D4B87A] disabled:opacity-60 text-[#0F0F0F] text-sm font-medium rounded transition-colors"
          >
            {saving ? (
              <><div className="w-3.5 h-3.5 border border-[#0F0F0F]/40 border-t-[#0F0F0F] rounded-full animate-spin" />Sauvegarde…</>
            ) : "Sauvegarder tout"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-5">
      <div>
        <h2 className="text-white text-2xl font-display tracking-wide">Gestion du Contenu</h2>
        <p className="text-[#4A4A4A] text-sm mt-0.5">Modifiez le contenu des pages de votre site</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PAGES.map((page) => (
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
            <p className="text-[#4A4A4A] text-xs">/{page.slug}</p>
            <button
              onClick={() => openEditor(page.slug)}
              className="mt-auto w-full py-2 text-sm border border-[#262626] hover:border-[#C4A265] hover:text-[#C4A265] text-[#8A8A8A] rounded transition-colors"
            >
              Modifier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
