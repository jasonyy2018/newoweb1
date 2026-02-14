import { useTranslations } from 'next-intl';
import AboutSection from '@/components/ui/AboutSection';
import PageHeader from '@/components/layout/PageHeader';

export default function AboutPage() {
    const t = useTranslations('Index');

    return (
        <main>
            <PageHeader
                title={t('about_title')}
                description={t('about_desc')}
            />
            <AboutSection />

            <section className="py-20 bg-light">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">{t('mission_title')}</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {t('mission_desc')}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-2xl shadow-sm">
                                <h3 className="text-xl font-bold mb-4">Our Values</h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                                        Innovation-driven solutions
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                                        Customer-centric approach
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                                        Technical excellence
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-sm">
                                <h3 className="text-xl font-bold mb-4">Our Vision</h3>
                                <p className="text-gray-600">
                                    To be the global leader in AI and IoT integration, empowering businesses to thrive in the digital age through intelligent automation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
