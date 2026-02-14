'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function CaseStudiesPage() {
    const t = useTranslations('Cases');
    const tCommon = useTranslations('Common');

    const caseKeys = [
        'manufacturing-quality-control',
        'smart-retail-recommendation',
        'predictive-maintenance-wind-farm',
        'fintech-risk-assessment',
        'logistics-route-optimization',
        'precision-agriculture-yield',
        'smart-education-personalized',
        'smart-grid-management',
        'real-estate-valuation-ai',
        'media-sentiment-analysis',
        'hotel-guest-experience',
        'drone-powerline-inspection'
    ];

    const cases = caseKeys.map(slug => {
        let image = '';
        if (slug === 'manufacturing-quality-control') image = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80';
        else if (slug === 'smart-retail-recommendation') image = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80';
        else if (slug === 'predictive-maintenance-wind-farm') image = 'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80';
        else if (slug === 'fintech-risk-assessment') image = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
        else if (slug === 'logistics-route-optimization') image = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80';
        else if (slug === 'precision-agriculture-yield') image = 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&q=80';
        else if (slug === 'smart-education-personalized') image = 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80';
        else if (slug === 'smart-grid-management') image = 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80';
        else if (slug === 'real-estate-valuation-ai') image = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';
        else if (slug === 'media-sentiment-analysis') image = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80';
        else if (slug === 'hotel-guest-experience') image = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
        else if (slug === 'drone-powerline-inspection') image = 'https://images.unsplash.com/photo-1506941433945-99a2aa4bd50a?auto=format&fit=crop&w=800&q=80';

        return {
            slug,
            title: t(`items.${slug}.title`),
            category: t(`items.${slug}.category`),
            desc: t(`items.${slug}.desc`),
            image
        };
    });

    return (
        <main className="min-h-screen">
            <section className="bg-dark pt-32 pb-24 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        {tCommon('success')} <span className="text-primary">{tCommon('cases_title')}</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        {t('hero_desc')}
                    </p>
                </div>
            </section>

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
                                <div className="aspect-4/3 overflow-hidden relative text-left">
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
                                <div className="p-8 text-left flex flex-col grow">
                                    <h3 className="text-2xl font-bold text-dark mb-4 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500 mb-8 line-clamp-3 leading-relaxed grow">
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
        </main>
    );
}
