"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  getConfiguratorData,
  BASE_SELLING_PRICE,
  computeConfiguredTable,
  getSizesForShape,
} from "@/lib/configurator-data";
import type { ConfiguratorOption } from "@/lib/types";
import { useCart } from "@/context/CartContext";

// ─── Design tokens (used in inline styles) ────────────────────────────────────

const TOKENS = {
  cream:       "#FAFAF7",
  creamDark:   "#F0EDE6",
  ink:         "#1A1A1A",
  inkLight:    "#4A4A4A",
  inkMuted:    "#8A8A8A",
  gold:        "#C4A265",
  goldLight:   "#D4B87A",
  warmGray:    "#E8E4DE",
  warmGrayL:   "#F2F0EC",
  border:      "#E0DCD4",
  success:     "#5C8A5E",
  error:       "#B85C5C",
} as const;

// ─── Leg color map ────────────────────────────────────────────────────────────

export const LEG_COLOR_MAP: Record<string, string> = {
  "noir-mat":       "#1A1A1A",
  "blanc-casse":    "#F5F0E8",
  "laiton-brosse":  "#C4A265",
  "bronze-antique": "#8B6914",
  "acier-brut":     "#6B6B6B",
  "vert-de-fes":    "#1B5E3B",
};

// ─── Zellige colour map (table surface) ──────────────────────────────────────

export const ZELLIGE_COLOR_MAP: Record<string, string> = {
  "blanc-zellige":  "#F5F5F0",
  "noir-mat":       "#2A2A2A",
  "terracotta":     "#C4622D",
  "bleu-fes":       "#1A4A7A",
  "vert-menthe":    "#3A7A5A",
  "ocre-doree":     "#C89A2E",
};

// ─── SVG Shape Icons ──────────────────────────────────────────────────────────

function ShapeIcon({ shape, active }: { shape: string; active: boolean }) {
  const stroke = active ? TOKENS.gold : TOKENS.inkMuted;
  const fill   = active ? `${TOKENS.gold}18` : "none";
  switch (shape) {
    case "rectangulaire":
      return (
        <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
          <rect x="4" y="7" width="48" height="26" rx="3" stroke={stroke} strokeWidth="2" fill={fill} />
        </svg>
      );
    case "ronde":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="17" stroke={stroke} strokeWidth="2" fill={fill} />
        </svg>
      );
    case "ovale":
      return (
        <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
          <ellipse cx="30" cy="20" rx="25" ry="14" stroke={stroke} strokeWidth="2" fill={fill} />
        </svg>
      );
    case "carree":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="5" y="5" width="30" height="30" rx="2" stroke={stroke} strokeWidth="2" fill={fill} />
        </svg>
      );
    default:
      return null;
  }
}

// ─── SVG Leg Icons ────────────────────────────────────────────────────────────

function LegIcon({ leg, active }: { leg: string; active: boolean }) {
  const stroke = active ? TOKENS.gold : TOKENS.inkMuted;
  const fill   = active ? `${TOKENS.gold}18` : "none";

  switch (leg) {
    case "cylindre":
      return (
        <svg width="44" height="52" viewBox="0 0 44 52" fill="none">
          {/* Two cylinders */}
          <rect x="7" y="4" width="8" height="36" rx="4" stroke={stroke} strokeWidth="2" fill={fill} />
          <rect x="29" y="4" width="8" height="36" rx="4" stroke={stroke} strokeWidth="2" fill={fill} />
          {/* Base rail */}
          <rect x="2" y="40" width="40" height="5" rx="2.5" stroke={stroke} strokeWidth="1.5" fill={fill} />
        </svg>
      );
    case "cube":
      return (
        <svg width="44" height="52" viewBox="0 0 44 52" fill="none">
          {/* Wide rectangular block */}
          <rect x="8" y="18" width="28" height="22" rx="2" stroke={stroke} strokeWidth="2" fill={fill} />
          <rect x="2" y="40" width="40" height="5" rx="2.5" stroke={stroke} strokeWidth="1.5" fill={fill} />
        </svg>
      );
    case "compas":
      return (
        <svg width="44" height="52" viewBox="0 0 44 52" fill="none">
          {/* V-shape legs */}
          <line x1="10" y1="4" x2="22" y2="40" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="34" y1="4" x2="22" y2="40" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <rect x="2" y="40" width="40" height="5" rx="2.5" stroke={stroke} strokeWidth="1.5" fill={fill} />
        </svg>
      );
    case "forge-artistique":
      return (
        <svg width="44" height="52" viewBox="0 0 44 52" fill="none">
          {/* Wavy/hammered look */}
          <path d="M10 4 C9 12 11 20 9 28 C8 34 10 38 10 40" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M34 4 C35 12 33 20 35 28 C36 34 34 38 34 40" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Decorative cross-bar */}
          <line x1="10" y1="22" x2="34" y2="22" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <rect x="2" y="40" width="40" height="5" rx="2.5" stroke={stroke} strokeWidth="1.5" fill={fill} />
        </svg>
      );
    case "trapeze":
      return (
        <svg width="44" height="52" viewBox="0 0 44 52" fill="none">
          {/* Tapered legs — wider top, narrower bottom */}
          <path d="M8 4 L12 40" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M36 4 L32 40" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <rect x="2" y="40" width="40" height="5" rx="2.5" stroke={stroke} strokeWidth="1.5" fill={fill} />
        </svg>
      );
    case "arche":
      return (
        <svg width="44" height="52" viewBox="0 0 44 52" fill="none">
          {/* Arch / horseshoe shape */}
          <path d="M6 40 L6 18 Q6 4 22 4 Q38 4 38 18 L38 40" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <rect x="2" y="40" width="40" height="5" rx="2.5" stroke={stroke} strokeWidth="1.5" fill={fill} />
        </svg>
      );
    default:
      return null;
  }
}

// ─── Zellige Pattern Preview ──────────────────────────────────────────────────

