'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

// AdSense 广告位 Slot ID 配置
// 需要在 AdSense 控制台创建后填入真实 ID
const AD_SLOT_IDS: Record<string, string> = {
    'hero-bottom': '',        // 填入真实 slot ID
    'between-sections': '',   // 填入真实 slot ID
    'before-footer': '',      // 填入真实 slot ID
    'sidebar': '',            // 填入真实 slot ID
    'in-content': '',         // 填入真实 slot ID
    'default': '',            // 默认 slot ID
};

interface AdSlotProps {
    /** 广告位样式类型 */
    format?: 'horizontal' | 'vertical' | 'rectangle' | 'auto';
    /** 自定义类名 */
    className?: string;
    /** 广告位ID */
    slotId?: string;
}

/**
 * Google AdSense 广告位组件
 * 支持多种广告格式：水平横幅、垂直侧边栏、矩形
 * 特性：懒加载、CLS优化、错误处理
 */
export default function AdSlot({
    format = 'horizontal',
    className = '',
    slotId = 'default'
}: AdSlotProps) {
    const adRef = useRef<HTMLModElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isAdLoaded = useRef(false);
    const [isVisible, setIsVisible] = useState(false);

    // Intersection Observer 懒加载 - 提前200px开始加载
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // 广告加载逻辑
    useEffect(() => {
        if (!isVisible || isAdLoaded.current) return;

        try {
            if (typeof window !== 'undefined' && adRef.current) {
                if (adRef.current.innerHTML.trim() === '') {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                    isAdLoaded.current = true;
                }
            }
        } catch (error) {
            console.error('AdSense error:', error);
        }
    }, [isVisible]);

    // 根据格式定义样式 - 固定尺寸减少 CLS
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
            minHeight: '600px',
        },
        rectangle: {
            display: 'block',
            width: '336px',
            height: '280px',
            minHeight: '280px',
        },
        auto: {
            display: 'block',
            width: '100%',
            height: 'auto',
            minHeight: '250px',
        }
    };

    const containerStyles: Record<string, string> = {
        horizontal: 'w-full py-4',
        vertical: 'w-[160px]',
        rectangle: 'w-[336px]',
        auto: 'w-full py-4'
    };

    // 获取 slot ID
    const adSlotId = AD_SLOT_IDS[slotId] || AD_SLOT_IDS['default'];

    return (
        <div
            ref={containerRef}
            className={`ad-container ${containerStyles[format]} ${className}`}
            data-ad-position={slotId}
        >
            {isVisible && (
                <ins
                    ref={adRef}
                    className="adsbygoogle"
                    style={formatStyles[format]}
                    data-ad-client="ca-pub-1986601466530113"
                    data-ad-slot={adSlotId || undefined}
                    data-ad-format={format === 'auto' ? 'auto' : undefined}
                    data-full-width-responsive={format === 'horizontal' || format === 'auto' ? 'true' : undefined}
                />
            )}
        </div>
    );
}
