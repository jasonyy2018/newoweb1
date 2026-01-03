import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function CaseStudiesPage() {
    const t = useTranslations('Common');
    const tCases = useTranslations('Cases');

    const cases = [
        {
            slug: 'manufacturing-quality-control',
            title: '制造业智能质检系统',
            category: '智能制造',
            desc: '为某大型制造企业开发的基于计算机视觉的智能质检系统，替代传统人工质检，提高检测精度和效率。',
            image: '/cases-manufacturing.png'
        },
        {
            slug: 'smart-retail-recommendation',
            title: '智慧零售推荐引擎',
            category: '新零售',
            desc: '利用深度学习技术分析海量用户行为数据，构建高精度的个性化推荐系统，显著提升转化率。',
            image: '/cases-retail.png'
        },
        {
            slug: 'predictive-maintenance-wind-farm',
            title: '风电场预测性维护',
            category: '新能源',
            desc: '通过传感器数据实时监控风机状态，预测潜在故障，通过AI调度优化维护成本，降低停机时间。',
            image: '/cases-wind.png'
        }
    ];

    return (
        <div className="bg-white">
            <div className="bg-dark pt-40 pb-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        {t('success')} <span className="text-primary">{t('cases_title')}</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        {tCases('hero_desc')}
                    </p>
                </div>
            </div>

            <div className="py-24 bg-light min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cases.map((item) => (
                            <Link
                                key={item.slug}
                                href={`/case-studies/${item.slug}`}
                                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 flex flex-col h-full"
                            >
                                <div className="aspect-video overflow-hidden relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                                        {item.category}
                                    </div>
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-gray-500 mb-6 line-clamp-3 text-sm flex-grow">{item.desc}</p>
                                    <span className="text-primary font-bold inline-flex items-center mt-auto">
                                        {tCases('view_more')} <span className="ml-2">→</span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
