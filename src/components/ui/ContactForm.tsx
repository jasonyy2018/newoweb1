'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { submitConsultation } from '@/app/actions/consultation';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
    const t = useTranslations('Contact');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    async function handleSubmit(formData: FormData) {
        setStatus('loading');
        const result = await submitConsultation(formData);
        if (result.success) {
            setStatus('success');
            (document.getElementById('contact-form') as HTMLFormElement).reset();
        } else {
            setStatus('error');
        }
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl">
            {status === 'success' ? (
                <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{t('success_title')}</h3>
                    <p className="text-gray-600">{t('success_desc')}</p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="mt-6 text-primary font-medium hover:underline"
                    >
                        {t('resubmit')}
                    </button>
                </div>
            ) : (
                <form id="contact-form" action={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('name')}</label>
                            <input
                                name="name"
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                placeholder={t('name')}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('email')}</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                placeholder={t('email')}
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('company')}</label>
                            <input
                                name="company"
                                type="text"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                placeholder={t('company')}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('phone')}</label>
                            <input
                                name="phone"
                                type="tel"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                placeholder={t('phone')}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('message')}</label>
                        <textarea
                            name="message"
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                            placeholder={t('message')}
                        ></textarea>
                    </div>

                    {status === 'error' && (
                        <div className="flex items-center text-red-500 bg-red-50 p-4 rounded-xl">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            <span>{t('error_submit')}</span>
                        </div>
                    )}

                    <div className="space-y-4">
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 flex items-center justify-center group"
                        >
                            {status === 'loading' ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    {t('submit')}
                                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </>
                            )}
                        </button>

                        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400">
                            <div className="flex items-center">
                                <CheckCircle size={14} className="mr-1 text-green-500" />
                                {t('response_24h')}
                            </div>
                            <div className="flex items-center">
                                <CheckCircle size={14} className="mr-1 text-green-500" />
                                {t('secure_data')}
                            </div>
                            <div className="flex items-center">
                                <CheckCircle size={14} className="mr-1 text-green-500" />
                                {t('free_tech_plan')}
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}
