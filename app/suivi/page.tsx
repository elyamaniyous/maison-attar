"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DEMO_ORDER = "MA-2024-00847";

const faqs = [
  {
    question: "Combien de temps prend la fabrication ?",
    answer:
      "Chaque pièce Maison Attar est fabriquée à la main par un maalem de Fès. Selon la complexité du motif et les dimensions choisies, la fabrication prend entre 6 et 8 semaines. Les grandes tables à manger peuvent nécessiter jusqu'à 10 semaines. Ce délai est incompressible : il n'y a pas de stock, pas de série, chaque pièce naît de vos mains vers les nôtres.",
  },
  {
    question: "Puis-je suivre l'avancement en temps réel ?",
    answer:
      "Votre maalem vous envoie des photos et messages de l'atelier à chaque étape clé : démarrage de la forge, début de la pose du zellige, avancement hebdomadaire. Vous verrez votre table naître, carreau après carreau. Ce suivi est visible directement sur cette page avec votre numéro de commande.",
  },
  {
    question: "Que se passe-t-il si ma commande prend du retard ?",
    answer:
      "Nous vous contactons immédiatement par email et par téléphone. Les retards sont rares, mais peuvent survenir lors de la sélection des matériaux — si un lot de zellige ne satisfait pas les exigences du maalem, il est refusé et remplacé. Nous préférons le temps juste à la livraison rapide.",
  },
  {
    question: "Puis-je modifier ma commande après confirmation ?",
    answer:
      "Les modifications sont possibles dans les 48 heures suivant la commande, avant que le maalem ne commence la fabrication. Au-delà, votre pièce est en cours de création et ne peut plus être modifiée. Contactez-nous le plus tôt possible à atelier@maison-attar.com.",
  },
  {
    question: "Comment se passe la livraison de ma pièce ?",
    answer:
      "Chaque pièce est emballée dans une caisse sur mesure fabriquée spécialement pour elle, avec mousse de calage découpée à ses dimensions exactes. La livraison est assurée par un transporteur spécialisé en objets fragiles et d'art. Elle comprend la livraison au pied de chez vous, et le déballage à votre demande.",
  },
];

export default function SuiviPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = orderId.trim();
    if (!trimmed) {
      setError("Veuillez saisir votre numéro de commande.");
      return;
    }
    setError("");
    router.push(`/suivi/${encodeURIComponent(trimmed)}`);
  }

  function handleDemo() {
    setOrderId(DEMO_ORDER);
    setError("");
    router.push(`/suivi/${DEMO_ORDER}`);
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-24 px-6 text-center overflow-hidden">
        {/* Background ornament */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold opacity-[0.04] blur-3xl" />
        </div>

        <div className="relative max-w-2xl mx-auto animate-fade-up">
          {/* Eyebrow */}
          <p className="font-body text-xs tracking-[0.25em] uppercase text-gold mb-6">
            Atelier de Fès · Livraison dans le Monde
          </p>

          {/* Title */}
          <h1
            className="font-display text-5xl md:text-6xl font-light text-ink leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Suivi de{" "}
            <span className="italic text-gold">Fabrication</span>
          </h1>

          {/* Subtitle */}
          <p
            className="font-body text-ink-muted text-lg leading-relaxed mb-12"
          >
            Suivez la création de votre pièce, de l&apos;atelier de Fès
            à votre intérieur.
          </p>

          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-16 bg-gold opacity-40" />
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              className="text-gold opacity-70"
              fill="currentColor"
            >
              <path d="M7 0L8.5 5.5H14L9.5 8.5L11 14L7 11L3 14L4.5 8.5L0 5.5H5.5L7 0Z" />
            </svg>
            <div className="h-px w-16 bg-gold opacity-40" />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-border rounded-2xl p-8 shadow-sm"
          >
            <label
              htmlFor="orderId"
              className="block font-body text-xs tracking-[0.15em] uppercase text-ink-muted mb-3 text-left"
            >
              Numéro de commande
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="orderId"
                type="text"
                value={orderId}
                onChange={(e) => {
                  setOrderId(e.target.value);
                  if (error) setError("");
                }}
                placeholder="MA-2024-XXXXX"
                className={[
                  "flex-1 h-12 px-4 rounded-xl border font-body text-ink text-sm",
                  "placeholder:text-ink-muted/50 bg-cream-dark",
                  "focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold",
                  "transition-all duration-200",
                  error ? "border-error" : "border-border",
                ].join(" ")}
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="submit"
                className="h-12 px-7 rounded-xl bg-ink text-cream font-body text-sm tracking-wider uppercase hover:bg-gold transition-colors duration-300 whitespace-nowrap"
              >
                Suivre ma commande
              </button>
            </div>
            {error && (
              <p className="mt-2 text-error text-sm font-body">{error}</p>
            )}

            {/* Demo shortcut */}
            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="font-body text-ink-muted text-xs mb-3">
                Vous voulez voir une démonstration ?
              </p>
              <button
                type="button"
                onClick={handleDemo}
                className="inline-flex items-center gap-2 font-body text-sm text-gold hover:text-gold-dark transition-colors duration-200 group"
              >
                <span className="group-hover:underline underline-offset-4">
                  Voir la commande <strong>{DEMO_ORDER}</strong>
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── Process strip ──────────────────────────────────────────────────── */}
      <section className="bg-cream-dark border-y border-border py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-center font-body text-xs tracking-[0.2em] uppercase text-ink-muted mb-10">
            Les étapes de votre commande
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-2">
            {[
              { icon: "✓", label: "Commande\nconfirmée" },
              { icon: "⚒", label: "Fabrication\nlancée" },
              { icon: "◈", label: "Zellige\nposé" },
              { icon: "→", label: "Expédition" },
              { icon: "⌂", label: "Livraison" },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative">
                {/* Connector */}
                {i < 4 && (
                  <div className="hidden md:block absolute top-5 left-[calc(50%+20px)] right-0 h-px bg-border z-0" />
                )}
                <div className="relative z-10 w-10 h-10 rounded-full bg-warm-gray border border-border flex items-center justify-center text-gold font-body text-sm mb-3">
                  {step.icon}
                </div>
                <p className="font-body text-xs text-ink-muted leading-tight whitespace-pre-line">
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-4">
              Questions fréquentes
            </p>
            <h2
              className="font-display text-4xl font-light text-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Sur la fabrication
            </h2>
          </div>

          <div className="space-y-1">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group hover:bg-cream-dark transition-colors duration-200"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-body text-sm font-medium text-ink pr-4 leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className={[
                      "flex-shrink-0 w-6 h-6 rounded-full border border-gold text-gold flex items-center justify-center",
                      "text-xs transition-transform duration-300",
                      openFaq === i ? "rotate-45" : "rotate-0",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 bg-cream-dark">
                    <p className="font-body text-sm text-ink-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact nudge */}
          <div className="mt-14 text-center">
            <p className="font-body text-ink-muted text-sm mb-3">
              Vous ne trouvez pas votre réponse ?
            </p>
            <a
              href="mailto:atelier@maison-attar.com"
              className="inline-block font-body text-sm text-gold hover:text-gold-dark underline underline-offset-4 transition-colors duration-200"
            >
              atelier@maison-attar.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
