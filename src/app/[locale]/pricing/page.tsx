import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
    title: 'Pricing | Pencil Pen Importer — WSAI',
    description: 'Explore pricing plans for the Pencil Pen Importer Figma plugin. Import .pen files into Figma with full layer, style, and layout preservation.',
};

export default function PricingPage() {
    const t = useTranslations('Pricing');

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="pt-32 pb-16 bg-linear-to-br from-dark to-primary/80 text-white">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                        Figma Plugin
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>
            </section>

            {/* Features */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-bold text-center mb-4">{t('features.title')}</h2>
                    <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">{t('features.subtitle')}</p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 rounded-2xl p-8 text-center">
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-5">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">{t('features.items.import.title')}</h3>
                            <p className="text-gray-500 text-sm">{t('features.items.import.desc')}</p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-8 text-center">
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-5">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">{t('features.items.styles.title')}</h3>
                            <p className="text-gray-500 text-sm">{t('features.items.styles.desc')}</p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-8 text-center">
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-5">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">{t('features.items.layout.title')}</h3>
                            <p className="text-gray-500 text-sm">{t('features.items.layout.desc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-bold text-center mb-4">{t('plans.title')}</h2>
                    <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">{t('plans.subtitle')}</p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        {/* Free Tier */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold mb-2">{t('plans.free.name')}</h3>
                            <div className="flex items-baseline mb-6">
                                <span className="text-4xl font-bold">{t('plans.free.price')}</span>
                            </div>
                            <p className="text-gray-500 mb-8 text-sm">{t('plans.free.desc')}</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start text-sm">
                                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {t('plans.free.features.f1')}
                                </li>
                                <li className="flex items-start text-sm">
                                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {t('plans.free.features.f2')}
                                </li>
                                <li className="flex items-start text-sm">
                                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {t('plans.free.features.f3')}
                                </li>
                            </ul>
                            <a
                                href="https://www.figma.com/community/plugin/1599984311973476904/pencil-pen-importer"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-center bg-gray-100 text-gray-800 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                {t('plans.free.cta')}
                            </a>
                        </div>

                        {/* Pro Tier */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-primary relative">
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                                {t('plans.pro.badge')}
                            </span>
                            <h3 className="text-xl font-bold mb-2">{t('plans.pro.name')}</h3>
                            <div className="flex items-baseline mb-1">
                                <span className="text-4xl font-bold">{t('plans.pro.price')}</span>
                                <span className="text-gray-400 ml-2">{t('plans.pro.period')}</span>
                            </div>
                            <p className="text-gray-500 mb-8 text-sm">{t('plans.pro.desc')}</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start text-sm">
                                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {t('plans.pro.features.f1')}
                                </li>
                                <li className="flex items-start text-sm">
                                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {t('plans.pro.features.f2')}
                                </li>
                                <li className="flex items-start text-sm">
                                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {t('plans.pro.features.f3')}
                                </li>
                                <li className="flex items-start text-sm">
                                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {t('plans.pro.features.f4')}
                                </li>
                                <li className="flex items-start text-sm">
                                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {t('plans.pro.features.f5')}
                                </li>
                            </ul>
                            <a
                                href="https://www.figma.com/community/plugin/1599984311973476904/pencil-pen-importer"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-center bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                            >
                                {t('plans.pro.cta')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold text-center mb-12">{t('faq.title')}</h2>
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="font-bold mb-2">{t('faq.items.q1.q')}</h3>
                            <p className="text-gray-600 text-sm">{t('faq.items.q1.a')}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="font-bold mb-2">{t('faq.items.q2.q')}</h3>
                            <p className="text-gray-600 text-sm">{t('faq.items.q2.a')}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="font-bold mb-2">{t('faq.items.q3.q')}</h3>
                            <p className="text-gray-600 text-sm">{t('faq.items.q3.a')}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="font-bold mb-2">{t('faq.items.q4.q')}</h3>
                            <p className="text-gray-600 text-sm">{t('faq.items.q4.a')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
