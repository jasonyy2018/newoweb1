'use client';

import { useState } from 'react';
import { adminLogin } from '@/app/actions/auth';
import { useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Lock, User, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const locale = useLocale();

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError('');
        const result = await adminLogin(formData, locale);
        if (result.success) {
            router.push('/admin/consultations');
        } else {
            setError('用户名或密码错误');
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-light p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-dark">管理员登录</h1>
                    <p className="text-gray-500">请输入您的凭据以访问后台</p>
                </div>

                <form action={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                name="username"
                                type="text"
                                required
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="admin"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                name="password"
                                type="password"
                                required
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg text-center font-medium">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center"
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : '登录'}
                    </button>
                </form>
            </div>
        </div>
    );
}
