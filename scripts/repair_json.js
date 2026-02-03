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

        // 1. Basic string level fixes
        content = content.replace(/2024/g, '2026');
        content = content.replace(/\"date\":\s*\"202[0-9]-[^\"]+\"/g, '\"date\": \"2026-02-03T08:55:00.000Z\"');

        try {
            // Attempt 1: Parse string as is
            const json = JSON.parse(content);
            fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
            console.log(`Clean Fixed: ${filePath}`);
        } catch (e1) {
            console.warn(`Attempting deep repair for: ${filePath} - ${e1.message}`);
            try {
                // Attempt 2: Strip all newlines and multiple spaces to fix "Bad control character"
                // This assumes the JSON is mostly okay but has raw newlines inside strings or between properties
                let sanitized = content.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();

                // Sometimes characters like "" are corrupted markers. 
                // We'll replace common corruption patterns if found.
                sanitized = sanitized.replace(/\ufffd/g, ''); // Remove replacement character

                const json = JSON.parse(sanitized);
                fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
                console.log(`Deep Restored: ${filePath}`);
            } catch (e2) {
                console.error(`!!!! TOTAL FAILURE FOR ${filePath}: ${e2.message}`);
            }
        }
    });
});
