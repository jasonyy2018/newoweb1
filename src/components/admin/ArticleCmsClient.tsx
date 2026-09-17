'use client';

import React, { useState, useTransition } from 'react';
import { FileText, Plus, Search, Edit3, Trash2, ExternalLink, Sparkles, CheckCircle2, AlertCircle, Image as ImageIcon, Save, X } from 'lucide-react';
import { getAdminArticlesAction, saveAdminArticleAction, deleteAdminArticleAction, AdminArticleItem } from '@/app/actions/articles';

export default function ArticleCmsClient({
    initialArticles,
    locale: initialLocale,
}: {
    initialArticles: AdminArticleItem[];
    locale: string;
}) {
    const [locale, setLocale] = useState<string>(initialLocale);
    const [articles, setArticles] = useState<AdminArticleItem[]>(initialArticles);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isPending, startTransition] = useTransition();

    // Edit modal state
    const [editingArticle, setEditingArticle] = useState<AdminArticleItem | null>(null);
    const [isNew, setIsNew] = useState<boolean>(false);
    const [formData, setFormData] = useState<{
        title: string;
        slug: string;
        description: string;
        content: string;
        author: string;
        tags: string;
        image: string;
    }>({
        title: '',
        slug: '',
        description: '',
        content: '',
        author: 'WSAI Technical Team',
        tags: 'AI, Enterprise',
        image: '',
    });
    const [saveMessage, setSaveMessage] = useState<string | null>(null);

    const handleSwitchLocale = (loc: string) => {
        setLocale(loc);
        startTransition(async () => {
            const res = await getAdminArticlesAction(loc);
            if (res.success && res.data) {
                setArticles(res.data);
            }
        });
    };

    const handleOpenEdit = (art: AdminArticleItem) => {
        setIsNew(false);
        setEditingArticle(art);
        setFormData({
            title: art.title,
            slug: art.slug,
            description: art.description,
            content: art.content,
            author: art.author,
            tags: art.tags.join(', '),
            image: art.image || '',
        });
        setSaveMessage(null);
    };

    const handleOpenNew = () => {
        setIsNew(true);
        setEditingArticle({} as any);
        setFormData({
            title: '',
            slug: '',
            description: '',
            content: '<h2>Introduction</h2>\n<p>Enter enterprise article content here...</p>',
            author: 'WSAI Solutions Team',
            tags: 'AI, Architecture',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        });
        setSaveMessage(null);
    };

    const handleSave = () => {
        startTransition(async () => {
            const tagsArray = formData.tags
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean);

            const res = await saveAdminArticleAction(
                {
                    title: formData.title,
                    slug: formData.slug,
                    description: formData.description,
                    content: formData.content,
                    author: formData.author,
                    tags: tagsArray,
                    image: formData.image,
                },
                locale
            );

            if (res.success) {
                setSaveMessage('✅ 保存成功！已同步至线上并更新 GEO 索引');
                // Refresh list
                const listRes = await getAdminArticlesAction(locale);
                if (listRes.success && listRes.data) {
                    setArticles(listRes.data);
                }
                setTimeout(() => {
                    setEditingArticle(null);
                }, 1200);
            } else {
                setSaveMessage(`❌ 保存失败: ${res.error}`);
            }
        });
    };

    const handleDelete = (slug: string) => {
        if (!confirm(`确定要删除文章 "${slug}" 吗？此操作不可逆。`)) return;
        startTransition(async () => {
            const res = await deleteAdminArticleAction(slug, locale);
            if (res.success) {
                setArticles((prev) => prev.filter((a) => a.slug !== slug));
            }
        });
    };

    const filteredArticles = articles.filter((a) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            a.title.toLowerCase().includes(q) ||
            a.slug.toLowerCase().includes(q) ||
            a.author.toLowerCase().includes(q)
        );
    });

    const minChars = locale === 'en' ? 40 : 20;

    return (
        <div className="space-y-6">
            {/* Header Controls */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <FileText className="text-primary" />
                        <span>技术博文与 GEO 内容管理中心</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        当前语种: <strong className="uppercase text-slate-700">{locale}</strong> • 共 {articles.length} 篇深度博文
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    {/* Language Switcher */}
                    <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                        {['zh', 'en', 'ja'].map((l) => (
                            <button
                                key={l}
                                onClick={() => handleSwitchLocale(l)}
                                className={`px-3 py-1.5 rounded-lg uppercase transition-all ${
                                    locale === l ? 'bg-white text-primary shadow-xs' : 'hover:text-slate-900'
                                }`}
                            >
                                {l}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleOpenNew}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
                        <Plus size={16} />
                        <span>撰写新文章</span>
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div className="relative w-full sm:w-80">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="搜索文章标题、Slug 或作者..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-primary"
                    />
                </div>
                <div className="text-xs text-slate-500 hidden sm:block">
                    提示：建议每篇文章的 Description (Direct Verdict) 具备完整结论句，让大模型直接引用
                </div>
            </div>

            {/* Article Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((art) => (
                    <div
                        key={art.slug}
                        className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                    >
                        <div>
                            {/* Image Preview */}
                            <div className="relative aspect-16/9 bg-slate-100 overflow-hidden border-b border-slate-100">
                                {art.image ? (
                                    <img
                                        src={art.image}
                                        alt={art.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as any).src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                        <ImageIcon size={32} />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3">
                                    <span
                                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-xs ${
                                            art.geoStatus.isReady
                                                ? 'bg-emerald-500/90 text-white'
                                                : 'bg-amber-500/90 text-white'
                                        }`}
                                    >
                                        <Sparkles size={11} />
                                        {art.geoStatus.isReady ? 'GEO 就绪' : '待增强'}
                                    </span>
                                </div>
                            </div>

                            {/* Content Info */}
                            <div className="p-5 space-y-3">
                                <div className="flex flex-wrap items-center gap-1.5">
                                    {art.tags.slice(0, 2).map((t) => (
                                        <span
                                            key={t}
                                            className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                    <span className="text-[10px] text-slate-400 ml-auto">
                                        {new Date(art.date).toLocaleDateString()}
                                    </span>
                                </div>

                                <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug">
                                    {art.title}
                                </h3>

                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                    {art.description}
                                </p>
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[11px]">
                                作者: <strong className="text-slate-700">{art.author}</strong>
                            </span>

                            <div className="flex items-center space-x-1">
                                <a
                                    href={`/${locale}/blog/${art.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 text-slate-400 hover:text-primary transition-colors"
                                    title="查看前台"
                                >
                                    <ExternalLink size={15} />
                                </a>
                                <button
                                    onClick={() => handleOpenEdit(art)}
                                    className="p-1.5 text-slate-600 hover:text-primary transition-colors"
                                    title="编辑文章与 GEO"
                                >
                                    <Edit3 size={15} />
                                </button>
                                <button
                                    onClick={() => handleDelete(art.slug)}
                                    className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                                    title="删除文章"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Drawer / Modal */}
            {editingArticle && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Sparkles className="text-primary" size={18} />
                                <h3 className="font-bold text-slate-900 text-sm">
                                    {isNew ? '创建新文章' : `编辑文章: ${formData.slug}`}
                                </h3>
                            </div>
                            <button
                                onClick={() => setEditingArticle(null)}
                                className="text-slate-400 hover:text-slate-700 p-1"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
                            {saveMessage && (
                                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl font-bold">
                                    {saveMessage}
                                </div>
                            )}

                            <div>
                                <label className="block font-bold text-slate-700 mb-1">文章标题 (Title)</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-primary"
                                    placeholder="输入文章标题..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">路径标识 (Slug)</label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        disabled={!isNew}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-primary disabled:bg-slate-100"
                                        placeholder="e.g. next-js-performance"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">作者 (Author)</label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-primary"
                                    />
                                </div>
                            </div>

                            {/* GEO Direct Verdict (Description) */}
                            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="font-black text-slate-900 flex items-center gap-1.5">
                                        <Sparkles size={14} className="text-primary" />
                                        <span>GEO 直给结论 / 摘要 (Direct Verdict)</span>
                                    </label>
                                    <span
                                        className={`font-mono text-[11px] font-bold ${
                                            formData.description.trim().length >= minChars
                                                ? 'text-emerald-600'
                                                : 'text-amber-600'
                                        }`}
                                    >
                                        {formData.description.trim().length} / {minChars} 字符标准
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed">
                                    学术标准要求首句即为具备完整技术推导与收益的独立结论句，大模型抓取后可免概括直接引用。
                                </p>
                                <textarea
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-primary"
                                    placeholder="输入直给核心结论与技术要点..."
                                />
                            </div>

                            {/* Image URL & Instant Preview */}
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">头图链接 (Image URL)</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-primary mb-2"
                                    placeholder="https://images.unsplash.com/..."
                                />
                                {formData.image && (
                                    <div className="relative aspect-21/9 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 max-h-36">
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as any).alt = '图片加载失败 (404/Invalid)';
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-1">分类标签 (Tags, 逗号分隔)</label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-primary"
                                    placeholder="Next.js, React, Cloud"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-1">文章正文 (HTML / Content)</label>
                                <textarea
                                    rows={8}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full px-3 py-2 font-mono border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-primary"
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end space-x-3">
                            <button
                                onClick={() => setEditingArticle(null)}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                            >
                                取消
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isPending}
                                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-all shadow-md disabled:opacity-50"
                            >
                                <Save size={14} />
                                <span>{isPending ? '正在保存...' : '保存并同步'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