function ZelligePatternPreview({ pattern, surfaceColor }: { pattern: string; surfaceColor: string }) {
  const ac = TOKENS.gold;
  const bg = surfaceColor || "#F5F5F0";

  const styles: Record<string, React.CSSProperties> = {
    ecaille: {
      backgroundImage: [
        `radial-gradient(ellipse at 50% 0%, transparent 65%, ${ac}45 65%)`,
        `radial-gradient(ellipse at 50% 0%, transparent 65%, ${ac}45 65%)`,
      ].join(", "),
      backgroundSize: "24px 16px, 24px 16px",
      backgroundPosition: "0 0, 12px 8px",
      backgroundColor: bg,
    },
    losange: {
      backgroundImage: [
        `linear-gradient(45deg, ${ac}55 25%, transparent 25%)`,
        `linear-gradient(135deg, ${ac}55 25%, transparent 25%)`,
        `linear-gradient(45deg, transparent 75%, ${ac}35 75%)`,
        `linear-gradient(135deg, transparent 75%, ${ac}35 75%)`,
      ].join(", "),
      backgroundSize: "16px 16px",
      backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
      backgroundColor: bg,
    },
    carre: {
      backgroundImage: [
        `linear-gradient(${ac}40 1.5px, transparent 1.5px)`,
        `linear-gradient(90deg, ${ac}40 1.5px, transparent 1.5px)`,
      ].join(", "),
      backgroundSize: "14px 14px",
      backgroundColor: bg,
    },
    hexagone: {
      backgroundImage: [
        `radial-gradient(circle at 0% 0%, ${ac}40 5px, transparent 5px)`,
        `radial-gradient(circle at 50% 0%, ${ac}35 5px, transparent 5px)`,
        `radial-gradient(circle at 100% 0%, ${ac}40 5px, transparent 5px)`,
        `radial-gradient(circle at 50% 100%, ${ac}40 5px, transparent 5px)`,
      ].join(", "),
      backgroundSize: "20px 18px",
      backgroundColor: bg,
    },
    "etoile-8": {
      backgroundImage: [
        `linear-gradient(0deg, ${ac}40 1.5px, transparent 1.5px)`,
        `linear-gradient(90deg, ${ac}40 1.5px, transparent 1.5px)`,
        `linear-gradient(45deg, ${ac}25 1.5px, transparent 1.5px)`,
        `linear-gradient(135deg, ${ac}25 1.5px, transparent 1.5px)`,
      ].join(", "),
      backgroundSize: "18px 18px",
      backgroundColor: bg,
    },
    "rectangle-biseaute": {
      backgroundImage: [
        `linear-gradient(${ac}40 1.5px, transparent 1.5px)`,
        `linear-gradient(90deg, ${ac}40 1.5px, transparent 1.5px)`,
        `linear-gradient(60deg, transparent 45%, ${ac}20 45%, ${ac}20 55%, transparent 55%)`,
      ].join(", "),
      backgroundSize: "28px 14px, 28px 14px, 28px 14px",
      backgroundPosition: "0 0, 0 0, 0 0",
      backgroundColor: bg,
    },
  };

  return (
    <div
      className="w-full rounded-sm border overflow-hidden"
      style={{ height: 64, border: `1px solid ${TOKENS.border}`, ...styles[pattern] }}
    />
  );
}

// ─── Live Table Preview ───────────────────────────────────────────────────────

