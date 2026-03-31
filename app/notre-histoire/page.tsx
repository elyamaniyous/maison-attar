import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notre Histoire | Maison Attar",
  description:
    "L'histoire de Maison Attar : le zellige de Fès, l'acier forgé à la main, et la rencontre de deux matières qui se défient et se complètent depuis le Xe siècle.",
  openGraph: {
    title: "Notre Histoire | Maison Attar",
    description:
      "Née dans la médina de Fès, Maison Attar porte l'héritage du zellige et de la forge dans des pièces conçues pour durer.",
  },
};

export default function NotreHistoirePage() {
  return (
    <div className="bg-cream text-ink">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[92vh] min-h-[600px] flex items-end overflow-hidden">
        {/* Image placeholder — Fes medina aerial */}
        <div className="absolute inset-0 bg-ink">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "linear-gradient(135deg, #2a1f14 0%, #1A1A1A 40%, #3d2b1a 100%)",
            }}
          />
          {/* Geometric zellige-inspired pattern overlay */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="zellige-hero"
                x="0"
                y="0"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <polygon
                  points="40,4 76,22 76,58 40,76 4,58 4,22"
                  fill="none"
                  stroke="#C4A265"
                  strokeWidth="0.8"
                />
                <polygon
                  points="40,16 64,28 64,52 40,64 16,52 16,28"
                  fill="none"
                  stroke="#C4A265"
                  strokeWidth="0.5"
                />
                <circle cx="40" cy="40" r="4" fill="#C4A265" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#zellige-hero)" />
          </svg>
          {/* Photographic placeholder label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none opacity-10">
            <span className="font-body text-cream text-xs tracking-[0.3em] uppercase">
              Médina de Fès — photographie
            </span>
          </div>
        </div>

        {/* Gradient overlay bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-28">
          <div className="animate-fade-up">
            <p className="font-body text-gold text-xs tracking-[0.4em] uppercase mb-6">
              Maison Attar
            </p>
            <h1 className="font-display italic text-cream text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-tight mb-8">
              Notre Histoire
            </h1>
            <p className="font-body text-cream/70 text-lg md:text-xl max-w-lg leading-relaxed">
              À Fès, dans la médina la plus ancienne du monde
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 right-12 flex flex-col items-center gap-3 opacity-40 animate-fade-in delay-600">
            <span className="font-body text-cream text-[10px] tracking-[0.3em] uppercase rotate-90 origin-center translate-y-4">
              Lire
            </span>
            <div className="w-px h-16 bg-cream/60" />
          </div>
        </div>
      </section>

      {/* ── Section: L'Attar ─────────────────────────────────────────────────── */}
      <section className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-16 md:mb-24 animate-fade-up">
            <div className="w-8 h-px bg-gold" />
            <span className="font-body text-gold text-[11px] tracking-[0.4em] uppercase">
              I — L'Attar
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: text */}
            <div className="animate-fade-up">
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-tight mb-10 text-ink">
                Le nom d'une lignée
              </h2>

              <div className="space-y-6 font-body text-ink-light text-[1.0625rem] leading-[1.8] max-w-prose">
                <p>
                  Dans le souk Attarine de Fès — le souk des épices et des parfums, l'un des plus anciens marchés du monde — l'<em>attar</em> désigne le marchand de senteurs. Celui qui tient dans ses tiroirs de bois sombre la cannelle du Sahara, le musc d'Arabie, l'eau de rose de Kelaa, le benjoin du Soudan. L'attar ne vend pas ce que tout le monde a.
                </p>
                <p>
                  Ce nom, nous l'avons choisi pour ce qu'il porte : une exigence de rareté, une promesse de singularité, et cette idée que chaque matière a une âme qu'il faut savoir révéler. Nous faisons du mobilier ce que l'attar fait des essences — nous cherchons l'extraordinaire dans l'élémentaire, la beauté dans ce qui résiste à la reproduction.
                </p>
                <p>
                  Maison Attar est née d'une conviction : que le zellige de Fès et l'acier forgé à la main sont deux matières qui, ensemble, peuvent créer des objets d'une présence rare. Des pièces qui ne vieillissent pas — elles se patinent. Des pièces que l'on transmet.
                </p>
              </div>

              {/* Pull quote */}
              <div className="mt-16 border-l-2 border-gold pl-8">
                <blockquote className="font-display italic text-[clamp(1.4rem,3vw,2.2rem)] leading-tight text-ink">
                  "L'attar ne vend pas ce que tout le monde a."
                </blockquote>
                <cite className="mt-4 block font-body text-ink-muted text-[11px] tracking-[0.3em] uppercase not-italic">
                  Philosophie fondatrice
                </cite>
              </div>
            </div>

            {/* Right: image placeholder */}
            <div className="lg:mt-12 animate-fade-up delay-200">
              <div className="img-zoom aspect-[4/5] bg-warm-gray relative overflow-hidden">
                {/* Decorative placeholder */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(160deg, #C4A265/10 0%, #E8E4DE 50%, #D4B87A/20 100%)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-20 select-none pointer-events-none">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path
                      d="M24 4L44 15V33L24 44L4 33V15L24 4Z"
                      stroke="#C4A265"
                      strokeWidth="1"
                      fill="none"
                    />
                    <path
                      d="M24 12L36 19V31L24 38L12 31V19L24 12Z"
                      stroke="#C4A265"
                      strokeWidth="0.5"
                      fill="none"
                    />
                  </svg>
                  <span className="font-body text-ink-muted text-[10px] tracking-[0.3em] uppercase">
                    Souk Attarine — Fès
                  </span>
                </div>
                {/* Subtle zellige pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="zellige-attar" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <rect x="2" y="2" width="16" height="16" fill="none" stroke="#C4A265" strokeWidth="0.5" transform="rotate(45 10 10)" />
                      <rect x="22" y="22" width="16" height="16" fill="none" stroke="#C4A265" strokeWidth="0.5" transform="rotate(45 30 30)" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#zellige-attar)" />
                </svg>
              </div>

              {/* Caption */}
              <p className="mt-4 font-body text-ink-muted text-[11px] tracking-[0.2em] uppercase">
                Souk des épices, médina de Fès
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gold divider ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="w-full h-px bg-border" />
      </div>

      {/* ── Section: Le Zellige ──────────────────────────────────────────────── */}
      <section className="py-28 md:py-40 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-16 md:mb-24 animate-fade-up">
            <div className="w-8 h-px bg-gold" />
            <span className="font-body text-gold text-[11px] tracking-[0.4em] uppercase">
              II — Le Zellige
            </span>
          </div>

          {/* Heading */}
          <div className="max-w-4xl mb-16 animate-fade-up">
            <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-tight mb-4 text-ink">
              Zellige de Fès
            </h2>
            <p className="font-display italic text-gold text-[clamp(1.1rem,2.5vw,1.6rem)]">
              Terre cuite émaillée depuis le X<sup>e</sup> siècle
            </p>
          </div>

          {/* Text content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
            <div className="space-y-6 font-body text-ink-light text-[1.0625rem] leading-[1.8] animate-fade-up">
              <p>
                Le zellige est né à Fès. Pas à Marrakech, pas à Casablanca — à Fès, dans les ateliers qui longent la rivière Oued Fès, à quelques dizaines de mètres des grandes madrasas qui ont enseigné les mathématiques islamiques pendant mille ans. Ce voisinage n'est pas accidentel : le zellige est de la géométrie appliquée à la terre.
              </p>
              <p>
                Le procédé est resté inchangé depuis le X<sup>e</sup> siècle. Une argile argileuse extraite des collines autour de Fès est façonnée en carreaux plats, cuits une première fois, puis émaillée à la main dans des bains de couleur — cobalt pour le bleu, oxyde de chrome pour le vert, oxyde de manganèse pour le noir. Une deuxième cuisson, entre 960 et 1 020 degrés, fixe l'émail et lui donne son éclat.
              </p>
            </div>
            <div className="space-y-6 font-body text-ink-light text-[1.0625rem] leading-[1.8] animate-fade-up delay-100">
              <p>
                Vient ensuite la taille à la <em>marteline</em> — un petit marteau au tranchant acéré, hérité du vocabulaire des tailleurs de pierre. Le maalem retourne le carreau, côté émaillé contre son genou, et frappe. Le geste se répète des milliers de fois par jour. Il faut des années pour que la main apprenne à doser la force, à suivre le fil de la fracture, à obtenir l'angle précis que le motif exige.
              </p>
              <p>
                Ce que l'industrie ne peut pas reproduire, c'est cette légère irrégularité de chaque pièce — les variations infimes de taille, la légère ondulation de la surface émaillée, les transitions de teinte d'un carreau à l'autre. C'est l'imperfection constitutive du zellige qui le rend vivant. L'œil ne se lasse pas d'une surface que la main a faite.
              </p>
            </div>
          </div>

          {/* 3-column photo grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-20 animate-fade-up delay-200">
            {[
              { label: "La marteline — outil de taille", aspect: "aspect-[3/4]" },
              { label: "Pose du zellige — joints de ciment", aspect: "aspect-[3/4] md:mt-12" },
              { label: "Détail émail — Bleu de Fès", aspect: "aspect-[3/4]" },
            ].map((item, i) => (
              <div key={i} className={item.aspect}>
                <div className="img-zoom h-full bg-warm-gray relative overflow-hidden group">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: i === 0
                        ? "linear-gradient(160deg, #3d2b1a 0%, #C4A265 100%)"
                        : i === 1
                        ? "linear-gradient(200deg, #1a3a4a 0%, #2d6a8a 100%)"
                        : "linear-gradient(140deg, #2a3d2a 0%, #4a7a5a 100%)",
                      opacity: 0.35,
                    }}
                  />
                  <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`z-grid-${i}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                        <polygon points="15,2 28,9 28,21 15,28 2,21 2,9" fill="none" stroke="#C4A265" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#z-grid-${i})`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-5 select-none pointer-events-none">
                    <span className="font-body text-cream/50 text-[9px] tracking-[0.25em] uppercase">
                      {item.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stat */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 p-10 md:p-14 bg-ink animate-fade-up delay-300">
            <div className="shrink-0">
              <span className="font-display text-[clamp(4rem,10vw,8rem)] leading-none text-gold">
                7
              </span>
            </div>
            <div>
              <p className="font-display italic text-cream/90 text-[clamp(1.5rem,3vw,2.2rem)] leading-tight mb-3">
                siècles de tradition
              </p>
              <p className="font-body text-cream/50 text-sm leading-relaxed max-w-lg">
                Le zellige fassien est inscrit au patrimoine culturel immatériel de l'UNESCO. Sa technique, ses formes, ses couleurs sont transmises de maalem à apprenti depuis le XIV<sup>e</sup> siècle. Pas un brevet. Pas un logiciel. Une mémoire vivante.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Section: L'Acier ─────────────────────────────────────────────────── */}
      <section className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-16 md:mb-24 animate-fade-up">
            <div className="w-8 h-px bg-gold" />
            <span className="font-body text-gold text-[11px] tracking-[0.4em] uppercase">
              III — L'Acier
            </span>
          </div>

          {/* Opposite split: image left, text right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: image placeholder */}
            <div className="animate-fade-up order-2 lg:order-1">
              <div className="img-zoom aspect-[4/5] bg-warm-gray relative overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, #1A1A1A 0%, #3a3530 60%, #2a2520 100%)",
                    opacity: 0.7,
                  }}
                />
                {/* Steel texture SVG */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="steel-pattern" x="0" y="0" width="60" height="4" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="2" x2="60" y2="2" stroke="#C4A265" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#steel-pattern)" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-20 select-none pointer-events-none">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <rect x="4" y="24" width="48" height="8" stroke="#C4A265" strokeWidth="1" />
                    <rect x="24" y="4" width="8" height="48" stroke="#C4A265" strokeWidth="1" />
                    <circle cx="28" cy="28" r="6" stroke="#C4A265" strokeWidth="0.8" />
                  </svg>
                  <span className="font-body text-cream/40 text-[10px] tracking-[0.3em] uppercase">
                    Forge — atelier Fès
                  </span>
                </div>
              </div>
              <p className="mt-4 font-body text-ink-muted text-[11px] tracking-[0.2em] uppercase">
                Pliage et soudure TIG — médina de Fès
              </p>
            </div>

            {/* Right: text */}
            <div className="animate-fade-up delay-100 order-1 lg:order-2">
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-tight mb-10 text-ink">
                Acier Forgé
              </h2>

              <div className="space-y-6 font-body text-ink-light text-[1.0625rem] leading-[1.8] max-w-prose mb-12">
                <p>
                  L'acier arrive dans nos ateliers sous forme de barres et de tubes bruts. Il n'y a pas de moule, pas de catalogue. Chaque base est dessinée spécifiquement pour la dalle de zellige qu'elle doit porter — ses dimensions, son poids, son centre de gravité.
                </p>
                <p>
                  Le forgeron plie l'acier à froid, mesure, coupe, ajuste. La soudure TIG — une technique de précision empruntée à l'aéronautique — assemble les pièces sans bourrelet apparent. Le meulage efface les traces de joint. La finition, selon la pièce, est soit martelée à la main pour laisser apparaître le travail, soit lisse et traitée contre l'oxydation.
                </p>
                <p>
                  L'acier est ce que le zellige n'est pas : il courbe sans casser, absorbe les chocs, porte des charges que la terre cuite ne pourrait jamais tenir. Les deux matières se complètent comme deux tempéraments opposés qui s'équilibrent.
                </p>
              </div>

              {/* Contrast quote */}
              <div className="p-8 border border-border bg-warm-gray-light">
                <p className="font-display italic text-ink text-[clamp(1.1rem,2.5vw,1.6rem)] leading-relaxed">
                  "Robuste là où le zellige est fragile. Froid là où la terre cuite est chaude."
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-px mt-8 bg-border">
                {[
                  { value: "TIG", label: "Soudure de précision" },
                  { value: "100%", label: "Fait à la main" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-cream py-8 px-6">
                    <p className="font-display text-[2.2rem] text-ink leading-none mb-1">
                      {stat.value}
                    </p>
                    <p className="font-body text-ink-muted text-[11px] tracking-[0.2em] uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section: La Tension des Matières ─────────────────────────────────── */}
      <section className="py-28 md:py-48 bg-ink overflow-hidden relative">
        {/* Background pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="zellige-dark" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <polygon points="60,6 114,33 114,87 60,114 6,87 6,33" fill="none" stroke="#C4A265" strokeWidth="1" />
              <polygon points="60,24 96,42 96,78 60,96 24,78 24,42" fill="none" stroke="#C4A265" strokeWidth="0.5" />
              <circle cx="60" cy="60" r="8" fill="none" stroke="#C4A265" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#zellige-dark)" />
        </svg>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">

          {/* Section label */}
          <div className="flex items-center justify-center gap-4 mb-16 md:mb-20 animate-fade-up">
            <div className="w-8 h-px bg-gold/60" />
            <span className="font-body text-gold text-[11px] tracking-[0.4em] uppercase">
              IV — La Tension des Matières
            </span>
            <div className="w-8 h-px bg-gold/60" />
          </div>

          <div className="animate-fade-up delay-100">
            <h2 className="font-display italic text-cream text-[clamp(2rem,6vw,5rem)] leading-[1.1] mb-12">
              Millénaire et contemporain,<br />
              fragile et robuste,<br />
              chaud et froid.
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-6 font-body text-cream/60 text-[1.0625rem] leading-[1.9] animate-fade-up delay-200">
            <p>
              Le zellige et l'acier ne se ressemblent pas. L'un est millénaire, l'autre industriel. L'un est fragile à l'impact, l'autre résiste à la torsion. L'un absorbe la chaleur et l'humidité des saisons, l'autre reste froid sous la main.
            </p>
            <p>
              C'est précisément cette tension qui nous intéresse. Pas la fusion, pas le compromis — la tension maintenue. Chaque pièce Maison Attar est une conversation entre deux matières qui se défient et se complètent. On pose la main sur le zellige, on sent sa température, ses légères aspérités. On pose la main sur l'acier, et c'est une autre histoire.
            </p>
            <p>
              Ensemble, ils créent quelque chose qu'aucun des deux ne pourrait créer seul : un objet qui a à la fois la mémoire du temps et l'exactitude du présent.
            </p>
          </div>

          {/* Gold accent line */}
          <div className="flex items-center justify-center gap-6 mt-16 animate-fade-up delay-300">
            <div className="w-16 h-px bg-gold/40" />
            <div className="w-2 h-2 rounded-full bg-gold" />
            <div className="w-16 h-px bg-gold/40" />
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="animate-fade-up">
            <p className="font-body text-gold text-[11px] tracking-[0.4em] uppercase mb-6">
              Maison Attar
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-tight mb-6 text-ink max-w-2xl mx-auto">
              Chaque pièce porte l'histoire que vous venez de lire
            </h2>
            <p className="font-body text-ink-muted text-lg max-w-lg mx-auto mb-12 leading-relaxed">
              Taillée à la main, forgée à la main. Signée par un maalem. Conçue pour être transmise.
            </p>

            <Link
              href="/collection"
              className="inline-flex items-center gap-3 bg-ink text-cream font-body text-[13px] tracking-[0.2em] uppercase px-10 py-4 transition-all duration-300 hover:bg-ink/80 group"
            >
              Découvrir la collection
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* Secondary link */}
            <div className="mt-8">
              <Link
                href="/maalems"
                className="link-underline font-body text-ink-muted text-sm tracking-wide"
              >
                Rencontrer les maalems →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
