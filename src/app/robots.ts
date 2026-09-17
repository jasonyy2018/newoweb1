import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.wisdomitc.com';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                // Explicitly permit mainstream AI search & GEO citation crawlers to index public content
                userAgent: [
                    'Googlebot',
                    'Bingbot',
                    'GPTBot',
                    'PerplexityBot',
                    'ClaudeBot',
                    'Google-Extended',
                    'Applebot',
                    'Amazonbot',
                    'cohere-ai',
                ],
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
