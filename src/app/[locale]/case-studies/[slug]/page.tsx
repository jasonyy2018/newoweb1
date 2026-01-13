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

    const caseData = {
        title: t(`items.${slug}.title`),
        client: t(`items.${slug}.client`),
        category: t(`items.${slug}.category`),
        challenge: t(`items.${slug}.challenge`),
        solution: t(`items.${slug}.solution`),
        results: t.raw(`items.${slug}.results`),
        features: t.raw(`items.${slug}.features`)
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
