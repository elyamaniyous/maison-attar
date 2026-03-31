import type { MetadataRoute } from 'next'

const BASE_URL = 'https://beautiful-charm-production-7244.up.railway.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
