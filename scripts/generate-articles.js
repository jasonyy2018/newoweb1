const fs = require('fs');
const path = require('path');

const locales = ['zh', 'en', 'ja'];
const baseOutputDir = path.join(__dirname, '../src/content/articles');

const topics = {
    'en': [
        "Web Development Trends 2024", "React vs Vue Guide", "Next.js SEO Best Practices", "TypeScript Generics", "CSS Grid vs Flexbox",
        "Optimizing Web Performance", "AI in Web Design", "Scalable Backend Systems", "GraphQL Intro", "Docker for Frontend",
        "Mastering Tailwind CSS", "Secure Auth Flows", "State Management", "SSR Explained", "SSG Benefits",
        "Mobile-First Design", "Accessibility Checklist", "PWA Guide", "Microservices Architecture", "Vercel Deployment",
        "Git Best Practices", "CI/CD Pipelines", "Node.js Tuning", "PostgreSQL vs MongoDB", "Prisma ORM",
        "Framer Motion", "Responsive Images", "Web Vitals", "AdSense Optimization", "Blog Monetization",
        "Technical Writing", "Remote Work Tools", "Engineering Interviews", "JS Debugging", "The Event Loop",
        "Functional Programming", "OOP Patterns", "Design Patterns", "Jest Testing", "Cypress E2E",
        "i18n in Next.js", "API Design", "REST vs RPC", "Web Sockets", "Cloud Basics",
        "Serverless Intro", "Edge Computing", "Wasm Guide", "Blockchain Web", "Cybersecurity Basics"
    ],
    'zh': [
        "2024年Web开发趋势", "React与Vue全方位对比", "Next.js SEO最佳实践", "理解TypeScript泛型", "CSS Grid与Flexbox对比",
        "优化网页性能", "AI在网页设计中的未来", "构建可扩展的后端系统", "GraphQL入门指南", "前端开发者的Docker指南",
        "精通Tailwind CSS", "安全的身份验证流程", "React状态管理", "SSR服务端渲染详解", "SSG静态生成的好处",
        "移动优先设计原则", "无障碍/A11y检查清单", "渐进式Web应用(PWA)", "微服务架构", "使用Vercel部署项目",
        "Git最佳实践", "面向新手的CI/CD管道", "Node.js性能调优", "PostgreSQL与MongoDB对比", "Prisma ORM指南",
        "Framer Motion动画", "响应式图片指南", "Web Vitals与SEO", "Google AdSense优化", "博客变现策略",
        "开发者的技术写作", "开发者远程办公工具", "软件工程师面试准备", "JS高手调试技巧", "理解事件循环",
        "函数式编程概念", "面向对象编程(OOP)", "JS设计模式", "Jest测试指南", "Cypress端到端测试",
        "Next.js国际化(i18n)", "API设计最佳实践", "REST与RPC对比", "Web Sockets与实时数据", "云计算基础(AWS/GCP/Azure)",
        "无服务器函数详解", "2024年边缘计算", "Web Assembly(Wasm)入门", "面向Web开发的区块链", "网站安全基础"
    ],
    'ja': [
        "2024年のWeb開発トレンド", "React vs Vue ガイド", "Next.js SEOのベストプラクティス", "TypeScript ジェネリクスの理解", "CSS Grid vs Flexbox",
        "Webパフォーマンスの最適化", "WebデザインにおけるAIの未来", "拡張可能なバックエンド構築", "GraphQL入門", "フロントエンド向けDocker",
        "Tailwind CSSをマスターする", "安全な認証フロー", "Reactの状態管理", "SSR (サーバーサイドレンダリング) 解説", "SSGのメリット",
        "モバイルファースト設計", "アクセシビリティチェックリスト", "PWA (プログレッシブWebアプリ)", "マイクロサービスアーキテクチャ", "Vercelでのデプロイ",
        "Gitのベストプラクティス", "初心者のためのCI/CD", "Node.jsパフォーマンスチューニング", "PostgreSQL vs MongoDB", "Prisma ORMガイド",
        "Framer Motionアニメーション", "レスポンシブ画像ガイド", "Web VitalsとSEO", "Google AdSenseの最適化", "ブログの収益化",
        "エンジニアのための技術ライティング", "リモートワークツール", "エンジニア面接対策", "JSデバッグの極意", "イベントループの理解",
        "関数型プログラミング", "オブジェクト指向 (OOP)", "デザインパターン", "Jestテストガイド", "Cypress E2Eテスト",
        "Next.jsの国際化 (i18n)", "API設計ベストプラクティス", "REST vs RPC", "Web Socketsとリアルタイムデータ", "クラウド基礎",
        "サーバーレス入門", "エッジコンピューティング 2024", "Wasm入門", "Web開発者のためのブロックチェーン", "サイバーセキュリティの基礎"
    ]
};

const templates = {
    'en': (title) => `<h2>Introduction</h2><p>About <strong>${title}</strong> in 2024...</p>`,
    'zh': (title) => `<h2>介绍</h2><p>关于2024年的 <strong>${title}</strong>...</p>`,
    'ja': (title) => `<h2>はじめに</h2><p>2024年の <strong>${title}</strong> について...</p>`
};

locales.forEach(locale => {
    const outputDir = path.join(baseOutputDir, locale);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    topics[locale].forEach((title, index) => {
        const slug = topics['en'][index].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        const date = new Date();
        date.setDate(date.getDate() - index);

        const article = {
            id: `${locale}-${index + 1}`,
            title: title,
            slug: slug,
            description: locale === 'zh' ? `关于 ${title} 的综合指南。` : (locale === 'ja' ? `${title} の包括的なガイド。` : `A comprehensive guide to ${title}.`),
            content: templates[locale](title) + `<p>${locale === 'zh' ? '这就是详细内容。' : (locale === 'ja' ? 'これが詳細な内容です。' : 'This is the detailed content.')}</p>`,
            author: "Tech Team",
            date: date.toISOString(),
            tags: ["Tech", "Dev"]
        };

        fs.writeFileSync(path.join(outputDir, `${slug}.json`), JSON.stringify(article, null, 2));
    });
});
console.log('Multi-language articles generated.');
