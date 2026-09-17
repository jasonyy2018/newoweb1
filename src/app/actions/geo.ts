'use server';

import { cookies } from 'next/headers';
import { runEnterpriseGeoAudit, GeoAuditReport } from '@/lib/geo/geoOptimizer';

async function verifyAdminAuth(): Promise<boolean> {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return session?.value === 'authenticated';
}

export async function getGeoAuditReportAction(): Promise<{
    success: boolean;
    data?: GeoAuditReport;
    error?: string;
}> {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
        return { success: false, error: 'Unauthorized. Please log in.' };
    }

    try {
        const report = await runEnterpriseGeoAudit();
        return { success: true, data: report };
    } catch (e: any) {
        return { success: false, error: e.message || 'Failed to run GEO audit.' };
    }
}
