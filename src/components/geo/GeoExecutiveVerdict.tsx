import React from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, ArrowRight, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export interface DecisionMetric {
    label: string;
    value: string;
    subtext?: string;
}

export interface GeoExecutiveVerdictProps {
    locale?: string;
    badgeTitle?: string;
    protocolText?: string;
    verdictTitle?: string;
    directConclusion: string;
    metrics: DecisionMetric[];
    verifiedStandard?: string;
    ctaText?: string;
    ctaHref?: string;
}

/**
 * Enterprise GEO Executive Verdict Component
 * Theoretical Foundation: Generative Engine Optimization (GEO) Standards
 * - Conclusion First (AI extracts 40+ char direct verdict without fluff)
 * - Statistics & Quantified Metrics (concrete numbers with units)
 * - Cite Sources & Protocol Verification
 * - Microdata (itemScope, itemType="https://schema.org/Answer", itemProp="text")
 */
export default function GeoExecutiveVerdict({
    locale = 'en',
    badgeTitle = 'AI Executive Verdict (Position 0)',
    protocolText = 'Enterprise Verified • 2026 Protocol',
    verdictTitle = 'Direct 30-Second Executive Summary:',
    directConclusion,
    metrics = [],
    verifiedStandard = 'Tested under enterprise peak workloads & ISO/IEC 25010 compliance benchmarks.',
    ctaText = 'Consult Architecture Team',
    ctaHref = '/contact',
}: GeoExecutiveVerdictProps) {
    const contactUrl = ctaHref.startsWith('/') && !ctaHref.startsWith(`/${locale}`) 
        ? `/${locale}${ctaHref}` 
        : ctaHref;

    return (
        <div
            data-ai-overview="direct-verdict"
            itemScope
            itemType="https://schema.org/Answer"
            className="my-8 p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-primary/40 rounded-3xl shadow-xl text-white relative overflow-hidden"
        >
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[90px] rounded-full pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none -ml-20 -mb-20" />

            {/* Top Bar: GEO Indicator & Protocol Tag */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/20 border border-primary/40 text-primary-light rounded-full text-xs font-bold tracking-wider uppercase shadow-inner">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span className="text-primary font-semibold">{badgeTitle}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300 font-medium bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{protocolText}</span>
                </div>
            </div>

            {/* Core Direct Verdict (First-sentence priority for AI Engine extraction) */}
            <div className="space-y-2 mb-6 relative z-10">
                <div className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span>{verdictTitle}</span>
                </div>
                <p
                    itemProp="text"
                    className="text-base sm:text-lg font-semibold text-gray-100 leading-relaxed"
                >
                    {directConclusion}
                </p>
            </div>

            {/* 3 Decision & Quantified Value Metrics */}
            {metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-5 border-t border-white/10 text-xs mb-6 relative z-10">
                    {metrics.map((metric, idx) => (
                        <div
                            key={idx}
                            className="p-4 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur rounded-2xl border border-white/10 flex flex-col justify-between"
                        >
                            <div>
                                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block mb-1">
                                    {metric.label}
                                </span>
                                <div className="text-2xl font-black text-primary tracking-tight">
                                    {metric.value}
                                </div>
                            </div>
                            {metric.subtext && (
                                <div className="text-[11px] text-gray-300 mt-2 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                    <span className="truncate">{metric.subtext}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Bottom Enterprise Conversion & Verification Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-xs text-gray-300">
                <div className="flex items-center gap-2 text-gray-400">
                    <BarChart3 className="w-4 h-4 text-primary shrink-0" />
                    <span className="line-clamp-1">{verifiedStandard}</span>
                </div>

                <Link
                    href={contactUrl}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold transition-all shadow-md hover:shadow-primary/30 shrink-0"
                >
                    <span>{ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>
        </div>
    );
}
