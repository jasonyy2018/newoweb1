const fs = require('fs');
const path = require('path');
const https = require('https');

const locales = ['en'];
const baseDir = path.join(process.cwd(), 'src/content/articles');

// Collect unique image URLs
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
            urlToSlug[article.image] = article.slug;
        }
    });
});

const urls = [...urlSet];
console.log(`Testing ${urls.length} unique image URLs...\n`);

let completed = 0;
let failures = [];

function testUrl(url) {
    return new Promise((resolve) => {
        const req = https.get(url, { timeout: 10000 }, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                resolve({ url, status: res.statusCode, ok: true });
            } else {
                resolve({ url, status: res.statusCode, ok: false });
            }
            res.resume(); // consume response data to free memory
        });
        req.on('error', (err) => {
            resolve({ url, status: 'ERROR', ok: false, error: err.message });
        });
        req.on('timeout', () => {
            req.destroy();
            resolve({ url, status: 'TIMEOUT', ok: false });
        });
    });
}

async function run() {
    // Test in batches of 5
    for (let i = 0; i < urls.length; i += 5) {
        const batch = urls.slice(i, i + 5);
        const results = await Promise.all(batch.map(testUrl));
        results.forEach(r => {
            completed++;
            if (!r.ok) {
                failures.push(r);
                console.log(`❌ FAIL [${r.status}] ${urlToSlug[r.url]} -> ${r.url}`);
            }
        });
    }

    console.log(`\n--- Results ---`);
    console.log(`Total URLs tested: ${completed}`);
    console.log(`Failures: ${failures.length}`);
    if (failures.length > 0) {
        console.log('\nFailed URLs:');
        failures.forEach(f => console.log(`  ${urlToSlug[f.url]}: ${f.url} (${f.status})`));
    } else {
        console.log('All image URLs returned valid HTTP responses!');
    }
}

run();
