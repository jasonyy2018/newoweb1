'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lightbulb, ShieldCheck, Target, Handshake, Users, Calendar } from 'lucide-react';
import { AdBanner } from '@/components/ads';

const valueIcons: Record<string, typeof Lightbulb> = {
    innovation: Lightbulb,
    trust: ShieldCheck,
    impact: Target,
    partnership: Handshake,
};

export default function AboutPage() {
    const t = useTranslations('About');

    const valueKeys = ['innovation', 'trust', 'impact', 'partnership'];
    const team = t.raw('team') as { name: string; role: string; bio: string }[];
    const milestones = t.raw('milestones') as { year: string; event: string }[];

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-dark pt-32 pb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[150px] rounded-full -mr-40 -mt-40"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-secondary/10 blur-[120px] rounded-full -ml-20 mb-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            {t('hero_title')}
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            {t('hero_subtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Company Story Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-primary font-bold text-sm uppercase tracking-widest">
                                {t('story_label')}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-dark mt-3 mb-8 leading-tight">
                                {t('story_title')}
                            </h2>
                            <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                                <p>{t('story_p1')}</p>
                                <p>{t('story_p2')}</p>
                                <p className="font-medium text-gray-800">{t('story_p3')}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-4/3">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                                    alt="WSAI team collaboration"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-2xl shadow-xl hidden md:flex flex-col items-center">
                                <div className="text-4xl font-bold">50+</div>
                                <div className="text-sm opacity-80 mt-1">AI Projects</div>
                            </div>
                            <div className="absolute -top-4 -right-4 bg-dark text-white p-5 rounded-2xl shadow-xl hidden md:flex flex-col items-center">
                                <div className="text-3xl font-bold">98%</div>
                                <div className="text-sm opacity-80 mt-1">Satisfaction</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-24 bg-light">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-primary font-bold text-sm uppercase tracking-widest">
                            {t('values_label')}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-dark mt-3">
                            {t('values_title')}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {valueKeys.map((key, i) => {
                            const Icon = valueIcons[key];
                            return (
                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100"
                                >
                                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 mb-6">
                                        <Icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-dark mb-3">
                                        {t(`values.${key}.title`)}
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        {t(`values.${key}.desc`)}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <AdBanner position="between-sections" />

            {/* Team Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-primary font-bold text-sm uppercase tracking-widest">
                            {t('team_label')}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-dark mt-3 mb-4">
                            {t('team_title')}
                        </h2>
                        <p className="text-gray-500 text-lg">{t('team_desc')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="text-center group"
                            >
                                <div className="w-28 h-28 mx-auto bg-linear-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                                    <Users size={40} className="text-primary" />
                                </div>
                                <h3 className="text-lg font-bold text-dark mb-1">{member.name}</h3>
                                <p className="text-primary font-semibold text-sm mb-3">{member.role}</p>
                                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Milestones Timeline Section */}
            <section className="py-24 bg-dark relative overflow-hidden">
                <div className="absolute top-0 left-1/2 w-px h-full bg-white/10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-primary font-bold text-sm uppercase tracking-widest">
                            {t('milestones_label')}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
                            {t('milestones_title')}
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-0">
                        {milestones.map((ms, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.5 }}
                                className={`flex items-center gap-6 py-6 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} md:${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                    <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300">
                                        <div className="text-primary font-bold text-lg mb-1">{ms.year}</div>
                                        <p className="text-gray-300 text-sm">{ms.event}</p>
                                    </div>
                                </div>
                                <div className="w-4 h-4 bg-primary rounded-full shrink-0 ring-4 ring-primary/20"></div>
                                <div className="flex-1"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-light">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-dark mb-6">{t('cta_title')}</h2>
                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                            {t('cta_desc')}
                        </p>
                        <Link
                            href="/contact"
                            className="bg-primary text-white px-12 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-primary/20 transition-all inline-block"
                        >
                            {t('cta_button')}
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
