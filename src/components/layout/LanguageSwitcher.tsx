'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (nextLocale: string) => {
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <div className="flex space-x-2">
            {['zh', 'en', 'ja'].map((loc) => (
                <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={`px-2 py-1 rounded-md transition-colors ${locale === loc ? 'text-secondary font-bold' : 'text-white hover:text-secondary'
                        }`}
                >
                    {loc.toUpperCase()}
                </button>
            ))}
        </div>
    );
}
