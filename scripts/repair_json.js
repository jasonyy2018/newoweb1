const fs = require('fs');
const path = require('path');

const dirs = ['src/content/articles/en', 'src/content/articles/ja', 'src/content/articles/zh'];

dirs.forEach(dir => {
    const fullDir = path.resolve(dir);
    if (!fs.existsSync(fullDir)) return;

    fs.readdirSync(fullDir).forEach(file => {
        if (!file.endsWith('.json')) return;
        const filePath = path.join(fullDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Basic pre-parsing fixes
        // Replace 2024 with 2026 if not already done
        content = content.replace(/2024/g, '2026');

        // 2. The critical fix for "Bad control character":
        // This usually means raw newlines or other characters < 32 inside a string literal.
        // We will replace all raw newlines/tabs with spaces.
        // This is safe for THESE specific JSON files because content/description shouldn't have raw unescaped newlines anyway.
        const sanitized = content.replace(/[\x00-\x1F]+/g, ' ');

        try {
            const json = JSON.parse(sanitized);
            // Re-stringify with proper formatting to fix any structural issues
            fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
            console.log(`Successfully Repaired: ${filePath}`);
        } catch (err) {
            console.error(`!!!! FAILED TO REPAIR ${filePath}: ${err.message}`);
            // If still failing, it might be due to missing quotes or braces.
            // Let's try to see if it's missing a closing bracket.
            try {
                let secondTry = sanitized.trim();
                if (!secondTry.endsWith('}')) secondTry += ' }';
                const json2 = JSON.parse(secondTry);
                fs.writeFileSync(filePath, JSON.stringify(json2, null, 2), 'utf8');
                console.log(`Restored with Brackets: ${filePath}`);
            } catch (err2) {
                console.error(`!!!! UNRECOVERABLE: ${filePath}`);
            }
        }
    });
});