function TablePreview({
  shape,
  sizeId,
  zelligePattern,
  legStyle,
  legColor,
  surfaceColor,
}: {
  shape: string;
  sizeId: string;
  zelligePattern: string;
  legStyle: string;
  legColor: string;
  surfaceColor: string;
}) {
  const legColorHex = LEG_COLOR_MAP[legColor] ?? TOKENS.ink;
  const baseHex = ZELLIGE_COLOR_MAP[surfaceColor] ?? "#F5F5F0";

  // Compute size ratios
  const data = getConfiguratorData();
  const sizeOpt = data.sizes.options.find((s) => s.id === sizeId);
  const dims = sizeOpt?.dimensions;
  let scale = 1;
  if (dims) {
    const ref = shape === "ronde" ? (dims.diameter ?? 70) : (dims.width ?? 90);
    scale = Math.min(Math.max(ref / 90, 0.65), 1.3);
  }

  const isRound   = shape === "ronde";
  const isOval    = shape === "ovale";
  const isCarre   = shape === "carree";
  const baseW     = isRound || isCarre ? 220 : isOval ? 260 : 280;
  const baseH     = isRound || isCarre ? 220 : isOval ? 148 : 154;
  const w = baseW * scale;
  const h = baseH * scale;

  const tableRadius = isRound ? "50%" : isOval ? "50%" : isCarre ? "8px" : "10px";

  // Table surface with zellige CSS pattern
  const ac = TOKENS.gold;
  const zelligeStyle: Record<string, React.CSSProperties> = {
    ecaille: {
      backgroundImage: [
        `radial-gradient(ellipse at 50% 0%, transparent 65%, ${ac}30 65%)`,
        `radial-gradient(ellipse at 50% 0%, transparent 65%, ${ac}30 65%)`,
      ].join(", "),
      backgroundSize: "22px 15px, 22px 15px",
      backgroundPosition: "0 0, 11px 7.5px",
    },
    losange: {
      backgroundImage: [
        `linear-gradient(45deg, ${ac}35 25%, transparent 25%)`,
        `linear-gradient(135deg, ${ac}35 25%, transparent 25%)`,
        `linear-gradient(45deg, transparent 75%, ${ac}20 75%)`,
        `linear-gradient(135deg, transparent 75%, ${ac}20 75%)`,
      ].join(", "),
      backgroundSize: "14px 14px",
      backgroundPosition: "0 0, 0 7px, 7px -7px, -7px 0px",
    },
    carre: {
      backgroundImage: [
        `linear-gradient(${ac}25 1px, transparent 1px)`,
        `linear-gradient(90deg, ${ac}25 1px, transparent 1px)`,
      ].join(", "),
      backgroundSize: "12px 12px",
    },
    hexagone: {
      backgroundImage: [
        `radial-gradient(circle at 0% 0%, ${ac}30 4px, transparent 4px)`,
        `radial-gradient(circle at 50% 0%, ${ac}25 4px, transparent 4px)`,
        `radial-gradient(circle at 50% 100%, ${ac}30 4px, transparent 4px)`,
      ].join(", "),
      backgroundSize: "18px 16px",
    },
    "etoile-8": {
      backgroundImage: [
        `linear-gradient(0deg, ${ac}28 1px, transparent 1px)`,
        `linear-gradient(90deg, ${ac}28 1px, transparent 1px)`,
        `linear-gradient(45deg, ${ac}18 1px, transparent 1px)`,
        `linear-gradient(135deg, ${ac}18 1px, transparent 1px)`,
      ].join(", "),
      backgroundSize: "16px 16px",
    },
    "rectangle-biseaute": {
      backgroundImage: [
        `linear-gradient(${ac}22 1px, transparent 1px)`,
        `linear-gradient(90deg, ${ac}22 1px, transparent 1px)`,
      ].join(", "),
      backgroundSize: "24px 12px",
    },
  };

  // Leg rendering
  const legH = 56 * scale;
  const legW  = w * 0.7;

  function renderLegs() {
    const legBase = {
      background: legColorHex,
      boxShadow: `0 2px 8px ${legColorHex}40`,
      transition: "all 0.6s ease",
    };

    switch (legStyle) {
      case "cylindre":
        return (
          <div className="flex justify-around" style={{ width: legW }}>
            {[0, 1].map((i) => (
              <div key={i} style={{ ...legBase, width: 5, height: legH, borderRadius: 999 }} />
            ))}
          </div>
        );
      case "cube":
        return (
          <div className="flex justify-center" style={{ width: legW }}>
            <div style={{ ...legBase, width: legW * 0.6, height: legH * 0.7, borderRadius: 4 }} />
          </div>
        );
      case "compas":
        return (
          <div className="flex justify-center items-start" style={{ width: legW, height: legH }}>
            <div style={{
              ...legBase,
              width: 3,
              height: legH,
              borderRadius: 2,
              transform: "rotate(-14deg)",
              transformOrigin: "top center",
              marginRight: -6,
            }} />
            <div style={{
              ...legBase,
              width: 3,
              height: legH,
              borderRadius: 2,
              transform: "rotate(14deg)",
              transformOrigin: "top center",
            }} />
          </div>
        );
      case "forge-artistique":
        return (
          <div className="flex justify-around" style={{ width: legW }}>
            {[0, 1].map((i) => (
              <div key={i} style={{
                ...legBase,
                width: 4,
                height: legH,
                borderRadius: 2,
                transform: `rotate(${i === 0 ? -2 : 2}deg)`,
              }} />
            ))}
          </div>
        );
      case "trapeze":
        return (
          <div className="flex justify-around" style={{ width: legW }}>
            {[0, 1].map((i) => (
              <div key={i} style={{
                ...legBase,
                width: 0,
                height: 0,
                borderLeft: "3px solid transparent",
                borderRight: "3px solid transparent",
                borderTop: `${legH}px solid ${legColorHex}`,
                borderRadius: 0,
                background: "none",
                boxShadow: "none",
              }} />
            ))}
          </div>
        );
      case "arche":
        return (
          <div className="flex justify-center" style={{ width: legW }}>
            <div style={{
              width: legW * 0.7,
              height: legH * 0.85,
              borderRadius: `${legW * 0.35}px ${legW * 0.35}px 0 0`,
              border: `4px solid ${legColorHex}`,
              borderBottom: "none",
              boxShadow: `0 2px 8px ${legColorHex}30`,
              transition: "all 0.6s ease",
            }} />
          </div>
        );
      default:
        return (
          <div className="flex justify-around" style={{ width: legW }}>
            {[0, 1].map((i) => (
              <div key={i} style={{ ...legBase, width: 4, height: legH, borderRadius: 999 }} />
            ))}
          </div>
        );
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full select-none" style={{ minHeight: 360 }}>
      {/* Floor shadow */}
      <div
        className="absolute blur-2xl rounded-full pointer-events-none"
        style={{
          bottom: 48,
          width: w * 0.7,
          height: 18,
          background: TOKENS.ink,
          opacity: 0.12,
        }}
      />

      {/* Table top */}
      <div
        className="relative overflow-hidden"
        style={{
          width: w,
          height: h,
          borderRadius: tableRadius,
          background: `linear-gradient(135deg, ${baseHex}EE 0%, ${baseHex}BB 60%, ${baseHex}99 100%)`,
          boxShadow: `0 10px 48px rgba(26,26,26,0.14), inset 0 1px 0 rgba(255,255,255,0.7)`,
          border: `1px solid rgba(224,220,212,0.7)`,
          transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)",
          ...(zelligeStyle[zelligePattern] ?? {}),
        }}
      >
        {/* Sheen */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(140deg, rgba(255,255,255,0.42) 0%, transparent 55%)",
          borderRadius: "inherit",
        }} />
        {/* Inner edge */}
        <div className="absolute inset-0 pointer-events-none" style={{
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)",
          borderRadius: "inherit",
        }} />
      </div>

      {/* Legs */}
      <div className="flex items-start justify-center" style={{ marginTop: 0, transition: "all 0.6s ease" }}>
        {renderLegs()}
      </div>
    </div>
  );
}

// ─── Sur Mesure Contact Form ──────────────────────────────────────────────────

