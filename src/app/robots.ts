import type { MetadataRoute } from 'next'
import { site } from '@/site.config'

// AI vyhledávače povolujeme explicitně kvůli viditelnosti v AI search
const AI_CRAWLERS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  }
}
