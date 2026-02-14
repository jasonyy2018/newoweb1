import { useTranslations } from 'next-intl';
import ContactSection from '@/components/ui/ContactSection';
import PageHeader from '@/components/layout/PageHeader';

export default function ContactPage() {
    const t = useTranslations('Contact');

    return (
        <main>
            <PageHeader
                title={t('title')}
                description={t('subtitle')}
            />
            <ContactSection />

            <section className="py-12 bg-light">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                            <h3 className="font-bold mb-2">Technical Support</h3>
                            <p className="text-sm text-gray-500">support@wisdomitc.com</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                            <h3 className="font-bold mb-2">Sales Inquiries</h3>
                            <p className="text-sm text-gray-500">sales@wisdomitc.com</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                            <h3 className="font-bold mb-2">General Info</h3>
                            <p className="text-sm text-gray-500">info@wisdomitc.com</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
