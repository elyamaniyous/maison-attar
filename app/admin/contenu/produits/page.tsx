"use client";

import { useState, useEffect } from "react";
import { cmsApi, ApiError } from "@/lib/admin-api";
import MultiImageUploader from "@/components/admin/MultiImageUploader";
import type { Product, ProductCategory, Maalem } from "@/lib/types";

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "table-basse", label: "Table basse" },
  { value: "table-a-manger", label: "Table à manger" },
  { value: "table-d-appoint", label: "Table d'appoint" },
  { value: "console", label: "Console" },
];

const ZELLIGE_COLORS = ["Noir Onyx", "Blanc Nacré", "Bleu Nuit", "Vert Atlas", "Terracotta", "Gris Ardoise"];
const SIZES = ["Petit", "Moyen", "Grand", "Sur mesure"];
const BASES = ["Acier Noir", "Acier Naturel", "Laiton Brossé", "Bois de Noyer"];

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function blankProduct(): Omit<Product, "id"> & { id?: string } {
  return {
    name: "",
    slug: "",
    description: "",
    longDescription: "",
    price: 0,
    images: [],
    category: "table-basse",
    dimensions: { width: 0, height: 0, depth: 0, weight: 0 },
    materials: { zellige: "", base: "" },
    maalem: { id: "", name: "", image: "", bio: "" },
    fabricationHours: 0,
    availableConfigurations: { zelliges: [], sizes: [], bases: [] },
    inStock: true,
    featured: false,
  };
}

