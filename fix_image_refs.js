const fs = require('fs');
const path = require('path');

const locales = ['en', 'zh', 'ja'];
const blogImgDir = path.join(process.cwd(), 'public/images/blog');

let updated = 0;

locales.forEach(locale => {
    const dir = path.join(process.cwd(), 'src/content/articles', locale);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const article = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (article.image && article.image.endsWith('.png')) {
            const slug = file.replace('.json', '');
            const pngExists = fs.existsSync(path.join(blogImgDir, `${slug}.png`));
            const svgExists = fs.existsSync(path.join(blogImgDir, `${slug}.svg`));

            if (!pngExists && svgExists) {
                article.image = `/images/blog/${slug}.svg`;
                fs.writeFileSync(filePath, JSON.stringify(article, null, 2));
                updated++;
            }
        }
    });
});

console.log(`Updated ${updated} article image references from .png to .svg`);
