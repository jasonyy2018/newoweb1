import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';
import '@/app/globals.css';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const viewport: Viewport = {
    themeColor: '#FF7A00',
    width: 'device-width',
    initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';
    const isJa = locale === 'ja';

    const title = isEn
        ? "WSAI - Artificial Intelligence Powered Digital Transformation"
        : isJa
            ? "WSAI - AIによるデジタルトランスフォーメーション"
            : "WSAI - 人工智能驱动的数字化转型专家";

    const description = isEn
        ? "WSAI provides professional AI solutions, IoT system integration, and customized software development to help enterprises achieve digital transformation."
        : isJa
            ? "WSAIは、企業のデジタルトランスフォーメーションを支援するために、プロフェッショナルなAIソリューション、IoTシステム統合、カスタマイズされたソフトウェア開発を提供します。"
            : "WSAI提供专业的人工智能解决方案、IoT系统集成及定制化软件开发，助力企业实现智慧数字化转型。";

    return {
        title,
        description,
        keywords: ["AI solutions", "Digital Transformation", "IoT", "Software Development", "Artificial Intelligence", "人工智能", "数字化转型", "物联网"],
        alternates: {
            canonical: `/${locale}`,
            languages: {
                'zh': '/zh',
                'en': '/en',
                'ja': '/ja',
            },
        },
        openGraph: {
            title,
            description,
            url: `/${locale}`,
            siteName: 'WSAI',
            images: [
                {
                    url: '/logo.png',
                    width: 800,
                    height: 600,
                },
            ],
            locale,
            type: 'website',
        },
    };
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "WSAI",
        "url": "https://www.wsai.example.com",
        "logo": "https://www.wsai.example.com/logo.png",
        "description": "Artificial Intelligence Powered Digital Transformation Expert",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Room 501, Innovation Building",
            "addressLocality": "Digital Center",
            "addressCountry": "CN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+86-123-4567-8910",
            "contactType": "customer service"
        }
    };

    return (
        <html lang={locale} className={`${inter.variable} scroll-smooth`}>
            <head>
                <link rel="icon" href="/favicon.png" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="font-sans antialiased text-dark bg-light">
                <NextIntlClientProvider messages={messages}>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                    <FloatingCTA />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
