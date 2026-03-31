import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Maison Attar",
  description: "Politique de confidentialité et protection des données personnelles — Maison Attar SARL, conformité RGPD.",
  robots: { index: false, follow: false },
};

const TOC = [
  { id: "collecte", label: "1. Données collectées" },
  { id: "finalites", label: "2. Finalités du traitement" },
  { id: "cookies", label: "3. Cookies" },
  { id: "partage", label: "4. Partage avec des tiers" },
  { id: "droits", label: "5. Vos droits (RGPD)" },
  { id: "retention", label: "6. Conservation des données" },
  { id: "securite", label: "7. Sécurité" },
  { id: "dpo", label: "8. Contact DPO" },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="pt-24 pb-12 px-6 md:px-12 lg:px-20 border-b border-border">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-gold font-body mb-4">
            Maison Attar — Légal
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight mb-4">
            Politique de Confidentialité
          </h1>
          <p className="font-body text-sm text-ink-muted">
            Dernière mise à jour : 1er janvier 2025 · Conforme RGPD (UE) 2016/679
          </p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="bg-warm-gray-light border border-border rounded-sm p-6">
              <h2 className="font-body text-[10px] uppercase tracking-[0.2em] text-ink-muted font-medium mb-5">
                Sommaire
              </h2>
              <nav aria-label="Sommaire de la politique de confidentialité">
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
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-success" aria-hidden="true" />
                  <p className="font-body text-[11px] text-ink-muted">Conforme RGPD</p>
                </div>
                <p className="font-body text-[11px] text-ink-muted leading-relaxed">
                  Vos données ne sont jamais vendues à des tiers.
                </p>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <article className="max-w-2xl">
            <div className="space-y-14 font-body">

              {/* Intro */}
              <div className="p-6 bg-warm-gray-light border border-border rounded-sm">
                <p className="text-sm text-ink-light leading-relaxed">
                  Maison Attar SARL (ci-après « Maison Attar » ou « nous ») s'engage à protéger la vie privée de ses clients et visiteurs. La présente politique décrit comment nous collectons, utilisons et protégeons vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
                </p>
              </div>

              {/* Section 1 */}
              <section id="collecte" className="scroll-mt-28">
                <SectionHeader number="01" title="Données collectées" />
                <div className="prose-content">
                  <p>Nous collectons les catégories de données suivantes :</p>
                  <DataTable rows={[
                    { category: "Données d'identité", examples: "Nom, prénom" },
                    { category: "Coordonnées", examples: "Email, téléphone, adresse postale" },
                    { category: "Données de commande", examples: "Articles commandés, configuration, montant, historique" },
                    { category: "Données de paiement", examples: "Type de carte (les numéros sont traités uniquement par Stripe/Alma)" },
                    { category: "Données de navigation", examples: "Adresse IP, type de navigateur, pages visitées (anonymisé)" },
                    { category: "Communications", examples: "Messages envoyés via le formulaire de contact" },
                  ]} />
                  <p className="mt-4">
                    Nous ne collectons pas de données sensibles (origines raciales, opinions politiques, données de santé, etc.).
                  </p>
                </div>
              </section>

              <Divider />

              {/* Section 2 */}
              <section id="finalites" className="scroll-mt-28">
                <SectionHeader number="02" title="Finalités du traitement" />
                <div className="prose-content">
                  <p>Vos données sont traitées pour les finalités suivantes :</p>
                  <ul className="mt-4 space-y-3">
                    {[
                      { base: "Exécution du contrat", purpose: "Traitement et suivi des commandes, fabrication, expédition" },
                      { base: "Exécution du contrat", purpose: "Communication sur l'avancement de la fabrication" },
                      { base: "Obligation légale", purpose: "Facturation et archivage comptable (10 ans)" },
                      { base: "Intérêt légitime", purpose: "Amélioration du service, analyse des préférences client" },
                      { base: "Consentement", purpose: "Newsletter et communications marketing (sur opt-in explicite)" },
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 p-3 bg-warm-gray-light rounded-sm border border-border/50">
                        <span className="font-body text-[10px] uppercase tracking-wider text-gold bg-cream border border-gold/20 rounded-sm px-2 py-0.5 h-fit flex-shrink-0 mt-0.5">
                          {item.base}
                        </span>
                        <p className="font-body text-[13px] text-ink-light">{item.purpose}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <Divider />

              {/* Section 3 */}
              <section id="cookies" className="scroll-mt-28">
                <SectionHeader number="03" title="Cookies" />
                <div className="prose-content">
                  <p>Nous utilisons les types de cookies suivants :</p>
                  <div className="mt-4 space-y-4">
                    <CookieCard
                      type="Strictement nécessaires"
                      color="success"
                      description="Session, panier, authentification. Ces cookies ne peuvent pas être refusés car ils sont indispensables au fonctionnement du site."
                      examples="session_id, cart_token, auth_token"
                      duration="Session ou 30 jours"
                    />
                    <CookieCard
                      type="Analytiques"
                      color="gold"
                      description="Mesure d'audience anonymisée pour améliorer l'expérience utilisateur. Activés uniquement avec votre consentement."
                      examples="_ga, _gid (Google Analytics anonymisé)"
                      duration="13 mois maximum"
                    />
                    <CookieCard
                      type="Marketing"
                      color="error"
                      description="Nous n'utilisons pas de cookies publicitaires ou de pistage inter-sites."
                      examples="Aucun"
                      duration="N/A"
                    />
                  </div>
                  <p className="mt-4">
                    Vous pouvez configurer vos préférences de cookies à tout moment via les paramètres de votre navigateur ou notre bannière de consentement.
                  </p>
                </div>
              </section>

              <Divider />

              {/* Section 4 */}
              <section id="partage" className="scroll-mt-28">
                <SectionHeader number="04" title="Partage avec des tiers" />
                <div className="prose-content">
                  <p>
                    Maison Attar ne vend jamais vos données personnelles. Nous partageons certaines données avec des prestataires de service dans le cadre strict de l'exécution de vos commandes :
                  </p>
                  <div className="mt-4 space-y-3">
                    <ThirdPartyRow
                      name="Stripe"
                      purpose="Traitement des paiements par carte bancaire"
                      link="https://stripe.com/fr/privacy"
                      certified="PCI DSS Niveau 1"
                    />
                    <ThirdPartyRow
                      name="Alma"
                      purpose="Paiement en plusieurs fois"
                      link="https://almapay.com/fr/politique-de-confidentialite"
                      certified="ACPR"
                    />
                    <ThirdPartyRow
                      name="Transporteurs logistiques"
                      purpose="Livraison (nom, adresse, téléphone uniquement)"
                      link=""
                      certified=""
                    />
                    <ThirdPartyRow
                      name="Vercel / Railway"
                      purpose="Hébergement de l'infrastructure (accès technique uniquement)"
                      link="https://vercel.com/legal/privacy-policy"
                      certified="ISO 27001"
                    />
                  </div>
                  <p className="mt-4">
                    Aucune de ces communications n'est effectuée hors Union Européenne sans garanties appropriées (clauses contractuelles types, Privacy Shield ou équivalent).
                  </p>
                </div>
              </section>

              <Divider />

              {/* Section 5 */}
              <section id="droits" className="scroll-mt-28">
                <SectionHeader number="05" title="Vos droits (RGPD)" />
                <div className="prose-content">
                  <p>
                    Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
                  </p>
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { right: "Droit d'accès", desc: "Obtenir une copie de vos données" },
                      { right: "Droit de rectification", desc: "Corriger des données inexactes" },
                      { right: "Droit à l'effacement", desc: "Supprimer vos données (« droit à l'oubli »)" },
                      { right: "Droit à la portabilité", desc: "Recevoir vos données dans un format structuré" },
                      { right: "Droit d'opposition", desc: "Vous opposer à certains traitements" },
                      { right: "Droit de limitation", desc: "Limiter le traitement dans certains cas" },
                    ].map((item) => (
                      <div key={item.right} className="p-4 bg-warm-gray-light border border-border rounded-sm">
                        <p className="font-body text-[12px] font-medium text-ink mb-1">{item.right}</p>
                        <p className="font-body text-[11px] text-ink-muted">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4">
                    Pour exercer ces droits, contactez notre DPO à l'adresse <a href="mailto:privacy@maisonattar.com" className="text-gold hover:text-gold-dark transition-colors">privacy@maisonattar.com</a>. Nous nous engageons à répondre dans un délai d'un mois.
                  </p>
                  <p>
                    Si vous estimez que vos droits n'ont pas été respectés, vous pouvez introduire une réclamation auprès de la <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) sur{" "}
                    <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark transition-colors">
                      cnil.fr
                    </a>.
                  </p>
                </div>
              </section>

              <Divider />

              {/* Section 6 */}
              <section id="retention" className="scroll-mt-28">
                <SectionHeader number="06" title="Conservation des données" />
                <div className="prose-content">
                  <DataTable rows={[
                    { category: "Données de commande", examples: "10 ans (obligation comptable)" },
                    { category: "Données client (compte)", examples: "3 ans après la dernière activité" },
                    { category: "Données de navigation", examples: "13 mois maximum (anonymisées)" },
                    { category: "Emails marketing", examples: "3 ans après le dernier consentement" },
                    { category: "Demandes de contact", examples: "1 an après la résolution" },
                  ]} headers={["Type de données", "Durée de conservation"]} />
                  <p className="mt-4">
                    À l'expiration de ces délais, les données sont supprimées de manière sécurisée ou anonymisées de façon irréversible.
                  </p>
                </div>
              </section>

              <Divider />

              {/* Section 7 */}
              <section id="securite" className="scroll-mt-28">
                <SectionHeader number="07" title="Sécurité" />
                <div className="prose-content">
                  <p>
                    Maison Attar met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, divulgation, altération ou destruction :
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      "Chiffrement HTTPS (TLS 1.3) sur l'intégralité du site",
                      "Chiffrement des données au repos (AES-256)",
                      "Accès aux données limité aux personnels habilités",
                      "Authentification renforcée pour les accès administrateurs",
                      "Sauvegardes chiffrées quotidiennes",
                      "Aucun numéro de carte bancaire stocké sur nos serveurs (délégué à Stripe)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 text-gold mt-0.5" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="font-body text-[13px] text-ink-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <Divider />

              {/* Section 8 */}
              <section id="dpo" className="scroll-mt-28">
                <SectionHeader number="08" title="Contact DPO" />
                <div className="prose-content">
                  <p>
                    Pour toute question relative à vos données personnelles ou pour exercer vos droits, vous pouvez contacter notre Délégué à la Protection des Données (DPO) :
                  </p>
                  <div className="mt-6 p-6 bg-warm-gray-light border border-border rounded-sm">
                    <p className="font-body text-[13px] font-medium text-ink mb-4">Délégué à la Protection des Données</p>
                    <div className="space-y-2">
                      <p className="font-body text-[13px] text-ink-light">
                        Email :{" "}
                        <a href="mailto:privacy@maisonattar.com" className="text-gold hover:text-gold-dark transition-colors">
                          privacy@maisonattar.com
                        </a>
                      </p>
                      <p className="font-body text-[13px] text-ink-light">
                        Courrier : Maison Attar SARL — DPO, Médina de Fès, Maroc
                      </p>
                      <p className="font-body text-[13px] text-ink-light">
                        Délai de réponse : 30 jours maximum
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer links */}
              <div className="pt-8 border-t border-border flex flex-wrap gap-4">
                <Link
                  href="/cgv"
                  className="inline-flex items-center gap-2 font-body text-[12px] tracking-[0.1em] uppercase text-ink-muted hover:text-ink transition-colors duration-200"
                >
                  <span className="block w-4 h-px bg-current" />
                  CGV
                </Link>
                <Link
                  href="/mentions-legales"
                  className="inline-flex items-center gap-2 font-body text-[12px] tracking-[0.1em] uppercase text-ink-muted hover:text-ink transition-colors duration-200"
                >
                  <span className="block w-4 h-px bg-current" />
                  Mentions légales
                </Link>
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

function DataTable({
  rows,
  headers = ["Catégorie", "Exemples"],
}: {
  rows: { category: string; examples: string }[];
  headers?: [string, string];
}) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="font-body text-[10px] uppercase tracking-[0.15em] text-ink-muted pb-2 pr-4 font-medium">{headers[0]}</th>
            <th className="font-body text-[10px] uppercase tracking-[0.15em] text-ink-muted pb-2 font-medium">{headers[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/40">
              <td className="font-body text-[13px] text-ink py-3 pr-4 font-medium w-1/2">{row.category}</td>
              <td className="font-body text-[13px] text-ink-light py-3">{row.examples}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CookieCard({
  type,
  color,
  description,
  examples,
  duration,
}: {
  type: string;
  color: "success" | "gold" | "error";
  description: string;
  examples: string;
  duration: string;
}) {
  const colorMap = {
    success: "bg-success/10 border-success/30 text-success",
    gold: "bg-gold/10 border-gold/30 text-gold",
    error: "bg-error/10 border-error/30 text-error",
  };
  return (
    <div className="p-4 bg-warm-gray-light border border-border rounded-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className={`font-body text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm border font-medium ${colorMap[color]}`}>
          {type}
        </span>
      </div>
      <p className="font-body text-[13px] text-ink-light mb-2">{description}</p>
      <p className="font-body text-[11px] text-ink-muted">
        <span className="font-medium text-ink-light">Exemples :</span> {examples} ·{" "}
        <span className="font-medium text-ink-light">Durée :</span> {duration}
      </p>
    </div>
  );
}

function ThirdPartyRow({
  name,
  purpose,
  link,
  certified,
}: {
  name: string;
  purpose: string;
  link: string;
  certified: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-warm-gray-light border border-border/50 rounded-sm">
      <div>
        <p className="font-body text-[13px] font-medium text-ink">{name}</p>
        <p className="font-body text-[12px] text-ink-muted">{purpose}</p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {certified && (
          <span className="font-body text-[10px] text-success bg-success/10 border border-success/20 rounded-sm px-2 py-0.5">
            {certified}
          </span>
        )}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[11px] text-gold hover:text-gold-dark transition-colors"
          >
            Politique
          </a>
        )}
      </div>
    </div>
  );
}
