const fs = require('fs');
const path = require('path');

const locales = ['en', 'zh', 'ja'];
const baseDir = path.join(process.cwd(), 'src/content/articles');

let total = 0;
let missingImage = 0;
let svgReference = 0;
let localPngReference = 0;
let results = [];

locales.forEach(locale => {
    const dir = path.join(baseDir, locale);
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    files.forEach(file => {
        total++;
        const filePath = path.join(dir, file);
        const article = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (!article.image) {
            missingImage++;
            results.push({ file: `${locale}/${file}`, issue: 'Missing image field' });
        } else if (article.image.endsWith('.svg')) {
            svgReference++;
            results.push({ file: `${locale}/${file}`, issue: 'SVG reference', path: article.image });
        } else if (article.image.endsWith('.png') && !article.image.startsWith('http')) {
            // Check if local PNG exists
            const localPath = path.join(process.cwd(), 'public', article.image);
            if (!fs.existsSync(localPath)) {
                localPngReference++;
                results.push({ file: `${locale}/${file}`, issue: 'Broken local PNG reference', path: article.image });
            }
        }
    });
});

console.log(`Total articles checked: ${total}`);
console.log(`Articles with missing image field: ${missingImage}`);
console.log(`Articles with SVG references: ${svgReference}`);
console.log(`Articles with broken local PNG references: ${localPngReference}`);

if (results.length > 0) {
    console.log('\nDetailed Issues:');
    results.forEach(r => console.log(`- ${r.file}: ${r.issue} (${r.path || ''})`));
}
