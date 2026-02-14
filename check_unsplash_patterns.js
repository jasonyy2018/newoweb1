const fs = require('fs');
const path = require('path');

const locales = ['en', 'zh', 'ja'];
const baseDir = path.join(process.cwd(), 'src/content/articles');

let results = [];

locales.forEach(locale => {
    const dir = path.join(baseDir, locale);
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const article = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const img = article.image;
        if (img && img.includes('unsplash.com') && !img.includes('photo-')) {
            results.push({ file: `${locale}/${file}`, issue: 'Unsplash URL missing photo- ID prefix', value: img });
        }
    });
});

console.log('Unsplash URL Pattern Check Complete.');
if (results.length > 0) {
    console.log('\nDetailed Issues:');
    results.forEach(r => console.log(`- ${r.file}: ${r.issue} (Value: "${r.value}")`));
} else {
    console.log('No issues found in Unsplash URL patterns.');
}
