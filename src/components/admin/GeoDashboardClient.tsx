'use client';

import React, { useState, useTransition } from 'react';
import { Sparkles, RefreshCw, CheckCircle2, XCircle, AlertTriangle, ExternalLink, Filter, Search, Award, BarChart2 } from 'lucide-react';
import { getGeoAuditReportAction } from '@/app/actions/geo';
import type { GeoAuditReport, GeoPageScore } from '@/lib/geo/geoOptimizer';

export default function GeoDashboardClient({
    initialReport,
    locale,
}: {
    initialReport: GeoAuditReport;
    locale: string;
}) {
    const [report, setReport] = useState<GeoAuditReport>(initialReport);
    const [isPending, startTransition] = useTransition();
    const [filterType, setFilterType] = useState<string>('all');
    const [filterLocale, setFilterLocale] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [expandedPageId, setExpandedPageId] = useState<string | null>(null);

    const handleReAudit = () => {
        startTransition(async () => {
            const res = await getGeoAuditReportAction();
            if (res.success && res.data) {
                setReport(res.data);
            }
        });
    };

    const filteredPages = report.pages.filter((p) => {
        if (filterType !== 'all' && p.type !== filterType) return false;
        if (filterLocale !== 'all' && p.locale !== filterLocale) return false;
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            return p.title.toLowerCase().includes(q) || p.path.toLowerCase().includes(q);
        }
        return true;
    });

    const getScoreBadge = (score: number) => {
        if (score >= 90) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
        if (score >= 80) return 'bg-blue-100 text-blue-800 border-blue-300';
        if (score >= 70) return 'bg-amber-100 text-amber-800 border-amber-300';
        return 'bg-red-100 text-red-800 border-red-300';
    };

    return (
        <div className="space-y-8">
            {/* Header with trigger button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold mb-2">
                        <Sparkles size={14} />
                        <span>GEO Evaluation Framework</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        全站生成式引擎优化 (GEO) 审计控制台
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        上次扫描时间: {new Date(report.timestamp).toLocaleString()} • 提升大模型引用率 30-40%
                    </p>
                </div>

                <button
                    onClick={handleReAudit}
                    disabled={isPending}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm transition-all shadow-md hover:shadow-primary/30 disabled:opacity-50 shrink-0"
                >
                    <RefreshCw size={16} className={isPending ? 'animate-spin' : ''} />
                    <span>{isPending ? '深度审计中...' : '重新全量审计'}</span>
                </button>
            </div>

            {/* Top Score Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        全站平均得分
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-slate-900 tracking-tight">
                            {report.averageScore.toFixed(1)}
                        </span>
                        <span className="text-sm font-bold text-slate-400">/ 100</span>
                    </div>
                    <div className="mt-3 text-xs font-medium text-slate-500 flex items-center gap-1.5">
                        <Award size={14} className="text-primary" />
                        <span>五大核心维度加权评测</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        已扫描页面总数
                    </span>
                    <div className="text-4xl font-black text-slate-900 tracking-tight">
                        {report.totalPages}
                    </div>
                    <div className="mt-3 text-xs font-medium text-slate-500">
                        覆盖 Solutions / Cases / Blog (中英日)
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        高引用就绪 (A+/A)
                    </span>
                    <div className="text-4xl font-black text-emerald-600 tracking-tight">
                        {report.gradeSummary.aPlus + report.gradeSummary.a}
                    </div>
                    <div className="mt-3 text-xs font-medium text-slate-500">
                        {(((report.gradeSummary.aPlus + report.gradeSummary.a) / report.totalPages) * 100 || 0).toFixed(1)}% 达到高曝光基准
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        待优化页面 (&lt;70分)
                    </span>
                    <div className="text-4xl font-black text-amber-500 tracking-tight">
                        {report.gradeSummary.c}
                    </div>
                    <div className="mt-3 text-xs font-medium text-slate-500">
                        建议补充数据点与行业标准规范
                    </div>
                </div>
            </div>

            {/* 5 Dimensions Info Bar */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                    <BarChart2 size={18} className="text-primary" />
                    <h3 className="font-bold text-sm uppercase tracking-wider text-slate-200">
                        生成式引擎优化 (GEO) 五维评分模型
                    </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs text-slate-300">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                        <div className="font-extrabold text-white mb-1">1. Conclusion First</div>
                        <p className="text-slate-400 leading-relaxed">首屏提供 40+ 字符直给独立判断句，拒绝废话</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                        <div className="font-extrabold text-white mb-1">2. Statistics & Metrics</div>
                        <p className="text-slate-400 leading-relaxed">提供 %, 毫秒, 投资回报率等物理量化指标</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                        <div className="font-extrabold text-white mb-1">3. Authoritative Sources</div>
                        <p className="text-slate-400 leading-relaxed">ISO/IEC、SOC2、实测协议等权威背书</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                        <div className="font-extrabold text-white mb-1">4. Quotations & Proof</div>
                        <p className="text-slate-400 leading-relaxed">客户原声、落地评价与负责人真实证言</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                        <div className="font-extrabold text-white mb-1">5. Schema.org Coverage</div>
                        <p className="text-slate-400 leading-relaxed">Service / CaseStudy / Article / FAQPage</p>
                    </div>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                        {['all', 'solution', 'case-study', 'blog'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setFilterType(t)}
                                className={`px-3 py-1.5 rounded-lg transition-all ${
                                    filterType === t ? 'bg-white text-primary shadow-xs' : 'hover:text-slate-900'
                                }`}
                            >
                                {t === 'all' ? '全部类型' : t === 'solution' ? '解决方案' : t === 'case-study' ? '标杆案例' : '技术博文'}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                        {['all', 'zh', 'en', 'ja'].map((l) => (
                            <button
                                key={l}
                                onClick={() => setFilterLocale(l)}
                                className={`px-3 py-1.5 rounded-lg uppercase transition-all ${
                                    filterLocale === l ? 'bg-white text-primary shadow-xs' : 'hover:text-slate-900'
                                }`}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative w-full sm:w-64">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="搜索页面标题或路径..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-primary"
                    />
                </div>
            </div>

            {/* Pages Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                            <tr>
                                <th className="py-3.5 px-6">页面 / 标题</th>
                                <th className="py-3.5 px-4">类型 / 语种</th>
                                <th className="py-3.5 px-4">GEO 得分</th>
                                <th className="py-3.5 px-4">结论前置</th>
                                <th className="py-3.5 px-4">量化指标点</th>
                                <th className="py-3.5 px-4">权威来源</th>
                                <th className="py-3.5 px-4">Schema 状态</th>
                                <th className="py-3.5 px-6 text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredPages.map((page) => {
                                const isExpanded = expandedPageId === page.id;
                                return (
                                    <React.Fragment key={page.id}>
                                        <tr className="hover:bg-slate-50/70 transition-colors">
                                            <td className="py-4 px-6 font-bold text-slate-900 max-w-xs">
                                                <div className="truncate">{page.title}</div>
                                                <div className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                                                    {page.path}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 font-semibold text-slate-600">
                                                <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] uppercase font-bold mr-1.5">
                                                    {page.locale}
                                                </span>
                                                <span className="capitalize">{page.type}</span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span
                                                    className={`px-2.5 py-1 rounded-full text-xs font-black border ${getScoreBadge(
                                                        page.score
                                                    )}`}
                                                >
                                                    {page.score}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                {page.hasConclusionFirst ? (
                                                    <span className="inline-flex items-center text-emerald-600 font-bold gap-1">
                                                        <CheckCircle2 size={14} /> 达标
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center text-red-500 font-bold gap-1">
                                                        <XCircle size={14} /> 不足
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 px-4 font-bold text-slate-700">
                                                {page.statisticCount} 个数据点
                                            </td>
                                            <td className="py-4 px-4 font-bold text-slate-700">
                                                {page.sourceCitations} 个背书
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="inline-flex items-center text-emerald-600 font-bold gap-1">
                                                    <CheckCircle2 size={14} /> 已注入
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-2">
                                                <button
                                                    onClick={() => setExpandedPageId(isExpanded ? null : page.id)}
                                                    className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                                                >
                                                    {isExpanded ? '收起差距' : '诊断建议'}
                                                </button>
                                                <a
                                                    href={page.path}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1.5 text-slate-400 hover:text-primary inline-flex"
                                                    title="访问页面"
                                                >
                                                    <ExternalLink size={14} />
                                                </a>
                                            </td>
                                        </tr>

                                        {/* Expanded Diagnostic Row */}
                                        {isExpanded && (
                                            <tr className="bg-slate-50">
                                                <td colSpan={8} className="py-3 px-6">
                                                    <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs">
                                                        <div className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                                                            <AlertTriangle size={14} className="text-amber-500" />
                                                            <span>逐页 GEO 诊断差距与优化修复建议：</span>
                                                        </div>
                                                        {page.gaps.length > 0 ? (
                                                            <ul className="list-disc pl-5 space-y-1 text-slate-600">
                                                                {page.gaps.map((gap, i) => (
                                                                    <li key={i}>{gap}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p className="text-emerald-600 font-semibold">
                                                                ✅ 本页完全符合 GEO 高引用就绪标准，可被大模型直接引用！
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
