import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center">

      {/* Zellige-inspired decorative element */}
      <div className="relative mb-12" aria-hidden="true">
        <ZelligePattern />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-7xl md:text-8xl text-ink/5 font-light select-none">
            404
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="animate-fade-up max-w-md">
        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold mb-4">
          Maison Attar
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-4">
          Page introuvable
        </h1>
        <p className="font-body text-ink-muted text-base leading-relaxed mb-10">
          Cette page n&apos;existe pas ou a été déplacée. Comme une tesselle égarée — elle a simplement trouvé une autre place.
        </p>

        {/* Navigation links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            href="/collection"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-ink text-cream font-body text-[12px] tracking-[0.15em] uppercase hover:bg-gold transition-colors duration-300"
          >
            Découvrir la collection
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-ink font-body text-[12px] tracking-[0.15em] uppercase hover:border-ink transition-colors duration-200"
          >
            Accueil
          </Link>
        </div>

        {/* Quick links */}
        <div className="flex items-center justify-center gap-6">
          {[
            { label: "Collection", href: "/collection" },
            { label: "FAQ", href: "/faq" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-[11px] tracking-[0.1em] uppercase text-ink-muted hover:text-ink transition-colors duration-200 link-underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── Zellige-inspired decorative pattern ─────────────────────────────────────

function ZelligePattern() {
  // A simplified grid of zellige-style geometric shapes
  const size = 240;
  const tile = 30;
  const cols = size / tile;
  const rows = size / tile;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="opacity-20"
      aria-hidden="true"
    >
      <defs>
        <pattern id="zellige-tile" x="0" y="0" width={tile} height={tile} patternUnits="userSpaceOnUse">
          {/* Star-like zellige motif */}
          <polygon
            points={`${tile / 2},2 ${tile - 2},${tile / 2} ${tile / 2},${tile - 2} 2,${tile / 2}`}
            fill="none"
            stroke="#C4A265"
            strokeWidth="0.8"
          />
          <polygon
            points={`${tile / 2},6 ${tile - 6},${tile / 2} ${tile / 2},${tile - 6} 6,${tile / 2}`}
            fill="#C4A265"
            fillOpacity="0.3"
            stroke="none"
          />
          <circle cx={tile / 2} cy={tile / 2} r="2" fill="#C4A265" fillOpacity="0.6" />
          {/* Corner accents */}
          <rect x="0" y="0" width="3" height="3" fill="#C4A265" fillOpacity="0.15" />
          <rect x={tile - 3} y="0" width="3" height="3" fill="#C4A265" fillOpacity="0.15" />
          <rect x="0" y={tile - 3} width="3" height="3" fill="#C4A265" fillOpacity="0.15" />
          <rect x={tile - 3} y={tile - 3} width="3" height="3" fill="#C4A265" fillOpacity="0.15" />
        </pattern>
        <radialGradient id="zellige-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="70%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect width={size} height={size} fill="url(#zellige-tile)" />
      <rect width={size} height={size} fill="url(#zellige-fade)" />
    </svg>
  );
}
