/**
 * Robots.txt - Crawl-Anleitung für Suchmaschinen
 */

import { MetadataRoute } from 'next'
import { BASE_URL } from '@/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/account'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
