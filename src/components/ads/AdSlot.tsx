'use client';

import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

interface AdSlotProps {
    /** 广告位样式类型 */
    format?: 'horizontal' | 'vertical' | 'rectangle' | 'auto';
    /** 自定义类名 */
    className?: string;
    /** 广告位ID，用于调试 */
    slotId?: string;
}

/**
 * Google AdSense 广告位组件
 * 支持多种广告格式：水平横幅、垂直侧边栏、矩形
 */
export default function AdSlot({ 
    format = 'horizontal', 
    className = '',
    slotId = 'default'
}: AdSlotProps) {
    const adRef = useRef<HTMLModElement>(null);
    const isAdLoaded = useRef(false);

    useEffect(() => {
        // 确保只加载一次广告
        if (isAdLoaded.current) return;
        
        try {
            if (typeof window !== 'undefined' && adRef.current) {
                // 检查广告容器是否已经有广告
                if (adRef.current.innerHTML.trim() === '') {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                    isAdLoaded.current = true;
                }
            }
        } catch (error) {
            console.error('AdSense error:', error);
        }
    }, []);

    // 根据格式定义样式
    const formatStyles: Record<string, React.CSSProperties> = {
        horizontal: {
            display: 'block',
            width: '100%',
            height: '90px',
            minHeight: '90px',
        },
        vertical: {
            display: 'block',
            width: '160px',
            height: '600px',
        },
        rectangle: {
            display: 'block',
            width: '336px',
            height: '280px',
        },
        auto: {
            display: 'block',
            width: '100%',
            height: 'auto',
        }
    };

    const containerStyles: Record<string, string> = {
        horizontal: 'w-full py-4',
        vertical: 'w-[160px]',
        rectangle: 'w-[336px]',
        auto: 'w-full py-4'
    };

    return (
        <div 
            className={`ad-container ${containerStyles[format]} ${className}`}
            data-ad-slot={slotId}
        >
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={formatStyles[format]}
                data-ad-client="ca-pub-1986601466530113"
                data-ad-format={format === 'auto' ? 'auto' : undefined}
                data-full-width-responsive={format === 'horizontal' || format === 'auto' ? 'true' : undefined}
            />
        </div>
    );
}
