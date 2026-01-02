import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { BarChart, MessageSquare, Eye, TrendingUp, Zap, Cpu } from 'lucide-react';

export default function SolutionsSection() {
    const t = useTranslations('Index');
    const tCommon = useTranslations('Common');

    const solutions = [
        {
            id: 'data-analytics',
            icon: BarChart,
            title: '智能数据分析',
            desc: '利用AI技术深度分析企业数据，挖掘潜在价值',
            benefit: '增强决策精准度'
        },
        {
            id: 'nlp',
            icon: MessageSquare,
            title: '自然语言处理',
            desc: '开发智能客服、文本分析等应用，提升客户体验',
            benefit: '节省 60% 人力'
        },
        {
            id: 'computer-vision',
            icon: Eye,
            title: '计算机视觉',
            desc: '实现图像识别、视频分析等功能，应用于智能制造',
            benefit: '质检准确率 99.9%'
        },
        {
            id: 'predictive-analytics',
            icon: TrendingUp,
            title: '预测性分析',
            desc: '基于历史数据预测未来趋势，帮助企业提前规划',
            benefit: '降低运营风险'
        },
        {
            id: 'intelligent-automation',
            icon: Zap,
            title: '智能自动化',
            desc: '结合RPA和AI技术，实现业务流程自动化',
            benefit: '提升 300% 效率'
        },
        {
            id: 'custom-ai-models',
            icon: Cpu,
            title: '定制化AI模型开发',
            desc: '根据企业特定需求，开发定制化AI模型',
            benefit: '100% 场景匹配'
        }
    ];

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
