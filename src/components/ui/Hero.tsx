'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';

export default function Hero() {
    const t = useTranslations('Index');
    const tCommon = useTranslations('Common');

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
            {/* Background decoration */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full filter blur-[100px] animate-pulse delay-700"></div>
            </div>

            <div className="container mx-auto px-4 z-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight"
                >
                    {t('hero_title').split(' ')[0]}<br />
                    <span className="text-secondary">{t('hero_title').split(' ').slice(1).join(' ')}</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    {t('hero_subtitle')}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-row justify-center gap-4"
                >
                    <Link
                        href="/#contact"
                        className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-primary/40 flex items-center justify-center group"
                    >
                        {tCommon('consult')}
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                    <Link
                        href="/solutions"
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center"
                    >
                        探索解决方案
                    </Link>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
                <Link href="/#about">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}
