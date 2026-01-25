'use client';

import AdSlot from './AdSlot';

interface AdBannerProps {
    /** 广告位置标识 */
    position: 'hero-bottom' | 'between-sections' | 'before-footer' | 'sidebar' | 'in-content';
    /** 自定义类名 */
    className?: string;
}

/**
 * 广告横幅包装组件
 * 提供统一的广告容器样式，带有视觉边界
 */
export default function AdBanner({ position, className = '' }: AdBannerProps) {
    // 根据位置确定广告格式
    const getFormat = () => {
        switch (position) {
            case 'sidebar':
                return 'vertical' as const;
            case 'in-content':
                return 'rectangle' as const;
            default:
                return 'horizontal' as const;
        }
    };

    // 根据位置确定容器样式
    const getContainerStyle = () => {
        switch (position) {
            case 'hero-bottom':
                return 'bg-white/5 backdrop-blur-sm border-y border-white/10';
            case 'between-sections':
                return 'bg-gray-50 border-y border-gray-100';
            case 'before-footer':
                return 'bg-gray-100 border-t border-gray-200';
            case 'sidebar':
                return 'bg-white rounded-xl shadow-lg p-4';
            case 'in-content':
                return 'bg-gray-50 rounded-xl p-4 my-6';
            default:
                return 'bg-gray-50';
        }
    };

    return (
        <div className={`ad-banner ${getContainerStyle()} ${className}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-center items-center">
                    <AdSlot
                        format={getFormat()}
                        slotId={position}
                    />
                </div>
                {/* 小型广告标识 */}
                <div className="text-center">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                        Advertisement
                    </span>
                </div>
            </div>
        </div>
    );
}
