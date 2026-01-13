import { useTranslations } from 'next-intl';
import ContactForm from './ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
    const t = useTranslations('Contact');

    return (
        <section id="contact" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-bold text-dark mb-6">
                                {t('title')}
                            </h2>
                            <p className="text-gray-600 mb-10 text-lg">
                                {t('subtitle')}
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mr-6 flex-shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">{t('address_label')}</h4>
                                        <p className="text-gray-600">{t('address')}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mr-6 flex-shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">{t('phone_label')}</h4>
                                        <p className="text-gray-600">+86-18964673689</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mr-6 flex-shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">{t('email_label')}</h4>
                                        <p className="text-gray-600">jyu@wisdomitc.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="h-[300px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                            <iframe
                                src="https://ditu.amap.com/regeo?lng=121.446212&lat=31.318493&name=%E4%B8%8A%E6%B5%B7%E8%91%B3%E6%BE%84%E4%BF%A1%E6%81%AF%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&src=uriapi&innersrc=uriapi"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>

                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
