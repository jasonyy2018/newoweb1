import { cookies } from 'next/headers';
import { redirect } from '@/i18n/routing';
import prisma from '@/lib/prisma/client';
import { adminLogout } from '@/app/actions/auth';
import { updateConsultationStatus, deleteConsultation } from '@/app/actions/consultation';
import { LogOut, Mail, Phone, Building2, Calendar, MessageSquare, CheckCircle, Trash2, Clock, Users, PlusCircle } from 'lucide-react';

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

    // 获取所有咨询记录
    const consultations = await prisma.consultation.findMany({
        orderBy: { createdAt: 'desc' },
    });

    // 计算统计数据
    const totalConsultations = consultations.length;
    const pendingConsultations = consultations.filter(c => c.status === 'pending').length;
    const processedConsultations = consultations.filter(c => c.status === 'processed').length;

    // 获取今日新增数
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayNew = consultations.filter(c => new Date(c.createdAt) >= today).length;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* 顶部导航栏 */}
            <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-30">
                <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <span className="font-bold text-sm">A</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">
                            咨询管理 <span className="text-slate-400 font-medium text-sm ml-1">Dashboard</span>
                        </h1>
                    </div>
                    <form action={async () => {
                        'use server';
                        await adminLogout(locale);
                    }}>
                        <button className="flex items-center space-x-2 px-4 py-2 text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all rounded-lg font-semibold text-sm">
                            <LogOut size={18} />
                            <span>退出登录</span>
                        </button>
                    </form>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8">
                {/* 统计仪表面板 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    <StatCard
                        title="总咨询数"
                        value={totalConsultations}
                        icon={<Users className="text-blue-500" />}
                        color="bg-blue-50"
                    />
                    <StatCard
                        title="待处理"
                        value={pendingConsultations}
                        icon={<Clock className="text-amber-500" />}
                        color="bg-amber-50"
                    />
                    <StatCard
                        title="已处理"
                        value={processedConsultations}
                        icon={<CheckCircle className="text-emerald-500" />}
                        color="bg-emerald-50"
                    />
                    <StatCard
                        title="今日新增"
                        value={todayNew}
                        icon={<PlusCircle className="text-rose-500" />}
                        color="bg-rose-50"
                    />
                </div>

                {/* 列表标题 */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center">
                        <MessageSquare className="mr-2 text-primary" size={20} />
                        最新咨询记录
                    </h2>
                    <div className="text-sm text-slate-500 font-medium">
                        共 {consultations.length} 条记录
                    </div>
                </div>

                {/* 咨询列表 */}
                <div className="grid gap-6">
                    {consultations.length === 0 ? (
                        <div className="bg-white p-20 rounded-3xl shadow-sm border border-dashed border-slate-200 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MessageSquare className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">暂无记录</h3>
                            <p className="text-slate-500 max-w-xs mx-auto">目前还没有收到任何咨询信息，当有新咨询时会在这里显示。</p>
                        </div>
                    ) : (
                        consultations.map((item) => (
                            <div key={item.id} className="bg-white rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 group">
                                <div className="p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                                        {/* 用户基本信息 */}
                                        <div className="flex items-center space-x-6 flex-grow">
                                            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 font-black text-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                                                {item.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-extrabold text-slate-800 mb-1">{item.name}</h3>
                                                <div className="flex items-center text-slate-400 text-sm font-medium">
                                                    <Calendar size={14} className="mr-1.5" />
                                                    {new Date(item.createdAt).toLocaleString(locale, {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        {/* 状态与操作 */}
                                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                                            <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${item.status === 'processed'
                                                ? 'bg-emerald-100 text-emerald-600'
                                                : 'bg-amber-100 text-amber-600'
                                                }`}>
                                                {item.status === 'processed' ? '已处理' : '待处理'}
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                {item.status === 'pending' && (
                                                    <form action={async () => {
                                                        'use server';
                                                        await updateConsultationStatus(item.id, 'processed');
                                                    }}>
                                                        <button
                                                            className="p-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-xl transition-all shadow-sm"
                                                            title="标记为已处理"
                                                        >
                                                            <CheckCircle size={20} />
                                                        </button>
                                                    </form>
                                                )}
                                                <form action={async () => {
                                                    'use server';
                                                    await deleteConsultation(item.id);
                                                }}>
                                                    <button
                                                        className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white rounded-xl transition-all shadow-sm"
                                                        title="删除记录"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 详情网格 */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 py-6 border-y border-slate-50">
                                        <div className="flex items-start">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mr-4 flex-shrink-0">
                                                <Mail size={18} />
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">邮箱地址</span>
                                                <span className="text-slate-700 font-bold break-all">{item.email}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 mr-4 flex-shrink-0">
                                                <Phone size={18} />
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">联系电话</span>
                                                <span className="text-slate-700 font-bold">{item.phone || '未填写'}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 mr-4 flex-shrink-0">
                                                <Building2 size={18} />
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">公司/机构</span>
                                                <span className="text-slate-700 font-bold">{item.company || '未填写'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 留言内容 */}
                                    {item.message && (
                                        <div className="mt-8">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-3">咨询内容详情</span>
                                            <div className="bg-slate-50 p-6 rounded-2xl text-slate-700 font-medium leading-relaxed whitespace-pre-wrap border border-slate-100">
                                                {item.message}
                                            </div>
                                        </div>
                                    )}

                                    {/* 意向服务标签 */}
                                    {item.service && (
                                        <div className="mt-6 flex items-center">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mr-3">意向服务:</span>
                                            <span className="px-3 py-1 bg-slate-800 text-white rounded-lg text-xs font-bold">
                                                {item.service}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

function StatCard({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-5 hover:scale-[1.02] transition-transform duration-300">
            <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-2xl`}>
                {icon}
            </div>
            <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
                <p className="text-3xl font-black text-slate-800 leading-none">{value}</p>
            </div>
        </div>
    );
}
