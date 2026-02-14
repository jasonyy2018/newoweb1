import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
    title: 'Terms of Service | WSAI',
    description: 'Read the terms and conditions for using WSAI services and website. Understand your rights and obligations as a user.',
};

export default function TermsPage() {
    const t = useTranslations('Terms');

    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold mb-4 text-dark">{t('title')}</h1>
                <p className="text-gray-500 mb-12">{t('lastUpdated')}: 2026-02-14</p>

                <div className="prose prose-lg text-gray-600 max-w-none space-y-10">
                    {/* Section 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.acceptance.title')}</h2>
                        <p>{t('sections.acceptance.content')}</p>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.services.title')}</h2>
                        <p className="mb-4">{t('sections.services.content')}</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>{t('sections.services.items.ai')}</li>
                            <li>{t('sections.services.items.iot')}</li>
                            <li>{t('sections.services.items.software')}</li>
                            <li>{t('sections.services.items.consulting')}</li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.accounts.title')}</h2>
                        <p>{t('sections.accounts.content')}</p>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.intellectual.title')}</h2>
                        <p>{t('sections.intellectual.content')}</p>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.license.title')}</h2>
                        <p className="mb-4">{t('sections.license.content')}</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>{t('sections.license.items.modify')}</li>
                            <li>{t('sections.license.items.commercial')}</li>
                            <li>{t('sections.license.items.reverse')}</li>
                            <li>{t('sections.license.items.reproduce')}</li>
                        </ul>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.advertising.title')}</h2>
                        <p>{t('sections.advertising.content')}</p>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.prohibited.title')}</h2>
                        <p className="mb-4">{t('sections.prohibited.content')}</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>{t('sections.prohibited.items.illegal')}</li>
                            <li>{t('sections.prohibited.items.infringe')}</li>
                            <li>{t('sections.prohibited.items.interfere')}</li>
                            <li>{t('sections.prohibited.items.scrape')}</li>
                            <li>{t('sections.prohibited.items.malware')}</li>
                        </ul>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.disclaimer.title')}</h2>
                        <p>{t('sections.disclaimer.content')}</p>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.liability.title')}</h2>
                        <p>{t('sections.liability.content')}</p>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.indemnification.title')}</h2>
                        <p>{t('sections.indemnification.content')}</p>
                    </section>

                    {/* Section 11 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.thirdParty.title')}</h2>
                        <p>{t('sections.thirdParty.content')}</p>
                    </section>

                    {/* Section 12 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.governing.title')}</h2>
                        <p>{t('sections.governing.content')}</p>
                    </section>

                    {/* Section 13 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.changes.title')}</h2>
                        <p>{t('sections.changes.content')}</p>
                    </section>

                    {/* Section 14 */}
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
