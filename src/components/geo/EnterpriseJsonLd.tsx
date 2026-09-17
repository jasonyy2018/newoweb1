import React from 'react';

export interface BreadcrumbItem {
    name: string;
    url: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface ServiceSchemaProps {
    name: string;
    description: string;
    serviceType: string;
    providerName?: string;
    url: string;
    image?: string;
    offers?: {
        price?: string;
        priceCurrency?: string;
    };
}

export interface ArticleSchemaProps {
    headline: string;
    description: string;
    url: string;
    datePublished: string;
    dateModified?: string;
    authorName: string;
    image?: string;
    keywords?: string[];
}

export interface CaseStudySchemaProps {
    title: string;
    client: string;
    industry: string;
    challenge: string;
    solution: string;
    url: string;
    datePublished?: string;
    image?: string;
    results?: Array<{ label: string; value: string; desc?: string }>;
}

export interface EnterpriseJsonLdProps {
    type?: 'organization' | 'service' | 'article' | 'case-study';
    siteUrl?: string;
    breadcrumbs?: BreadcrumbItem[];
    faqs?: FAQItem[];
    service?: ServiceSchemaProps;
    article?: ArticleSchemaProps;
    caseStudy?: CaseStudySchemaProps;
}

const DEFAULT_SITE_URL = 'https://www.wisdomitc.com';

export default function EnterpriseJsonLd({
    type,
    siteUrl = DEFAULT_SITE_URL,
    breadcrumbs,
    faqs,
    service,
    article,
    caseStudy,
}: EnterpriseJsonLdProps) {
    const schemas: object[] = [];

    // 1. BreadcrumbList Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((crumb, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                name: crumb.name,
                item: crumb.url.startsWith('http') ? crumb.url : `${siteUrl}${crumb.url}`,
            })),
        });
    }

    // 2. FAQPage Schema (Core GEO element for AI Search Engines & LLM Q&A)
    if (faqs && faqs.length > 0) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                },
            })),
        });
    }

    // 3. Service / Enterprise AI Solution Schema
    if (type === 'service' && service) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.name,
            serviceType: service.serviceType,
            description: service.description,
            url: service.url.startsWith('http') ? service.url : `${siteUrl}${service.url}`,
            image: service.image,
            provider: {
                '@type': 'Organization',
                name: service.providerName || 'WSAI (Wisdom ITC)',
                url: siteUrl,
                logo: `${siteUrl}/logo.png`,
            },
            areaServed: 'Global',
            termsOfService: `${siteUrl}/terms`,
        });
    }

    // 4. TechArticle / BlogPosting Schema (For Blog & Insights)
    if (type === 'article' && article) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: article.headline,
            description: article.description,
            url: article.url.startsWith('http') ? article.url : `${siteUrl}${article.url}`,
            image: article.image || `${siteUrl}/logo.png`,
            datePublished: article.datePublished,
            dateModified: article.dateModified || article.datePublished,
            author: {
                '@type': 'Person',
                name: article.authorName || 'WSAI Technical Research Team',
            },
            publisher: {
                '@type': 'Organization',
                name: 'WSAI',
                url: siteUrl,
                logo: {
                    '@type': 'ImageObject',
                    url: `${siteUrl}/logo.png`,
                },
            },
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': article.url.startsWith('http') ? article.url : `${siteUrl}${article.url}`,
            },
            keywords: article.keywords?.join(', '),
        });
    }

    // 5. Case Study Schema (CreativeWork / Article with Quantified Outcomes)
    if (type === 'case-study' && caseStudy) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: caseStudy.title,
            description: `${caseStudy.challenge} Solution: ${caseStudy.solution}`,
            url: caseStudy.url.startsWith('http') ? caseStudy.url : `${siteUrl}${caseStudy.url}`,
            image: caseStudy.image || `${siteUrl}/logo.png`,
            author: {
                '@type': 'Organization',
                name: 'WSAI Solutions Engineering',
                url: siteUrl,
            },
            publisher: {
                '@type': 'Organization',
                name: 'WSAI',
                url: siteUrl,
                logo: {
                    '@type': 'ImageObject',
                    url: `${siteUrl}/logo.png`,
                },
            },
            about: {
                '@type': 'Thing',
                name: `${caseStudy.industry} - Client: ${caseStudy.client}`,
            },
        });
    }

    if (schemas.length === 0) return null;

    return (
        <>
            {schemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </>
    );
}
