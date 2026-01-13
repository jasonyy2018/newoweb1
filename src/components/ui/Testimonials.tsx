'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Testimonials() {
    const t = useTranslations('Testimonials');

    const testimonialItems = [0, 1, 2].map(i => ({
        name: t(`items.${i}.name`),
        position: t(`items.${i}.position`),
        content: t(`items.${i}.content`),
        stars: 5
    }));

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 mb-4 text-sm font-bold tracking-wider text-primary uppercase bg-primary/10 rounded-full"
                    >
                        {t('section_title')}
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonialItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-light p-8 rounded-3xl relative group hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-primary/10"
                        >
                            <Quote className="absolute top-6 right-8 text-primary/10 w-12 h-12 group-hover:text-primary/20 transition-colors" />

                            <div className="flex mb-4">
                                {[...Array(item.stars)].map((_, i) => (
                                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                                ))}
                            </div>

                            <p className="text-dark/80 italic mb-8 relative z-10">
                                "{item.content}"
                            </p>

                            <div>
                                <h4 className="font-bold text-dark">{item.name}</h4>
                                <p className="text-sm text-gray-400">{item.position}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Partner Logos Placeholder */}
                <div className="mt-20 flex flex-wrap justify-center items-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <div className="text-2xl font-black text-gray-400">CLOUD SYSTEMS</div>
                    <div className="text-2xl font-black text-gray-400">AI RESEARCH HUB</div>
                    <div className="text-2xl font-black text-gray-400">FUTURE MANUFACTURING</div>
                    <div className="text-2xl font-black text-gray-400">SMART LOGISTICS</div>
                </div>
            </div>
        </section>
    );
}
