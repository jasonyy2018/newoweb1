const CASE_DATA = {
    'manufacturing-quality-control': {
        title: '制造业智能质检系统',
        client: '某大型精密零件制造企业',
        challenge: '传统人工质检效率低下，主观因素影响检测精度，且随着产能提升，质检成为生产瓶颈。',
        solution: '基于深度学习的计算机视觉质检方案，多工位自动采集图像，边缘端实时推理，实现毫秒级响应。',
        results: [
            { label: '检测精度', value: '99.9%', desc: '替代了原有的人工抽检' },
            { label: '效率提升', value: '300%', desc: '大幅减少了生产线等待时间' },
            { label: '成本降低', value: '60%', desc: '降低了质检环节的人力成本' }
        ],
        features: ['工业级图像采集系统', '定制化缺陷检测模型', '实时预警 with 数据统计', '无缝对接现有生产系统'],
        image: '/cases-manufacturing.png'
    },
    'smart-retail-recommendation': {
        title: '智慧零售推荐引擎',
        client: '某知名快消品牌',
        challenge: '品牌线上商城用户流量大但转化率低，传统的人工运营推荐方式无法实现千人千面的个性化服务。',
        solution: '构建基于深度强化学习的推荐系统，整合用户历史行为、实时浏览路径与库存状态，实时生成最优推荐列表任务。',
        results: [
            { label: '转化率提升', value: '45%', desc: '用户点击与下单意愿显著增强' },
            { label: '客单价', value: '+20%', desc: '通过关联推荐提升了交叉销售' },
            { label: '响应速度', value: '<50ms', desc: '毫秒级支撑高并发访问' }
        ],
        features: ['用户画像深度建模', '动态权重调整算法', '高并发推荐网关', '自动化 A/B 测试系统'],
        image: '/cases-retail.png'
    },
    'predictive-maintenance-wind-farm': {
        title: '风电场预测性维护',
        client: '某国有大型电力集团',
        challenge: '风机分布在偏远地区，设备发生故障后维修成本极高，且非计划停机造成巨大的电力损失。',
        solution: '部署工业物联网传感器，采集振动、温度与声学数据，利用时间序列预测模型提前 7-14 天预判关键部件故障。',
        results: [
            { label: '停机时间减少', value: '35%', desc: '有效避免了突发性重大故障' },
            { label: '运维成本', value: '-25%', desc: '从“抢修”转变为“按需维护”' },
            { label: '设备寿命', value: '+3yr', desc: '延长了核心传动部件的使用年限' }
        ],
        features: ['多模态传感器融合', '时间序列异常检测', '维护任务智能排程', '数字孪生可视化平台'],
        image: '/cases-wind.png'
    }
};

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const t = await getTranslations('Common');
    const { slug } = await params;
    const data = CASE_DATA[slug as keyof typeof CASE_DATA];

    if (!data) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-dark pt-32 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-full filter blur-[150px]"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <Link
                        href="/case-studies"
                        className="inline-flex items-center text-primary hover:text-white transition-colors mb-8 group"
                    >
                        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> {t('cases')}
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl">{data.title}</h1>
                    <p className="text-xl text-gray-400">客户：{data.client}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-24">
                <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-dark mb-4 flex items-center">
                                <span className="w-8 h-1 bg-primary mr-4"></span>
                                业务挑战
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">{data.challenge}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-dark mb-4 flex items-center">
                                <span className="w-8 h-1 bg-primary mr-4"></span>
                                解决方案
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">{data.solution}</p>
                        </section>
                    </div>

                    <div className="aspect-video bg-gray-100 rounded-[3rem] overflow-hidden shadow-2xl relative">
                        <img
                            src={data.image}
                            alt={data.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {data.results.map((result, idx) => (
                        <div key={idx} className="bg-light p-10 rounded-[2.5rem] text-center hover:shadow-xl transition-all group border border-transparent hover:border-primary/10">
                            <div className="text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">{result.value}</div>
                            <div className="text-lg font-bold text-dark mb-2">{result.label}</div>
                            <div className="text-sm text-gray-500">{result.desc}</div>
                        </div>
                    ))}
                </div>

                <div className="bg-dark rounded-[3.5rem] p-12 md:p-20 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl -mr-32 -mt-32"></div>
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-8">核心功能与技术</h2>
                            <ul className="grid grid-cols-1 gap-4">
                                {data.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center text-gray-300">
                                        <span className="w-2 h-2 bg-primary rounded-full mr-4"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-center md:text-right">
                            <h3 className="text-2xl font-bold mb-6 text-gray-400">准备好开启数字化转型了吗？</h3>
                            <Link
                                href="/#contact"
                                className="inline-block bg-primary hover:bg-white hover:text-dark text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-2xl"
                            >
                                立即咨询专家 →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
