const fs = require('fs');
const path = require('path');

const locales = ['en', 'zh', 'ja'];
const baseDir = path.join(process.cwd(), 'src/content/articles');

let total = 0;
let results = [];

locales.forEach(locale => {
    const dir = path.join(baseDir, locale);
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    files.forEach(file => {
        total++;
        const filePath = path.join(dir, file);
        const article = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const img = article.image;
        if (!img || typeof img !== 'string' || img.trim() === '') {
            results.push({ file: `${locale}/${file}`, issue: 'Empty or missing image field', value: img });
        } else if (!img.startsWith('http') && !img.startsWith('/')) {
            results.push({ file: `${locale}/${file}`, issue: 'Invalid path format (no http or /)', value: img });
        }
    });
});

console.log(`Total articles checked: ${total}`);
if (results.length > 0) {
    console.log('\nDetailed Issues:');
    results.forEach(r => console.log(`- ${r.file}: ${r.issue} (Value: "${r.value}")`));
} else {
    console.log('No issues found in blog article image paths.');
}
