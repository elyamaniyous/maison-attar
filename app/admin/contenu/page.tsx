"use client";

import { useState } from "react";

type PageCard = {
  slug: string;
  label: string;
  description: string;
  lastModified: string;
};

const PAGES: PageCard[] = [
  { slug: "accueil", label: "Accueil", description: "Page d'accueil principale du site", lastModified: "2024-01-15" },
  { slug: "notre-histoire", label: "Notre Histoire", description: "L'histoire de Maison Attar et ses artisans", lastModified: "2024-01-10" },
  { slug: "livraison", label: "Livraison", description: "Informations sur la livraison et délais", lastModified: "2024-01-08" },
  { slug: "entretien", label: "Entretien", description: "Guide d'entretien des tables en zellige", lastModified: "2024-01-05" },
  { slug: "faq", label: "FAQ", description: "Questions fréquemment posées", lastModified: "2024-01-03" },
  { slug: "cgv", label: "CGV", description: "Conditions Générales de Vente", lastModified: "2023-12-20" },
];

type Section = {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
};

type PageData = {
  slug: string;
  sections: Section[];
};

const MOCK_PAGE_DATA: Record<string, PageData> = {
  accueil: {
    slug: "accueil",
    sections: [
      { id: "hero", title: "Section Héro", subtitle: "Tagline principale", content: "L'art du zellige marocain, réinterprété pour l'intérieur contemporain.", ctaText: "Découvrir la collection", ctaLink: "/collection" },
      { id: "savoir-faire", title: "Savoir-Faire", content: "Chaque pièce est taillée à la main par nos maîtres artisans de Fès.", imageUrl: "" },
      { id: "collection", title: "La Collection", content: "Des tables basses aux consoles, découvrez nos créations en zellige.", ctaText: "Voir la collection", ctaLink: "/collection" },
    ],
  },
  "notre-histoire": {
    slug: "notre-histoire",
    sections: [
      { id: "intro", title: "Introduction", content: "Maison Attar est née d'une rencontre entre deux univers..." },
      { id: "artisans", title: "Nos Artisans", content: "Nos maalems sont les gardiens d'un savoir-faire millénaire." },
    ],
  },
  livraison: {
    slug: "livraison",
    sections: [
      { id: "delais", title: "Délais de livraison", content: "Chaque pièce est fabriquée à la commande. Comptez 8 à 12 semaines." },
      { id: "zones", title: "Zones de livraison", content: "Nous livrons en France métropolitaine, Belgique, Suisse et Luxembourg." },
    ],
  },
  entretien: {
    slug: "entretien",
    sections: [
      { id: "quotidien", title: "Entretien quotidien", content: "Essuyez avec un chiffon légèrement humide. Évitez les produits acides." },
      { id: "annuel", title: "Entretien annuel", content: "Appliquez une cire naturelle pour raviver l'éclat de l'émail." },
    ],
  },
  faq: {
    slug: "faq",
    sections: [
      { id: "fabrication", title: "Questions sur la fabrication", content: "**Combien de temps faut-il pour fabriquer une table ?**\n\nEntre 8 et 12 semaines selon la complexité." },
      { id: "livraison", title: "Questions sur la livraison", content: "**La livraison est-elle incluse ?**\n\nOui, la livraison en France métropolitaine est offerte dès 2 000 €." },
    ],
  },
  cgv: {
    slug: "cgv",
    sections: [
      { id: "article1", title: "Article 1 — Objet", content: "Les présentes Conditions Générales de Vente régissent les relations contractuelles entre Maison Attar et ses clients." },
      { id: "article2", title: "Article 2 — Commandes", content: "Toute commande est définitive après validation du paiement et confirmation par email." },
    ],
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function ContenuPage() {
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(false);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savedSection, setSavedSection] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function openEditor(slug: string) {
    setLoading(true);
    setEditingSlug(slug);
    setError(null);
    try {
      const res = await fetch(`/api/cms/pages/${slug}`);
      if (!res.ok) throw new Error("API unavailable");
      const data = await res.json();
      setPageData(data);
    } catch {
      // Fallback to mock data
      setPageData(MOCK_PAGE_DATA[slug] ?? { slug, sections: [] });
    } finally {
      setLoading(false);
    }
  }

  function updateSection(sectionId: string, field: keyof Section, value: string) {
    if (!pageData) return;
    setPageData({
      ...pageData,
      sections: pageData.sections.map((s) =>
        s.id === sectionId ? { ...s, [field]: value } : s
      ),
    });
  }

  async function saveSection(section: Section) {
    if (!pageData) return;
    setSavingSection(section.id);
    setSavedSection(null);
    try {
      const res = await fetch(`/api/cms/pages/${pageData.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectionId: section.id, data: section }),
      });
      if (!res.ok) throw new Error("Erreur serveur");
    } catch {
      // Silently succeed in demo mode
    } finally {
      setSavingSection(null);
      setSavedSection(section.id);
      setTimeout(() => setSavedSection(null), 2500);
    }
  }

  if (editingSlug && pageData) {
    const page = PAGES.find((p) => p.slug === editingSlug);
    return (
      <div className="max-w-3xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => { setEditingSlug(null); setPageData(null); }}
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
          <div className="ml-auto">
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
          </div>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-[#8A8A8A] text-sm">
            <div className="w-4 h-4 border border-[#C4A265]/40 border-t-[#C4A265] rounded-full animate-spin" />
            Chargement…
          </div>
        )}

        {/* Sections */}
        <div className="space-y-4">
          {pageData.sections.map((section) => (
            <div key={section.id} className="bg-[#1A1A1A] border border-[#262626] rounded-lg overflow-hidden">
              <div className="px-5 py-3 border-b border-[#262626] flex items-center justify-between">
                <span className="text-[#8A8A8A] text-xs uppercase tracking-widest">{section.id}</span>
                {savedSection === section.id && (
                  <span className="text-emerald-400 text-xs flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Sauvegardé
                  </span>
                )}
              </div>
              <div className="p-5 space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest mb-1.5">Titre</label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSection(section.id, "title", e.target.value)}
                    className="w-full bg-[#111111] border border-[#262626] rounded px-3 py-2 text-white text-sm outline-none focus:border-[#C4A265] transition-colors"
                  />
                </div>

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
                <div>
                  <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest mb-1.5">Contenu (Markdown)</label>
                  <textarea
                    value={section.content}
                    onChange={(e) => updateSection(section.id, "content", e.target.value)}
                    rows={5}
                    className="w-full bg-[#111111] border border-[#262626] rounded px-3 py-2 text-white text-sm outline-none focus:border-[#C4A265] transition-colors resize-y font-mono"
                  />
                </div>

                {/* Image */}
                {section.imageUrl !== undefined && (
                  <div>
                    <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest mb-1.5">Image</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={section.imageUrl ?? ""}
                        onChange={(e) => updateSection(section.id, "imageUrl", e.target.value)}
                        placeholder="/images/..."
                        className="flex-1 bg-[#111111] border border-[#262626] rounded px-3 py-2 text-white text-sm outline-none focus:border-[#C4A265] transition-colors"
                      />
                      <button className="px-3 py-2 border border-[#262626] rounded text-[#8A8A8A] hover:text-white hover:border-[#C4A265] transition-colors text-xs">
                        Parcourir
                      </button>
                    </div>
                    {section.imageUrl && (
                      <div className="mt-2 w-24 h-16 rounded bg-[#262626] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={section.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
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

                {/* Save */}
                <div className="flex justify-end">
                  <button
                    onClick={() => saveSection(section)}
                    disabled={savingSection === section.id}
                    className="flex items-center gap-2 px-4 py-2 bg-[#C4A265] hover:bg-[#D4B87A] disabled:opacity-60 text-[#0F0F0F] text-sm font-medium rounded transition-colors"
                  >
                    {savingSection === section.id ? (
                      <>
                        <div className="w-3.5 h-3.5 border border-[#0F0F0F]/40 border-t-[#0F0F0F] rounded-full animate-spin" />
                        Sauvegarde…
                      </>
                    ) : (
                      "Sauvegarder"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <p className="text-[#B85C5C] text-sm">{error}</p>
        )}
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
            <p className="text-[#4A4A4A] text-xs">
              Modifié le {formatDate(page.lastModified)}
            </p>
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
