// GeoMeta — Server Component
// Renders GEO-specific and Dublin Core meta tags for local SEO and GEO optimization.
// Add this inside <head> in the root layout.

export default function GeoMeta() {
  return (
    <>
      {/* Geographic metadata */}
      <meta name="geo.region" content="MA-FES" />
      <meta name="geo.placename" content="Fes, Morocco" />
      <meta name="geo.position" content="34.0331;-5.0003" />
      <meta name="ICBM" content="34.0331, -5.0003" />

      {/* Language */}
      <meta httpEquiv="Content-Language" content="fr" />

      {/* Dublin Core metadata */}
      <meta name="DC.title" content="Maison Attar — Zellige & Acier Artisanal" />
      <meta name="DC.creator" content="Maison Attar" />
      <meta
        name="DC.subject"
        content="zellige marocain, artisanat Fès, tables zellige, acier forgé, décoration luxe, maalems, art islamique géométrique"
      />
      <meta
        name="DC.description"
        content="Maison Attar crée des pièces de décoration en zellige marocain et acier forgé artisanal. Chaque pièce est fabriquée à la main par nos maalems à Fès, Maroc."
      />
      <meta name="DC.publisher" content="Maison Attar" />
      <meta name="DC.language" content="fr" />
      <meta name="DC.format" content="text/html" />
      <meta name="DC.type" content="InteractiveResource" />
      <meta name="DC.coverage" content="France, Europe, International" />
      <meta name="DC.rights" content="Copyright Maison Attar" />
    </>
  )
}
