import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import CaseDetailClient from '@/components/ui/client/CaseDetailClient';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: 'Cases' });

    const title = t(`items.${slug}.title`);
    const description = t(`items.${slug}.desc`);

    if (!title) return { title: 'Not Found' };

    return {
        title,
        description,
        openGraph: {
            title: title,
            description: description,
            type: 'article',
            locale,
        }
    };
}

export default async function CaseDetail({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: 'Cases' });
    const tCommon = await getTranslations({ locale, namespace: 'Common' });

    const getCaseImage = (slug: string) => {
        const images: Record<string, string> = {
            'manufacturing-quality-control': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
            'smart-retail-recommendation': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
            'predictive-maintenance-wind-farm': 'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=1200&q=80',
            'fintech-risk-assessment': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
            'logistics-route-optimization': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
            'precision-agriculture-yield': 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1200&q=80',
            'smart-education-personalized': 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80',
            'smart-grid-management': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
            'real-estate-valuation-ai': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
            'media-sentiment-analysis': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
            'hotel-guest-experience': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
            'drone-powerline-inspection': 'https://images.unsplash.com/photo-1506941433945-99a2aa4bd50a?auto=format&fit=crop&w=1200&q=80'
        };
        return images[slug] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80';
    };

    const caseData = {
        title: t(`items.${slug}.title`),
        client: t(`items.${slug}.client`),
        category: t(`items.${slug}.category`),
        challenge: t(`items.${slug}.challenge`),
        solution: t(`items.${slug}.solution`),
        results: t.raw(`items.${slug}.results`),
        features: t.raw(`items.${slug}.features`),
        image: getCaseImage(slug)
    };

    if (!caseData.title) {
        notFound();
    }

    return (
        <CaseDetailClient
            caseData={caseData}
        />
    );
}