export default function ProduitsContenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [maalems, setMaalems] = useState<Maalem[]>([]);
  const [editing, setEditing] = useState<(Omit<Product, "id"> & { id?: string }) | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | "">("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [prods, maalems] = await Promise.all([
          cmsApi.products.list(),
          cmsApi.maalems.list(),
        ]);
        if (!cancelled) {
          setProducts(prods);
          setMaalems(maalems);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : "Erreur de chargement");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // Auto-generate slug from name
  useEffect(() => {
    if (!editing || slugManuallyEdited || isNew === false) return;
    setEditing((prev) => prev ? { ...prev, slug: slugify(prev.name) } : null);
  }, [editing?.name]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = products.filter((p) => {
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  function openEditor(product: Product) {
    setEditing(JSON.parse(JSON.stringify(product)));
    setIsNew(false);
    setSlugManuallyEdited(false);
    setSaved(false);
    setError(null);
  }

  function openNew() {
    setEditing(blankProduct());
    setIsNew(true);
    setSlugManuallyEdited(false);
    setSaved(false);
    setError(null);
  }

  function closeEditor() {
    setEditing(null);
    setSaved(false);
    setError(null);
  }

  function updateField<K extends keyof Product>(key: K, value: Product[K]) {
    if (!editing) return;
    setEditing({ ...editing, [key]: value });
  }

  function updateDimension(key: keyof Product["dimensions"], value: number) {
    if (!editing) return;
    setEditing({ ...editing, dimensions: { ...editing.dimensions, [key]: value } });
  }

  function updateMaterial(key: keyof Product["materials"], value: string) {
    if (!editing) return;
    setEditing({ ...editing, materials: { ...editing.materials, [key]: value } });
  }

  function toggleConfig(group: keyof Product["availableConfigurations"], value: string) {
    if (!editing) return;
    const current = editing.availableConfigurations[group];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    setEditing({ ...editing, availableConfigurations: { ...editing.availableConfigurations, [group]: next } });
  }

  function selectMaalem(maalemId: string) {
    if (!editing) return;
    const m = maalems.find((x) => x.id === maalemId);
    if (m) {
      setEditing({ ...editing, maalem: { id: m.id, name: m.name, image: m.image, bio: m.bio } });
    }
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setError(null);
    try {
      if (isNew) {
        const created = await cmsApi.products.create(editing as Omit<Product, "id">);
        setProducts((prev) => [created, ...prev]);
      } else if (editing.id) {
        const updated = await cmsApi.products.update(editing.id, editing as Product);
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      }
      setSaved(true);
      setTimeout(() => { setSaved(false); closeEditor(); }, 1200);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct(id: string) {
    setDeleting(id);
    setError(null);
    try {
      await cmsApi.products.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erreur lors de la suppression");
    } finally {
      setDeleting(null);
    }
  }

  // ── Editor view ────────────────────────────────────────────────────────────
  if (editing) {
    return (
      <div className="max-w-3xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 flex-wrap">
          <button onClick={closeEditor} className="flex items-center gap-1.5 text-[#8A8A8A] hover:text-white transition-colors text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
          <div className="h-4 w-px bg-[#262626]" />
          <h2 className="text-white text-xl font-display tracking-wide">
            {isNew ? "Nouveau produit" : editing.name}
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
              {saving ? (
                <><div className="w-3.5 h-3.5 border border-[#0F0F0F]/40 border-t-[#0F0F0F] rounded-full animate-spin" />Sauvegarde…</>
              ) : "Sauvegarder"}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-[#B85C5C]/10 border border-[#B85C5C]/30 rounded p-3 text-[#B85C5C] text-sm">{error}</div>
        )}

        <div className="space-y-4">
          {/* Identité */}
          <Section title="Identité">
            <Field label="Nom du produit">
              <input type="text" value={editing.name} onChange={(e) => updateField("name", e.target.value)} className={inputCls} />
            </Field>
            <Field label="Slug (URL)">
              <input
                type="text"
                value={editing.slug}
                onChange={(e) => { setSlugManuallyEdited(true); updateField("slug", e.target.value); }}
                className={inputCls}
              />
            </Field>
            <Field label="Catégorie">
              <select value={editing.category} onChange={(e) => updateField("category", e.target.value as ProductCategory)} className={inputCls}>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Prix (EUR)">
              <input type="number" value={editing.price} onChange={(e) => updateField("price", Number(e.target.value))} className={inputCls} />
            </Field>
          </Section>

          {/* Description */}
          <Section title="Description">
            <Field label="Description courte">
              <textarea value={editing.description} onChange={(e) => updateField("description", e.target.value)} rows={3} className={`${inputCls} resize-y`} />
            </Field>
            <Field label="Description longue">
              <textarea value={editing.longDescription} onChange={(e) => updateField("longDescription", e.target.value)} rows={6} className={`${inputCls} resize-y`} />
            </Field>
          </Section>

          {/* Images */}
          <Section title="Images">
            <MultiImageUploader
              value={editing.images}
              onChange={(urls) => updateField("images", urls)}
              category="products"
              max={6}
            />
          </Section>

          {/* Dimensions */}
          <Section title="Dimensions">
            <div className="grid grid-cols-2 gap-3">
              {(["width", "height", "depth", "weight"] as const).map((dim) => (
                <Field key={dim} label={dim === "width" ? "Largeur (cm)" : dim === "height" ? "Hauteur (cm)" : dim === "depth" ? "Profondeur (cm)" : "Poids (kg)"}>
                  <input type="number" value={editing.dimensions[dim]} onChange={(e) => updateDimension(dim, Number(e.target.value))} className={inputCls} />
                </Field>
              ))}
            </div>
          </Section>

          {/* Matériaux */}
          <Section title="Matériaux">
            <Field label="Type de zellige">
              <input type="text" value={editing.materials.zellige} onChange={(e) => updateMaterial("zellige", e.target.value)} className={inputCls} />
            </Field>
            <Field label="Type de base">
              <input type="text" value={editing.materials.base} onChange={(e) => updateMaterial("base", e.target.value)} className={inputCls} />
            </Field>
          </Section>

          {/* Maalem & fabrication */}
          <Section title="Artisan & Fabrication">
            <Field label="Maalem">
              <select
                value={editing.maalem.id}
                onChange={(e) => selectMaalem(e.target.value)}
                className={inputCls}
              >
                <option value="">— Sélectionner un maalem —</option>
                {maalems.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Heures de fabrication">
              <input type="number" value={editing.fabricationHours} onChange={(e) => updateField("fabricationHours", Number(e.target.value))} className={inputCls} />
            </Field>
          </Section>

          {/* Configurations */}
          <Section title="Configurations disponibles">
            <ConfigGroup
              label="Couleurs de zellige"
              options={ZELLIGE_COLORS}
              selected={editing.availableConfigurations.zelliges}
              onToggle={(v) => toggleConfig("zelliges", v)}
            />
            <ConfigGroup
              label="Tailles"
              options={SIZES}
              selected={editing.availableConfigurations.sizes}
              onToggle={(v) => toggleConfig("sizes", v)}
            />
            <ConfigGroup
              label="Bases"
              options={BASES}
              selected={editing.availableConfigurations.bases}
              onToggle={(v) => toggleConfig("bases", v)}
            />
          </Section>

          {/* Statuts */}
          <Section title="Statuts">
            <div className="flex flex-col gap-3">
              <Toggle
                label="En stock"
                description="Le produit est disponible à la vente"
                checked={editing.inStock}
                onChange={(v) => updateField("inStock", v)}
              />
              <Toggle
                label="Mis en avant"
                description="Affiché sur la page d'accueil et en tête de collection"
                checked={editing.featured}
                onChange={(v) => updateField("featured", v)}
              />
            </div>
          </Section>
        </div>

        {/* Footer save */}
        <div className="flex justify-end gap-3 pb-6">
          <button onClick={closeEditor} className="px-4 py-2 border border-[#262626] hover:border-[#444] text-[#8A8A8A] hover:text-white rounded text-sm transition-colors">
            Annuler
          </button>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-[#C4A265] hover:bg-[#D4B87A] disabled:opacity-60 text-[#0F0F0F] text-sm font-medium rounded transition-colors">
            {saving ? (
              <><div className="w-3.5 h-3.5 border border-[#0F0F0F]/40 border-t-[#0F0F0F] rounded-full animate-spin" />Sauvegarde…</>
            ) : "Sauvegarder"}
          </button>
        </div>
      </div>
    );
  }

  // ── List view ───────────────────────────────────────────────────────────────
  return (
    <div className="max-w-5xl space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-white text-2xl font-display tracking-wide">Produits</h2>
          <p className="text-[#4A4A4A] text-sm mt-0.5">
            {loading ? "Chargement…" : `${products.length} références dans le catalogue`}
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-[#C4A265] hover:bg-[#D4B87A] text-[#0F0F0F] text-sm font-medium rounded transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Nouveau produit
        </button>
      </div>

      {error && (
        <div className="bg-[#B85C5C]/10 border border-[#B85C5C]/30 rounded p-3 text-[#B85C5C] text-sm">{error}</div>
      )}

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un produit…"
            className="w-full bg-[#1A1A1A] border border-[#262626] rounded pl-8 pr-3 py-2 text-white text-sm outline-none focus:border-[#C4A265] transition-colors"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as ProductCategory | "")}
          className="bg-[#1A1A1A] border border-[#262626] rounded px-3 py-2 text-[#8A8A8A] text-sm outline-none focus:border-[#C4A265] transition-colors"
        >
          <option value="">Toutes catégories</option>
          {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-[#8A8A8A] text-sm py-10">
          <div className="w-5 h-5 border-2 border-[#C4A265]/30 border-t-[#C4A265] rounded-full animate-spin" />
          Chargement des produits…
        </div>
      ) : (
        <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#262626]">
                {["Produit", "Catégorie", "Prix", "Stock", "Mise en avant", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] text-[#4A4A4A] uppercase tracking-widest font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-[#1F1F1F] hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#262626] shrink-0 overflow-hidden">
                        {product.images[0] && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{product.name}</p>
                        <p className="text-[#4A4A4A] text-xs">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-[#8A8A8A] text-xs capitalize">{product.category.replace(/-/g, " ")}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-white text-sm font-mono">{product.price.toLocaleString("fr-FR")} €</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${
                      product.inStock
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-[#B85C5C]/10 text-[#B85C5C] border-[#B85C5C]/20"
                    }`}>
                      {product.inStock ? "En stock" : "Épuisé"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs ${product.featured ? "text-[#C4A265]" : "text-[#4A4A4A]"}`}>
                      {product.featured ? "✦ Mis en avant" : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => openEditor(product)}
                        className="text-xs text-[#8A8A8A] hover:text-[#C4A265] border border-[#262626] hover:border-[#C4A265] rounded px-3 py-1.5 transition-colors"
                      >
                        Modifier
                      </button>
                      {deleteConfirm === product.id ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-[#8A8A8A]">Confirmer ?</span>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            disabled={deleting === product.id}
                            className="text-xs text-[#B85C5C] hover:text-red-400 transition-colors disabled:opacity-60"
                          >
                            {deleting === product.id ? "…" : "Oui"}
                          </button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-xs text-[#4A4A4A] hover:text-white transition-colors">Non</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(product.id)}
                          className="text-xs text-[#4A4A4A] hover:text-[#B85C5C] border border-[#262626] hover:border-[#B85C5C]/30 rounded px-3 py-1.5 transition-colors"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-[#4A4A4A] text-sm">
                    Aucun produit trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

const inputCls =
  "w-full bg-[#111111] border border-[#262626] rounded px-3 py-2 text-white text-sm outline-none focus:border-[#C4A265] transition-colors";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
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

function ConfigGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-xs text-[#8A8A8A] uppercase tracking-widest mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={`px-3 py-1 rounded text-xs border transition-colors ${
                active
                  ? "border-[#C4A265] text-[#C4A265] bg-[#C4A265]/10"
                  : "border-[#262626] text-[#8A8A8A] hover:border-[#444] hover:text-white"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded border cursor-pointer transition-colors ${
        checked ? "border-[#C4A265]/30 bg-[#C4A265]/5" : "border-[#262626] hover:border-[#333]"
      }`}
      onClick={() => onChange(!checked)}
    >
      <div>
        <p className="text-white text-sm">{label}</p>
        <p className="text-[#4A4A4A] text-xs">{description}</p>
      </div>
      <div className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${checked ? "bg-[#C4A265]" : "bg-[#333]"}`}>
        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
      </div>
    </div>
  );
}
