import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { BarChart, MessageSquare, Eye, TrendingUp, Zap, Cpu } from 'lucide-react';

export default function SolutionsSection() {
    const t = useTranslations('Solutions');
    const tCommon = useTranslations('Common');

    const solutionKeys = [
        { id: 'data-analytics', icon: BarChart },
        { id: 'nlp', icon: MessageSquare },
        { id: 'computer-vision', icon: Eye },
        { id: 'predictive-analytics', icon: TrendingUp },
        { id: 'intelligent-automation', icon: Zap },
        { id: 'custom-ai-models', icon: Cpu }
    ];

    const solutions = solutionKeys.map(item => ({
        ...item,
        title: t(`items.${item.id}.title`),
        desc: t(`items.${item.id}.desc`),
        benefit: t(`items.${item.id}.benefit`)
    }));

    return (
        <section id="services" className="py-24 bg-light">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-dark mb-4">
                        AI <span className="text-primary">{tCommon('solutions')}</span>
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-3xl mx-auto">{t('solutions_subtitle')}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutions.map((item) => (
                        <div key={item.id} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <item.icon size={32} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-secondary/10 text-secondary px-2 py-1 rounded">
                                    {item.benefit}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                            <p className="text-gray-500 mb-6 leading-relaxed">
                                {item.desc}
                            </p>
                            <Link href={`/solutions/${item.id}`} className="text-primary font-bold hover:underline inline-flex items-center group/link">
                                {tCommon('learnMore')}
                                <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
