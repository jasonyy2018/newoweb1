'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Users, Zap, ArrowRight } from 'lucide-react';
import { AdBanner } from '@/components/ads';

export default function CaseDetailClient({
    caseData,
}: {
    caseData: {
        title: string;
        client: string;
        category: string;
        challenge: string;
        solution: string;
        results: any[];
        features: string[];
        image: string;
    };
}) {
    const t = useTranslations('Cases');
    const tCommon = useTranslations('Common');

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-dark pt-32 pb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full -mr-20 -mt-20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="max-w-4xl"
                        >
                            <div className="flex items-center space-x-4 mb-6">
                                <span className="px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-bold">
                                    {caseData.category}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                                {caseData.title}
                            </h1>
                            <div className="flex flex-wrap gap-8 text-gray-300">
                                <div className="flex items-center">
                                    <Users size={20} className="mr-2 text-primary" />
                                    <span>{t('client')}: {caseData.client}</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/3 border border-white/10"
                        >
                            <img
                                src={caseData.image}
                                alt={caseData.title}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Results Grid */}
            <section className="py-12 bg-white -mt-12 relative z-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-6">
                        {caseData.results && caseData.results.map((result: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center"
                            >
                                <div className="text-4xl font-bold text-primary mb-2">{result.value}</div>
                                <div className="text-dark font-bold mb-1">{result.label}</div>
                                <div className="text-sm text-gray-500">{result.desc}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Details */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-16">
                        <div className="lg:col-span-2 space-y-16">
                            <div>
                                <h2 className="text-3xl font-bold text-dark mb-6 flex items-center">
                                    <span className="w-8 h-1 bg-primary mr-4"></span>
                                    {t('challenge')}
                                </h2>
                                <p className="text-xl text-gray-600 leading-relaxed italic">
                                    "{caseData.challenge}"
                                </p>
                                {/* 内容中广告位 */}
                                <AdBanner position="in-content" className="mt-8" />
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-dark mb-6 flex items-center">
                                    <span className="w-8 h-1 bg-primary mr-4"></span>
                                    {t('solution')}
                                </h2>
                                <div className="text-lg text-gray-600 leading-relaxed bg-light p-8 rounded-3xl border border-gray-100">
                                    {caseData.solution}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-dark rounded-3xl p-10 text-white sticky top-32">
                                <h3 className="text-2xl font-bold mb-8 flex items-center">
                                    <Zap className="text-primary mr-3" />
                                    {t('core_tech')}
                                </h3>
                                <ul className="space-y-6">
                                    {caseData.features && caseData.features.map((feature: string, index: number) => (
                                        <li key={index} className="flex items-start">
                                            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-4 mt-1 shrink-0">
                                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                            </div>
                                            <span className="text-gray-300 font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full mt-12 bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center group hover:bg-primary/90 transition-all">
                                    {tCommon('consult')}
                                    <ArrowRight size={20} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                                </button>
                            </div>
                            {/* 侧边栏广告位 */}
                            <div className="mt-8">
                                <AdBanner position="sidebar" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
