import { MetadataRoute } from 'next'

const siteUrl = 'https://gracepharmacy.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/products', '/contact']

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.7,
  }))
}
