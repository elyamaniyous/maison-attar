import type { Metadata } from "next";
import Link from "next/link";
import { maalems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Les Maalems | Maison Attar",
  description:
    "Rencontrez les maîtres artisans de Fès qui créent chaque pièce Maison Attar. Hassan Bensouda, Youssef El Ouali, Driss Aït Taleb, Mohammed Cherkaoui — des lignées de savoir-faire transmis de génération en génération.",
  openGraph: {
    title: "Les Maalems | Maison Attar",
    description:
      "Quatre maîtres artisans de Fès, quatre approches du zellige et de l'acier. La main derrière chaque pièce.",
  },
};

export default function MaalemsPage() {
  return (
    <div className="bg-cream text-ink">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-36 overflow-hidden">
        {/* Subtle background grid */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <polygon points="50,5 95,27 95,73 50,95 5,73 5,27" fill="none" stroke="#C4A265" strokeWidth="0.8" />
                <circle cx="50" cy="50" r="6" fill="none" stroke="#C4A265" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-10 animate-fade-up">
              <div className="w-8 h-px bg-gold" />
              <span className="font-body text-gold text-[11px] tracking-[0.4em] uppercase">
                Maison Attar — Les Artisans
              </span>
            </div>

            <h1 className="font-display italic text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] tracking-tight mb-8 animate-fade-up delay-100">
              Les Maalems
            </h1>

            <p className="font-display text-[clamp(1.1rem,2.5vw,1.6rem)] text-gold mb-10 animate-fade-up delay-200">
              Maîtres artisans de Fès
            </p>

            <div className="max-w-2xl animate-fade-up delay-300">
              <p className="font-body text-ink-light text-[1.0625rem] leading-[1.85]">
                À Fès, le titre de <em>maalem</em> ne se décrète pas. Il s'acquiert après des années d'apprentissage auprès d'un autre maalem, après des milliers de carreaux taillés, après que la main a appris ce que l'esprit ne peut pas enseigner. C'est un titre de confiance — donné par les pairs, reconnu par la médina.
              </p>
              <p className="font-body text-ink-light text-[1.0625rem] leading-[1.85] mt-4">
                Chaque pièce Maison Attar porte le nom de son maalem. Ce n'est pas un détail marketing — c'est la promesse d'une traçabilité absolue, d'une responsabilité portée jusqu'au bout.
              </p>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-px mt-16 bg-border max-w-2xl animate-fade-up delay-400">
              {[
                { value: String(maalems.length), label: "Maalems" },
                { value: `${Math.round(maalems.reduce((a, m) => a + m.yearsExperience, 0) / maalems.length)} ans`, label: "Expérience moyenne" },
                { value: `${maalems.reduce((a, m) => a + m.piecesCreated, 0).toLocaleString("fr-FR")}`, label: "Pièces créées" },
              ].map((s) => (
                <div key={s.label} className="bg-cream py-6 px-6">
                  <p className="font-display text-[2rem] text-ink leading-none mb-1">{s.value}</p>
                  <p className="font-body text-ink-muted text-[10px] tracking-[0.2em] uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Maalems ──────────────────────────────────────────────────────────── */}
      <div>
        {maalems.map((maalem, index) => {
          const isEven = index % 2 === 0;
          return (
            <article
              key={maalem.id}
              className={`py-20 md:py-32 border-t border-border ${isEven ? "bg-cream" : "bg-cream-dark"}`}
            >
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ${!isEven ? "lg:grid-flow-dense" : ""}`}>

                  {/* Portrait */}
                  <div className={`animate-fade-up ${!isEven ? "lg:col-start-2" : ""}`}>
                    <Link href={`/maalems/${maalem.slug}`} className="block img-zoom group">
                      <div className="aspect-[3/4] bg-warm-gray relative overflow-hidden">
                        {/* Portrait placeholder */}
                        <div
                          className="absolute inset-0 transition-opacity duration-500"
                          style={{
                            background: index === 0
                              ? "linear-gradient(160deg, #2a1f14 0%, #5a3e28 50%, #3d2b1a 100%)"
                              : index === 1
                              ? "linear-gradient(160deg, #1a2a2a 0%, #2a4a5a 50%, #1e3a4a 100%)"
                              : index === 2
                              ? "linear-gradient(160deg, #1a2a1a 0%, #2a4a3a 50%, #1e3a2a 100%)"
                              : "linear-gradient(160deg, #1A1A1A 0%, #3a3028 50%, #2a2520 100%)",
                            opacity: 0.75,
                          }}
                        />
                        {/* Zellige SVG texture overlay */}
                        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <pattern id={`portrait-${maalem.id}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                              <polygon points="25,3 47,14 47,36 25,47 3,36 3,14" fill="none" stroke="#C4A265" strokeWidth="0.6" />
                              <circle cx="25" cy="25" r="4" fill="none" stroke="#C4A265" strokeWidth="0.4" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#portrait-${maalem.id})`} />
                        </svg>

                        {/* Portrait placeholder label */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 select-none pointer-events-none">
                          <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-40">
                              <circle cx="12" cy="8" r="4" stroke="#C4A265" strokeWidth="1" />
                              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#C4A265" strokeWidth="1" strokeLinecap="round" />
                            </svg>
                          </div>
                          <span className="font-body text-cream/30 text-[9px] tracking-[0.3em] uppercase">
                            Portrait — {maalem.name}
                          </span>
                        </div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-500" />
                      </div>
                    </Link>

                    {/* Pieces count badge */}
                    <div className="mt-6 flex items-center gap-4">
                      <div className="h-px flex-1 bg-border" />
                      <div className="flex items-center gap-2">
                        <span className="font-display text-2xl text-ink">{maalem.piecesCreated.toLocaleString("fr-FR")}</span>
                        <span className="font-body text-ink-muted text-[10px] tracking-[0.2em] uppercase">pièces créées</span>
                      </div>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`animate-fade-up delay-100 ${!isEven ? "lg:col-start-1 lg:row-start-1" : ""}`}>

                    {/* Number */}
                    <span className="font-display text-[6rem] md:text-[8rem] leading-none text-border select-none block mb-2 -ml-1">
                      0{index + 1}
                    </span>

                    {/* Name */}
                    <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight mb-3 text-ink">
                      {maalem.name}
                    </h2>

                    {/* Specialty + experience */}
                    <div className="flex flex-wrap items-center gap-3 mb-8">
                      <span className="font-body text-gold text-[11px] tracking-[0.3em] uppercase border border-gold/30 px-3 py-1.5">
                        {maalem.specialty}
                      </span>
                      <span className="font-body text-ink-muted text-[11px] tracking-[0.2em] uppercase">
                        {maalem.yearsExperience} ans de métier
                      </span>
                    </div>

                    {/* Gold accent */}
                    <div className="w-12 h-px bg-gold mb-8" />

                    {/* Bio — first paragraph only */}
                    <p className="font-body text-ink-light text-[1.0625rem] leading-[1.85] mb-10">
                      {maalem.bio.split(". ").slice(0, 3).join(". ") + "."}
                    </p>

                    {/* Quote */}
                    <blockquote className="border-l-2 border-gold pl-6 mb-10">
                      <p className="font-display italic text-[clamp(1.1rem,2.5vw,1.5rem)] leading-relaxed text-ink">
                        "{maalem.quote}"
                      </p>
                    </blockquote>

                    {/* CTA links */}
                    <div className="flex flex-wrap items-center gap-6">
                      <Link
                        href={`/maalems/${maalem.slug}`}
                        className="inline-flex items-center gap-2 bg-ink text-cream font-body text-[12px] tracking-[0.2em] uppercase px-7 py-3.5 transition-all duration-300 hover:bg-ink/80 group"
                      >
                        Portrait complet
                        <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                      <Link
                        href={`/collection?maalem=${maalem.slug}`}
                        className="link-underline font-body text-ink text-[12px] tracking-[0.15em] uppercase"
                      >
                        Voir ses créations
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── Craft note ───────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-ink relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="note-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <polygon points="40,4 76,22 76,58 40,76 4,58 4,22" fill="none" stroke="#C4A265" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#note-pattern)" />
        </svg>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div className="animate-fade-up">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="w-8 h-px bg-gold/50" />
              <span className="font-body text-gold text-[11px] tracking-[0.4em] uppercase">Engagement</span>
              <div className="w-8 h-px bg-gold/50" />
            </div>
            <h2 className="font-display italic text-cream text-[clamp(1.8rem,4vw,3.2rem)] leading-tight mb-8">
              Chaque commande est partagée avec son maalem dès la confirmation.
            </h2>
            <p className="font-body text-cream/55 text-[1.0625rem] leading-[1.85] mb-12">
              Pas de stock, pas d'entrepôt. Quand vous commandez une pièce, le maalem dont elle porte la signature commence à la tailler dans les jours qui suivent. Vous recevrez des photos à chaque étape. Votre table a une histoire — vous en ferez partie.
            </p>
            <Link
              href="/notre-histoire"
              className="link-underline font-body text-cream/60 text-sm tracking-wide"
            >
              Lire notre histoire →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
