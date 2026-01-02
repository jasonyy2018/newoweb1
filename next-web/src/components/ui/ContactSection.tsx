import { useTranslations } from 'next-intl';
import ContactForm from './ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
    const t = useTranslations('Contact');

    return (
        <section id="contact" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-dark mb-6">
                            {t('title').split('我们')[0]}<span className="text-primary">联系我们</span>
                        </h2>
                        <p className="text-gray-600 mb-10 text-lg">
                            无论您有任何疑问或需求，我们的团队都将为您提供专业的咨询服务。
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mr-6 flex-shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">公司地址</h4>
                                    <p className="text-gray-600">{t('address')}</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mr-6 flex-shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">联系电话</h4>
                                    <p className="text-gray-600">+86-18964673689</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mr-6 flex-shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">电子邮箱</h4>
                                    <p className="text-gray-600">jyu@wisdomitc.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