function SurMesureForm({ shape, onBack }: { shape: string; onBack: () => void }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    width: "", depth: "", height: "",
    description: "", budget: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const budgets = [
    { value: "lt1500", label: "Moins de 1 500 €" },
    { value: "1500-2500", label: "1 500 – 2 500 €" },
    { value: "2500-4000", label: "2 500 – 4 000 €" },
    { value: "gt4000", label: "Plus de 4 000 €" },
  ];

  const shapeLabels: Record<string, string> = {
    rectangulaire: "Rectangulaire", ronde: "Ronde",
    ovale: "Ovale", carree: "Carrée",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-cream p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto" style={{ background: `${TOKENS.success}15` }}>
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke={TOKENS.success}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-xl text-ink font-light">Demande envoyée</h3>
        <p className="text-ink-muted text-sm max-w-sm mx-auto leading-relaxed">
          Merci pour votre message. Nos artisans vous recontacte sous <strong className="text-ink">48h</strong> avec une proposition personnalisée.
        </p>
        <button
          onClick={onBack}
          className="text-sm text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
        >
          Revenir aux tailles standard
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gold/40 bg-cream overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border bg-cream-dark">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-gold font-body mb-1">Sur Mesure</p>
            <h3 className="font-display text-xl text-ink font-light">Devis gratuit — {shapeLabels[shape] ?? shape}</h3>
            <p className="text-xs text-ink-muted mt-1">Nos maalems étudient chaque projet individuellement</p>
          </div>
          <button onClick={onBack} className="text-ink-muted hover:text-ink transition-colors mt-0.5 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
        {/* Contact */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-medium text-ink-light mb-1.5">Nom complet *</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Votre nom"
              className="w-full px-4 py-3 rounded-xl border border-border bg-cream text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink-light mb-1.5">Email *</label>
              <input
                required type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="vous@email.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-cream text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-light mb-1.5">Téléphone</label>
              <input
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="+33 6 …"
                className="w-full px-4 py-3 rounded-xl border border-border bg-cream text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Dimensions */}
        <div>
          <label className="block text-xs font-medium text-ink-light mb-1.5">Dimensions souhaitées</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { key: "width", ph: "Largeur cm" },
              { key: "depth", ph: "Profondeur cm" },
              { key: "height", ph: "Hauteur cm" },
            ].map(({ key, ph }) => (
              <input
                key={key}
                type="number" min="0" max="500"
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                placeholder={ph}
                className="w-full px-3 py-3 rounded-xl border border-border bg-cream text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-gold transition-colors text-center"
              />
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-xs font-medium text-ink-light mb-1.5">Budget envisagé</label>
          <div className="grid grid-cols-2 gap-2">
            {budgets.map((b) => (
              <button
                key={b.value} type="button"
                onClick={() => setForm((f) => ({ ...f, budget: b.value }))}
                className={`px-3 py-2.5 rounded-xl border text-xs font-medium text-left transition-all duration-150 ${
                  form.budget === b.value
                    ? "border-gold bg-gold/8 text-gold"
                    : "border-border bg-cream text-ink-light hover:border-gold/50"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-medium text-ink-light mb-1.5">Décrivez votre projet</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Style de votre intérieur, usage de la table, inspirations…"
            className="w-full px-4 py-3 rounded-xl border border-border bg-cream text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-gold transition-colors resize-none"
          />
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full py-4 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
          style={{ background: loading ? TOKENS.warmGray : TOKENS.ink, color: loading ? TOKENS.inkMuted : TOKENS.cream }}
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
                <path d="M12 2 A10 10 0 0 1 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Envoi en cours…
            </>
          ) : (
            "Demander un devis gratuit"
          )}
        </button>

        <p className="text-center text-xs text-ink-muted">
          Réponse sous 48h · Aucun engagement
        </p>
      </form>
    </div>
  );
}

// ─── Steps definition ─────────────────────────────────────────────────────────

const STEPS = [
  { id: "shapes",          stepNum: 1, label: "Forme"         },
  { id: "sizes",           stepNum: 2, label: "Dimensions"     },
  { id: "zelligePatterns", stepNum: 3, label: "Motif Zellige"  },
  { id: "legStyles",       stepNum: 4, label: "Forme des pieds"},
  { id: "legColors",       stepNum: 5, label: "Couleur des pieds"},
  { id: "colors",          stepNum: 6, label: "Couleur du zellige"},
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ConfigurateurPage() {
  const data = getConfiguratorData();
  const { addToCart, openCart } = useCart();

  const [activeStep, setActiveStep] = useState<string>("shapes");
  const [isSurMesure, setIsSurMesure] = useState(false);
  const [selections, setSelections] = useState<Record<string, string>>({
    shapes:          "rectangulaire",
    sizes:           "rect-90x60",
    zelligePatterns: "ecaille",
    legStyles:       "cylindre",
    legColors:       "noir-mat",
    colors:          "blanc-zellige",
  });
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [saved, setSaved] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // When shape changes, reset size to first valid option for that shape
  const prevShape = useRef(selections.shapes);
  useEffect(() => {
    if (prevShape.current !== selections.shapes) {
      prevShape.current = selections.shapes;
      const shapeSizes = getSizesForShape(selections.shapes, data.sizes.options).filter((s) => !s.isSurMesure);
      if (shapeSizes.length > 0) {
        setSelections((prev) => ({ ...prev, sizes: shapeSizes[0].id }));
      }
      setIsSurMesure(false);
    }
  }, [selections.shapes, data.sizes.options]);

  // Load saved config from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("maison-attar-config-v2");
      if (stored) {
        const parsed = JSON.parse(stored);
        setSelections(parsed);
      }
    } catch { /* ignore */ }
  }, []);

  const configuredTable = computeConfiguredTable(
    selections.sizes,
    selections.shapes,
    selections.legStyles,
    selections.colors,
    selections.zelligePatterns,
    selections.legColors,
  );

  const totalPrice = BASE_SELLING_PRICE + configuredTable.totalSellingPrice;
  const monthlyPrice = Math.ceil(totalPrice / 3);

  const select = useCallback((category: string, optionId: string) => {
    setSelections((prev) => ({ ...prev, [category]: optionId }));
  }, []);

  const advanceStep = useCallback((currentStep: string) => {
    const idx = STEPS.findIndex((s) => s.id === currentStep);
    if (idx < STEPS.length - 1) setActiveStep(STEPS[idx + 1].id);
  }, []);

  const handleSave = useCallback(() => {
    try {
      localStorage.setItem("maison-attar-config-v2", JSON.stringify(selections));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch { /* ignore */ }
  }, [selections]);

  const handleAddToCart = useCallback(() => {
    const shapeOpt   = data.shapes.options.find((o) => o.id === selections.shapes);
    const patternOpt = data.zelligePatterns.options.find((o) => o.id === selections.zelligePatterns);
    const sizeOpt    = data.sizes.options.find((o) => o.id === selections.sizes);

    const configLabel = [shapeOpt?.label, sizeOpt?.label, patternOpt?.label]
      .filter(Boolean).join(" — ");

    addToCart({
      id: `configurateur-${Date.now()}`,
      name: `Table sur mesure — ${configLabel}`,
      slug: "table-sur-mesure",
      price: totalPrice,
      image: "/images/placeholder.jpg",
      configuration: {
        zellige: selections.zelligePatterns,
        size: selections.sizes,
        base: selections.legColors,
      },
    });

    setAddedToCart(true);
    setTimeout(() => { setAddedToCart(false); openCart(); }, 800);
  }, [selections, totalPrice, addToCart, openCart, data]);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7 * 7);
  const deliveryStr = deliveryDate.toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  });

  // Sizes filtered by selected shape
  const filteredSizes = getSizesForShape(selections.shapes, data.sizes.options);

  return (
    <div className="min-h-screen bg-cream">
      {/* Page header */}
      <div className="border-b border-border bg-cream-dark/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-body mb-2">Configurateur</p>
          <h1 className="font-display text-4xl md:text-5xl text-ink font-light leading-tight">
            Créez votre table
          </h1>
          <p className="text-ink-muted text-sm mt-2 max-w-lg leading-relaxed">
            Chaque zellige taillé à la main par nos maalems de Fès.
            Composez la pièce qui vous ressemble, jusqu'au moindre détail.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

          {/* ─── Left: Live Preview ──────────────────────────────────────────── */}
          <div className="w-full lg:w-[52%] lg:sticky lg:top-[88px]">

            {/* Preview canvas */}
            <div className="rounded-2xl border border-border overflow-hidden" style={{ background: TOKENS.creamDark }}>
              <div
                className="relative flex items-center justify-center"
                style={{ minHeight: 380, background: `radial-gradient(ellipse at 60% 40%, ${TOKENS.warmGrayL}, ${TOKENS.creamDark})` }}
              >
                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `linear-gradient(${TOKENS.border} 1px, transparent 1px), linear-gradient(90deg, ${TOKENS.border} 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }} />
                <div className="relative w-full h-full flex items-center justify-center py-10 px-6" style={{ minHeight: 380 }}>
                  <TablePreview
                    shape={selections.shapes}
                    sizeId={selections.sizes}
                    zelligePattern={selections.zelligePatterns}
                    legStyle={selections.legStyles}
                    legColor={selections.legColors}
                    surfaceColor={selections.colors}
                  />
                </div>
              </div>

              {/* Config chips strip */}
              <div className="border-t border-border px-5 py-3.5" style={{ background: `${TOKENS.cream}CC` }}>
                <div className="flex flex-wrap gap-1.5">
                  {STEPS.map((step) => {
                    const catData = data[step.id as keyof typeof data];
                    if (!catData) return null;
                    const opt = catData.options.find((o: ConfiguratorOption) => o.id === selections[step.id]);
                    return (
                      <button
                        key={step.id}
                        onClick={() => { setIsSurMesure(false); setActiveStep(step.id); }}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border transition-all duration-200"
                        style={{
                          borderColor: activeStep === step.id ? TOKENS.gold : TOKENS.border,
                          background: activeStep === step.id ? `${TOKENS.gold}10` : TOKENS.cream,
                          color: activeStep === step.id ? TOKENS.gold : TOKENS.inkLight,
                        }}
                      >
                        <span style={{ color: TOKENS.inkMuted }}>{step.label}:</span>
                        <span className="font-medium" style={{ color: activeStep === step.id ? TOKENS.gold : TOKENS.ink }}>
                          {step.id === "sizes" && isSurMesure ? "Sur Mesure" : (opt?.label ?? "—")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Price card — desktop */}
            <div className="hidden lg:block mt-5">
              <PriceCard
                totalPrice={totalPrice}
                monthlyPrice={monthlyPrice}
                showBreakdown={showBreakdown}
                onToggleBreakdown={() => setShowBreakdown((v) => !v)}
                selections={selections}
                data={data}
                deliveryStr={deliveryStr}
                onAddToCart={handleAddToCart}
                onSave={handleSave}
                saved={saved}
                addedToCart={addedToCart}
                isSurMesure={isSurMesure}
              />
            </div>
          </div>

          {/* ─── Right: Configuration steps ──────────────────────────────────── */}
          <div className="w-full lg:w-[48%] space-y-3">

            {STEPS.map((step) => {
              const isActive = activeStep === step.id && !isSurMesure;
              const catData  = data[step.id as keyof typeof data];
              if (!catData) return null;
              const selectedOpt = catData.options.find((o: ConfiguratorOption) => o.id === selections[step.id]);
              const hasValue    = !!selections[step.id];
              const displayLabel = step.id === "sizes" && isSurMesure ? "Sur Mesure" : selectedOpt?.label;

              return (
                <div
                  key={step.id}
                  className="rounded-2xl border overflow-hidden transition-all duration-300"
                  style={{
                    borderColor: isActive ? TOKENS.gold : TOKENS.border,
                    boxShadow: isActive ? `0 0 0 1px ${TOKENS.gold}25` : "none",
                  }}
                >
                  {/* Step header */}
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200"
                    style={{ background: isActive ? TOKENS.creamDark : TOKENS.cream }}
                    onClick={() => {
                      setIsSurMesure(false);
                      setActiveStep(isActive ? "" : step.id);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 flex-shrink-0"
                        style={{
                          background: hasValue && !isActive ? TOKENS.gold : isActive ? TOKENS.ink : TOKENS.warmGray,
                          color: hasValue && !isActive ? "#fff" : isActive ? TOKENS.cream : TOKENS.inkMuted,
                        }}
                      >
                        {hasValue && !isActive ? "✓" : step.stepNum}
                      </span>
                      <div>
                        <span className="text-sm font-medium" style={{ color: isActive ? TOKENS.ink : TOKENS.inkLight }}>
                          {step.label}
                        </span>
                        {!isActive && displayLabel && (
                          <span className="block text-xs mt-0.5" style={{ color: TOKENS.inkMuted }}>
                            {displayLabel}
                          </span>
                        )}
                      </div>
                    </div>
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke={TOKENS.inkMuted}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Step content */}
                  {isActive && (
                    <div className="px-5 pb-5 pt-3 border-t" style={{ background: TOKENS.cream, borderColor: `${TOKENS.border}80` }}>
                      <p className="text-xs mb-4" style={{ color: TOKENS.inkMuted }}>{catData.description}</p>

                      {step.id === "shapes" && (
                        <ShapesStep
                          options={catData.options}
                          selected={selections.shapes}
                          onSelect={(id) => { select("shapes", id); advanceStep("shapes"); }}
                        />
                      )}

                      {step.id === "sizes" && (
                        <SizesStep
                          options={filteredSizes}
                          selected={selections.sizes}
                          shape={selections.shapes}
                          onSelect={(id) => {
                            const opt = filteredSizes.find((o) => o.id === id);
                            if (opt?.isSurMesure) {
                              setIsSurMesure(true);
                              select("sizes", id);
                              setActiveStep("");
                            } else {
                              select("sizes", id);
                              advanceStep("sizes");
                            }
                          }}
                        />
                      )}

                      {step.id === "zelligePatterns" && (
                        <ZelligePatternsStep
                          options={catData.options}
                          selected={selections.zelligePatterns}
                          surfaceColor={selections.colors}
                          onSelect={(id) => { select("zelligePatterns", id); advanceStep("zelligePatterns"); }}
                        />
                      )}

                      {step.id === "legStyles" && (
                        <LegStylesStep
                          options={catData.options}
                          selected={selections.legStyles}
                          onSelect={(id) => { select("legStyles", id); advanceStep("legStyles"); }}
                        />
                      )}

                      {step.id === "legColors" && (
                        <LegColorsStep
                          options={catData.options}
                          selected={selections.legColors}
                          onSelect={(id) => { select("legColors", id); advanceStep("legColors"); }}
                        />
                      )}

                      {step.id === "colors" && (
                        <SurfaceColorsStep
                          options={catData.options}
                          selected={selections.colors}
                          onSelect={(id) => select("colors", id)}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Sur Mesure form — inline after accordion */}
            {isSurMesure && (
              <div className="mt-2">
                <SurMesureForm
                  shape={selections.shapes}
                  onBack={() => {
                    setIsSurMesure(false);
                    setActiveStep("sizes");
                  }}
                />
              </div>
            )}

            {/* Price card — mobile */}
            <div className="lg:hidden mt-4">
              <PriceCard
                totalPrice={totalPrice}
                monthlyPrice={monthlyPrice}
                showBreakdown={showBreakdown}
                onToggleBreakdown={() => setShowBreakdown((v) => !v)}
                selections={selections}
                data={data}
                deliveryStr={deliveryStr}
                onAddToCart={handleAddToCart}
                onSave={handleSave}
                saved={saved}
                addedToCart={addedToCart}
                isSurMesure={isSurMesure}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step sub-components ──────────────────────────────────────────────────────

function ShapesStep({ options, selected, onSelect }: {
  options: ConfiguratorOption[]; selected: string; onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 transition-all duration-200"
            style={{
              borderColor: isSelected ? TOKENS.gold : TOKENS.border,
              background: isSelected ? `${TOKENS.gold}08` : TOKENS.cream,
              boxShadow: isSelected ? `0 0 0 1px ${TOKENS.gold}30` : "none",
            }}
          >
            <ShapeIcon shape={opt.id} active={isSelected} />
            <div className="text-center">
              <span className="text-sm font-medium block" style={{ color: isSelected ? TOKENS.gold : TOKENS.inkLight }}>
                {opt.label}
              </span>
              {opt.description && (
                <span className="text-[11px] leading-tight block mt-0.5" style={{ color: TOKENS.inkMuted }}>
                  {opt.description}
                </span>
              )}
            </div>
            {opt.sellingPrice > 0 && (
              <span className="text-[11px] font-medium" style={{ color: TOKENS.gold }}>+{opt.sellingPrice} €</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function SizesStep({ options, selected, shape, onSelect }: {
  options: ConfiguratorOption[]; selected: string; shape: string; onSelect: (id: string) => void;
}) {
  const shapeLabel: Record<string, string> = {
    rectangulaire: "L × P", ronde: "Diamètre", carree: "L × P", ovale: "L × P",
  };
  const unit = shapeLabel[shape] ?? "Dimensions";

  return (
    <div className="space-y-2">
      <p className="text-[11px] uppercase tracking-[0.12em] mb-3 font-medium" style={{ color: TOKENS.inkMuted }}>
        {unit}
      </p>
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        const isSM = opt.isSurMesure;
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-left group"
            style={{
              borderColor: isSelected ? TOKENS.gold : TOKENS.border,
              background: isSelected ? `${TOKENS.gold}08` : isSM ? `${TOKENS.gold}04` : TOKENS.cream,
            }}
          >
            <div className="flex items-center gap-3">
              {isSM ? (
                <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.gold}15` }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={TOKENS.gold}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              ) : (
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: isSelected ? TOKENS.gold : TOKENS.warmGray, color: isSelected ? "#fff" : TOKENS.inkLight }}
                >
                  {opt.label.replace(/[^0-9]/g, "").substring(0, 2) || "—"}
                </span>
              )}
              <div>
                <span className="text-sm font-medium block" style={{ color: isSelected ? TOKENS.gold : TOKENS.ink }}>
                  {opt.label}
                </span>
                {opt.description && (
                  <span className="text-xs" style={{ color: TOKENS.inkMuted }}>{opt.description}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isSM ? (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${TOKENS.gold}15`, color: TOKENS.gold }}>
                  Devis gratuit
                </span>
              ) : opt.sellingPrice > 0 ? (
                <span className="text-xs" style={{ color: TOKENS.inkMuted }}>+{opt.sellingPrice} €</span>
              ) : opt.sellingPrice === 0 && opt.id !== options[0]?.id ? null : (
                <span className="text-xs" style={{ color: TOKENS.success }}>Inclus</span>
              )}
              <svg className="w-4 h-4 opacity-30 group-hover:opacity-60 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function ZelligePatternsStep({ options, selected, surfaceColor, onSelect }: {
  options: ConfiguratorOption[]; selected: string; surfaceColor: string; onSelect: (id: string) => void;
}) {
  const colorHex = ZELLIGE_COLOR_MAP[surfaceColor] ?? "#F5F5F0";
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className="flex flex-col gap-2.5 p-3 rounded-xl border-2 text-left transition-all duration-200"
            style={{
              borderColor: isSelected ? TOKENS.gold : TOKENS.border,
              background: isSelected ? `${TOKENS.gold}07` : TOKENS.cream,
              boxShadow: isSelected ? `0 0 0 1px ${TOKENS.gold}25` : "none",
            }}
          >
            <ZelligePatternPreview pattern={opt.id} surfaceColor={colorHex} />
            <div>
              <span className="text-sm font-medium block" style={{ color: isSelected ? TOKENS.gold : TOKENS.ink }}>
                {opt.label}
              </span>
              {opt.description && (
                <span className="text-[11px] leading-tight block mt-0.5" style={{ color: TOKENS.inkMuted }}>
                  {opt.description}
                </span>
              )}
              {opt.sellingPrice > 0 && (
                <span className="text-[11px] mt-1 block" style={{ color: TOKENS.inkMuted }}>+{opt.sellingPrice} €</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function LegStylesStep({ options, selected, onSelect }: {
  options: ConfiguratorOption[]; selected: string; onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className="group flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200"
            style={{
              borderColor: isSelected ? TOKENS.gold : TOKENS.border,
              background: isSelected ? `${TOKENS.gold}08` : TOKENS.cream,
              boxShadow: isSelected ? `0 0 0 1px ${TOKENS.gold}28` : "none",
            }}
          >
            <LegIcon leg={opt.id} active={isSelected} />
            <div className="text-center">
              <span className="text-sm font-medium block" style={{ color: isSelected ? TOKENS.gold : TOKENS.inkLight }}>
                {opt.label}
              </span>
              {opt.description && (
                <span className="text-[11px] leading-tight block mt-0.5" style={{ color: TOKENS.inkMuted }}>
                  {opt.description}
                </span>
              )}
              {opt.sellingPrice > 0 && (
                <span className="text-[11px] mt-1 block" style={{ color: TOKENS.inkMuted }}>+{opt.sellingPrice} €</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function LegColorsStep({ options, selected, onSelect }: {
  options: ConfiguratorOption[]; selected: string; onSelect: (id: string) => void;
}) {
  const selectedOpt = options.find((o) => o.id === selected);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => {
          const hex = LEG_COLOR_MAP[opt.id] ?? "#888";
          const isSelected = selected === opt.id;
          const isLight = ["blanc-casse"].includes(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              title={opt.label}
              className="relative w-11 h-11 rounded-full transition-all duration-200"
              style={{
                background: hex,
                border: isSelected ? `3px solid ${TOKENS.gold}` : `2px solid ${isLight ? TOKENS.border : "transparent"}`,
                boxShadow: isSelected ? `0 0 0 3px ${TOKENS.gold}30` : "none",
                transform: isSelected ? "scale(1.12)" : "scale(1)",
                outline: isLight ? `1px solid ${TOKENS.border}` : "none",
              }}
            >
              {isSelected && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-4 h-4" fill={isLight ? TOKENS.ink : "#fff"} viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {selectedOpt && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border" style={{ background: TOKENS.creamDark, borderColor: TOKENS.border }}>
          <div
            className="w-8 h-8 rounded-full flex-shrink-0 border"
            style={{ background: LEG_COLOR_MAP[selectedOpt.id] ?? "#888", borderColor: TOKENS.border }}
          />
          <div>
            <span className="text-sm font-medium block" style={{ color: TOKENS.ink }}>{selectedOpt.label}</span>
            {selectedOpt.description && (
              <span className="text-xs" style={{ color: TOKENS.inkMuted }}>{selectedOpt.description}</span>
            )}
          </div>
          {selectedOpt.sellingPrice > 0 && (
            <span className="ml-auto text-sm font-medium" style={{ color: TOKENS.gold }}>+{selectedOpt.sellingPrice} €</span>
          )}
        </div>
      )}
    </div>
  );
}

function SurfaceColorsStep({ options, selected, onSelect }: {
  options: ConfiguratorOption[]; selected: string; onSelect: (id: string) => void;
}) {
  const selectedOpt = options.find((o) => o.id === selected);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {options.map((opt) => {
          const hex = ZELLIGE_COLOR_MAP[opt.id] ?? "#888";
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200"
              style={{
                borderColor: isSelected ? TOKENS.gold : TOKENS.border,
                background: isSelected ? `${TOKENS.gold}06` : TOKENS.cream,
              }}
            >
              <div
                className="w-10 h-10 rounded-full border"
                style={{
                  background: hex,
                  borderColor: isSelected ? TOKENS.gold : TOKENS.border,
                  boxShadow: isSelected ? `0 0 0 2px ${TOKENS.gold}40` : "none",
                }}
              />
              <span className="text-[11px] text-center leading-tight font-medium" style={{ color: isSelected ? TOKENS.gold : TOKENS.inkLight }}>
                {opt.label}
              </span>
              {opt.sellingPrice > 0 && (
                <span className="text-[10px]" style={{ color: TOKENS.inkMuted }}>+{opt.sellingPrice} €</span>
              )}
            </button>
          );
        })}
      </div>

      {selectedOpt && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border" style={{ background: TOKENS.creamDark, borderColor: TOKENS.border }}>
          <div
            className="w-8 h-8 rounded-full flex-shrink-0 border"
            style={{ background: ZELLIGE_COLOR_MAP[selectedOpt.id] ?? "#888", borderColor: TOKENS.border }}
          />
          <div>
            <span className="text-sm font-medium block" style={{ color: TOKENS.ink }}>{selectedOpt.label}</span>
            {selectedOpt.description && (
              <span className="text-xs" style={{ color: TOKENS.inkMuted }}>{selectedOpt.description}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Price Card ───────────────────────────────────────────────────────────────

interface PriceCardProps {
  totalPrice: number;
  monthlyPrice: number;
  showBreakdown: boolean;
  onToggleBreakdown: () => void;
  selections: Record<string, string>;
  data: ReturnType<typeof getConfiguratorData>;
  deliveryStr: string;
  onAddToCart: () => void;
  onSave: () => void;
  saved: boolean;
  addedToCart: boolean;
  isSurMesure: boolean;
}

function PriceCard({
  totalPrice, monthlyPrice, showBreakdown, onToggleBreakdown,
  selections, data, deliveryStr, onAddToCart, onSave, saved, addedToCart, isSurMesure,
}: PriceCardProps) {
  const breakdown = STEPS.map((step) => {
    const catData = data[step.id as keyof typeof data];
    if (!catData) return null;
    const opt = catData.options.find((o: ConfiguratorOption) => o.id === selections[step.id]);
    if (!opt) return null;
    return { label: `${step.label} — ${opt.label}`, price: opt.sellingPrice };
  }).filter(Boolean) as { label: string; price: number }[];

  return (
    <div className="rounded-2xl border border-border overflow-hidden shadow-sm">
      {/* Price header */}
      <div className="px-6 py-5 border-b border-border/30" style={{ background: TOKENS.ink, color: TOKENS.cream }}>
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-sm opacity-60">
            {isSurMesure ? "Prix sur devis" : "Total estimé"}
          </span>
          {isSurMesure ? (
            <span className="font-display text-xl font-light opacity-60">—</span>
          ) : (
            <span className="font-display text-3xl font-light">{totalPrice.toLocaleString("fr-FR")} €</span>
          )}
        </div>
        <p className="text-xs opacity-40 mt-1">TVA incluse · Fabriqué à Fès · Livraison offerte</p>
      </div>

      {/* Alma 3x */}
      {!isSurMesure && (
        <div className="px-5 py-3 border-b border-border flex items-center gap-2" style={{ background: `${TOKENS.gold}0A` }}>
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke={TOKENS.gold}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span className="text-sm" style={{ color: TOKENS.inkLight }}>
            Paiement en 3× sans frais :{" "}
            <strong style={{ color: TOKENS.ink }}>{monthlyPrice.toLocaleString("fr-FR")} €/mois</strong>
          </span>
        </div>
      )}

      {/* Breakdown toggle */}
      {!isSurMesure && (
        <div className="px-6 py-4" style={{ background: TOKENS.cream }}>
          <button
            onClick={onToggleBreakdown}
            className="w-full flex items-center justify-between text-sm transition-colors"
            style={{ color: TOKENS.inkMuted }}
          >
            <span>Détail du prix</span>
            <svg className={`w-4 h-4 transition-transform duration-200 ${showBreakdown ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showBreakdown && (
            <div className="mt-3 space-y-1.5">
              <div className="flex justify-between text-xs py-1.5 border-b" style={{ borderColor: TOKENS.border }}>
                <span style={{ color: TOKENS.inkMuted }}>Base artisanale</span>
                <span className="font-medium" style={{ color: TOKENS.ink }}>{BASE_SELLING_PRICE} €</span>
              </div>
              {breakdown.map((item, i) => (
                <div key={i} className="flex justify-between text-xs py-1 border-b last:border-0" style={{ borderColor: `${TOKENS.border}50` }}>
                  <span style={{ color: TOKENS.inkMuted }}>{item.label}</span>
                  <span style={{ color: item.price >= 0 ? TOKENS.ink : TOKENS.success }}>
                    {item.price === 0 ? "inclus" : item.price > 0 ? `+${item.price} €` : `${item.price} €`}
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-sm pt-2 font-semibold" style={{ borderTop: `1px solid ${TOKENS.border}`, paddingTop: 8, marginTop: 4 }}>
                <span style={{ color: TOKENS.ink }}>Total</span>
                <span style={{ color: TOKENS.ink }}>{totalPrice.toLocaleString("fr-FR")} €</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delivery */}
      <div className="px-6 pb-4 flex items-start gap-2.5" style={{ background: TOKENS.cream }}>
        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke={TOKENS.success}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
        </svg>
        <div>
          <span className="text-xs block" style={{ color: TOKENS.inkLight }}>Livraison estimée autour du</span>
          <span className="text-xs font-semibold block" style={{ color: TOKENS.ink }}>{deliveryStr}</span>
          <span className="text-xs block mt-0.5" style={{ color: TOKENS.inkMuted }}>France et Union Européenne — offert</span>
        </div>
      </div>

      {/* CTAs */}
      <div className="px-6 pb-6 space-y-3" style={{ background: TOKENS.cream }}>
        {isSurMesure ? (
          <div className="w-full py-3.5 rounded-xl text-sm font-medium text-center" style={{ background: TOKENS.warmGray, color: TOKENS.inkMuted }}>
            Remplissez le formulaire ci-dessus
          </div>
        ) : (
          <button
            onClick={onAddToCart}
            disabled={addedToCart}
            className="w-full py-3.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
            style={{
              background: addedToCart ? TOKENS.success : TOKENS.ink,
              color: TOKENS.cream,
            }}
          >
            {addedToCart ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Ajouté au panier
              </>
            ) : "Ajouter au panier"}
          </button>
        )}

        <button
          onClick={onSave}
          className="w-full py-3 rounded-xl text-sm font-medium border transition-all duration-300"
          style={{
            borderColor: saved ? TOKENS.success : TOKENS.border,
            color: saved ? TOKENS.success : TOKENS.inkLight,
            background: saved ? `${TOKENS.success}08` : TOKENS.cream,
          }}
        >
          {saved ? "Configuration sauvegardée ✓" : "Sauvegarder cette configuration"}
        </button>

        <p className="text-center text-xs" style={{ color: TOKENS.inkMuted }}>
          Une question ?{" "}
          <a href="mailto:contact@maisonattar.com" className="hover:underline transition-colors" style={{ color: TOKENS.gold }}>
            Parlez à un artisan
          </a>
        </p>
      </div>
    </div>
  );
}
