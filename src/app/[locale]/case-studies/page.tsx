'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function CaseStudiesPage() {
    const t = useTranslations('Cases');

    const caseKeys = ['manufacturing-quality-control', 'smart-retail-recommendation', 'predictive-maintenance-wind-farm'];

    const cases = caseKeys.map(slug => ({
        slug,
        title: t(`items.${slug}.title`),
        category: t(`items.${slug}.category`),
        desc: t(`items.${slug}.desc`),
        image: `/cases-${slug.split('-')[0]}.png`
    }));

    return (
        <main className="min-h-screen">
            <section className="bg-dark pt-32 pb-24 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        {t('success')} <span className="text-primary">{t('cases_title')}</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        {t('hero_desc')}
                    </p>
                </div>
            </div>

            <div className="py-24 bg-light">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {cases.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all group border border-gray-100 h-full flex flex-col"
                            >
                                <div className="aspect-[4/3] overflow-hidden relative text-left">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-primary shadow-lg uppercase tracking-wider">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 text-left flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold text-dark mb-4 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500 mb-8 line-clamp-3 leading-relaxed flex-grow">
                                        {item.desc}
                                    </p>
                                    <Link
                                        href={`/case-studies/${item.slug}`}
                                        className="inline-flex items-center font-bold text-primary group/link"
                                    >
                                        {t('view_more')}
                                        <ArrowRight size={20} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
