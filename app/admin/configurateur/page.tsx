"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { getConfiguratorData, BASE_COST_PRICE, BASE_SELLING_PRICE } from "@/lib/configurator-data";
import type { ConfiguratorOption } from "@/lib/types";

// ─── Types ────────────────────────────────────────────────────────────────────

type CategoryKey = "sizes" | "shapes" | "legStyles" | "colors" | "zelligePatterns" | "legColors";

const CATEGORY_TABS: { key: CategoryKey; label: string }[] = [
  { key: "sizes",           label: "Tailles"          },
  { key: "shapes",          label: "Formes"            },
  { key: "zelligePatterns", label: "Motifs Zellige"   },
  { key: "legStyles",       label: "Forme des pieds"  },
  { key: "legColors",       label: "Couleur des pieds"},
  { key: "colors",          label: "Couleur plateau"  },
];

// Color swatches for visual preview
const COLOR_SWATCHES: Record<string, string> = {
  // Surface colors
  "blanc-zellige":  "#F5F5F0",
  "noir-mat":       "#1A1A1A",
  "terracotta":     "#C4622D",
  "bleu-fes":       "#1A4A7A",
  "vert-menthe":    "#3A7A5A",
  "ocre-doree":     "#C89A2E",
  // Leg colors
  "blanc-casse":    "#F5F0E8",
  "laiton-brosse":  "#C4A265",
  "bronze-antique": "#8B6914",
  "acier-brut":     "#6B6B6B",
  "vert-de-fes":    "#1B5E3B",
  // Zellige patterns (placeholder colors)
  "ecaille":              "#2D5A8E",
  "losange":              "#7B4EA0",
  "carre":                "#4A8A5E",
  "hexagone":             "#C4A265",
  "etoile-8":             "#B85C5C",
  "rectangle-biseaute":   "#8A8A8A",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcMargin(cost: number, sell: number): number {
  const totalSell = BASE_SELLING_PRICE + sell;
  const totalCost = BASE_COST_PRICE + cost;
  if (totalSell <= 0) return 0;
  return Math.round(((totalSell - totalCost) / totalSell) * 100);
}

function formatPrice(n: number) {
  return n === 0 ? "inclus" : n < 0 ? `-${Math.abs(n)} €` : `+${n} €`;
}

// ─── Option row ───────────────────────────────────────────────────────────────

function OptionRow({
  option,
  categoryKey,
  onChange,
}: {
  option: ConfiguratorOption;
  categoryKey: CategoryKey;
  onChange: (id: string, field: keyof ConfiguratorOption, value: unknown) => void;
}) {
  const margin = calcMargin(option.costPrice, option.sellingPrice);
  const hasColor = categoryKey === "colors" || categoryKey === "zelligePatterns" || categoryKey === "legColors";

  return (
    <tr className="border-b border-[#262626] hover:bg-white/[0.015] transition-colors group">
      <td className="px-4 py-3.5 w-8">
        {hasColor && COLOR_SWATCHES[option.id] ? (
          <div
            className="w-6 h-6 rounded border border-[#3A3A3A]"
            style={{ background: COLOR_SWATCHES[option.id] }}
          />
        ) : (
          <div className="w-6 h-6 rounded border border-[#2A2A2A] bg-[#262626] flex items-center justify-center">
            <span className="text-[10px] text-[#4A4A4A] font-mono">{option.id.charAt(0).toUpperCase()}</span>
          </div>
        )}
      </td>

      <td className="px-4 py-3.5">
        <p className="text-white text-sm font-medium">{option.label}</p>
        {option.description && (
          <p className="text-[#4A4A4A] text-xs mt-0.5 max-w-xs">{option.description}</p>
        )}
      </td>

      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={option.costPrice}
            onChange={(e) => onChange(option.id, "costPrice", Number(e.target.value))}
            className="w-20 bg-[#111] border border-[#2A2A2A] rounded px-2 py-1.5 text-white text-xs font-mono focus:border-[#C4A265] focus:outline-none transition-colors"
          />
          <span className="text-[#4A4A4A] text-xs">€</span>
        </div>
      </td>

      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={option.sellingPrice}
            onChange={(e) => onChange(option.id, "sellingPrice", Number(e.target.value))}
            className="w-20 bg-[#111] border border-[#2A2A2A] rounded px-2 py-1.5 text-white text-xs font-mono focus:border-[#C4A265] focus:outline-none transition-colors"
          />
          <span className="text-[#4A4A4A] text-xs">€</span>
        </div>
        <p className="text-[#4A4A4A] text-[10px] mt-0.5 font-mono">{formatPrice(option.sellingPrice)}</p>
      </td>

      <td className="px-4 py-3.5">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium ${
            margin >= 60
              ? "bg-emerald-500/10 text-emerald-400"
              : margin >= 40
              ? "bg-[#C4A265]/10 text-[#C4A265]"
              : margin >= 20
              ? "bg-orange-500/10 text-orange-400"
              : "bg-[#B85C5C]/10 text-[#B85C5C]"
          }`}
        >
          {margin}%
        </span>
      </td>

      <td className="px-4 py-3.5">
        <button
          onClick={() => onChange(option.id, "available", !option.available)}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
            option.available ? "bg-[#C4A265]" : "bg-[#2A2A2A]"
          }`}
          title={option.available ? "Disponible" : "Indisponible"}
        >
          <span
            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
              option.available ? "translate-x-4.5" : "translate-x-0.5"
            }`}
          />
        </button>
        <span className={`ml-2 text-xs ${option.available ? "text-[#5C8A5E]" : "text-[#4A4A4A]"}`}>
          {option.available ? "Actif" : "Masqué"}
        </span>
      </td>
    </tr>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConfigurateurAdminPage() {
  const [activeTab, setActiveTab] = useState<CategoryKey>("sizes");
  const [saved, setSaved] = useState(false);
  const [data, setData] = useState(() => getConfiguratorData());

  const category = data[activeTab];

  const handleChange = useCallback(
    (optionId: string, field: keyof ConfiguratorOption, value: unknown) => {
      setData((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          options: prev[activeTab].options.map((o) =>
            o.id === optionId ? { ...o, [field]: value } : o
          ),
        },
      }));
    },
    [activeTab]
  );

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  // Summary stats
  const allOptions = Object.values(data).flatMap((c) => c.options);
  const avgMargin = Math.round(
    allOptions.reduce((sum, o) => sum + calcMargin(o.costPrice, o.sellingPrice), 0) / allOptions.length
  );
  const mostExpensive = allOptions.reduce((a, b) =>
    BASE_SELLING_PRICE + a.sellingPrice > BASE_SELLING_PRICE + b.sellingPrice ? a : b
  );
  const cheapest = allOptions.reduce((a, b) =>
    BASE_SELLING_PRICE + a.sellingPrice < BASE_SELLING_PRICE + b.sellingPrice ? a : b
  );

  return (
    <div className="max-w-6xl space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-white text-2xl font-display tracking-wide">Configurateur de prix</h2>
          <p className="text-[#4A4A4A] text-sm mt-0.5">
            Gérez les options et la tarification de chaque configuration de table
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/collection"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded border border-[#2A2A2A] text-[#8A8A8A] hover:text-white hover:border-[#3A3A3A] text-sm transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Aperçu configurateur
          </Link>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${
              saved
                ? "bg-[#5C8A5E] text-white"
                : "bg-[#C4A265] hover:bg-[#D4B87A] text-[#0F0F0F]"
            }`}
          >
            {saved ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Sauvegardé
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Sauvegarder
              </>
            )}
          </button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-4">
          <p className="text-[#4A4A4A] text-xs uppercase tracking-widest mb-2">Marge moyenne</p>
          <p className="text-white text-xl font-display">{avgMargin}%</p>
          <div className="mt-2 h-1 bg-[#262626] rounded-full overflow-hidden">
            <div className="h-full bg-[#C4A265] rounded-full" style={{ width: `${Math.min(avgMargin, 100)}%` }} />
          </div>
        </div>
        <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-4">
          <p className="text-[#4A4A4A] text-xs uppercase tracking-widest mb-2">Option la plus chère</p>
          <p className="text-white text-sm font-medium">{mostExpensive.label}</p>
          <p className="text-[#C4A265] text-xs font-mono mt-1">
            {BASE_SELLING_PRICE + mostExpensive.sellingPrice} € TTC
          </p>
        </div>
        <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-4">
          <p className="text-[#4A4A4A] text-xs uppercase tracking-widest mb-2">Option de base</p>
          <p className="text-white text-sm font-medium">{cheapest.label}</p>
          <p className="text-[#5C8A5E] text-xs font-mono mt-1">
            {BASE_SELLING_PRICE + cheapest.sellingPrice} € TTC
          </p>
        </div>
      </div>

      {/* Base price info */}
      <div className="bg-[#C4A265]/5 border border-[#C4A265]/15 rounded-lg px-5 py-3.5 flex items-center gap-6">
        <div>
          <p className="text-[#8A8A8A] text-xs uppercase tracking-widest">Prix de base</p>
          <p className="text-white text-sm font-mono mt-0.5">Coût: {BASE_COST_PRICE} € — Vente: {BASE_SELLING_PRICE} €</p>
        </div>
        <div className="w-px h-8 bg-[#C4A265]/20" />
        <p className="text-[#8A8A8A] text-xs">
          Les prix des options s'ajoutent au prix de base. Une valeur négative indique une réduction.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg overflow-hidden">
        <div className="flex border-b border-[#262626]">
          {CATEGORY_TABS.map((tab) => {
            const count = data[tab.key].options.filter((o) => o.available).length;
            const total = data[tab.key].options.length;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-2 px-5 py-3.5 text-sm transition-colors border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? "border-[#C4A265] text-white"
                    : "border-transparent text-[#4A4A4A] hover:text-[#8A8A8A]"
                }`}
              >
                {tab.label}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    activeTab === tab.key
                      ? "bg-[#C4A265]/15 text-[#C4A265]"
                      : "bg-[#262626] text-[#4A4A4A]"
                  }`}
                >
                  {count}/{total}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category header */}
        <div className="px-5 py-3.5 bg-[#111] border-b border-[#262626]">
          <p className="text-white text-sm font-medium">{category.label}</p>
          <p className="text-[#4A4A4A] text-xs mt-0.5">{category.description}</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#262626]">
                <th className="px-4 py-2.5 text-left w-8" />
                <th className="px-4 py-2.5 text-left text-[10px] text-[#4A4A4A] uppercase tracking-widest font-medium">Option</th>
                <th className="px-4 py-2.5 text-left text-[10px] text-[#4A4A4A] uppercase tracking-widest font-medium">Coût</th>
                <th className="px-4 py-2.5 text-left text-[10px] text-[#4A4A4A] uppercase tracking-widest font-medium">Prix de vente</th>
                <th className="px-4 py-2.5 text-left text-[10px] text-[#4A4A4A] uppercase tracking-widest font-medium">Marge</th>
                <th className="px-4 py-2.5 text-left text-[10px] text-[#4A4A4A] uppercase tracking-widest font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {category.options.map((option) => (
                <OptionRow
                  key={option.id}
                  option={option}
                  categoryKey={activeTab}
                  onChange={handleChange}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#262626] bg-[#111] flex items-center justify-between">
          <p className="text-[#4A4A4A] text-xs">
            {category.options.filter((o) => o.available).length} option(s) active(s) sur {category.options.length}
          </p>
          <p className="text-[#4A4A4A] text-xs">
            Les modifications ne sont pas persistées — démo locale uniquement
          </p>
        </div>
      </div>
    </div>
  );
}
