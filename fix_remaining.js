const fs = require('fs');
const path = require('path');

// Use URLs already confirmed working from working articles
const fixMap = {
    'blockchain-supply-chain-transparency': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    'microservices-vs-monolith-2026': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    'pwa-modern-era': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
};

const locales = ['en', 'zh', 'ja'];
const baseDir = path.join(process.cwd(), 'src/content/articles');
let fixCount = 0;

locales.forEach(locale => {
    const dir = path.join(baseDir, locale);
    if (!fs.existsSync(dir)) return;

    Object.keys(fixMap).forEach(slug => {
        const filePath = path.join(dir, `${slug}.json`);
        if (!fs.existsSync(filePath)) return;

        const article = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        article.image = fixMap[slug];
        fs.writeFileSync(filePath, JSON.stringify(article, null, 2));
        fixCount++;
    });
});

console.log(`Fixed ${fixCount} remaining broken image URLs.`);
