import Link from "next/link";

const NAVIGATION_LINKS = [
  { label: "Collection", href: "/collection" },
  { label: "Notre Histoire", href: "/notre-histoire" },
  { label: "Les Maalems", href: "/les-maalems" },
  { label: "Matières & Origines", href: "/matieres" },
  { label: "Journal", href: "/journal" },
];

const SERVICES_LINKS = [
  { label: "Livraison & Emballage", href: "/services/livraison" },
  { label: "Fabrication sur mesure", href: "/services/sur-mesure" },
  { label: "Entretien & Patine", href: "/services/entretien" },
  { label: "Questions fréquentes", href: "/faq" },
  { label: "Politique de retour", href: "/retours" },
];

export default function Footer() {
  return (
    <footer className="bg-warm-gray-light border-t border-border" aria-label="Pied de page">
      {/* Main grid */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-display text-[17px] tracking-[0.3em] font-medium text-ink uppercase hover:text-gold transition-colors duration-200 block mb-6"
            >
              MAISON ATTAR
            </Link>
            <p className="font-body text-[13px] text-ink-light leading-relaxed max-w-[260px]">
              Chaque pièce est une rencontre entre le zellige de Fès et l&apos;acier forgé à la main. Un héritage artisanal transmis de génération en génération.
            </p>
            <div className="mt-8 flex items-center gap-1">
              <span className="block w-5 h-px bg-gold" />
              <span className="block w-2 h-px bg-gold/50" />
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h3 className="font-body text-[10px] tracking-[0.2em] uppercase text-ink-muted font-medium mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-[13px] text-ink-light hover:text-ink transition-colors duration-200 link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <h3 className="font-body text-[10px] tracking-[0.2em] uppercase text-ink-muted font-medium mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-[13px] text-ink-light hover:text-ink transition-colors duration-200 link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="font-body text-[10px] tracking-[0.2em] uppercase text-ink-muted font-medium mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:atelier@maisonattar.com"
                  className="font-body text-[13px] text-ink-light hover:text-ink transition-colors duration-200 link-underline flex items-center gap-2.5"
                >
                  <IconMail />
                  atelier@maisonattar.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/maisonattar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[13px] text-ink-light hover:text-ink transition-colors duration-200 link-underline flex items-center gap-2.5"
                >
                  <IconInstagram />
                  @maisonattar
                </a>
              </li>
              <li>
                <a
                  href="https://www.pinterest.com/maisonattar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[13px] text-ink-light hover:text-ink transition-colors duration-200 link-underline flex items-center gap-2.5"
                >
                  <IconPinterest />
                  maison.attar
                </a>
              </li>
            </ul>

            {/* Newsletter teaser */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="font-body text-[11px] tracking-[0.05em] text-ink-muted mb-3">
                Recevoir les nouvelles collections en avant-première
              </p>
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.15em] uppercase text-gold hover:text-gold-dark transition-colors duration-200 font-medium"
              >
                S&apos;inscrire
                <span className="block w-4 h-px bg-current" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-[11px] text-ink-muted tracking-wide">
            &copy; {new Date().getFullYear()} Maison Attar.{" "}
            <span className="text-ink-muted/70">Tous droits réservés.</span>
          </p>

          <p className="font-body text-[11px] text-ink-muted tracking-[0.12em] uppercase">
            Fabriqué à Fès, Maroc
          </p>

          {/* Language selector placeholder */}
          <div className="flex items-center gap-3">
            <button
              className="font-body text-[11px] tracking-[0.1em] text-ink-light hover:text-ink transition-colors duration-200 uppercase font-medium"
              aria-label="Langue française — actuelle"
            >
              FR
            </button>
            <span className="text-border" aria-hidden="true">|</span>
            <button
              className="font-body text-[11px] tracking-[0.1em] text-ink-muted hover:text-ink transition-colors duration-200 uppercase"
              aria-label="Switch to English"
            >
              EN
            </button>
            <span className="text-border" aria-hidden="true">|</span>
            <button
              className="font-body text-[11px] tracking-[0.1em] text-ink-muted hover:text-ink transition-colors duration-200 uppercase"
              aria-label="التبديل إلى العربية"
            >
              AR
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function IconMail() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 text-ink-muted">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 text-ink-muted">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconPinterest() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 text-ink-muted">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.132-1.867 3.132-4.562 0-2.387-1.715-4.053-4.164-4.053-2.836 0-4.5 2.127-4.5 4.326 0 .856.33 1.773.741 2.274a.3.3 0 0 1 .069.284c-.076.311-.244.995-.277 1.134-.044.183-.146.222-.336.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  );
}
