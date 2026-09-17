'use client';

import React, { useState, useTransition } from 'react';
import { Image as ImageIcon, RefreshCw, CheckCircle2, XCircle, AlertCircle, ExternalLink, Filter, Search, ShieldCheck } from 'lucide-react';
import { auditImagesAction, ImageHealthItem } from '@/app/actions/images';

export default function ImageHealthClient({
    initialData,
}: {
    initialData: {
        total: number;
        healthy: number;
        broken: number;
        items: ImageHealthItem[];
    };
}) {
    const [data, setData] = useState(initialData);
    const [isPending, startTransition] = useTransition();
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleReAudit = () => {
        startTransition(async () => {
            const res = await auditImagesAction();
            if (res.success && res.data) {
                setData(res.data);
            }
        });
    };

    const filteredItems = data.items.filter((item) => {
        if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
        if (statusFilter === 'broken' && item.isOk) return false;
        if (statusFilter === 'healthy' && !item.isOk) return false;
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            return item.url.toLowerCase().includes(q) || item.sources.some((s) => s.toLowerCase().includes(q));
        }
        return true;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold mb-2">
                        <ShieldCheck size={14} />
                        <span>全站媒体完整性实时监控</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        媒体与图片健康诊断控制台
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        探活全站解决方案、客户标杆案例、前沿博文及品牌媒体资源
                    </p>
                </div>

                <button
                    onClick={handleReAudit}
                    disabled={isPending}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm transition-all shadow-md disabled:opacity-50"
                >
                    <RefreshCw size={16} className={isPending ? 'animate-spin' : ''} />
                    <span>{isPending ? '全站扫描中...' : '重新检测全站图片'}</span>
                </button>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        总媒体资源数
                    </span>
                    <div className="text-4xl font-black text-slate-900 tracking-tight">
                        {data.total}
                    </div>
                    <div className="mt-3 text-xs text-slate-500">
                        涵盖外链 CDN 与本地图片
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        正常访问 (200 OK)
                    </span>
                    <div className="text-4xl font-black text-emerald-600 tracking-tight">
                        {data.healthy}
                    </div>
                    <div className="mt-3 text-xs text-slate-500">
                        可用率: {((data.healthy / (data.total || 1)) * 100).toFixed(1)}%
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        失效故障 (404 / 异常)
                    </span>
                    <div className={`text-4xl font-black tracking-tight ${data.broken > 0 ? 'text-red-500' : 'text-slate-400'}`}>
                        {data.broken}
                    </div>
                    <div className="mt-3 text-xs text-slate-500">
                        {data.broken === 0 ? '全站暂无损坏图片，表现优异' : '需及时在后台替换'}
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                        {['all', 'solution', 'case', 'blog', 'static'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`px-3 py-1.5 rounded-lg transition-all ${
                                    categoryFilter === cat ? 'bg-white text-primary shadow-xs' : 'hover:text-slate-900'
                                }`}
                            >
                                {cat === 'all'
                                    ? '全部分类'
                                    : cat === 'solution'
                                    ? '解决方案'
                                    : cat === 'case'
                                    ? '标杆案例'
                                    : cat === 'blog'
                                    ? '技术博文'
                                    : '品牌资源'}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                        {['all', 'healthy', 'broken'].map((st) => (
                            <button
                                key={st}
                                onClick={() => setStatusFilter(st)}
                                className={`px-3 py-1.5 rounded-lg transition-all ${
                                    statusFilter === st ? 'bg-white text-primary shadow-xs' : 'hover:text-slate-900'
                                }`}
                            >
                                {st === 'all' ? '全部状态' : st === 'healthy' ? '仅正常' : '仅异常'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative w-full sm:w-64">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="搜索图片 URL 或关联模块..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-primary"
                    />
                </div>
            </div>

            {/* Images Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                            <tr>
                                <th className="py-3.5 px-6">图片预览</th>
                                <th className="py-3.5 px-4">关联模块 / 页面</th>
                                <th className="py-3.5 px-4">分类</th>
                                <th className="py-3.5 px-4">HTTP 状态</th>
                                <th className="py-3.5 px-6">资源地址</th>
                                <th className="py-3.5 px-4 text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredItems.map((item, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                                    <td className="py-3.5 px-6">
                                        <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                                            <img
                                                src={item.url}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as any).style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td className="py-3.5 px-4 font-bold text-slate-800">
                                        {item.sources.join(', ')}
                                    </td>
                                    <td className="py-3.5 px-4 font-semibold text-slate-500 capitalize">
                                        {item.category}
                                    </td>
                                    <td className="py-3.5 px-4">
                                        {item.isOk ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                                                <CheckCircle2 size={12} /> {item.status} OK
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-100 text-red-800 border border-red-200">
                                                <XCircle size={12} /> {item.status} 失效
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3.5 px-6 font-mono text-[11px] text-slate-500 max-w-xs truncate">
                                        {item.url}
                                    </td>
                                    <td className="py-3.5 px-4 text-right">
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 text-slate-400 hover:text-primary inline-flex"
                                            title="打开原始图像"
                                        >
                                            <ExternalLink size={14} />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
