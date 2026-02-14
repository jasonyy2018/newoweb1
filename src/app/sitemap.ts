import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.wisdomitc.com';
    const locales = ['zh', 'en', 'ja'];

    const staticPages = [
        { path: '', priority: 1, changeFrequency: 'weekly' as const },
        { path: '/solutions', priority: 0.8, changeFrequency: 'weekly' as const },
        { path: '/case-studies', priority: 0.8, changeFrequency: 'weekly' as const },
        { path: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
        { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
        { path: '/privacy', priority: 0.3, changeFrequency: 'monthly' as const },
        { path: '/terms', priority: 0.3, changeFrequency: 'monthly' as const },
        { path: '/pricing', priority: 0.8, changeFrequency: 'weekly' as const },
        { path: '/refund', priority: 0.3, changeFrequency: 'monthly' as const },
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Static pages for each locale
    locales.forEach((locale) => {
        staticPages.forEach((page) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${page.path}`,
                lastModified: new Date(),
                changeFrequency: page.changeFrequency,
                priority: page.priority,
            });
        });
    });

    // Dynamic blog article pages
    locales.forEach((locale) => {
        const articles = getAllArticles(locale);
        articles.forEach((article) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/blog/${article.slug}`,
                lastModified: new Date(article.date),
                changeFrequency: 'monthly',
                priority: 0.6,
            });
        });
    });

    // Dynamic case study pages
    const caseKeys = [
        'manufacturing-quality-control',
        'smart-retail-recommendation',
        'predictive-maintenance-wind-farm',
        'fintech-risk-assessment',
        'logistics-route-optimization',
        'precision-agriculture-yield',
        'smart-education-personalized',
        'smart-grid-management',
        'real-estate-valuation-ai',
        'media-sentiment-analysis',
        'hotel-guest-experience',
        'drone-powerline-inspection'
    ];

    locales.forEach((locale) => {
        caseKeys.forEach((slug) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/case-studies/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        });
    });

    // Dynamic solution pages
    const solutionKeys = [
        'data-analytics',
        'nlp',
        'computer-vision',
        'predictive-analytics',
        'intelligent-automation',
        'custom-ai-models'
    ];

    locales.forEach((locale) => {
        solutionKeys.forEach((slug) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/solutions/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.8,
            });
        });
    });

    return sitemapEntries;
}
