"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const CATEGORIES = [
  { value: "all",              label: "Tout" },
  { value: "table-basse",      label: "Tables Basses" },
  { value: "table-a-manger",   label: "Tables à Manger" },
  { value: "table-d-appoint",  label: "Tables d'Appoint" },
  { value: "console",          label: "Consoles" },
];

const SORT_OPTIONS = [
  { value: "default",    label: "Nos coups de cœur" },
  { value: "price-asc",  label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
];

export default function CollectionFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentCategory = searchParams.get("categorie") ?? "all";
  const currentSort = searchParams.get("tri") ?? "default";

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "default") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-5 border-b border-border">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => updateParams("categorie", value)}
            className={`px-4 py-1.5 text-xs uppercase tracking-widest font-body border transition-all duration-200 ${
              currentCategory === value
                ? "border-ink bg-ink text-cream"
                : "border-border text-ink-muted hover:border-ink-muted hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs uppercase tracking-widest text-ink-muted font-body hidden sm:block">
          Trier par
        </span>
        <select
          value={currentSort}
          onChange={(e) => updateParams("tri", e.target.value)}
          className="text-sm font-body text-ink bg-transparent border border-border px-3 py-1.5 appearance-none cursor-pointer hover:border-ink-muted transition-colors duration-200 pr-8 focus:outline-none focus:border-ink"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%238A8A8A' strokeWidth='1.25' strokeLinecap='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
          }}
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
