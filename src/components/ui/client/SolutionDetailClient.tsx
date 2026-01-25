'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { AdBanner } from '@/components/ads';

export default function SolutionDetailClient({
    solution,
}: {
    solution: {
        id: string;
        title: string;
        desc: string;
        benefit: string;
        features: string[];
    };
}) {
    const t = useTranslations('Solutions');
    const tCommon = useTranslations('Common');

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-dark pt-32 pb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] rounded-full -mr-20 -mt-20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <Link
                            href="/solutions"
                            className="text-primary font-medium mb-6 flex items-center hover:underline"
                        >
                            ← {tCommon('solutions')}
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            {solution.title}
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            {solution.desc}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-dark mb-8">{tCommon('cases_title')}</h2>
                            <div className="grid grid-cols-1 gap-6">
                                {solution.features && solution.features.map((feature: string, index: number) => (
                                    <div key={index} className="flex items-center p-6 bg-light rounded-2xl border border-gray-100">
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <span className="text-lg text-gray-700 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-dark p-12 rounded-3xl text-white relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <ArrowRight size={120} />
                            </div>
                            <div className="relative z-10">
                                <div className="text-primary font-bold mb-4">Highlight Benefit</div>
                                <h3 className="text-3xl font-bold mb-6">{solution.benefit}</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    {solution.desc}
                                </p>
                                <button className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all">
                                    {tCommon('consult')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 广告位: 内容和CTA之间 */}
            <AdBanner position="between-sections" />

            {/* CTA Section */}
            <section className="py-24 bg-light">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-dark mb-6">{t('cta_title')}</h2>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        {t('cta_subtitle')}
                    </p>
                    <Link
                        href="/contact"
                        className="bg-primary text-white px-12 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-primary/20 transition-all inline-block"
                    >
                        {t('cta_button')}
                    </Link>
                </div>
            </section>
        </main>
    );
}
