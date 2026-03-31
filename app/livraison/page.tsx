import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Livraison & Emballage — Délais et Zones",
  description:
    "Tout savoir sur la livraison de vos tables en zellige Maison Attar — zones couvertes, délais de fabrication (6-8 semaines), emballage sur mesure et suivi de commande. Livraison offerte en France.",
  alternates: {
    canonical: "https://beautiful-charm-production-7244.up.railway.app/livraison",
  },
  keywords: [
    "livraison table zellige",
    "délai fabrication zellige",
    "livraison artisanat Maroc France",
    "emballage pièce unique",
    "livraison internationale zellige",
  ],
  openGraph: {
    title: "Livraison & Emballage | Maison Attar",
    description:
      "Livraison offerte en France. Emballage sur mesure de qualité muséale. Délais 6-8 semaines après fabrication.",
    url: "https://beautiful-charm-production-7244.up.railway.app/livraison",
  },
};

const ZONES = [
  {
    zone: "France métropolitaine",
    price: "Offerte",
    delay: "1–2 semaines après fabrication",
    note: "Livraison à domicile avec rendez-vous",
  },
  {
    zone: "Union Européenne",
    price: "50 € – 150 €",
    delay: "2–3 semaines après fabrication",
    note: "Selon poids et destination",
  },
  {
    zone: "Royaume-Uni",
    price: "80 € – 200 €",
    delay: "2–4 semaines après fabrication",
    note: "Frais douaniers à la charge du destinataire",
  },
  {
    zone: "International",
    price: "Sur devis",
    delay: "3–6 semaines après fabrication",
    note: "Nous contacter pour un devis personnalisé",
  },
];

const FAQ_ITEMS = [
  {
    q: "Puis-je choisir ma date de livraison ?",
    a: "Oui. Une fois votre pièce expédiée, notre transporteur vous contacte pour convenir d'un rendez-vous. Nous faisons tout pour nous adapter à vos disponibilités.",
  },
  {
    q: "Que se passe-t-il si je suis absent lors de la livraison ?",
    a: "Le transporteur vous recontacte pour fixer un nouveau rendez-vous. En cas d'absence répétée, la pièce est conservée en dépôt pendant 10 jours ouvrés.",
  },
  {
    q: "Ma pièce peut-elle être livrée en dehors de la France ?",
    a: "Oui, nous livrons dans toute l'Union Européenne, au Royaume-Uni et à l'international sur devis. Contactez-nous avant de passer commande pour les destinations hors UE.",
  },
  {
    q: "Comment est protégée ma table pendant le transport ?",
    a: "Chaque pièce est emballée dans une caisse en bois sur mesure avec mousse haute densité et calages anti-choc. C'est la même protection utilisée pour les oeuvres d'art.",
  },
  {
    q: "Que faire si ma pièce arrive endommagée ?",
    a: "Prenez des photos immédiatement et contactez-nous dans les 48h à contact@maisonattar.com. Nous gérons directement avec l'assurance transport et nous remplacerons votre pièce.",
  },
  {
    q: "Les frais de livraison sont-ils inclus dans le prix ?",
    a: "Pour la France métropolitaine, la livraison est offerte. Pour les autres destinations, les frais sont calculés et affichés avant la validation définitive de votre commande.",
  },
];

