import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AboutSection() {
    const t = useTranslations('Index');
    const tCommon = useTranslations('Common');

    return (
        <section id="about" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-dark mb-4">
                        {t('about_title').split('葳澄')[0]}<span className="text-primary">葳澄科技</span>
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-3xl mx-auto">{t('about_desc')}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800"
                                alt="AI Technology"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl hidden md:block">
                            <div className="text-3xl font-bold mb-1">2019</div>
                            <div className="text-sm opacity-80">Founded</div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-dark">我们的使命</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {t('mission_desc')}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: '成功案例', value: '50+' },
                                { label: 'AI专家', value: '20+' },
                                { label: '满意度', value: '98%' },
                                { label: '行业经验', value: '5yr' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-light p-4 rounded-xl">
                                    <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
