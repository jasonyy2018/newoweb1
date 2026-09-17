import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import SolutionDetailClient from '@/components/ui/client/SolutionDetailClient';
import EnterpriseJsonLd from '@/components/geo/EnterpriseJsonLd';
import { getGeoSolution } from '@/lib/geo/geoData';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: 'Solutions' });

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

export default async function SolutionDetail({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: 'Solutions' });
    const tCommon = await getTranslations({ locale, namespace: 'Common' });

    const getSolutionImage = (slug: string) => {
        const images: Record<string, string> = {
            'data-analytics': 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
            'nlp': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
            'computer-vision': 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80',
            'predictive-analytics': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
            'intelligent-automation': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
            'custom-ai-models': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80'
        };
        return images[slug] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80';
    };

    const solution = {
        id: slug,
        title: t(`items.${slug}.title`),
        desc: t(`items.${slug}.full_desc`),
        benefit: t(`items.${slug}.benefit`),
        features: t.raw(`items.${slug}.features`),
        image: getSolutionImage(slug)
    };

    if (!solution.title) {
        notFound();
    }

    const geo = getGeoSolution(slug, locale);

    return (
        <>
            <EnterpriseJsonLd
                type="service"
                breadcrumbs={[
                    { name: 'Home', url: `/${locale}` },
                    { name: tCommon('solutions'), url: `/${locale}/solutions` },
                    { name: solution.title, url: `/${locale}/solutions/${slug}` },
                ]}
                service={{
                    name: solution.title,
                    description: solution.desc,
                    serviceType: 'Enterprise Artificial Intelligence Solution',
                    url: `/${locale}/solutions/${slug}`,
                    image: solution.image,
                }}
                faqs={geo?.faqs || []}
            />
            <SolutionDetailClient
                solution={solution}
                geo={geo}
                locale={locale}
            />
        </>
    );
}
