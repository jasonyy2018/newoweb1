import { cookies } from 'next/headers';
import { redirect } from '@/i18n/routing';
import prisma from '@/lib/prisma/client';
import { adminLogout } from '@/app/actions/auth';
import { LogOut, Mail, Phone, Building2, Calendar, MessageSquare } from 'lucide-react';

export default async function AdminConsultationsPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session || session.value !== 'authenticated') {
        redirect({ href: '/admin/login', locale });
    }

    const consultations = await prisma.consultation.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="min-h-screen bg-light">
            <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-dark flex items-center">
                        <span className="bg-primary text-white p-1 rounded mr-2">Admin</span>
                        咨询管理
                    </h1>
                    <form action={async () => {
                        'use server';
                        await adminLogout(locale);
                    }}>
                        <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors font-medium">
                            <LogOut size={20} className="mr-2" /> 退出登录
                        </button>
                    </form>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-10">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-dark">咨询记录</h2>
                        <p className="text-gray-500">共 {consultations.length} 条咨询信息</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {consultations.length === 0 ? (
                        <div className="bg-white p-12 rounded-2xl shadow-sm border border-dashed border-gray-300 text-center">
                            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">暂无咨询记录</p>
                        </div>
                    ) : (
                        consultations.map((item) => (
                            <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:row justify-between items-start md:items-center mb-4 pb-4 border-b border-gray-50">
                                    <div className="flex items-center mb-2 md:mb-0">
                                        <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary font-bold text-lg mr-4">
                                            {item.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-dark">{item.name}</h4>
                                            <p className="text-sm text-gray-400 flex items-center">
                                                <Calendar size={14} className="mr-1" /> {item.createdAt.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase">
                                            {item.service || 'General'}
                                        </span>
                                        <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase">
                                            {item.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <div className="flex items-center text-gray-600">
                                        <Mail size={18} className="mr-2 text-primary" /> {item.email}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Phone size={18} className="mr-2 text-primary" /> {item.phone || 'N/A'}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Building2 size={18} className="mr-2 text-primary" /> {item.company || 'N/A'}
                                    </div>
                                </div>

                                {item.message && (
                                    <div className="bg-light p-4 rounded-xl text-gray-700 whitespace-pre-wrap">
                                        <span className="font-bold block text-xs text-gray-400 mb-2 uppercase tracking-wider">咨询内容:</span>
                                        {item.message}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
