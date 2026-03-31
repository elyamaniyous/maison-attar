import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Maison Attar',
    short_name: 'Attar',
    description:
      'Maison Attar crée des pièces de décoration en zellige marocain et acier forgé, nées de la rencontre entre l\'héritage artisanal de Fès et une sensibilité contemporaine.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF7',
    theme_color: '#FAFAF7',
    lang: 'fr',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
