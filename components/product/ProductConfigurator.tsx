"use client";

import { useState, useEffect } from "react";

// Zellige color map for visual swatches
const ZELLIGE_COLORS: Record<string, string> = {
  "Noir Onyx":        "#1A1A1A",
  "Bleu de Fès":      "#1B4B8A",
  "Blanc Nacré":      "#F5F2EC",
  "Vert Émeraude":    "#2D6A4F",
  "Terre Naturelle":  "#B08B6E",
  "Rouge Brique":     "#A0522D",
  "Orange Brûlé":     "#CC5500",
};

interface ProductConfiguratorProps {
  zelliges: string[];
  sizes: string[];
  bases: string[];
  onChange: (config: { zellige: string; size: string; base: string }) => void;
}

export default function ProductConfigurator({
  zelliges,
  sizes,
  bases,
  onChange,
}: ProductConfiguratorProps) {
  const [selectedZellige, setSelectedZellige] = useState(zelliges[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedBase, setSelectedBase] = useState(bases[0]);

  useEffect(() => {
    onChange({ zellige: selectedZellige, size: selectedSize, base: selectedBase });
  }, [selectedZellige, selectedSize, selectedBase, onChange]);

  return (
    <div className="space-y-6">
      {/* Zellige selector */}
      <div>
        <div className="flex items-baseline justify-between mb-3">
          <p className="text-xs uppercase tracking-widest text-ink-muted font-body font-medium">
            Zellige
          </p>
          <p className="text-sm text-ink font-body">{selectedZellige}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {zelliges.map((z) => {
            const color = ZELLIGE_COLORS[z] ?? "#8A8A8A";
            const isLight = color === "#F5F2EC" || color === "#B08B6E";
            return (
              <button
                key={z}
                onClick={() => setSelectedZellige(z)}
                title={z}
                className={`relative w-9 h-9 rounded-full transition-all duration-200 ${
                  selectedZellige === z
                    ? "ring-2 ring-offset-2 ring-ink scale-110"
                    : "hover:scale-105"
                }`}
                style={{ backgroundColor: color }}
                aria-label={z}
                aria-pressed={selectedZellige === z}
              >
                {selectedZellige === z && (
                  <span
                    className={`absolute inset-0 flex items-center justify-center rounded-full`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6L5 9L10 3"
                        stroke={isLight ? "#1A1A1A" : "white"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
                {/* White border for near-white swatches */}
                {color === "#F5F2EC" && (
                  <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-warm-gray" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size selector */}
      <div>
        <div className="flex items-baseline justify-between mb-3">
          <p className="text-xs uppercase tracking-widest text-ink-muted font-body font-medium">
            Taille
          </p>
          <p className="text-sm text-ink font-body">{selectedSize}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`px-4 py-2 text-sm font-body border transition-all duration-200 ${
                selectedSize === s
                  ? "border-ink bg-ink text-cream"
                  : "border-border text-ink-light hover:border-ink-muted"
              }`}
              aria-pressed={selectedSize === s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Base selector */}
      <div>
        <div className="flex items-baseline justify-between mb-3">
          <p className="text-xs uppercase tracking-widest text-ink-muted font-body font-medium">
            Base
          </p>
          <p className="text-sm text-ink font-body">{selectedBase}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {bases.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBase(b)}
              className={`px-4 py-2 text-sm font-body border transition-all duration-200 ${
                selectedBase === b
                  ? "border-ink bg-ink text-cream"
                  : "border-border text-ink-light hover:border-ink-muted"
              }`}
              aria-pressed={selectedBase === b}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
