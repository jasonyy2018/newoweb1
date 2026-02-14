import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
    title: 'Privacy Policy | WSAI',
    description: 'Learn how WSAI collects, uses, and protects your personal information. Our privacy policy details our data practices, cookie usage, and your rights.',
};

export default function PrivacyPage() {
    const t = useTranslations('Privacy');

    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold mb-4 text-dark">{t('title')}</h1>
                <p className="text-gray-500 mb-12">{t('lastUpdated')}: 2026-02-14</p>

                <div className="prose prose-lg text-gray-600 max-w-none space-y-10">
                    {/* Section 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.intro.title')}</h2>
                        <p>{t('sections.intro.content')}</p>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.collection.title')}</h2>
                        <p className="mb-4">{t('sections.collection.content')}</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>{t('sections.collection.items.personal')}</li>
                            <li>{t('sections.collection.items.usage')}</li>
                            <li>{t('sections.collection.items.device')}</li>
                            <li>{t('sections.collection.items.cookies')}</li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.usage.title')}</h2>
                        <p className="mb-4">{t('sections.usage.content')}</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>{t('sections.usage.items.services')}</li>
                            <li>{t('sections.usage.items.communication')}</li>
                            <li>{t('sections.usage.items.improvement')}</li>
                            <li>{t('sections.usage.items.analytics')}</li>
                            <li>{t('sections.usage.items.legal')}</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.cookies.title')}</h2>
                        <p className="mb-4">{t('sections.cookies.content')}</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>{t('sections.cookies.items.essential')}</li>
                            <li>{t('sections.cookies.items.analytics')}</li>
                            <li>{t('sections.cookies.items.advertising')}</li>
                            <li>{t('sections.cookies.items.preferences')}</li>
                        </ul>
                        <p className="mt-4">{t('sections.cookies.manage')}</p>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.advertising.title')}</h2>
                        <p className="mb-4">{t('sections.advertising.content')}</p>
                        <p>{t('sections.advertising.optOut')}</p>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.sharing.title')}</h2>
                        <p className="mb-4">{t('sections.sharing.content')}</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>{t('sections.sharing.items.serviceProviders')}</li>
                            <li>{t('sections.sharing.items.legal')}</li>
                            <li>{t('sections.sharing.items.business')}</li>
                            <li>{t('sections.sharing.items.consent')}</li>
                        </ul>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.retention.title')}</h2>
                        <p>{t('sections.retention.content')}</p>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.security.title')}</h2>
                        <p>{t('sections.security.content')}</p>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.rights.title')}</h2>
                        <p className="mb-4">{t('sections.rights.content')}</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>{t('sections.rights.items.access')}</li>
                            <li>{t('sections.rights.items.correction')}</li>
                            <li>{t('sections.rights.items.deletion')}</li>
                            <li>{t('sections.rights.items.optOut')}</li>
                            <li>{t('sections.rights.items.portability')}</li>
                        </ul>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.children.title')}</h2>
                        <p>{t('sections.children.content')}</p>
                    </section>

                    {/* Section 11 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.international.title')}</h2>
                        <p>{t('sections.international.content')}</p>
                    </section>

                    {/* Section 12 */}
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('sections.changes.title')}</h2>
                        <p>{t('sections.changes.content')}</p>
                    </section>

                    {/* Section 13 */}
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
