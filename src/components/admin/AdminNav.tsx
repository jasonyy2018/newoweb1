import React from 'react';
import Link from 'next/link';
import { LogOut, MessageSquare, Sparkles, FileText, Image as ImageIcon } from 'lucide-react';
import { adminLogout } from '@/app/actions/auth';

interface AdminNavProps {
    currentTab: 'consultations' | 'geo' | 'articles' | 'images';
    locale: string;
}

export default function AdminNav({ currentTab, locale }: AdminNavProps) {
    const navItems = [
        {
            key: 'consultations',
            href: `/${locale}/admin/consultations`,
            label: '咨询线索',
            icon: MessageSquare,
        },
        {
            key: 'geo',
            href: `/${locale}/admin/geo`,
            label: 'GEO 审计控制台',
            icon: Sparkles,
        },
        {
            key: 'articles',
            href: `/${locale}/admin/articles`,
            label: '文章与 GEO 运营',
            icon: FileText,
        },
        {
            key: 'images',
            href: `/${locale}/admin/images`,
            label: '媒体图片健康',
            icon: ImageIcon,
        },
    ];

    return (
        <nav className="bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200 sticky top-0 z-40">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Brand & Module Links */}
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm font-black text-sm">
                            W
                        </div>
                        <span className="text-lg font-black text-slate-900 tracking-tight">
                            WSAI <span className="text-primary font-bold text-xs uppercase px-1.5 py-0.5 bg-primary/10 rounded">Admin</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentTab === item.key;
                            return (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                                        isActive
                                            ? 'bg-primary text-white shadow-md shadow-primary/25'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                                >
                                    <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Right side logout & quick links */}
                <div className="flex items-center space-x-3">
                    <Link
                        href={`/${locale}`}
                        target="_blank"
                        className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors hidden sm:inline-block px-3 py-1.5 rounded-lg border border-slate-200 hover:border-primary/30"
                    >
                        访问官网 ↗
                    </Link>
                    <form
                        action={async () => {
                            'use server';
                            await adminLogout(locale);
                        }}
                    >
                        <button
                            type="submit"
                            className="flex items-center space-x-1.5 px-3.5 py-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all rounded-xl font-bold text-xs border border-transparent hover:border-red-100"
                        >
                            <LogOut size={15} />
                            <span>退出</span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Mobile Tab Bar */}
            <div className="md:hidden flex items-center justify-around border-t border-slate-100 bg-slate-50/80 px-2 py-2 text-xs">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.key;
                    return (
                        <Link
                            key={item.key}
                            href={item.href}
                            className={`flex flex-col items-center py-1 px-2 rounded-lg ${
                                isActive ? 'text-primary font-bold' : 'text-slate-500'
                            }`}
                        >
                            <Icon size={16} className="mb-0.5" />
                            <span>{item.label.split(' ')[0]}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
