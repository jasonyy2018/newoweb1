import { cookies } from 'next/headers';
import { redirect } from '@/i18n/routing';
import AdminNav from '@/components/admin/AdminNav';
import ImageHealthClient from '@/components/admin/ImageHealthClient';
import { auditImagesAction } from '@/app/actions/images';

export default async function AdminImagesPage({
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

    const res = await auditImagesAction();
    const initialData = res.data || {
        total: 0,
        healthy: 0,
        broken: 0,
        items: [],
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <AdminNav currentTab="images" locale={locale} />
            <main className="container mx-auto px-4 py-8">
                <ImageHealthClient initialData={initialData} />
            </main>
        </div>
    );
}
