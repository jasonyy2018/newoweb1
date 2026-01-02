'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        name: '张总',
        position: '某大型制造企业 CTO',
        content: 'WSAI 为我们提供的 AI 缺陷检测方案极大地提升了生产线的自动化水平，误报率降低了 85%，超出了我们的预期。',
        stars: 5
    },
    {
        name: '李经理',
        position: '领先零售品牌 运营总监',
        content: '通过接入 WSAI 的智能推荐引擎，我们的用户点击转化率在一季度内提升了 40%。他们的专业技术和快速响应给我们留下了深刻印象。',
        stars: 5
    },
    {
        name: 'David Chen',
        position: 'Digital Solutions Lab CEO',
        content: 'Professional, innovative, and highly reliable. WSAI is our go-to partner for complex AI and IoT integration projects.',
        stars: 5
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 mb-4 text-sm font-bold tracking-wider text-primary uppercase bg-primary/10 rounded-full"
                    >
                        客户评价
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
                        深得客户信赖的 AI 专家
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        我们为全球超过 50 家企业提供技术支持，致力于通过人工智能驱动业务增长
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
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
