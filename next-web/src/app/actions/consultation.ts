'use server';

import prisma from '@/lib/prisma/client';
import { revalidatePath } from 'next/cache';

export async function submitConsultation(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const company = formData.get('company') as string;
    const phone = formData.get('phone') as string;
    const service = formData.get('service') as string;
    const message = formData.get('message') as string;

    try {
        await prisma.consultation.create({
            data: {
                name,
                email,
                company,
                phone,
                service,
                message,
            },
        });

        revalidatePath('/admin/consultations');
        return { success: true };
    } catch (error) {
        console.error('Failed to submit consultation:', error);
        return { success: false, error: 'Database error' };
    }
}
