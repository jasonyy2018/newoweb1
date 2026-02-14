const fs = require('fs');
const path = require('path');
const https = require('https');

const baseDir = path.join(process.cwd(), 'src/content/articles/en');
const files = fs.readdirSync(baseDir).filter(f => f.endsWith('.json'));

const articles = files.map(f => {
    const a = JSON.parse(fs.readFileSync(path.join(baseDir, f), 'utf8'));
    return { slug: a.slug, image: a.image };
});

function testUrl(url) {
    return new Promise((resolve) => {
        const req = https.get(url, { timeout: 8000 }, (res) => {
            resolve(res.statusCode >= 200 && res.statusCode < 400);
            res.resume();
        });
        req.on('error', () => resolve(false));
        req.on('timeout', () => { req.destroy(); resolve(false); });
    });
}

async function run() {
    const broken = [];
    const working = [];
    for (const a of articles) {
        const ok = await testUrl(a.image);
        if (!ok) {
            broken.push(a.slug);
        } else {
            working.push(a.slug);
        }
    }
    fs.writeFileSync('broken_slugs.json', JSON.stringify({ broken, working }, null, 2));
    console.log(`Broken: ${broken.length}, Working: ${working.length}`);
    console.log('Results written to broken_slugs.json');
}

run();
