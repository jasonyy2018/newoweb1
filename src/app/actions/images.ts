'use server';

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export interface ImageHealthItem {
    url: string;
    status: number | string;
    isOk: boolean;
    sources: string[];
    category: 'solution' | 'case' | 'blog' | 'static';
}

async function verifyAdminAuth(): Promise<boolean> {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return session?.value === 'authenticated';
}

async function checkSingleUrl(url: string): Promise<{ ok: boolean; status: number | string }> {
    if (!url.startsWith('http')) {
        // Local asset
        const localPath = path.join(process.cwd(), 'public', url.startsWith('/') ? url.slice(1) : url);
        const exists = fs.existsSync(localPath);
        return { ok: exists, status: exists ? 200 : 404 };
    }

    return new Promise((resolve) => {
        const client = url.startsWith('https') ? https : http;
        try {
            const req = client.request(
                url,
                { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 6000 },
                (res) => {
                    res.destroy();
                    if (res.statusCode && res.statusCode >= 200 && res.statusCode < 400) {
                        resolve({ ok: true, status: res.statusCode });
                    } else {
                        resolve({ ok: false, status: res.statusCode || 'FAIL' });
                    }
                }
            );
            req.on('error', (e) => resolve({ ok: false, status: e.message }));
            req.on('timeout', () => {
                req.destroy();
                resolve({ ok: false, status: 'TIMEOUT' });
            });
            req.end();
        } catch (e: any) {
            resolve({ ok: false, status: e.message });
        }
    });
}

export async function auditImagesAction(): Promise<{
    success: boolean;
    data?: {
        total: number;
        healthy: number;
        broken: number;
        items: ImageHealthItem[];
    };
    error?: string;
}> {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
        return { success: false, error: 'Unauthorized. Please log in.' };
    }

    const projectRoot = process.cwd();
    const urlMap = new Map<string, { sources: string[]; category: 'solution' | 'case' | 'blog' | 'static' }>();

    function registerUrl(url: string, source: string, category: 'solution' | 'case' | 'blog' | 'static') {
        if (!url || typeof url !== 'string') return;
        const clean = url.trim();
        if (!urlMap.has(clean)) {
            urlMap.set(clean, { sources: [], category });
        }
        urlMap.get(clean)!.sources.push(source);
    }

    // 1. Solution images
    const solFile = path.join(projectRoot, 'src', 'app', '[locale]', 'solutions', '[slug]', 'page.tsx');
    if (fs.existsSync(solFile)) {
        const content = fs.readFileSync(solFile, 'utf-8');
        const matches = content.match(/https:\/\/images\.unsplash\.com\/[^\s'"`]+/g) || [];
        matches.forEach((m) => registerUrl(m, 'Solution Detail', 'solution'));
    }

    // 2. Case study images
    const caseFile = path.join(projectRoot, 'src', 'app', '[locale]', 'case-studies', '[slug]', 'page.tsx');
    if (fs.existsSync(caseFile)) {
        const content = fs.readFileSync(caseFile, 'utf-8');
        const matches = content.match(/https:\/\/images\.unsplash\.com\/[^\s'"`]+/g) || [];
        matches.forEach((m) => registerUrl(m, 'Case Studies Detail', 'case'));
    }

    // 3. Blog articles images
    const blogDir = path.join(projectRoot, 'src', 'content', 'articles', 'en');
    if (fs.existsSync(blogDir)) {
        const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.json'));
        for (const file of files) {
            try {
                const article = JSON.parse(fs.readFileSync(path.join(blogDir, file), 'utf-8'));
                if (article.image) {
                    registerUrl(article.image, `Blog: ${article.slug}`, 'blog');
                }
            } catch (e) {}
        }
    }

    // 4. Brand assets
    registerUrl('/logo.png', 'Header / Footer Logo', 'static');
    registerUrl('/favicon.png', 'Site Favicon', 'static');

    // Run batch health checks
    const items: ImageHealthItem[] = [];
    let healthyCount = 0;
    let brokenCount = 0;

    for (const [url, meta] of urlMap.entries()) {
        const res = await checkSingleUrl(url);
        if (res.ok) healthyCount++;
        else brokenCount++;

        items.push({
            url,
            status: res.status,
            isOk: res.ok,
            sources: meta.sources,
            category: meta.category,
        });
    }

    return {
        success: true,
        data: {
            total: items.length,
            healthy: healthyCount,
            broken: brokenCount,
            items,
        },
    };
}
