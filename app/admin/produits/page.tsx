"use client";

import { products } from "@/lib/data";

export default function ProduitsAdminPage() {
  return (
    <div className="max-w-6xl space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-white text-2xl font-display tracking-wide">Produits</h2>
          <p className="text-[#4A4A4A] text-sm mt-0.5">{products.length} références dans le catalogue</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#C4A265] hover:bg-[#D4B87A] text-[#0F0F0F] text-sm font-medium rounded transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Nouveau produit
        </button>
      </div>

      <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#262626]">
              {["Produit", "Catégorie", "Prix", "Stock", "Mise en avant"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] text-[#4A4A4A] uppercase tracking-widest font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-[#1F1F1F] hover:bg-white/[0.02] transition-colors cursor-pointer">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-[#262626] shrink-0" />
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
