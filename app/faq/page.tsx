"use client";

import { useState, useMemo } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const FAQ_CATEGORIES = [
  {
    id: "commandes",
    label: "Commandes",
    icon: (
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
    ),
    questions: [
      {
        q: "Comment passer une commande sur maisonattar.com ?",
        a: "Rendez-vous sur la page de la pièce qui vous intéresse, configurez votre zellige, taille et type de pieds, puis ajoutez au panier. Le paiement est sécurisé par Stripe. Vous recevez immédiatement un email de confirmation avec votre numéro de commande.",
      },
      {
        q: "Puis-je modifier ou annuler ma commande après validation ?",
        a: "Vous avez 24 heures après la commande pour la modifier ou l'annuler sans frais. Au-delà, si la fabrication a commencé, l'annulation n'est plus possible pour les pièces sur mesure. Pour les pièces catalogue, le droit de rétractation de 14 jours s'applique dès la réception.",
      },
      {
        q: "Comment suivre l'avancement de ma commande ?",
        a: "Chaque commande dispose d'un espace de suivi sur maisonattar.com/suivi. Vous y voyez l'avancement étape par étape, les photos prises par votre maalem, et les dates estimées. Vous recevez aussi des emails à chaque changement de statut.",
      },
      {
        q: "Puis-je commander plusieurs pièces dans une même commande ?",
        a: "Oui. Vous pouvez ajouter plusieurs pièces au panier. Elles seront fabriquées conjointement quand c'est possible, ce qui peut légèrement ajuster les délais. La livraison sera groupée en une seule expédition.",
      },
      {
        q: "Acceptez-vous les commandes professionnelles (architectes, hôtels) ?",
        a: "Absolument. Nous travaillons avec des architectes d'intérieur, des hôtels et des décorateurs pour des projets de plusieurs pièces. Contactez-nous pour un devis professionnel avec des conditions adaptées.",
      },
    ],
  },
  {
    id: "fabrication",
    label: "Fabrication",
    icon: (
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    ),
    questions: [
      {
        q: "Combien de temps prend la fabrication d'une pièce ?",
        a: "La fabrication prend généralement 6 à 8 semaines pour les pièces catalogue. Les pièces sur mesure nécessitent 10 à 12 semaines selon leur complexité. Le délai commence à courir dès la confirmation de la commande.",
      },
      {
        q: "Qui fabrique mes pièces exactement ?",
        a: "Chaque pièce est fabriquée par un maalem — un maître artisan zelligeur formé à Fès selon les techniques traditionnelles. Son nom vous est communiqué à la commande, et il vous enverra des photos tout au long de la fabrication.",
      },
      {
        q: "Mes pièces sont-elles vraiment uniques ?",
        a: "Oui. Le zellige est une matière naturelle coupée à la main, une tesselle à la fois. Chaque pièce présente de légères variations de teinte, de texture et de disposition qui en font un objet unique. Ces imperfections sont constitutives de la beauté artisanale.",
      },
      {
        q: "Puis-je faire une demande de fabrication complètement sur mesure ?",
        a: "Oui. Nous acceptons les commandes avec dimensions spéciales, combinaisons de zellige hors catalogue, ou formes personnalisées. Contactez-nous via le formulaire avec vos souhaits pour recevoir un devis et un délai précis.",
      },
      {
        q: "Peut-on visiter l'atelier à Fès ?",
        a: "Dans certains cas exceptionnels, et sur invitation préalable, il est possible de visiter l'atelier. Contactez-nous si vous êtes de passage à Fès et que vous souhaitez voir nos maalems au travail.",
      },
    ],
  },
  {
    id: "livraison",
    label: "Livraison",
    icon: (
      <>
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </>
    ),
    questions: [
      {
        q: "Dans quels pays livrez-vous ?",
        a: "Nous livrons en France métropolitaine (livraison offerte), dans toute l'Union Européenne (50–150 €), au Royaume-Uni (80–200 €), et à l'international sur devis. Pour les destinations hors UE, contactez-nous avant de commander.",
      },
      {
        q: "Comment mes pièces sont-elles emballées ?",
        a: "Chaque pièce est emballée dans une caisse en bois sur mesure avec mousse haute densité, calages anti-choc et protection textile. C'est la même méthode utilisée pour les œuvres d'art. Chaque expédition est assurée à 100% de sa valeur.",
      },
      {
        q: "Puis-je choisir ma date de livraison ?",
        a: "Oui. Une fois votre pièce expédiée, le transporteur vous contacte pour convenir d'un rendez-vous adapté à vos disponibilités. Nous collaborons avec des transporteurs spécialisés qui font de la livraison avec prise de rendez-vous.",
      },
      {
        q: "Que faire si ma livraison est endommagée ?",
        a: "Prenez des photos de l'emballage ET de la pièce avant de signer le bon de livraison, puis notez les réserves sur le bon. Contactez-nous dans les 48h à contact@maisonattar.com. Nous gérons l'assurance et organisons le remplacement.",
      },
      {
        q: "Est-il possible de récupérer ma commande à l'atelier ?",
        a: "Oui, si vous êtes à Fès ou si vous organisez un transport personnel, il est possible de récupérer votre pièce à l'atelier. Aucune réduction n'est appliquée sur les frais de livraison dans ce cas, mais vous économisez sur le transport.",
      },
    ],
  },
  {
    id: "paiement",
    label: "Paiement",
    icon: (
      <>
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </>
    ),
    questions: [
      {
        q: "Quels moyens de paiement acceptez-vous ?",
        a: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express) via Stripe, et le paiement en 3 ou 4 fois sans frais via Alma pour les commandes supérieures à 300 €. Les virements bancaires sont également acceptés pour les commandes professionnelles.",
      },
      {
        q: "Le paiement en plusieurs fois est-il possible ?",
        a: "Oui, via notre partenaire Alma. Pour les commandes entre 300 € et 2000 €, vous pouvez payer en 3 fois sans frais. Pour les commandes supérieures, le paiement en 4 fois est disponible. Alma vérifie l'éligibilité en quelques secondes.",
      },
      {
        q: "Mes données bancaires sont-elles sécurisées ?",
        a: "Absolument. Nous ne stockons jamais vos numéros de carte bancaire. Tous les paiements sont traités directement par Stripe, certifié PCI DSS Niveau 1 (le niveau le plus élevé de sécurité des paiements). Nous voyons uniquement les 4 derniers chiffres.",
      },
      {
        q: "Quand suis-je débité ?",
        a: "Pour les pièces catalogue, vous êtes débité intégralement à la commande. Pour les pièces sur mesure, un acompte de 50% est prélevé à la commande et le solde avant expédition. Vous recevez une facture à chaque étape.",
      },
      {
        q: "Puis-je recevoir une facture pour ma comptabilité ?",
        a: "Oui, une facture est automatiquement générée et envoyée par email après chaque paiement. Vous pouvez aussi télécharger vos factures depuis votre espace client.",
      },
    ],
  },
  {
    id: "retours",
    label: "Retours",
    icon: (
      <>
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
      </>
    ),
    questions: [
      {
        q: "Puis-je retourner ma commande ?",
        a: "Oui, vous disposez de 14 jours après réception pour exercer votre droit de rétractation, sans avoir à justifier de motifs. La pièce doit être retournée en parfait état et dans son emballage d'origine. Les frais de retour sont à votre charge.",
      },
      {
        q: "Le droit de rétractation s'applique-t-il aux pièces sur mesure ?",
        a: "Non. Conformément à l'article L221-28 du Code de la consommation, les pièces fabriquées selon vos spécifications personnalisées (sur mesure ou configurations hors catalogue) sont exclues du droit de rétractation.",
      },
      {
        q: "Comment organiser un retour ?",
        a: "Contactez-nous à contact@maisonattar.com avec votre numéro de commande et la raison du retour. Nous vous guiderons sur la procédure. Nous recommandons de réutiliser la caisse bois d'origine et de faire assurer le retour.",
      },
      {
        q: "Quand suis-je remboursé après un retour ?",
        a: "Nous procédons au remboursement dans les 14 jours suivant la réception de la pièce retournée et la vérification de son état. Le remboursement est effectué sur le moyen de paiement utilisé lors de la commande.",
      },
      {
        q: "Ma pièce est défectueuse — que faire ?",
        a: "Contactez-nous immédiatement avec des photos du défaut. Toutes nos pièces sont couvertes par une garantie de 2 ans contre les défauts de fabrication. Nous organiserons soit une réparation, soit un remplacement, à notre charge.",
      },
    ],
  },
  {
    id: "entretien",
    label: "Entretien",
    icon: (
      <>
        <path d="M3 22v-8.5C3 9.4 7.4 6 12 6s9 3.4 9 7.5V22" />
        <path d="M3 11h18M12 6V2M8 2h8" />
      </>
    ),
    questions: [
      {
        q: "Comment nettoyer mon zellige au quotidien ?",
        a: "Un simple essuyage avec un chiffon humide et de l'eau tiède suffit. Pour un nettoyage plus poussé, utilisez du savon doux (ph neutre) et une éponge non abrasive. Séchez toujours après nettoyage pour éviter les traces calcaires.",
      },
      {
        q: "Puis-je poser un verre chaud sur le zellige ?",
        a: "Déconseillé. Utilisez toujours un dessous-de-plat ou un sous-verre. Les chocs thermiques répétés peuvent fragiliser les joints et, à terme, décoller les tesselles. Une simple précaution suffit à préserver votre pièce pour des décennies.",
      },
      {
        q: "Faut-il traiter le zellige avec un produit spécial ?",
        a: "Une fois par mois, vous pouvez appliquer de l'huile de lin pure avec un chiffon microfibre pour nourrir le zellige et raviver ses couleurs. N'utilisez jamais de produits acides (vinaigre, citron) ou de nettoyants abrasifs.",
      },
      {
        q: "Comment entretenir la structure en acier ?",
        a: "L'acier thermolaqué s'entretient avec un chiffon humide. Pour l'acier patiné ou le laiton, une cire naturelle (cire d'abeille) appliquée 2 fois par an protège et embellit. La patine naturelle qui se développe avec le temps est une qualité, pas un défaut.",
      },
      {
        q: "Une tesselle s'est décollée — que faire ?",
        a: "Conservez la tesselle. Contactez-nous à contact@maisonattar.com avec une photo. Selon votre localisation, nous pouvons vous envoyer le mortier adapté et les instructions pour une petite réparation, ou vous mettre en contact avec un artisan proche de chez vous.",
      },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return FAQ_CATEGORIES.map((cat) => ({
      ...cat,
      questions: cat.questions.filter(
        (item) =>
          item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
      ),
    })).filter(
      (cat) =>
        cat.questions.length > 0 &&
        (!activeCategory || cat.id === activeCategory)
    );
  }, [search, activeCategory]);

  function toggleItem(key: string) {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const totalResults = filtered.reduce((acc, c) => acc + c.questions.length, 0);

  return (
    <div className="min-h-screen bg-cream">

      {/* Header */}
      <section className="pt-24 pb-16 px-6 md:px-12 lg:px-20 border-b border-border">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-gold font-body mb-4">
            Maison Attar — Support
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight mb-8">
            Questions fréquentes
          </h1>

          {/* Search */}
          <div className="relative max-w-lg">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="absolute left-0 top-1/2 -translate-y-1/2 text-ink-muted"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une question…"
              aria-label="Rechercher une question"
              className="w-full bg-transparent border-b border-border pl-7 py-3 font-body text-[14px] text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-ink transition-colors duration-200"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Effacer la recherche"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {search && (
            <p className="font-body text-[12px] text-ink-muted mt-3">
              {totalResults} résultat{totalResults !== 1 ? "s" : ""} pour «{" "}
              <span className="text-ink">{search}</span> »
            </p>
          )}
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-12">

        {/* Category filter */}
        {!search && (
          <div className="flex flex-wrap gap-2 mb-12">
            <CategoryPill
              active={activeCategory === null}
              onClick={() => setActiveCategory(null)}
              label="Toutes"
            />
            {FAQ_CATEGORIES.map((cat) => (
              <CategoryPill
                key={cat.id}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
                label={cat.label}
              />
            ))}
          </div>
        )}

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-2xl text-ink-muted mb-3">Aucun résultat</p>
            <p className="font-body text-[13px] text-ink-muted mb-6">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-cream font-body text-[12px] tracking-[0.15em] uppercase hover:bg-gold transition-colors duration-300"
            >
              Nous contacter
            </a>
          </div>
        ) : (
          <div className="space-y-16">
            {filtered.map((category) => (
              <section key={category.id} id={category.id} className="scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-gold flex-shrink-0"
                    aria-hidden="true"
                  >
                    {category.icon}
                  </svg>
                  <h2 className="font-display text-2xl md:text-3xl text-ink">{category.label}</h2>
                  <span className="font-body text-[11px] text-ink-muted bg-warm-gray-light border border-border rounded-full px-2.5 py-0.5">
                    {category.questions.length}
                  </span>
                </div>

                <div className="divide-y divide-border">
                  {category.questions.map((item, i) => {
                    const key = `${category.id}-${i}`;
                    const isOpen = !!openItems[key];
                    return (
                      <div key={key}>
                        <button
                          onClick={() => toggleItem(key)}
                          aria-expanded={isOpen}
                          className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                        >
                          <span className="font-body text-[14px] font-medium text-ink group-hover:text-gold transition-colors duration-200 pr-4">
                            {item.q}
                          </span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className={`flex-shrink-0 text-ink-muted mt-0.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                            aria-hidden="true"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="pb-5 pr-8">
                            <p className="font-body text-[13px] text-ink-muted leading-relaxed">
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Still have questions */}
        <div className="mt-20 pt-12 border-t border-border">
          <div className="max-w-lg">
            <h2 className="font-display text-3xl text-ink mb-3">
              Toujours une question ?
            </h2>
            <p className="font-body text-[13px] text-ink-muted mb-6 leading-relaxed">
              Notre équipe répond sous 24 heures ouvrées. N'hésitez pas à nous écrire — nous adorons parler de zellige.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-ink text-cream font-body text-[12px] tracking-[0.15em] uppercase hover:bg-gold transition-colors duration-300"
            >
              Écrire à l&apos;équipe
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function CategoryPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`font-body text-[11px] uppercase tracking-wider px-4 py-2 border transition-all duration-200 ${
        active
          ? "bg-ink text-cream border-ink"
          : "bg-transparent text-ink-muted border-border hover:border-ink hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
