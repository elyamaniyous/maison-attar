"use client";

import { useState, useEffect } from "react";
import { cmsApi, ApiError } from "@/lib/admin-api";
import type { SiteSettings } from "@/lib/cms";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await cmsApi.settings.get();
        if (!cancelled) setSettings(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof ApiError ? err.message : "Erreur de chargement des paramètres");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  function update<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    if (!settings) return;
    setSettings((prev) => prev ? { ...prev, [key]: value } : prev);
    setSaved(false);
  }

  async function save() {
    if (!settings) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await cmsApi.settings.update(settings);
      setSettings(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-[#8A8A8A] text-sm py-10">
        <div className="w-5 h-5 border-2 border-[#C4A265]/30 border-t-[#C4A265] rounded-full animate-spin" />
        Chargement des paramètres…
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="bg-[#B85C5C]/10 border border-[#B85C5C]/30 rounded p-4 text-[#B85C5C] text-sm">
        {error ?? "Impossible de charger les paramètres."}
      </div>
    );
  }

  // Derive fabricationWeeks min/max from string or fallback
  // The SiteSettings type stores fabricationWeeks as a string like "6 à 10 semaines"
  // We expose two number fields parsed from it for convenience
  const weekMatch = typeof settings.fabricationWeeks === "string"
    ? settings.fabricationWeeks.match(/(\d+)[^\d]+(\d+)/)
    : null;
  const fabMin = weekMatch ? Number(weekMatch[1]) : 8;
  const fabMax = weekMatch ? Number(weekMatch[2]) : 12;

  function updateFabWeeks(min: number, max: number) {
    update("fabricationWeeks", `${min} à ${max} semaines`);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-white text-2xl font-display tracking-wide">Paramètres du site</h2>
          <p className="text-[#4A4A4A] text-sm mt-0.5">Configurez les informations générales de Maison Attar</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-emerald-400 text-xs flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Sauvegardé
            </span>
          )}
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-[#C4A265] hover:bg-[#D4B87A] disabled:opacity-60 text-[#0F0F0F] text-sm font-medium rounded transition-colors"
          >
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
        {/* Site identity */}
        <Panel title="Identité du site">
          <Field label="Nom du site">
            <input type="text" value={settings.siteName} onChange={(e) => update("siteName", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Accroche (tagline)">
            <input type="text" value={settings.tagline} onChange={(e) => update("tagline", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Description">
            <textarea
              value={settings.description}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
              className={`${inputCls} resize-none`}
            />
          </Field>
        </Panel>

        {/* Contact */}
        <Panel title="Informations de contact">
          <Field label="Email de contact">
            <input type="email" value={settings.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Téléphone">
            <input type="tel" value={settings.contactPhone} onChange={(e) => update("contactPhone", e.target.value)} className={inputCls} placeholder="+33 1 23 45 67 89" />
          </Field>
          <Field label="Adresse">
            <input type="text" value={settings.address} onChange={(e) => update("address", e.target.value)} className={inputCls} />
          </Field>
        </Panel>

        {/* Social */}
        <Panel title="Réseaux sociaux">
          <Field label="Instagram">
            <div className="flex items-center gap-2">
              <span className="text-[#4A4A4A] text-sm shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </span>
              <input type="url" value={settings.instagram} onChange={(e) => update("instagram", e.target.value)} className={`${inputCls} flex-1`} placeholder="https://instagram.com/…" />
            </div>
          </Field>
          <Field label="Pinterest">
            <div className="flex items-center gap-2">
              <span className="text-[#4A4A4A] text-sm shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.64 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.133-1.867 3.133-4.563 0-2.387-1.716-4.055-4.165-4.055-2.837 0-4.501 2.128-4.501 4.33 0 .857.33 1.776.741 2.279a.3.3 0 01.069.284c-.075.313-.243.995-.276 1.134-.044.183-.145.222-.334.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.967-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
              </span>
              <input type="url" value={settings.pinterest} onChange={(e) => update("pinterest", e.target.value)} className={`${inputCls} flex-1`} placeholder="https://pinterest.com/…" />
            </div>
          </Field>
        </Panel>

        {/* Commerce */}
        <Panel title="Paramètres commerce">
          <Field label="Devise">
            <select value={settings.currency} onChange={(e) => update("currency", e.target.value)} className={inputCls}>
              <option value="EUR">EUR — Euro (€)</option>
              <option value="CHF">CHF — Franc suisse</option>
              <option value="USD">USD — Dollar américain ($)</option>
              <option value="GBP">GBP — Livre sterling (£)</option>
            </select>
          </Field>
          <Field label="Livraison offerte à partir de (€)">
            <div className="relative">
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => update("freeShippingThreshold", Number(e.target.value))}
                className={`${inputCls} pr-8`}
                min={0}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A4A4A] text-sm">€</span>
            </div>
          </Field>
          <div>
            <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest mb-1.5">Délai de fabrication (semaines)</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#4A4A4A] mb-1">Minimum</label>
                <input
                  type="number"
                  value={fabMin}
                  onChange={(e) => updateFabWeeks(Number(e.target.value), fabMax)}
                  className={inputCls}
                  min={1}
                  max={fabMax}
                />
              </div>
              <div>
                <label className="block text-xs text-[#4A4A4A] mb-1">Maximum</label>
                <input
                  type="number"
                  value={fabMax}
                  onChange={(e) => updateFabWeeks(fabMin, Number(e.target.value))}
                  className={inputCls}
                  min={fabMin}
                />
              </div>
            </div>
            <p className="text-[#4A4A4A] text-xs mt-1.5">
              Affiché comme : « {fabMin} à {fabMax} semaines »
            </p>
          </div>
        </Panel>
      </div>

      <div className="flex justify-end pb-6">
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#C4A265] hover:bg-[#D4B87A] disabled:opacity-60 text-[#0F0F0F] text-sm font-medium rounded transition-colors"
        >
          {saving ? (
            <><div className="w-3.5 h-3.5 border border-[#0F0F0F]/40 border-t-[#0F0F0F] rounded-full animate-spin" />Sauvegarde…</>
          ) : "Sauvegarder les paramètres"}
        </button>
      </div>
    </div>
  );
}

const inputCls =
  "w-full bg-[#111111] border border-[#262626] rounded px-3 py-2 text-white text-sm outline-none focus:border-[#C4A265] transition-colors";

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
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
