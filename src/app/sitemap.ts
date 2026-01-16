/**
 * Sitemap - Für SEO
 * Wird von Google gecrawlt
 */

import { MetadataRoute } from 'next'
import { getAllCategories } from '@/server/actions'
import { BASE_URL } from '@/config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: categories = [] } = await getAllCategories()

  const categoryRoutes = categories.map((cat) => ({
    url: `${BASE_URL}/verzeichnis?kategorie=${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/verzeichnis`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/unternehmen-registrieren`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...categoryRoutes,
  ]
}
