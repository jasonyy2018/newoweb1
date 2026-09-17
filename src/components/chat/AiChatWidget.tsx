'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Bot, X, MessageSquare, RotateCw, Maximize2, Minimize2, Sparkles, ChevronLeft, EyeOff } from 'lucide-react';

const CHAT_IFRAME_URL = 'http://156.238.249.149:8082/chat/dfacb5320257c918?mode=embed';

export default function AiChatWidget() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDocked, setIsDocked] = useState(false);
    const [showTip, setShowTip] = useState(true);
    const [iframeKey, setIframeKey] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Auto dismiss tip after 10s if not interacted
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTip(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    // NEVER render in backend admin pages
    if (pathname && pathname.includes('/admin')) {
        return null;
    }

    const handleReload = () => {
        setIsLoading(true);
        setIframeKey(prev => prev + 1);
    };

    const handleOpen = () => {
        setIsDocked(false);
        setIsOpen(true);
        setShowTip(false);
    };

    const handleDock = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(false);
        setShowTip(false);
        setIsDocked(true);
    };

    const handleUndock = () => {
        setIsDocked(false);
        setIsOpen(true);
    };

    return (
        <>
            {/* 1. Docked Edge Trigger Tab (Shown when user chose to hide the floating button) */}
            {isDocked && (
                <button
                    onClick={handleUndock}
                    title="点击唤出 AI 智能客服"
                    aria-label="唤出 AI 智能客服"
                    className="fixed right-0 bottom-28 z-[9999] group flex items-center gap-1.5 bg-gradient-to-l from-primary via-orange-500 to-amber-500 text-white pl-2.5 pr-1.5 py-2.5 rounded-l-2xl shadow-2xl hover:pl-3.5 hover:shadow-primary/30 transition-all duration-200 border-y border-l border-white/30 cursor-pointer"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    <div className="relative flex items-center justify-center">
                        <Bot size={18} />
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
                    </div>
                    <span className="text-xs font-bold [writing-mode:vertical-rl] tracking-wider py-0.5">
                        AI客服
                    </span>
                </button>
            )}

            {/* 2. Normal Floating Widget Container */}
            {!isDocked && (
                <aside aria-label="AI 智能客服系统" className="fixed bottom-6 right-6 z-[9999] font-sans antialiased">
                    {/* Welcome Tip Bubble (Shown before opening) */}
                    {!isOpen && showTip && (
                        <div className="relative mb-3 mr-1 max-w-[280px] bg-white text-slate-800 p-4 rounded-2xl shadow-2xl border border-slate-200 animate-bounce-subtle">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowTip(false);
                                }}
                                className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-1 rounded-full transition-colors"
                                aria-label="关闭提示"
                            >
                                <X size={14} />
                            </button>
                            <div className="flex items-center gap-2 mb-1">
                                <Sparkles size={16} className="text-primary fill-primary/20" />
                                <span className="font-bold text-xs text-slate-900">葳澄 AI 智能小助手</span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                您好！我是您的专属 AI 客服，点击即可咨询解决方案与技术细节。
                            </p>
                            <div className="absolute -bottom-2 right-8 w-3 h-3 bg-white border-r border-b border-slate-200 transform rotate-45" />
                        </div>
                    )}

                    {/* Chat Window Dialog Container */}
                    {isOpen && (
                        <div
                            className={`bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 ease-in-out mb-3 ${
                                isExpanded
                                    ? 'fixed inset-4 sm:inset-10 w-auto h-auto max-w-none max-h-none z-[10000]'
                                    : 'w-[90vw] sm:w-[420px] h-[580px] max-h-[82vh]'
                            }`}
                        >
                            {/* Header */}
                            <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-orange-400 text-white shadow-md">
                                        <Bot size={20} />
                                        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5 text-white">
                                            葳澄简小助理
                                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-normal">
                                                在线
                                            </span>
                                        </h3>
                                        <p className="text-[11px] text-slate-400 leading-none mt-0.5">
                                            WSAI 企业级生成式智能问答
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={handleReload}
                                        title="刷新对话"
                                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                    >
                                        <RotateCw size={15} />
                                    </button>
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        title={isExpanded ? '还原窗口' : '最大化'}
                                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors hidden sm:block"
                                    >
                                        {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                                    </button>
                                    <button
                                        onClick={handleDock}
                                        title="隐藏至侧边栏（随时可唤出）"
                                        className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                                    >
                                        <EyeOff size={15} />
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        title="最小化为悬浮球"
                                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                    >
                                        <X size={17} />
                                    </button>
                                </div>
                            </div>

                            {/* Iframe Body with Loading State */}
                            <div className="relative flex-1 w-full bg-slate-50 overflow-hidden">
                                {isLoading && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-500 gap-3 z-10">
                                        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                                        <span className="text-xs font-medium">正在接入 葳澄简小助理...</span>
                                    </div>
                                )}
                                <iframe
                                    key={iframeKey}
                                    src={CHAT_IFRAME_URL}
                                    onLoad={() => setIsLoading(false)}
                                    className="w-full h-full border-0"
                                    allow="microphone"
                                    title="葳澄 AI 智能客服"
                                />
                            </div>
                        </div>
                    )}

                    {/* Floating Pill with Integrated Hide Button */}
                    <div className="flex items-center gap-1 bg-gradient-to-r from-primary via-orange-500 to-amber-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 border border-white/20 p-1 pl-3.5 ml-auto">
                        {/* Main Trigger Button */}
                        <button
                            onClick={() => {
                                setIsOpen(!isOpen);
                                setShowTip(false);
                            }}
                            className="flex items-center gap-2.5 py-1.5 text-white font-bold text-sm tracking-wide cursor-pointer select-none"
                            aria-label={isOpen ? '收起 AI 客服' : '打开 AI 客服'}
                        >
                            <div className="relative">
                                {isOpen ? (
                                    <X size={20} />
                                ) : (
                                    <MessageSquare size={20} className="hover:rotate-12 transition-transform" />
                                )}
                                {!isOpen && (
                                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                    </span>
                                )}
                            </div>
                            <span>{isOpen ? '收起客服' : 'AI 智能客服'}</span>
                        </button>

                        {/* Distinct Hide Button */}
                        <button
                            onClick={handleDock}
                            title="隐藏至侧边栏（随时可从右侧唤出）"
                            aria-label="隐藏至侧边栏"
                            className="w-7 h-7 rounded-full bg-black/15 hover:bg-black/35 text-white/90 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <EyeOff size={13} />
                        </button>
                    </div>
                </aside>
            )}
        </>
    );
}
