import type { MetadataRoute } from 'next'
import { getProducts, getMaalems } from '@/db/helpers'

const BASE_URL = 'https://beautiful-charm-production-7244.up.railway.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const [products, maalems] = await Promise.all([getProducts(), getMaalems()])

  // ── Static pages ────────────────────────────────────────────────────────────

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/collection`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/notre-histoire`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/configurateur`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/maalems`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/livraison`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/entretien`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/cgv`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politique-confidentialite`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // ── Dynamic product pages ───────────────────────────────────────────────────

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/collection/${product.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // ── Dynamic maalem pages ────────────────────────────────────────────────────

  const maalemPages: MetadataRoute.Sitemap = maalems.map((maalem) => ({
    url: `${BASE_URL}/maalems/${maalem.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...productPages, ...maalemPages]
}
