import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
    title: 'Refund Policy | WSAI',
    description: 'Read our refund policy for WSAI products and services. Learn about eligibility, process, and timelines for requesting a refund.',
};

export default function RefundPage() {
    const t = useTranslations('Refund');

    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold mb-4 text-dark">{t('title')}</h1>
                <p className="text-gray-500 mb-12">{t('lastUpdated')}: 2026-02-14</p>

                <div className="prose prose-lg text-gray-600 max-w-none space-y-10">
                    {/* Intro */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.intro.title')}</h2>
                        <p>{t('sections.intro.content')}</p>
                    </section>

                    {/* Eligibility */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.eligibility.title')}</h2>
                        <p className="mb-4">{t('sections.eligibility.content')}</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>{t('sections.eligibility.items.timeframe')}</li>
                            <li>{t('sections.eligibility.items.reason')}</li>
                            <li>{t('sections.eligibility.items.usage')}</li>
                        </ul>
                    </section>

                    {/* Non-Refundable */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.nonRefundable.title')}</h2>
                        <p className="mb-4">{t('sections.nonRefundable.content')}</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>{t('sections.nonRefundable.items.expired')}</li>
                            <li>{t('sections.nonRefundable.items.violation')}</li>
                            <li>{t('sections.nonRefundable.items.consumed')}</li>
                        </ul>
                    </section>

                    {/* Process */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.process.title')}</h2>
                        <p className="mb-4">{t('sections.process.content')}</p>
                        <ol className="list-decimal pl-6 space-y-2">
                            <li>{t('sections.process.steps.step1')}</li>
                            <li>{t('sections.process.steps.step2')}</li>
                            <li>{t('sections.process.steps.step3')}</li>
                        </ol>
                    </section>

                    {/* Timeline */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.timeline.title')}</h2>
                        <p>{t('sections.timeline.content')}</p>
                    </section>

                    {/* Subscription Cancellation */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.cancellation.title')}</h2>
                        <p>{t('sections.cancellation.content')}</p>
                    </section>

                    {/* Changes */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.changes.title')}</h2>
                        <p>{t('sections.changes.content')}</p>
                    </section>

                    {/* Contact */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.contact.title')}</h2>
                        <p className="mb-4">{t('sections.contact.content')}</p>
                        <div className="bg-gray-50 rounded-xl p-6 space-y-2">
                            <p><strong>Email:</strong> jyu@wisdomitc.com</p>
                            <p><strong>{t('sections.contact.company')}:</strong> WSAI (上海葳澄信息科技有限公司)</p>
                            <p><strong>{t('sections.contact.addressLabel')}:</strong> {t('sections.contact.address')}</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
