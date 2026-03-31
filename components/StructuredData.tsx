import type { Product } from '@/lib/types'

const BASE_URL = 'https://beautiful-charm-production-7244.up.railway.app'
const SITE_NAME = 'Maison Attar'

// ── Organization ──────────────────────────────────────────────────────────────

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: 'Maison Attar Zellige',
    description:
      "Maison Attar crée des pièces de décoration en zellige marocain et acier forgé artisanal, nées de la rencontre entre l'héritage des maalems de Fès et une sensibilité contemporaine.",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    image: `${BASE_URL}/images/og-image.jpg`,
    email: 'contact@maisonattar.com',
    foundingDate: '2020',
    foundingLocation: {
      '@type': 'Place',
      name: 'Fès, Maroc',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Fès',
        addressCountry: 'MA',
      },
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Médina de Fès',
      addressLocality: 'Fès',
      postalCode: '30000',
      addressCountry: 'MA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@maisonattar.com',
      contactType: 'customer service',
      availableLanguage: ['French', 'Arabic'],
    },
    sameAs: [
      'https://www.instagram.com/maisonattar',
      'https://www.pinterest.com/maisonattar',
    ],
    founder: {
      '@type': 'Person',
      name: 'Maison Attar',
      jobTitle: 'Fondateur',
    },
    knowsAbout: [
      'Zellige marocain',
      'Artisanat de Fès',
      'Tables en zellige',
      'Acier forgé artisanal',
      'Décoration intérieure de luxe',
      'Maalems',
      'Art islamique géométrique',
    ],
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── WebSite ───────────────────────────────────────────────────────────────────

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: 'Maison Attar — Zellige & Acier Artisanal',
    url: BASE_URL,
    description:
      'Boutique en ligne de pièces de décoration en zellige marocain et acier forgé artisanal de Fès.',
    inLanguage: 'fr-FR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/collection?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── LocalBusiness ─────────────────────────────────────────────────────────────

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Store'],
    name: SITE_NAME,
    description:
      'Atelier et boutique de zellige marocain artisanal et mobilier en acier forgé. Pièces uniques créées par des maalems à Fès, Maroc.',
    url: BASE_URL,
    email: 'contact@maisonattar.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Médina de Fès',
      addressLocality: 'Fès',
      addressRegion: 'Fès-Meknès',
      postalCode: '30000',
      addressCountry: 'MA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.0331,
      longitude: -5.0003,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
    priceRange: 'EEE',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Credit Card, Bank Transfer',
    hasMap: 'https://maps.google.com/?q=Fes+Medina+Morocco',
    image: `${BASE_URL}/images/og-image.jpg`,
    sameAs: [
      'https://www.instagram.com/maisonattar',
      'https://www.pinterest.com/maisonattar',
    ],
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── Product ───────────────────────────────────────────────────────────────────

export function ProductSchema({ product }: { product: Product }) {
  const nextYear = new Date()
  nextYear.setFullYear(nextYear.getFullYear() + 1)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: `${BASE_URL}/collection/${product.slug}`,
    image: product.images.map((img) =>
      img.startsWith('http') ? img : `${BASE_URL}${img}`
    ),
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    manufacturer: {
      '@type': 'Organization',
      name: SITE_NAME,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Fès',
        addressCountry: 'MA',
      },
    },
    material: [product.materials.zellige, product.materials.base].join(', '),
    countryOfOrigin: {
      '@type': 'Country',
      name: 'Morocco',
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/collection/${product.slug}`,
      priceCurrency: 'EUR',
      price: product.price,
      priceValidUntil: nextYear.toISOString().split('T')[0],
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: BASE_URL,
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Heures de fabrication',
        value: product.fabricationHours,
        unitCode: 'HUR',
      },
      {
        '@type': 'PropertyValue',
        name: 'Dimensions',
        value: `${product.dimensions.width} x ${product.dimensions.depth} x ${product.dimensions.height} cm`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Poids',
        value: product.dimensions.weight,
        unitCode: 'KGM',
      },
      {
        '@type': 'PropertyValue',
        name: 'Artisan',
        value: product.maalem.name,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── Breadcrumb ────────────────────────────────────────────────────────────────

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; href: string }[]
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href.startsWith('http')
        ? item.href
        : `${BASE_URL}${item.href}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── Article ───────────────────────────────────────────────────────────────────

export function ArticleSchema({
  article,
}: {
  article: {
    title: string
    description: string
    slug: string
    datePublished: string
    dateModified?: string
    image?: string
  }
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: `${BASE_URL}/journal/${article.slug}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    image: article.image
      ? article.image.startsWith('http')
        ? article.image
        : `${BASE_URL}${article.image}`
      : `${BASE_URL}/images/og-image.jpg`,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/journal/${article.slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

export function FAQSchema({
  items,
}: {
  items: { question: string; answer: string }[]
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── CollectionPage ────────────────────────────────────────────────────────────

export function CollectionPageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Collection Maison Attar — Zellige & Acier Artisanal',
    description:
      "Découvrez la collection complète de tables en zellige marocain et acier forgé de Maison Attar. Tables basses, tables à manger, consoles — chaque pièce est unique, créée à la main par nos maalems à Fès.",
    url: `${BASE_URL}/collection`,
    inLanguage: 'fr-FR',
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
    about: {
      '@type': 'Thing',
      name: 'Zellige marocain artisanal',
      description:
        'Art traditionnel marocain de mosaïque en terre cuite émaillée, transmis depuis le XIVe siècle dans la médina de Fès.',
    },
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
