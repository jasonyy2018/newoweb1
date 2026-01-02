import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BarChart, MessageSquare, Eye, TrendingUp, Zap, Cpu, CheckCircle2 } from 'lucide-react';

const SOLUTION_DATA = {
    'data-analytics': {
        icon: BarChart,
        title: '智能数据分析',
        desc: '利用AI技术深度分析企业数据，挖掘潜在价值，提供数据驱动的决策支持',
        features: ['多维数据建模', '实时数据看板', '异常检测算法', '关联规则挖掘']
    },
    'nlp': {
        icon: MessageSquare,
        title: '自然语言处理',
        desc: '开发智能客服、文本分析等应用，提升客户体验和业务处理效率',
        features: ['智能语义理解', '情感倾向分析', '多语言机器翻译', '文本自动摘要']
    },
    'computer-vision': {
        icon: Eye,
        title: '计算机视觉',
        desc: '实现图像识别、视频分析等功能，应用于智能制造、安防监控等领域',
        features: ['缺陷检测', '人脸识别', '物体跟踪', '场景分割']
    },
    'predictive-analytics': {
        icon: TrendingUp,
        title: '预测性分析',
        desc: '基于历史数据预测未来趋势，帮助企业提前规划，降低风险',
        features: ['销量预测', '金融风控', '客户流失预测', '设备维护预测']
    },
    'intelligent-automation': {
        icon: Zap,
        title: '智能自动化',
        desc: '结合RPA和AI技术，实现业务流程自动化，提高效率降低成本',
        features: ['自动文档处理', '流程自优化', '决策自动化', '跨系统集成']
    },
    'custom-ai-models': {
        icon: Cpu,
        title: '定制化AI模型开发',
        desc: '根据企业特定需求，开发定制化AI模型，解决独特业务挑战',
        features: ['私有化部署', '模型微调', '高性能推理', '全生命周期管理']
    }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    const data = SOLUTION_DATA[slug as keyof typeof SOLUTION_DATA];

    if (!data) return {};

    return {
        title: `${data.title} - WSAI 解决方案`,
        description: data.desc,
        openGraph: {
            title: data.title,
            description: data.desc,
            type: 'article',
            locale,
        }
    };
}

export default async function SolutionDetailPage({
    params
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const data = SOLUTION_DATA[slug as keyof typeof SOLUTION_DATA];

    if (!data) {
        notFound();
    }

    const Icon = data.icon;

    return (
        <div className="pt-32 pb-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                        <Icon size={44} />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">{data.title}</h1>
                    <p className="text-xl text-gray-500 mb-12 leading-relaxed">
                        {data.desc}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {data.features.map((feature, i) => (
                            <div key={i} className="flex items-center p-6 bg-light rounded-2xl border border-gray-100">
                                <CheckCircle2 className="text-primary mr-4 flex-shrink-0" size={24} />
                                <span className="text-lg font-medium text-dark">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-dark rounded-3xl p-10 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-4">准备好开始您的 AI 之旅了吗？</h3>
                            <p className="text-white/60 mb-8">我们的专家团队将为您提供专业的技术支持和业务建议。</p>
                            <button className="bg-primary hover:bg-white hover:text-primary text-white px-8 py-4 rounded-full font-bold transition-all shadow-xl">
                                立即咨询
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
