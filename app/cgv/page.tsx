import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "Conditions Générales de Vente de Maison Attar SARL — pièces artisanales en zellige et acier forgé fabriquées à Fès, Maroc.",
  robots: { index: false, follow: false },
};

const TOC = [
  { id: "objet", label: "1. Objet" },
  { id: "prix", label: "2. Prix" },
  { id: "commandes", label: "3. Commandes" },
  { id: "fabrication", label: "4. Fabrication sur mesure" },
  { id: "livraison", label: "5. Délais de livraison" },
  { id: "retractation", label: "6. Droit de rétractation" },
  { id: "garantie", label: "7. Garantie" },
  { id: "responsabilite", label: "8. Responsabilité" },
  { id: "donnees", label: "9. Données personnelles" },
  { id: "litiges", label: "10. Litiges" },
  { id: "droit", label: "11. Droit applicable" },
];

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="pt-24 pb-12 px-6 md:px-12 lg:px-20 border-b border-border">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-gold font-body mb-4">
            Maison Attar — Légal
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight mb-4">
            Conditions Générales de Vente
          </h1>
          <p className="font-body text-sm text-ink-muted">
            Dernière mise à jour : 1er janvier 2025
          </p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">

          {/* Table of contents — sticky sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="bg-warm-gray-light border border-border rounded-sm p-6">
              <h2 className="font-body text-[10px] uppercase tracking-[0.2em] text-ink-muted font-medium mb-5">
                Sommaire
              </h2>
              <nav aria-label="Sommaire des CGV">
                <ul className="space-y-2.5">
                  {TOC.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="font-body text-[12px] text-ink-light hover:text-ink transition-colors duration-200 link-underline"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="font-body text-[11px] text-ink-muted leading-relaxed mb-3">
                  Une question sur vos droits ?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.1em] uppercase text-gold hover:text-gold-dark transition-colors duration-200 font-medium"
                >
                  Nous contacter
                  <span className="block w-4 h-px bg-current" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <article className="max-w-2xl">
            <div className="space-y-14 font-body">

              {/* Intro */}
              <div className="p-6 bg-warm-gray-light border border-border rounded-sm">
                <p className="text-sm text-ink-light leading-relaxed">
                  Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre la société <strong className="text-ink">Maison Attar SARL</strong>, dont le siège social est situé Médina de Fès, Maroc (ci-après « le Vendeur »), et toute personne physique ou morale effectuant un achat sur le site <strong className="text-ink">maisonattar.com</strong> (ci-après « l'Acheteur »). Tout achat implique l'acceptation pleine et entière des présentes CGV.
                </p>
              </div>

              {/* Section 1 */}
              <section id="objet" className="scroll-mt-28">
                <SectionHeader number="01" title="Objet" />
                <div className="prose-content">
                  <p>
                    Les présentes CGV ont pour objet de définir les droits et obligations des parties dans le cadre de la vente en ligne de pièces de mobilier artisanal en zellige marocain et acier forgé proposées par Maison Attar.
                  </p>
                  <p>
                    Maison Attar commercialise des tables basses, tables à manger, consoles et tables d'appoint, fabriquées à la main dans l'atelier de Fès, Maroc, par nos artisans maalems. Chaque pièce est unique par nature, les variations inhérentes à la fabrication artisanale étant constitutives de la valeur du produit.
                  </p>
                </div>
              </section>

              <Divider />

              {/* Section 2 */}
              <section id="prix" className="scroll-mt-28">
                <SectionHeader number="02" title="Prix" />
                <div className="prose-content">
                  <p>
                    Les prix sont indiqués en euros (EUR), toutes taxes comprises (TTC), conformément à la législation en vigueur. Maison Attar se réserve le droit de modifier ses prix à tout moment, mais les produits seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.
                  </p>
                  <p>
                    Les frais de livraison ne sont pas inclus dans le prix affiché et sont calculés en fonction de la destination et du poids de la commande. Ils sont indiqués avant la validation définitive de la commande.
                  </p>
                  <InfoBox>
                    France métropolitaine : livraison offerte. Union Européenne : 50 € à 150 €. Royaume-Uni et international : nous contacter pour un devis personnalisé.
                  </InfoBox>
                </div>
              </section>

              <Divider />

              {/* Section 3 */}
              <section id="commandes" className="scroll-mt-28">
                <SectionHeader number="03" title="Commandes" />
                <div className="prose-content">
                  <p>
                    La commande est ferme et définitive dès lors que l'Acheteur a validé son panier, renseigné ses coordonnées et procédé au paiement. Un email de confirmation est automatiquement adressé à l'Acheteur à l'adresse indiquée lors de la commande.
                  </p>
                  <p>
                    Maison Attar se réserve le droit d'annuler ou de refuser toute commande en cas de litige existant avec l'Acheteur, de suspicion de fraude, ou de rupture de stock exceptionnelle. Dans ce cas, l'Acheteur sera remboursé intégralement dans un délai de 14 jours ouvrés.
                  </p>
                  <p>
                    Chaque commande fait l'objet d'un numéro de référence unique (ex. MA-2024-XXXXX) permettant de suivre l'avancement de la fabrication via l'espace de suivi disponible sur maisonattar.com.
                  </p>
                </div>
              </section>

              <Divider />

              {/* Section 4 */}
              <section id="fabrication" className="scroll-mt-28">
                <SectionHeader number="04" title="Fabrication sur mesure" />
                <div className="prose-content">
                  <p>
                    Maison Attar propose des pièces sur mesure (dimensions hors catalogue, coloris spécifiques, configurations personnalisées). Les commandes sur mesure font l'objet d'un devis préalable, accepté par l'Acheteur avant toute mise en fabrication.
                  </p>
                  <p>
                    Pour les pièces sur mesure, un acompte de <strong>50 % du montant total TTC</strong> est demandé à la commande. Le solde est dû avant expédition. L'acompte versé ne peut en aucun cas être remboursé en cas d'annulation par l'Acheteur une fois la fabrication commencée, sauf en cas de manquement avéré du Vendeur à ses obligations contractuelles.
                  </p>
                  <InfoBox>
                    Les pièces fabriquées sur mesure sont expressément exclues du droit de rétractation conformément à l'article L221-28 du Code de la consommation (voir section 6).
                  </InfoBox>
                </div>
              </section>

              <Divider />

              {/* Section 5 */}
              <section id="livraison" className="scroll-mt-28">
                <SectionHeader number="05" title="Délais de livraison" />
                <div className="prose-content">
                  <p>
                    Chaque pièce Maison Attar est fabriquée à la commande par nos artisans maalems. Le délai de fabrication est de <strong>6 à 8 semaines</strong> à compter de la validation de la commande. Pour les pièces sur mesure, ce délai peut être porté à <strong>10 à 12 semaines</strong> selon la complexité.
                  </p>
                  <p>
                    Une fois la pièce emballée et remise au transporteur, la livraison est effectuée sous <strong>1 à 2 semaines</strong> en France métropolitaine, et sous 2 à 3 semaines en Union Européenne.
                  </p>
                  <p>
                    Ces délais sont donnés à titre indicatif. Toute circonstance indépendante de la volonté de Maison Attar (intempéries, grèves, cas de force majeure) peut entraîner un retard de livraison. L'Acheteur sera informé sans délai de tout retard significatif.
                  </p>
                  <p>
                    En cas de retard de livraison supérieur à 30 jours au-delà de la date estimée, l'Acheteur peut demander la résolution du contrat et sera remboursé intégralement dans les 14 jours suivant cette demande.
                  </p>
                </div>
              </section>

              <Divider />

              {/* Section 6 */}
              <section id="retractation" className="scroll-mt-28">
                <SectionHeader number="06" title="Droit de rétractation" />
                <div className="prose-content">
                  <p>
                    Conformément aux articles L221-18 et suivants du Code de la consommation, l'Acheteur particulier (consommateur) dispose d'un délai de <strong>14 jours calendaires</strong> à compter de la réception de sa commande pour exercer son droit de rétractation, sans avoir à justifier de motifs.
                  </p>
                  <p>
                    Pour exercer ce droit, l'Acheteur doit notifier sa décision à Maison Attar par email à l'adresse <a href="mailto:contact@maisonattar.com" className="text-gold hover:text-gold-dark transition-colors">contact@maisonattar.com</a> ou via le formulaire de contact. La pièce doit être retournée en parfait état et dans son emballage d'origine dans les 14 jours suivant la notification.
                  </p>
                  <p>
                    Les frais de retour sont à la charge de l'Acheteur. Le remboursement sera effectué dans les 14 jours suivant la réception de la pièce retournée et vérification de son état.
                  </p>

                  <div className="mt-6 p-5 bg-ink text-cream rounded-sm">
                    <p className="text-[13px] font-medium mb-2">Exception — Pièces sur mesure</p>
                    <p className="text-[12px] text-cream/80 leading-relaxed">
                      Conformément à l'article L221-28, 3° du Code de la consommation, le droit de rétractation <strong className="text-cream">ne s'applique pas</strong> aux pièces fabriquées selon les spécifications de l'Acheteur ou nettement personnalisées. Les commandes sur mesure sont définitives dès leur confirmation.
                    </p>
                  </div>
                </div>
              </section>

              <Divider />

              {/* Section 7 */}
              <section id="garantie" className="scroll-mt-28">
                <SectionHeader number="07" title="Garantie" />
                <div className="prose-content">
                  <p>
                    Toutes les pièces Maison Attar bénéficient de la <strong>garantie légale de conformité</strong> (articles L217-4 et suivants du Code de la consommation) et de la <strong>garantie contre les vices cachés</strong> (articles 1641 et suivants du Code civil).
                  </p>
                  <p>
                    Maison Attar garantit ses pièces contre tout défaut de fabrication pendant une durée de <strong>2 ans</strong> à compter de la date de livraison. Cette garantie couvre les défauts affectant la structure de la pièce (soudures, assemblages) et les défauts significatifs du zellige (fissures, décollements) non liés à une utilisation incorrecte.
                  </p>
                  <p>
                    Sont exclus de la garantie : les variations naturelles de teinte et de texture du zellige artisanal (constitutives de la pièce unique), les dommages causés par un choc, une mauvaise utilisation, une exposition à des produits abrasifs ou acides, et l'usure normale liée à l'usage.
                  </p>
                  <InfoBox>
                    Pour une conservation optimale de votre pièce, consultez notre guide d'entretien disponible sur maisonattar.com/entretien.
                  </InfoBox>
                </div>
              </section>

              <Divider />

              {/* Section 8 */}
              <section id="responsabilite" className="scroll-mt-28">
                <SectionHeader number="08" title="Responsabilité" />
                <div className="prose-content">
                  <p>
                    La responsabilité de Maison Attar ne peut être engagée qu'en cas de faute prouvée. Maison Attar ne saurait être tenu responsable des dommages immatériels, préjudices commerciaux ou pertes de données résultant de l'utilisation ou de l'impossibilité d'utiliser le site.
                  </p>
                  <p>
                    Maison Attar ne peut être tenu responsable des retards ou défaillances dans l'exécution de ses obligations contractuelles résultant d'un cas de force majeure, incluant sans limitation : catastrophes naturelles, grèves, conflits sociaux, restrictions gouvernementales ou perturbations logistiques exceptionnelles.
                  </p>
                  <p>
                    En tout état de cause, la responsabilité de Maison Attar est limitée au montant de la commande concernée.
                  </p>
                </div>
              </section>

              <Divider />

              {/* Section 9 */}
              <section id="donnees" className="scroll-mt-28">
                <SectionHeader number="09" title="Données personnelles" />
                <div className="prose-content">
                  <p>
                    Les données personnelles collectées lors de la commande (nom, email, adresse, téléphone) sont utilisées uniquement pour le traitement et le suivi de la commande, et ne sont jamais cédées à des tiers à des fins commerciales.
                  </p>
                  <p>
                    Pour l'intégralité de notre politique de confidentialité et l'exercice de vos droits RGPD, consultez notre{" "}
                    <Link href="/politique-confidentialite" className="text-gold hover:text-gold-dark transition-colors">
                      Politique de Confidentialité
                    </Link>.
                  </p>
                </div>
              </section>

              <Divider />

              {/* Section 10 */}
              <section id="litiges" className="scroll-mt-28">
                <SectionHeader number="10" title="Litiges" />
                <div className="prose-content">
                  <p>
                    En cas de litige, l'Acheteur est invité à contacter en premier lieu le service client de Maison Attar à <a href="mailto:contact@maisonattar.com" className="text-gold hover:text-gold-dark transition-colors">contact@maisonattar.com</a> afin de trouver une solution amiable.
                  </p>
                  <p>
                    Conformément aux articles L612-1 et suivants du Code de la consommation, l'Acheteur consommateur peut recourir gratuitement au service de médiation compétent. Pour les litiges concernant des achats en ligne, la plateforme européenne de règlement en ligne des litiges (RLL) est accessible à l'adresse{" "}
                    <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark transition-colors">
                      ec.europa.eu/consumers/odr
                    </a>.
                  </p>
                </div>
              </section>

              <Divider />

              {/* Section 11 */}
              <section id="droit" className="scroll-mt-28">
                <SectionHeader number="11" title="Droit applicable" />
                <div className="prose-content">
                  <p>
                    Les présentes CGV sont soumises au droit français. Tout litige relatif à leur interprétation ou leur exécution relève de la compétence exclusive des tribunaux français, sauf dispositions contraires d'ordre public applicables dans le pays de résidence de l'Acheteur consommateur.
                  </p>
                  <p>
                    La langue des présentes CGV est le français. En cas de traduction dans une autre langue, la version française prévaut.
                  </p>
                </div>
              </section>

              {/* Footer info */}
              <div className="pt-8 border-t border-border">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.15em] text-ink-muted mb-2">Éditeur</p>
                    <p className="font-body text-[13px] text-ink-light">Maison Attar SARL</p>
                    <p className="font-body text-[13px] text-ink-light">Médina de Fès, Maroc</p>
                  </div>
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.15em] text-ink-muted mb-2">Contact légal</p>
                    <a href="mailto:contact@maisonattar.com" className="font-body text-[13px] text-gold hover:text-gold-dark transition-colors">
                      contact@maisonattar.com
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-6">
      <span className="font-display text-3xl text-gold/30 font-light leading-none">{number}</span>
      <h2 className="font-display text-2xl md:text-3xl text-ink leading-tight">{title}</h2>
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

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 flex gap-3 p-4 bg-warm-gray-light border-l-2 border-gold rounded-sm">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0 text-gold mt-0.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
      <p className="font-body text-[12px] text-ink-light leading-relaxed">{children}</p>
    </div>
  );
}
