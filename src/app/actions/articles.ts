'use server';

import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export interface AdminArticleItem {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    author: string;
    date: string;
    tags: string[];
    image?: string;
    locale: string;
    geoStatus: {
        isReady: boolean;
        charCount: number;
        hasImage: boolean;
        hasTags: boolean;
    };
}

async function verifyAdminAuth(): Promise<boolean> {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return session?.value === 'authenticated';
}

const getArticlesDir = (locale: string) =>
    path.join(process.cwd(), 'src', 'content', 'articles', locale);

export async function getAdminArticlesAction(locale: string = 'en'): Promise<{
    success: boolean;
    data?: AdminArticleItem[];
    error?: string;
}> {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
        return { success: false, error: 'Unauthorized. Please log in.' };
    }

    try {
        const dir = getArticlesDir(locale);
        if (!fs.existsSync(dir)) {
            return { success: true, data: [] };
        }

        const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
        const minChars = locale === 'en' ? 40 : 20;

        const articles: AdminArticleItem[] = files.map((file) => {
            const content = fs.readFileSync(path.join(dir, file), 'utf-8');
            const data = JSON.parse(content);
            const desc = data.description || '';
            const isReady = desc.trim().length >= minChars && Boolean(data.image) && (data.tags || []).length > 0;

            return {
                id: data.id || file.replace('.json', ''),
                title: data.title || '',
                slug: data.slug || file.replace('.json', ''),
                description: desc,
                content: data.content || '',
                author: data.author || 'WSAI Research',
                date: data.date || new Date().toISOString(),
                tags: data.tags || [],
                image: data.image || '',
                locale,
                geoStatus: {
                    isReady,
                    charCount: desc.trim().length,
                    hasImage: Boolean(data.image),
                    hasTags: (data.tags || []).length > 0,
                },
            };
        });

        // Sort by date descending
        articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return { success: true, data: articles };
    } catch (e: any) {
        return { success: false, error: e.message || 'Failed to load articles.' };
    }
}

export async function saveAdminArticleAction(
    article: {
        id?: string;
        title: string;
        slug: string;
        description: string;
        content: string;
        author: string;
        date?: string;
        tags: string[];
        image?: string;
    },
    locale: string = 'en'
): Promise<{ success: boolean; error?: string }> {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
        return { success: false, error: 'Unauthorized. Please log in.' };
    }

    if (!article.slug || !article.title) {
        return { success: false, error: 'Slug and Title are required.' };
    }

    try {
        const dir = getArticlesDir(locale);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const safeSlug = article.slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-');
        const filePath = path.join(dir, `${safeSlug}.json`);

        const payload = {
            id: article.id || `${locale}-${safeSlug}`,
            title: article.title.trim(),
            slug: safeSlug,
            description: article.description.trim(),
            content: article.content,
            author: article.author.trim() || 'WSAI Team',
            date: article.date || new Date().toISOString(),
            tags: article.tags || [],
            image: article.image || '',
        };

        fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), 'utf-8');

        // Revalidate frontend paths
        revalidatePath(`/${locale}/blog`);
        revalidatePath(`/${locale}/blog/${safeSlug}`);
        revalidatePath(`/llms.txt`);
        revalidatePath(`/llms-full.txt`);

        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || 'Failed to save article.' };
    }
}

export async function deleteAdminArticleAction(
    slug: string,
    locale: string = 'en'
): Promise<{ success: boolean; error?: string }> {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
        return { success: false, error: 'Unauthorized. Please log in.' };
    }

    try {
        const dir = getArticlesDir(locale);
        const filePath = path.join(dir, `${slug}.json`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        revalidatePath(`/${locale}/blog`);
        revalidatePath(`/llms.txt`);

        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || 'Failed to delete article.' };
    }
}
