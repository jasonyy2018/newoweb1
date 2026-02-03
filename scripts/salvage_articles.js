const fs = require('fs');
const path = require('path');

const langs = ['ja', 'zh'];
const baseDir = 'src/content/articles';

langs.forEach(lang => {
    const dir = path.join(baseDir, lang);
    const enDir = path.join(baseDir, 'en');

    if (!fs.existsSync(dir)) return;

    fs.readdirSync(dir).forEach(file => {
        if (!file.endsWith('.json')) return;
        const filePath = path.join(dir, file);
        const enPath = path.join(enDir, file);

        let content = fs.readFileSync(filePath, 'utf8');
        let enContent = fs.existsSync(enPath) ? JSON.parse(fs.readFileSync(enPath, 'utf8')) : null;

        try {
            // Check if it's already valid
            JSON.parse(content);
            console.log(`OK: ${filePath}`);
        } catch (e) {
            console.warn(`Repairing: ${filePath}`);

            // If it's one of our 4 key articles, we HAVE the content in history, 
            // but for others, let's just make them valid.
            // A simple way to "fix" the broken JSON is to use regex to find key-value pairs
            // and reconstruct a valid object.

            const obj = {};
            // Basic extraction using regex (very loose)
            const idMatch = content.match(/\"id\":\s*\"([^\"]+)\"/);
            const slugMatch = content.match(/\"slug\":\s*\"([^\"]+)\"/);
            const titleMatch = content.match(/\"title\":\s*\"([^\"]+)\"/); // This might fail if quote is missing

            // Default to EN values if salvaging fails
            obj.id = idMatch ? idMatch[1] : (enContent ? enContent.id.replace('en-', lang + '-') : `${lang}-unknown`);
            obj.slug = slugMatch ? slugMatch[1] : (enContent ? enContent.slug : file.replace('.json', ''));
            obj.author = "Tech Team";
            obj.date = "2026-02-03T08:55:00.000Z";
            obj.tags = enContent ? enContent.tags : ["Tech"];
            obj.image = enContent ? enContent.image : `/images/blog/${obj.slug}.png`;

            // For Content/Title/Description, if they are broken, just use EN version for now 
            // unless it's a key article (which we will fix separately or it might be OK enough).
            // Actually, let's just use EN version for all broken NON-ENRICHED ones to be safe and fast.

            const keyArticles = ['web-development-trends-2026', 'ai-in-web-design', 'next-js-seo-best-practices', 'blog-monetization'];
            const isKey = keyArticles.includes(obj.slug);

            if (isKey) {
                // We will re-write these manually or with specific logic to ensure they stay enriched.
                console.log(`  Skipping key article for manual/specific restoration: ${obj.slug}`);
            } else {
                obj.title = enContent ? enContent.title : "Article";
                obj.description = enContent ? enContent.description : "Description";
                obj.content = enContent ? enContent.content : "<p>Content</p>";

                fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), 'utf8');
                console.log(`  Restored from EN: ${filePath}`);
            }
        }
    });
});
