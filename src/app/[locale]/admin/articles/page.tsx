import { cookies } from 'next/headers';
import { redirect } from '@/i18n/routing';
import AdminNav from '@/components/admin/AdminNav';
import ArticleCmsClient from '@/components/admin/ArticleCmsClient';
import { getAdminArticlesAction } from '@/app/actions/articles';

export default async function AdminArticlesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session || session.value !== 'authenticated') {
        redirect({ href: '/admin/login', locale });
    }

    const res = await getAdminArticlesAction(locale);
    const initialArticles = res.data || [];

    return (
        <div className="min-h-screen bg-slate-50">
            <AdminNav currentTab="articles" locale={locale} />
            <main className="container mx-auto px-4 py-8">
                <ArticleCmsClient initialArticles={initialArticles} locale={locale} />
            </main>
        </div>
    );
}
