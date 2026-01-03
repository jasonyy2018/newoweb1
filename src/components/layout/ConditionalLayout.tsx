'use client';

import { usePathname } from 'next/navigation';

export default function ConditionalLayout({
    children,
    excludePaths = []
}: {
    children: React.ReactNode;
    excludePaths?: string[];
}) {
    const pathname = usePathname();

    // Check if the current pathname starts with any of the excluded paths
    // We need to account for the locale prefix (e.g., /zh/admin, /en/admin)
    const isExcluded = excludePaths.some(path => {
        // Pattern to match /locale/path or /path
        const regex = new RegExp(`^/([a-z]{2})?${path.replace(/\//g, '\\/')}`);
        return regex.test(pathname);
    });

    if (isExcluded) return null;

    return <>{children}</>;
}
