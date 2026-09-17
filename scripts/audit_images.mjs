import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const projectRoot = process.cwd();
const urls = new Set();
const urlSources = new Map();

function addUrl(url, source) {
    if (!url || typeof url !== 'string') return;
    const clean = url.trim();
    if (clean.startsWith('http')) {
        urls.add(clean);
        if (!urlSources.has(clean)) {
            urlSources.set(clean, []);
        }
        urlSources.get(clean).push(source);
    }
}

// 1. Articles
['zh', 'en', 'ja'].forEach((loc) => {
    const dir = path.join(projectRoot, 'src', 'content', 'articles', loc);
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir)
        .filter((f) => f.endsWith('.json'))
        .forEach((f) => {
            try {
                const d = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
                if (d.image) addUrl(d.image, `article:${loc}/${f}`);
            } catch (e) {}
        });
});

// 2. Scan all ts/tsx files for image URLs
function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
        const full = path.join(dir, ent.name);
        if (ent.isDirectory()) {
            if (ent.name !== 'node_modules' && ent.name !== '.next') {
                scanDir(full);
            }
        } else if (ent.name.endsWith('.tsx') || ent.name.endsWith('.ts') || ent.name.endsWith('.json')) {
            const content = fs.readFileSync(full, 'utf8');
            const matches = content.match(/https:\/\/images\.unsplash\.com\/[^\s'"`]+/g) || [];
            for (const m of matches) {
                addUrl(m, path.relative(projectRoot, full));
            }
        }
    }
}

scanDir(path.join(projectRoot, 'src'));

console.log(`Auditing ${urls.size} unique external image URLs...`);

async function checkUrl(url) {
    return new Promise((resolve) => {
        const client = url.startsWith('https') ? https : http;
        try {
            const req = client.request(
                url,
                { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 8000 },
                (res) => {
                    // consume just a tiny chunk then destroy to be fast
                    res.destroy();
                    if (res.statusCode >= 200 && res.statusCode < 400) {
                        resolve({ url, ok: true, status: res.statusCode });
                    } else {
                        resolve({ url, ok: false, status: res.statusCode });
                    }
                }
            );
            req.on('error', (e) => resolve({ url, ok: false, error: e.message }));
            req.on('timeout', () => {
                req.destroy();
                resolve({ url, ok: false, error: 'TIMEOUT' });
            });
            req.end();
        } catch (e) {
            resolve({ url, ok: false, error: e.message });
        }
    });
}

async function main() {
    const broken = [];
    for (const url of urls) {
        const result = await checkUrl(url);
        if (!result.ok) {
            broken.push({
                url,
                status: result.status || result.error,
                sources: urlSources.get(url) || [],
            });
            console.log(`❌ BROKEN (${result.status || result.error}): ${url}`);
            console.log(`   Used in: ${(urlSources.get(url) || []).join(', ')}`);
        } else {
            console.log(`✅ OK (${result.status}): ${url.split('?')[0]}`);
        }
    }

    console.log(`\nAudit finished: ${broken.length} broken out of ${urls.size} URLs.`);
    fs.writeFileSync(
        path.join(projectRoot, 'reports', 'broken_images.json'),
        JSON.stringify(broken, null, 2),
        'utf8'
    );
}

main().catch(console.error);
