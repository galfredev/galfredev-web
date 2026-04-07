import { env } from '@/lib/env'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/privacidad', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/terminos', priority: 0.4, changeFrequency: 'yearly' as const },
  ].map((entry) => ({
    url: `${env.siteUrl}${entry.path}`,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))
}