export default function LivraisonPage() {
  return (
    <div className="min-h-screen bg-cream">

      {/* Hero */}
      <section className="pt-24 pb-20 px-6 md:px-12 lg:px-20 border-b border-border">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-2xl">
            <p className="animate-fade-up text-xs uppercase tracking-widest text-gold font-body mb-4">
              Maison Attar — Service
            </p>
            <h1 className="animate-fade-up delay-100 font-display text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05] mb-6">
              Livraison &<br />Emballage
            </h1>
            <p className="animate-fade-up delay-200 font-body text-ink-light text-lg leading-relaxed">
              De l'atelier de Fès jusqu'à votre salon. Chaque pièce voyage dans les meilleures conditions, avec le soin qu'elle mérite.
            </p>
          </div>
        </div>
      </section>

      {/* Key numbers banner */}
      <section className="bg-ink text-cream px-6 md:px-12 lg:px-20 py-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "6–8", label: "semaines de fabrication" },
              { number: "1–2", label: "semaines de livraison (FR)" },
              { number: "100%", label: "emballage sur mesure" },
              { number: "0 €", label: "livraison en France" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-4xl md:text-5xl text-gold mb-1">{stat.number}</p>
                <p className="font-body text-[12px] text-cream/60 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-20 space-y-24">

        {/* Zones de livraison */}
        <section>
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-gold font-body mb-3">01</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-4">
              Zones de livraison
            </h2>
            <p className="font-body text-ink-muted max-w-xl">
              Nous livrons dans toute l'Europe et à l'international. Les frais varient selon la destination et le poids de votre pièce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ZONES.map((zone) => (
              <div
                key={zone.zone}
                className={`p-6 border rounded-sm flex flex-col gap-3 ${
                  zone.zone === "France métropolitaine"
                    ? "bg-gold/5 border-gold/30"
                    : "bg-warm-gray-light border-border"
                }`}
              >
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.15em] text-ink-muted mb-1.5">Zone</p>
                  <p className="font-body text-[14px] font-medium text-ink">{zone.zone}</p>
                </div>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.15em] text-ink-muted mb-1">Tarif</p>
                  <p className={`font-display text-2xl ${zone.price === "Offerte" ? "text-gold" : "text-ink"}`}>
                    {zone.price}
                  </p>
                </div>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.15em] text-ink-muted mb-1">Délai</p>
                  <p className="font-body text-[12px] text-ink-light">{zone.delay}</p>
                </div>
                <p className="font-body text-[11px] text-ink-muted border-t border-border/50 pt-3 mt-auto">
                  {zone.note}
                </p>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="mt-8 rounded-sm overflow-hidden border border-border bg-warm-gray-light h-48 flex items-center justify-center" aria-hidden="true">
            <div className="text-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-ink-muted mx-auto mb-3">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p className="font-body text-[12px] text-ink-muted">Carte des zones de livraison</p>
            </div>
          </div>
        </section>

        {/* Délais */}
        <section>
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-gold font-body mb-3">02</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-4">
              Comprendre les délais
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-1">
              <TimelineStep
                step="01"
                title="Confirmation de commande"
                duration="Jour J"
                description="Votre commande est validée, votre espace de suivi est créé, votre maalem est désigné."
                active
              />
              <TimelineConnector />
              <TimelineStep
                step="02"
                title="Fabrication en atelier"
                duration="6 à 8 semaines"
                description="Votre maalem commence le travail. Découpe du zellige, fabrication de la structure, assemblage. Vous recevez des photos à chaque étape."
              />
              <TimelineConnector />
              <TimelineStep
                step="03"
                title="Contrôle qualité & emballage"
                duration="2 à 3 jours"
                description="Inspection complète avant emballage dans la caisse sur mesure. Vous êtes notifié avec des photos finales."
              />
              <TimelineConnector />
              <TimelineStep
                step="04"
                title="Expédition"
                duration="1 à 2 semaines (FR)"
                description="Votre caisse est confiée à notre transporteur spécialisé. Un lien de suivi vous est envoyé par SMS et email."
              />
              <TimelineConnector />
              <TimelineStep
                step="05"
                title="Livraison à domicile"
                duration="Sur rendez-vous"
                description="Le transporteur vous contacte pour convenir d'un rendez-vous. Livraison avec déballage optionnel."
              />
            </div>

            <div className="bg-warm-gray-light border border-border rounded-sm p-8">
              <h3 className="font-display text-2xl text-ink mb-6">Estimation typique</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="font-body text-[13px] text-ink-light">Pièce catalogue (France)</span>
                  <span className="font-body text-[13px] font-medium text-ink">7–10 semaines</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="font-body text-[13px] text-ink-light">Pièce catalogue (UE)</span>
                  <span className="font-body text-[13px] font-medium text-ink">9–12 semaines</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="font-body text-[13px] text-ink-light">Sur mesure (France)</span>
                  <span className="font-body text-[13px] font-medium text-ink">12–15 semaines</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="font-body text-[13px] text-ink-light">Sur mesure (International)</span>
                  <span className="font-body text-[13px] font-medium text-ink">14–18 semaines</span>
                </div>
              </div>
              <p className="font-body text-[11px] text-ink-muted mt-6">
                Ces délais sont indicatifs. Une date de livraison estimée précise vous est communiquée à la confirmation de commande.
              </p>
            </div>
          </div>
        </section>

        {/* Emballage */}
        <section>
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-gold font-body mb-3">03</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-4">
              Un emballage à la hauteur
            </h2>
            <p className="font-body text-ink-muted max-w-xl">
              Nous avons développé notre propre système d'emballage pour protéger chaque pièce comme une oeuvre d'art.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                ),
                title: "Caisse bois sur mesure",
                desc: "Chaque caisse est fabriquée aux dimensions exactes de votre pièce, en bois de pin traité.",
              },
              {
                icon: (
                  <>
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                  </>
                ),
                title: "Mousse haute densité",
                desc: "Double couche de mousse polyéthylène 40kg/m³ autour de chaque surface fragile.",
              },
              {
                icon: (
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ),
                title: "Assurance transport",
                desc: "Chaque expédition est assurée à 100% pour sa valeur. En cas de dommage, vous êtes intégralement remboursé ou la pièce est refabriquée.",
              },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-warm-gray-light border border-border rounded-sm">
                <div className="w-10 h-10 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold" aria-hidden="true">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="font-body text-[14px] font-medium text-ink mb-2">{item.title}</h3>
                <p className="font-body text-[13px] text-ink-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Packaging illustration placeholder */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-warm-gray-light border border-border rounded-sm h-56 flex items-center justify-center" aria-hidden="true">
              <p className="font-body text-[12px] text-ink-muted">Illustration emballage caisse bois</p>
            </div>
            <div className="bg-warm-gray-light border border-border rounded-sm h-56 flex items-center justify-center" aria-hidden="true">
              <p className="font-body text-[12px] text-ink-muted">Photo mise en caisse atelier</p>
            </div>
          </div>
        </section>

        {/* Suivi de commande */}
        <section>
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-gold font-body mb-3">04</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-4">
              Suivi en temps réel
            </h2>
            <p className="font-body text-ink-muted max-w-xl">
              Vous ne restez jamais dans l'incertitude. À chaque étape, vous êtes informé et vous voyez votre pièce prendre vie.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              {[
                { icon: "📧", title: "Email de confirmation", desc: "Immédiatement après la commande, avec votre numéro de suivi et l'accès à votre espace client." },
                { icon: "📸", title: "Photos de fabrication", desc: "Votre maalem envoie des photos à chaque étape clé — découpe, pose du zellige, finitions, emballage." },
                { icon: "📱", title: "SMS d'expédition", desc: "Dès que votre caisse quitte l'atelier, vous recevez un SMS avec le lien de suivi transporteur." },
                { icon: "🔔", title: "Notifications de livraison", desc: "Le transporteur vous contacte 48h avant pour confirmer le rendez-vous." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 bg-warm-gray-light border border-border/50 rounded-sm">
                  <span className="text-xl flex-shrink-0" aria-hidden="true">{item.icon}</span>
                  <div>
                    <p className="font-body text-[13px] font-medium text-ink mb-1">{item.title}</p>
                    <p className="font-body text-[12px] text-ink-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-ink text-cream rounded-sm p-8">
              <h3 className="font-display text-2xl mb-2">Votre espace de suivi</h3>
              <p className="font-body text-[13px] text-cream/60 mb-8">
                Un espace dédié pour suivre votre commande, étape par étape.
              </p>
              <div className="space-y-4">
                {[
                  { status: "Commande confirmée", done: true },
                  { status: "En fabrication", done: true },
                  { status: "Pose du zellige", done: false },
                  { status: "En cours d'expédition", done: false },
                  { status: "Livré", done: false },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${step.done ? "bg-gold border-gold" : "border-cream/20"}`}>
                      {step.done && (
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span className={`font-body text-[13px] ${step.done ? "text-cream" : "text-cream/40"}`}>
                      {step.status}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/suivi"
                className="mt-8 inline-flex items-center gap-2 font-body text-[11px] tracking-[0.15em] uppercase text-gold hover:text-gold-light transition-colors duration-200 font-medium"
              >
                Accéder au suivi
                <span className="block w-4 h-px bg-current" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-gold font-body mb-3">05</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-4">
              Questions fréquentes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="py-5 border-b border-border">
                <p className="font-body text-[14px] font-medium text-ink mb-2">{item.q}</p>
                <p className="font-body text-[13px] text-ink-muted leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <p className="font-body text-[13px] text-ink-muted mb-4">
              Une autre question sur la livraison ?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-cream font-body text-[12px] tracking-[0.15em] uppercase hover:bg-gold transition-colors duration-300"
            >
              Nous contacter
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function TimelineStep({
  step,
  title,
  duration,
  description,
  active,
}: {
  step: string;
  title: string;
  duration: string;
  description: string;
  active?: boolean;
}) {
  return (
    <div className={`flex gap-4 p-4 rounded-sm ${active ? "bg-gold/5 border border-gold/20" : ""}`}>
      <div className="flex-shrink-0">
        <span className={`font-display text-lg leading-none ${active ? "text-gold" : "text-gold/40"}`}>{step}</span>
      </div>
      <div>
        <div className="flex flex-wrap items-baseline gap-2 mb-1">
          <p className="font-body text-[14px] font-medium text-ink">{title}</p>
          <span className="font-body text-[11px] text-ink-muted">{duration}</span>
        </div>
        <p className="font-body text-[12px] text-ink-muted leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function TimelineConnector() {
  return (
    <div className="ml-[22px] w-px h-3 bg-border" aria-hidden="true" />
  );
}
