'use server';

import { cookies } from 'next/headers';
import { redirect } from '@/i18n/routing';

export async function adminLogin(formData: FormData, locale: string) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const adminUser = process.env.ADMIN_USERNAME || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'wisdomitc2025';

    if (username === adminUser && password === adminPass) {
        (await cookies()).set('admin_session', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });
        return { success: true };
    }

    return { success: false, error: 'Invalid credentials' };
}

export async function adminLogout(locale: string) {
    (await cookies()).delete('admin_session');
    redirect({ href: '/admin/login', locale });
}
