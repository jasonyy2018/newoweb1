const fs = require('fs');
const path = require('path');
const https = require('https');

const locales = ['en'];
const baseDir = path.join(process.cwd(), 'src/content/articles');

const urlSet = new Set();
const urlToSlug = {};

locales.forEach(locale => {
    const dir = path.join(baseDir, locale);
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    files.forEach(file => {
        const article = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
        if (article.image) {
            urlSet.add(article.image);
            if (!urlToSlug[article.image]) urlToSlug[article.image] = [];
            urlToSlug[article.image].push(article.slug);
        }
    });
});

const urls = [...urlSet];

function testUrl(url) {
    return new Promise((resolve) => {
        const req = https.get(url, { timeout: 10000 }, (res) => {
            resolve({ url, status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 400 });
            res.resume();
        });
        req.on('error', (err) => resolve({ url, status: 'ERROR', ok: false, error: err.message }));
        req.on('timeout', () => { req.destroy(); resolve({ url, status: 'TIMEOUT', ok: false }); });
    });
}

async function run() {
    let failures = [];
    for (let i = 0; i < urls.length; i += 5) {
        const batch = urls.slice(i, i + 5);
        const results = await Promise.all(batch.map(testUrl));
        results.forEach(r => {
            if (!r.ok) {
                failures.push(r);
            }
        });
    }

    console.log(`Total unique URLs: ${urls.length}`);
    console.log(`Failures: ${failures.length}`);
    console.log('');
    failures.forEach(f => {
        const slugs = urlToSlug[f.url];
        console.log(`SLUG: ${slugs.join(', ')}`);
        console.log(`URL: ${f.url}`);
        console.log(`STATUS: ${f.status}`);
        console.log('---');
    });
}

run();
