"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion } from "motion/react";

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
  const [isPending, startTransition] = useTransition();

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
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 py-6 border-b border-border/60 transition-opacity duration-300 ${
        isPending ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ value, label }, i) => {
          const isActive = currentCategory === value;
          return (
            <motion.button
              key={value}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => updateParams("categorie", value)}
              className={`relative px-5 py-2 text-[10px] uppercase tracking-[0.15em] font-body transition-all duration-300 ${
                isActive
                  ? "text-gold border border-gold bg-gold/5"
                  : "text-ink-muted border border-border/60 hover:border-ink-muted/60 hover:text-ink bg-transparent"
              }`}
            >
              {label}
              {isActive && (
                <motion.span
                  layoutId="active-category-indicator"
                  className="absolute inset-0 border border-gold pointer-events-none"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[10px] uppercase tracking-[0.15em] text-ink-muted font-body hidden sm:block">
          Trier par
        </span>
        <div className="relative">
          <select
            value={currentSort}
            onChange={(e) => updateParams("tri", e.target.value)}
            className="text-xs font-body text-ink bg-transparent border border-border/60 px-4 py-2 appearance-none cursor-pointer hover:border-gold/50 transition-colors duration-300 pr-8 focus:outline-none focus:border-gold/70 tracking-wide"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23C4A265' strokeWidth='1.25' strokeLinecap='round'/%3E%3C/svg%3E")`,
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
    </div>
  );
}
