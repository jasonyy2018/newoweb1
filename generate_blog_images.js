const fs = require('fs');
const path = require('path');

const blogDir = path.join(process.cwd(), 'public/images/blog');
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

// Read all article slugs from en directory
const articlesDir = path.join(process.cwd(), 'src/content/articles/en');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.json'));

const colors = [
    ['#6366f1', '#818cf8'], // indigo
    ['#8b5cf6', '#a78bfa'], // violet
    ['#ec4899', '#f472b6'], // pink
    ['#14b8a6', '#2dd4bf'], // teal
    ['#f59e0b', '#fbbf24'], // amber
    ['#3b82f6', '#60a5fa'], // blue
    ['#10b981', '#34d399'], // emerald
    ['#ef4444', '#f87171'], // red
    ['#06b6d4', '#22d3ee'], // cyan
    ['#84cc16', '#a3e635'], // lime
];

const icons = [
    // Brain / AI
    `<circle cx="200" cy="160" r="50" fill="none" stroke="FG" stroke-width="3"/><path d="M175 160 Q175 130 200 130 Q225 130 225 160" fill="none" stroke="FG" stroke-width="3"/><line x1="200" y1="110" x2="200" y2="80" stroke="FG" stroke-width="3"/><line x1="170" y1="130" x2="150" y2="110" stroke="FG" stroke-width="3"/><line x1="230" y1="130" x2="250" y2="110" stroke="FG" stroke-width="3"/>`,
    // Code brackets
    `<text x="200" y="175" text-anchor="middle" font-size="80" font-family="monospace" fill="FG">&lt;/&gt;</text>`,
    // Shield / Security
    `<path d="M200 100 L240 120 L240 170 Q240 200 200 220 Q160 200 160 170 L160 120 Z" fill="none" stroke="FG" stroke-width="3"/><polyline points="180,160 195,175 220,145" fill="none" stroke="FG" stroke-width="4"/>`,
    // Cloud
    `<path d="M160 180 Q130 180 130 155 Q130 130 155 130 Q160 110 185 110 Q210 100 225 115 Q250 110 260 130 Q275 135 275 155 Q275 180 250 180 Z" fill="none" stroke="FG" stroke-width="3"/>`,
    // Chart/Graph
    `<rect x="155" y="160" width="20" height="50" rx="3" fill="FG" opacity="0.6"/><rect x="185" y="130" width="20" height="80" rx="3" fill="FG" opacity="0.8"/><rect x="215" y="145" width="20" height="65" rx="3" fill="FG" opacity="0.7"/><rect x="245" y="110" width="20" height="100" rx="3" fill="FG"/>`,
    // Globe
    `<circle cx="200" cy="155" r="50" fill="none" stroke="FG" stroke-width="3"/><ellipse cx="200" cy="155" rx="25" ry="50" fill="none" stroke="FG" stroke-width="2"/><line x1="150" y1="155" x2="250" y2="155" stroke="FG" stroke-width="2"/><line x1="200" y1="105" x2="200" y2="205" stroke="FG" stroke-width="2"/>`,
    // Gear
    `<circle cx="200" cy="155" r="25" fill="none" stroke="FG" stroke-width="3"/><circle cx="200" cy="155" r="10" fill="FG"/>`,
    // Lightning bolt
    `<polygon points="210,100 185,160 205,160 190,220 230,145 210,145 225,100" fill="FG" opacity="0.85"/>`,
    // Layers
    `<polygon points="200,110 250,140 200,170 150,140" fill="none" stroke="FG" stroke-width="3"/><polyline points="150,155 200,185 250,155" fill="none" stroke="FG" stroke-width="3"/><polyline points="150,170 200,200 250,170" fill="none" stroke="FG" stroke-width="3"/>`,
    // Rocket
    `<path d="M200 100 Q220 120 220 160 L200 180 L180 160 Q180 120 200 100Z" fill="none" stroke="FG" stroke-width="3"/><circle cx="200" cy="140" r="8" fill="FG"/><line x1="180" y1="170" x2="165" y2="190" stroke="FG" stroke-width="3"/><line x1="220" y1="170" x2="235" y2="190" stroke="FG" stroke-width="3"/>`,
];

let generated = 0;
files.forEach((file, index) => {
    const slug = file.replace('.json', '');
    const pngPath = path.join(blogDir, `${slug}.svg`);
    const existingPng = path.join(blogDir, `${slug}.png`);

    // Skip if PNG already exists (original 4 articles)
    if (fs.existsSync(existingPng)) return;

    const [bg, bgLight] = colors[index % colors.length];
    const fg = '#ffffff';
    const icon = icons[index % icons.length].replace(/FG/g, fg);

    // Read title from article JSON
    const article = JSON.parse(fs.readFileSync(path.join(articlesDir, file), 'utf8'));
    const title = article.title.length > 40 ? article.title.substring(0, 37) + '...' : article.title;

    const svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bg};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${bgLight};stop-opacity:1"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bg${index})" rx="8"/>
  <rect x="0" y="0" width="400" height="300" fill="black" opacity="0.15" rx="8"/>
  ${icon}
  <text x="200" y="250" text-anchor="middle" font-size="13" font-family="Arial, sans-serif" fill="${fg}" opacity="0.9">${escapeXml(title)}</text>
  <text x="200" y="275" text-anchor="middle" font-size="10" font-family="Arial, sans-serif" fill="${fg}" opacity="0.6">WSAI Tech Blog</text>
</svg>`;

    fs.writeFileSync(pngPath, svg);
    generated++;
});

function escapeXml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

console.log(`Generated ${generated} SVG placeholder images.`);
