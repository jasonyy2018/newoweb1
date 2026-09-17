import { cookies } from 'next/headers';
import { redirect } from '@/i18n/routing';
import AdminNav from '@/components/admin/AdminNav';
import GeoDashboardClient from '@/components/admin/GeoDashboardClient';
import { runEnterpriseGeoAudit } from '@/lib/geo/geoOptimizer';

export default async function AdminGeoPage({
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

    const report = await runEnterpriseGeoAudit();

    return (
        <div className="min-h-screen bg-slate-50">
            <AdminNav currentTab="geo" locale={locale} />
            <main className="container mx-auto px-4 py-8">
                <GeoDashboardClient initialReport={report} locale={locale} />
            </main>
        </div>
    );
}
