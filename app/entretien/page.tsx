import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Entretien & Patine — Guide Complet du Zellige",
  description:
    "Guide complet d'entretien de vos tables en zellige marocain et acier forgé Maison Attar. Nettoyage, protection, patine naturelle — les conseils de nos artisans maalems pour préserver votre pièce pour des décennies.",
  alternates: {
    canonical: "https://beautiful-charm-production-7244.up.railway.app/entretien",
  },
  keywords: [
    "entretien zellige marocain",
    "nettoyer zellige",
    "entretien acier forgé",
    "protection zellige",
    "patine zellige naturelle",
    "guide entretien table zellige",
  ],
  openGraph: {
    title: "Entretien & Patine",
    description:
      "Guide d'entretien complet pour votre table en zellige marocain et acier forgé. Conseils de nos maalems pour une pièce qui dure des décennies.",
    url: "https://beautiful-charm-production-7244.up.railway.app/entretien",
  },
};

export default function EntretienPage() {
  return (
    <div className="min-h-screen bg-cream">

      {/* Hero */}
      <section className="pt-24 pb-20 px-6 md:px-12 lg:px-20 border-b border-border">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div>
            <p className="animate-fade-up text-xs uppercase tracking-widest text-gold font-body mb-4">
              Maison Attar — Savoir-faire
            </p>
            <h1 className="animate-fade-up delay-100 font-display text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05] mb-6">
              Entretien<br />& Patine
            </h1>
            <p className="animate-fade-up delay-200 font-body text-ink-light text-lg leading-relaxed max-w-md">
              Le zellige de Fès est une matière vivante. Bien entretenu, il gagne en beauté avec le temps — une patine unique qui raconte l'usage et les années.
            </p>
          </div>
          <div className="hidden lg:flex items-end justify-end">
            <blockquote className="border-l-2 border-gold pl-6 max-w-xs">
              <p className="font-display text-xl text-ink-light italic leading-relaxed">
                "Une pièce bien entretenue se transmet. C'est notre fierté d'artisan."
              </p>
              <cite className="font-body text-[12px] text-ink-muted mt-3 block not-italic">
                — Hassan Benali, Maalem zelligeur
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-20 space-y-20">

        {/* Alert card */}
        <div className="p-5 bg-gold/5 border border-gold/30 rounded-sm flex gap-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0 text-gold mt-0.5" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <div>
            <p className="font-body text-[13px] font-medium text-ink mb-1">À retenir absolument</p>
            <p className="font-body text-[13px] text-ink-light leading-relaxed">
              N'utilisez jamais de produits acides, abrasifs ou contenant du vinaigre sur le zellige. Évitez les éponges à récurer. Ces précautions simples préservent l'émail et le mortier pour des décennies.
            </p>
          </div>
        </div>

        {/* Section 1 — Nettoyage quotidien */}
        <section>
          <SectionHeader number="01" title="Nettoyage quotidien" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="prose-content">
              <p>
                Le zellige est une matière robuste qui nécessite peu d'entretien au quotidien. Un nettoyage simple et régulier suffit à préserver son éclat.
              </p>
              <div className="mt-6 space-y-4">
                <TipCard
                  color="success"
                  title="Ce que vous pouvez faire"
                  items={[
                    "Essuyez les éclaboussures dès qu'elles se produisent avec un chiffon humide",
                    "Nettoyez avec de l'eau tiède et un savon doux (ph neutre)",
                    "Utilisez un chiffon microfibre ou une éponge douce",
                    "Séchez avec un chiffon propre pour éviter les traces calcaires",
                    "Passez un chiffon sec régulièrement pour raviver le brillant",
                  ]}
                />
                <TipCard
                  color="error"
                  title="Ce qu'il faut éviter"
                  items={[
                    "Produits acides (vinaigre, citron, détartrants)",
                    "Produits abrasifs ou éponges métalliques",
                    "Nettoyants industriels ou eau de javel",
                    "Jets d'eau haute pression",
                    "Laisser stagner l'eau longtemps sur la surface",
                  ]}
                />
              </div>
            </div>
            <div className="bg-warm-gray-light border border-border rounded-sm p-6">
              <p className="font-body text-[10px] uppercase tracking-[0.15em] text-ink-muted mb-4">Routine recommandée</p>
              <div className="space-y-4">
                {[
                  { freq: "Quotidien", action: "Essuyage des éclaboussures et traces", tool: "Chiffon humide" },
                  { freq: "Hebdomadaire", action: "Nettoyage complet de la surface", tool: "Eau tiède + savon doux" },
                  { freq: "Mensuel", action: "Application d'huile de lin ou cire naturelle", tool: "Chiffon microfibre" },
                  { freq: "Annuel", action: "Vérification de l'état du joint et de la structure", tool: "Inspection visuelle" },
                ].map((item) => (
                  <div key={item.freq} className="flex gap-4 py-3 border-b border-border/50 last:border-0">
                    <span className="font-body text-[11px] uppercase tracking-wider text-gold flex-shrink-0 w-24">{item.freq}</span>
                    <div>
                      <p className="font-body text-[13px] text-ink">{item.action}</p>
                      <p className="font-body text-[11px] text-ink-muted mt-0.5">{item.tool}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Section 2 — Protection */}
        <section>
          <SectionHeader number="02" title="Protection du zellige" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="prose-content">
              <p>
                Le zellige traditionnel n'est pas traité avec des résines industrielles — c'est ce qui lui donne son aspect naturel et légèrement poreux. Une protection naturelle annuelle suffit à le préserver.
              </p>
              <p>
                L'huile de lin naturelle est le produit utilisé par les maalems depuis des siècles. Elle pénètre dans les pores du zellige, renforce sa résistance à l'humidité et avive les couleurs.
              </p>
            </div>
            <div className="space-y-3">
              <ProtectionStep number="01" title="Nettoyez et séchez">
                Assurez-vous que la surface est parfaitement propre et sèche avant toute application.
              </ProtectionStep>
              <ProtectionStep number="02" title="Appliquez l'huile de lin">
                Versez quelques gouttes d'huile de lin pure sur un chiffon microfibre. Appliquez en mouvements circulaires sur toute la surface.
              </ProtectionStep>
              <ProtectionStep number="03" title="Laissez pénétrer">
                Laissez reposer 15 à 20 minutes. L'huile pénètre dans les pores du zellige.
              </ProtectionStep>
              <ProtectionStep number="04" title="Essuyez l'excédent">
                Essuyez délicatement avec un chiffon propre et sec. N'en laissez pas d'excédent — cela rendrait la surface glissante.
              </ProtectionStep>
            </div>
          </div>
        </section>

        <Divider />

        {/* Section 3 — Entretien acier */}
        <section>
          <SectionHeader number="03" title="Entretien de la structure acier" />
          <div className="prose-content max-w-2xl mb-8">
            <p>
              Les structures de nos pièces sont en acier thermolaqué ou patiné. Ce traitement en surface les protège naturellement, mais quelques précautions simples permettent de préserver leur apparence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" />,
                title: "Acier thermolaqué",
                tips: ["Nettoyez avec un chiffon humide et du savon doux", "Évitez les produits chimiques agressifs", "En cas d'éraflure légère, contactez-nous pour un kit de retouche"],
              },
              {
                icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
                title: "Acier patiné",
                tips: ["La patine évolue naturellement avec le temps", "Protégez avec de la cire à l'ancienne 1 à 2 fois par an", "Une légère oxydation en surface est normale et belle"],
              },
              {
                icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
                title: "Laiton & bronze",
                tips: ["Nettoyez avec un chiffon doux sec", "Utilisez un produit spécial laiton une fois par an", "Le voile naturel qui se forme avec l'âge est une belle patine"],
              },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-warm-gray-light border border-border rounded-sm">
                <div className="w-8 h-8 flex items-center justify-center mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold" aria-hidden="true">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="font-body text-[13px] font-medium text-ink mb-3">{item.title}</h3>
                <ul className="space-y-2">
                  {item.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="block w-1 h-1 rounded-full bg-gold mt-2 flex-shrink-0" aria-hidden="true" />
                      <span className="font-body text-[12px] text-ink-muted leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Section 4 — Précautions */}
        <section>
          <SectionHeader number="04" title="Précautions d'usage" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            {[
              {
                icon: "🌡️",
                title: "Chaleur",
                desc: "Évitez de poser des objets brûlants directement sur le zellige. Utilisez toujours un dessous-de-plat. La chaleur excessive peut fragiliser les joints.",
              },
              {
                icon: "💧",
                title: "Humidité permanente",
                desc: "Ne laissez pas d'eau stagner sur la surface. En extérieur, utilisez des pieds protège-carrelage et rentrez la pièce en hiver.",
              },
              {
                icon: "⚠️",
                title: "Charge",
                desc: "Nos tables sont conçues pour un usage standard. Évitez de vous y asseoir ou d'y poser des charges supérieures à 30 kg de façon ponctuelle.",
              },
              {
                icon: "🔧",
                title: "Chocs",
                desc: "Le zellige peut se fissurer sous un choc violent. En cas de fissure ou de tesselle décollée, contactez-nous — notre réseau de maalems peut réparer.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 bg-warm-gray-light border border-border rounded-sm">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{item.icon}</span>
                <div>
                  <p className="font-body text-[13px] font-medium text-ink mb-1.5">{item.title}</p>
                  <p className="font-body text-[12px] text-ink-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Section 5 — Produits recommandés */}
        <section>
          <SectionHeader number="05" title="Produits recommandés" />
          <p className="font-body text-ink-muted mb-8 max-w-xl">
            Nous recommandons uniquement des produits naturels, sans composés chimiques agressifs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: "Huile de lin pure",
                usage: "Protection zellige",
                frequency: "1× par mois",
                where: "Magasin de bricolage ou droguerie",
              },
              {
                name: "Cire d'abeille naturelle",
                usage: "Protection acier patiné",
                frequency: "2× par an",
                where: "Cirage traditionnel",
              },
              {
                name: "Savon noir de Beldi",
                usage: "Nettoyage quotidien",
                frequency: "Au besoin",
                where: "Épicerie bio ou hammam",
              },
              {
                name: "Chiffons microfibre",
                usage: "Application et essuyage",
                frequency: "Toujours",
                where: "Grande surface",
              },
            ].map((product) => (
              <div key={product.name} className="p-5 border border-border bg-cream rounded-sm">
                <p className="font-body text-[14px] font-medium text-ink mb-1">{product.name}</p>
                <p className="font-body text-[11px] text-gold mb-3">{product.usage}</p>
                <div className="space-y-1.5">
                  <p className="font-body text-[11px] text-ink-muted">
                    <span className="text-ink-light">Fréquence :</span> {product.frequency}
                  </p>
                  <p className="font-body text-[11px] text-ink-muted">
                    <span className="text-ink-light">Où :</span> {product.where}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Section 6 — Garantie artisanale */}
        <section>
          <SectionHeader number="06" title="Garantie artisanale" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="prose-content">
              <p>
                Toutes nos pièces sont couvertes par une <strong>garantie de 2 ans</strong> contre les défauts de fabrication. Mais notre engagement va au-delà de la garantie légale.
              </p>
              <p>
                Si votre zellige se décolle ou se fissure de façon inattendue — même après plusieurs années — contactez-nous. Nous travaillons avec notre réseau de maalems en France pour organiser une réparation dans les meilleures conditions.
              </p>
              <p>
                Une pièce Maison Attar est faite pour durer des décennies. Si nous avons bien fait notre travail, vous la transmettrez.
              </p>
            </div>
            <div className="bg-ink text-cream rounded-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                <p className="font-display text-xl text-cream">Notre garantie</p>
              </div>
              <div className="space-y-4">
                {[
                  "2 ans de garantie légale contre les défauts de fabrication",
                  "Réseau de maalems partenaires en France pour les réparations",
                  "Service après-vente réactif sous 48h",
                  "Pièces de remplacement disponibles sur notre stock de zellige",
                  "Engagement de réparabilité à vie pour les structures acier",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="flex-shrink-0 text-gold mt-1" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="font-body text-[13px] text-cream/80 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.15em] uppercase text-gold hover:text-gold-light transition-colors duration-200 font-medium"
                >
                  Contacter le SAV
                  <span className="block w-4 h-px bg-current" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-8">
      <span className="font-display text-3xl text-gold/30 font-light leading-none">{number}</span>
      <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">{title}</h2>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      <span className="block flex-1 h-px bg-border" />
      <span className="block w-1 h-1 bg-gold/40 rounded-full" />
      <span className="block w-4 h-px bg-border" />
    </div>
  );
}

function TipCard({
  color,
  title,
  items,
}: {
  color: "success" | "error";
  title: string;
  items: string[];
}) {
  const styles = {
    success: { border: "border-success/20", bg: "bg-success/5", dot: "bg-success", text: "text-success" },
    error: { border: "border-error/20", bg: "bg-error/5", dot: "bg-error", text: "text-error" },
  };
  const s = styles[color];
  return (
    <div className={`p-5 border rounded-sm ${s.border} ${s.bg}`}>
      <p className={`font-body text-[11px] uppercase tracking-wider font-medium mb-3 ${s.text}`}>{title}</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className={`block w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${s.dot}`} aria-hidden="true" />
            <span className="font-body text-[12px] text-ink-light leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProtectionStep({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 p-4 bg-warm-gray-light border border-border/50 rounded-sm">
      <span className="font-display text-xl text-gold/40 leading-none flex-shrink-0">{number}</span>
      <div>
        <p className="font-body text-[13px] font-medium text-ink mb-1">{title}</p>
        <p className="font-body text-[12px] text-ink-muted leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
