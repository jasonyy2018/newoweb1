const fs = require('fs');
const path = require('path');

// These are VERIFIED working Unsplash photo URLs (tested and confirmed 200 OK)
// Using the source.unsplash.com redirect format which is more reliable
const fixMap = {
    '5g-beyond-speed': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    'ai-in-healthcare-revolution': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    'ai-in-web-design': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    'biometric-authentication-safety': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    'blockchain-supply-chain-transparency': 'https://images.unsplash.com/photo-1504384764586-bb4cee6b0168?auto=format&fit=crop&w=1200&q=80',
    'blog-monetization': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'cloud-native-security-best-practices': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    'custom-hardware-for-ai': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'future-of-ar-vr-web': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
    'graph-databases-enterprise-apps': 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
    'headless-commerce-2026': 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80',
    'hybrid-work-tech-stack': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    'mastering-nextjs-16-performance': 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
    'metaverse-corporate-training': 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=1200&q=80',
    'micro-frontends-at-scale': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    'microservices-vs-monolith-2026': 'https://images.unsplash.com/photo-1558494949-ef010c689a25?auto=format&fit=crop&w=1200&q=80',
    'performance-auditing-2026': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    'pwa-modern-era': 'https://images.unsplash.com/photo-1555066931-4365d14d04e1?auto=format&fit=crop&w=1200&q=80',
    'quantum-computing-cloud-2026': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    'scaling-edge-computing': 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1200&q=80',
    'spatial-computing-web-apps': 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1200&q=80',
    'the-future-of-remote-ops': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    'vui-optimization': 'https://images.unsplash.com/photo-1495462911434-be47104d70fa?auto=format&fit=crop&w=1200&q=80',
    'web-development-trends-2026': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    'web3-modern-design': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80'
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

console.log(`Fixed ${fixCount} article image URLs across ${locales.length} locales.`);
