import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions Légales | Maison Attar",
  description: "Mentions légales de Maison Attar SARL — informations sur l'éditeur, l'hébergeur et la propriété intellectuelle.",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="pt-24 pb-12 px-6 md:px-12 lg:px-20 border-b border-border">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-gold font-body mb-4">
            Maison Attar — Légal
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight mb-4">
            Mentions Légales
          </h1>
          <p className="font-body text-sm text-ink-muted">
            Dernière mise à jour : 1er janvier 2025
          </p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-3xl space-y-14">

          {/* Éditeur */}
          <section>
            <SectionHeader title="Éditeur du site" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InfoRow label="Raison sociale" value="Maison Attar SARL" />
              <InfoRow label="Forme juridique" value="SARL (Société à Responsabilité Limitée)" />
              <InfoRow label="Siège social" value="Médina de Fès, Maroc" />
              <InfoRow label="Capital social" value="200 000 MAD" />
              <InfoRow label="RCS Maroc" value="RC Fès n° 12345 B" />
              <InfoRow label="ICE" value="002345678900012" />
              <InfoRow label="N° TVA Intracommunautaire" value="MA 0023456789" />
              <InfoRow label="Directeur de publication" value="Youssef Attar" />
              <InfoRow label="Email" value="contact@maisonattar.com" isEmail />
              <InfoRow label="Téléphone" value="+212 5XX XX XX XX" />
            </div>
          </section>

          <Divider />

          {/* Hébergement */}
          <section>
            <SectionHeader title="Hébergement" />
            <p className="font-body text-sm text-ink-light leading-relaxed mb-6">
              Le site maisonattar.com est hébergé par les prestataires suivants :
            </p>
            <div className="space-y-5">
              <HostingCard
                name="Vercel Inc."
                role="Hébergement de l'application web"
                address="340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis"
                website="https://vercel.com"
              />
              <HostingCard
                name="Railway Corp."
                role="Infrastructure back-end et base de données"
                address="548 Market St, San Francisco, CA 94104, États-Unis"
                website="https://railway.app"
              />
            </div>
          </section>

          <Divider />

          {/* Propriété intellectuelle */}
          <section>
            <SectionHeader title="Propriété intellectuelle" />
            <div className="prose-content">
              <p>
                L'ensemble du contenu de ce site (textes, photographies, vidéos, illustrations, logotypes, noms de marque, typographies et éléments graphiques) est la propriété exclusive de Maison Attar SARL ou de ses partenaires, et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication, adaptation ou exploitation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est strictement interdite sans autorisation écrite préalable de Maison Attar SARL.
              </p>
              <p>
                Les photographies des pièces et des ateliers sont réalisées par Maison Attar. Les images des maalems en situation de travail sont utilisées avec leur consentement explicite.
              </p>
            </div>
          </section>

          <Divider />

          {/* Cookies */}
          <section>
            <SectionHeader title="Cookies" />
            <div className="prose-content">
              <p>
                Le site maisonattar.com utilise des cookies techniques strictement nécessaires au fonctionnement du site (session, panier, préférences de langue) et des cookies analytiques pour mesurer l'audience (via des outils anonymisés, sans transfert de données personnelles identifiables).
              </p>
              <p>
                Aucun cookie publicitaire ou de pistage inter-sites n'est déposé sans votre consentement explicite. Vous pouvez configurer votre navigateur pour refuser les cookies, ce qui peut affecter certaines fonctionnalités du site.
              </p>
              <p>
                Pour en savoir plus sur nos pratiques en matière de cookies et données personnelles, consultez notre{" "}
                <Link href="/politique-confidentialite" className="text-gold hover:text-gold-dark transition-colors">
                  Politique de Confidentialité
                </Link>.
              </p>
            </div>
          </section>

          <Divider />

          {/* Liens hypertextes */}
          <section>
            <SectionHeader title="Liens hypertextes" />
            <div className="prose-content">
              <p>
                Le site maisonattar.com peut contenir des liens vers d'autres sites internet. Maison Attar n'exerce aucun contrôle sur ces sites tiers et décline toute responsabilité quant à leur contenu ou leurs pratiques en matière de données personnelles.
              </p>
              <p>
                Tout lien hypertexte vers maisonattar.com doit faire l'objet d'une autorisation préalable écrite de Maison Attar SARL.
              </p>
            </div>
          </section>

          <Divider />

          {/* Droit applicable */}
          <section>
            <SectionHeader title="Droit applicable" />
            <div className="prose-content">
              <p>
                Les présentes mentions légales sont soumises au droit français. En cas de litige relatif à leur interprétation, les tribunaux compétents sont ceux du ressort du siège social de Maison Attar, sauf dispositions légales contraires.
              </p>
            </div>
          </section>

          {/* Back links */}
          <div className="pt-6 border-t border-border flex flex-wrap gap-4">
            <Link
              href="/cgv"
              className="inline-flex items-center gap-2 font-body text-[12px] tracking-[0.1em] uppercase text-ink-muted hover:text-ink transition-colors duration-200"
            >
              <span className="block w-4 h-px bg-current" />
              Conditions Générales de Vente
            </Link>
            <Link
              href="/politique-confidentialite"
              className="inline-flex items-center gap-2 font-body text-[12px] tracking-[0.1em] uppercase text-ink-muted hover:text-ink transition-colors duration-200"
            >
              <span className="block w-4 h-px bg-current" />
              Politique de Confidentialité
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="font-display text-2xl md:text-3xl text-ink leading-tight mb-6">
      {title}
    </h2>
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

function InfoRow({
  label,
  value,
  isEmail,
}: {
  label: string;
  value: string;
  isEmail?: boolean;
}) {
  return (
    <div className="py-3 border-b border-border/50">
      <p className="font-body text-[10px] uppercase tracking-[0.15em] text-ink-muted mb-1">{label}</p>
      {isEmail ? (
        <a href={`mailto:${value}`} className="font-body text-[13px] text-gold hover:text-gold-dark transition-colors">
          {value}
        </a>
      ) : (
        <p className="font-body text-[13px] text-ink">{value}</p>
      )}
    </div>
  );
}

function HostingCard({
  name,
  role,
  address,
  website,
}: {
  name: string;
  role: string;
  address: string;
  website: string;
}) {
  return (
    <div className="p-5 bg-warm-gray-light border border-border rounded-sm">
      <div className="flex items-start justify-between gap-4 mb-3">
        <p className="font-body text-[13px] font-medium text-ink">{name}</p>
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-[11px] text-gold hover:text-gold-dark transition-colors flex items-center gap-1.5 flex-shrink-0"
        >
          Site web
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>
      </div>
      <p className="font-body text-[12px] text-ink-muted mb-1">{role}</p>
      <p className="font-body text-[12px] text-ink-light">{address}</p>
    </div>
  );
}
