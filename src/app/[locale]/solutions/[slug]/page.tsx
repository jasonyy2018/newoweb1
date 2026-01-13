import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import SolutionDetailClient from '@/components/ui/client/SolutionDetailClient';

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

    const solution = {
        id: slug,
        title: t(`items.${slug}.title`),
        desc: t(`items.${slug}.full_desc`),
        benefit: t(`items.${slug}.benefit`),
        features: t.raw(`items.${slug}.features`)
    };

    if (!solution.title) {
        notFound();
    }

    return (
        <SolutionDetailClient
            solution={solution}
        />
    );
}
