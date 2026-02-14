const fs = require('fs');
const path = require('path');

const locales = ['en', 'zh', 'ja'];
const authors = ['WSAI Editorial', 'Jason Yu', 'Tech Insights Team'];

const topics = [
    {
        slug: 'cybersecurity-ai-platforms',
        tags: ['Cybersecurity', 'AI', 'Security'],
        en: { title: 'Cybersecurity for AI-Powered Platforms', desc: 'Secure your AI infrastructure against modern threats.' },
        zh: { title: 'AI 驱动平台的网络安全', desc: '保护您的 AI 基础设施免受现代威胁。' },
        ja: { title: 'AI駆動プラットフォームのサイバーセキュリティ', desc: '最新の脅威からAIインフラを保護します。' }
    },
    {
        slug: 'headless-commerce-2026',
        tags: ['E-commerce', 'Headless', 'Innovation'],
        en: { title: 'The Rise of Headless Commerce in 2026', desc: 'How decoupled architectures are winning the market.' },
        zh: { title: '2026 年无头电商的崛起', desc: '解耦架构如何赢得市场。' },
        ja: { title: '2026年におけるヘッドレスコマースの台頭', desc: '分離されたアーキテクチャがどのように市場で勝利しているか。' }
    },
    {
        slug: 'designing-for-accessibility',
        tags: ['UX', 'Accessibility', 'Design'],
        en: { title: 'Designing for Accessibility: A Practical Guide', desc: 'Making the web inclusive for everyone.' },
        zh: { title: '无障碍设计：实用指南', desc: '让网络对每个人都具有包容性。' },
        ja: { title: 'アクセシビリティのためのデザイン：実践ガイド', desc: 'すべての人にとって包括的なウェブを作る。' }
    },
    {
        slug: 'scaling-edge-computing',
        tags: ['Cloud', 'Edge Computing', 'Scaling'],
        en: { title: 'Scaling Web Apps with Distributed Edge Computing', desc: 'Bring your application closer to your users.' },
        zh: { title: '利用分布式边缘计算扩展 Web 应用', desc: '拉近应用与用户之间的距离。' },
        ja: { title: '分散型エッジコンピューティングによるWebアプリの拡張', desc: 'アプリケーションをユーザーの近くに配置します。' }
    },
    {
        slug: 'web3-modern-design',
        tags: ['Web3', 'Design', 'Trends'],
        en: { title: 'The Impact of Web3 on Modern Web Design', desc: 'Decentralized UI/UX patterns explained.' },
        zh: { title: 'Web3 对现代网页设计的影响', desc: '解析去中心化 UI/UX 模式。' },
        ja: { title: '現代のウェブデザインにおけるWeb3の影響', desc: '分散型UI/UXパターンの解説。' }
    },
    {
        slug: 'mastering-react-19',
        tags: ['React', 'JavaScript', 'Frontend'],
        en: { title: 'Mastering React 19: New Concepts', desc: 'From Actions to useFormStatus, what you need to know.' },
        zh: { title: '精通 React 19：全新概念', desc: '从 Actions 到 useFormStatus，你需要了解的内容。' },
        ja: { title: 'React 19を極める：新しいコンセプト', desc: 'ActionsからuseFormStatusまで、知っておくべきこと。' }
    },
    {
        slug: 'sustainable-digital-products',
        tags: ['Sustainability', 'Green Tech', 'Design'],
        en: { title: 'Building Sustainable and Green Digital Products', desc: 'Reducing the carbon footprint of the internet.' },
        zh: { title: '构建可持续且绿色的数字产品', desc: '减少互联网的碳足迹。' },
        ja: { title: '持続可能でグリーンなデジタル製品の構築', desc: 'インターネットのカーボンフットプリントを削減する。' }
    },
    {
        slug: 'ai-in-healthcare-revolution',
        tags: ['AI', 'Healthcare', 'Future'],
        en: { title: 'AI in Healthcare: Revolutionizing Patient Care', desc: 'How predictive models are saving lives.' },
        zh: { title: '医疗领域的 AI：革命性的患者护理', desc: '预测模型如何挽救生命。' },
        ja: { title: 'ヘルスケアにおけるAI：患者ケアの革命', desc: '予測モデルがいかに命を救っているか。' }
    },
    {
        slug: 'zero-trust-architecture-evolution',
        tags: ['Security', 'Zero Trust', 'IT'],
        en: { title: 'The Evolution of Zero Trust Architecture', desc: 'Never trust, always verify in 2026.' },
        zh: { title: '零信任架构的演进', desc: '2026 年：永不信任，始终验证。' },
        ja: { title: 'ゼロトラストアーキテクチャの進化', desc: '2026年は「決して信頼せず、常に検証する」。' }
    },
    {
        slug: 'serverless-vs-containers',
        tags: ['DevOps', 'Cloud', 'Serverless'],
        en: { title: 'Serverless vs Containers: Choosing the Right Path', desc: 'A cost and performance comparison.' },
        zh: { title: '无服务器 vs 容器：选择正确的路径', desc: '成本与性能的对比。' },
        ja: { title: 'サーバーレス vs コンテナ：正しい道の選択', desc: 'コストとパフォーマンスの比較。' }
    },
    {
        slug: 'micro-frontends-at-scale',
        tags: ['Frontend', 'Architecture', 'Micro-frontends'],
        en: { title: 'Micro-Frontends: Orchestrating at Scale', desc: 'Best practices for modular frontend development.' },
        zh: { title: '微前端：在大规模场景下编排', desc: '模块化前端开发的最佳实践。' },
        ja: { title: 'マイクロフロントエンド：大規模なオーケストレーション', desc: 'モジュール形式のフロントエンド開発のベストプラクティス。' }
    },
    {
        slug: 'performance-auditing-2026',
        tags: ['SEO', 'Performance', 'Auditing'],
        en: { title: 'Performance Auditing: Tools for 2026', desc: 'Measure what matters for user satisfaction.' },
        zh: { title: '性能审计：2026 年的必备工具', desc: '衡量影响用户满意度的关键指标。' },
        ja: { title: 'パフォーマンス監査：2026年のツール', desc: 'ユーザーの満足度にとって重要なものを測定する。' }
    },
    {
        slug: 'vui-optimization',
        tags: ['VUI', 'Voice', 'UX'],
        en: { title: 'Voice User Interfaces (VUI) Optimization', desc: 'The next frontier of hands-free interaction.' },
        zh: { title: '语音用户界面 (VUI) 优化', desc: '免手交互的下一个前沿。' },
        ja: { title: '音声ユーザーインターフェース（VUI）の最適化', desc: 'ハンズフリー・インタラクションの次のフロンティア。' }
    },
    {
        slug: 'pwa-modern-era',
        tags: ['PWA', 'Mobile', 'Web'],
        en: { title: 'Progressive Web Apps (PWA) in the Modern Era', desc: 'Bridging the gap between web and native.' },
        zh: { title: '现代时代的渐进式 Web 应用 (PWA)', desc: '缩小 Web 与原生应用之间的差距。' },
        ja: { title: '現代におけるプログレッシブウェブアプリ（PWA）', desc: 'ウェブとネイティブのギャップを埋める。' }
    },
    {
        slug: 'ai-digital-twins',
        tags: ['AI', 'Digital Twins', 'Smart City'],
        en: { title: 'AI-Powered Digital Twins for Smart Cities', desc: 'Efficient urban management through simulation.' },
        zh: { title: 'AI 驱动的智慧城市数字孪生', desc: '通过模拟实现高效的城市管理。' },
        ja: { title: 'スマートシティのためのAI駆動型デジタルツイン', desc: 'シミュレーションによる効率的な都市管理。' }
    },
    {
        slug: 'future-of-ar-vr-web',
        tags: ['AR', 'VR', 'WebXR'],
        en: { title: 'The Future of AR/VR on the Web', desc: 'Exploring WebXR and spatial browsers.' },
        zh: { title: 'Web 上的 AR/VR 未来', desc: '探索 WebXR 和空间浏览器。' },
        ja: { title: 'ウェブにおけるAR/VRの未来', desc: 'WebXRと空間ブラウザの探求。' }
    }
];

// Add generic content for remaining slots up to 50
const batchSize = topics.length;
const startId = 7; // Current articles count is 4, batch 1 added 2 more (5, 6)
const remainingCount = 50 - 6;

function generateContent(title, topic) {
    return `<h2>${title}</h2><p>In the digital landscape of 2026, ${topic} has become a central focus for tech leaders. This article explores the current trends and future outlook.</p><h3>Key Takeaways</h3><ul><li>Technological integration is accelerating across all sectors.</li><li>Reliability and security remain the top priorities.</li><li>Innovation is driven by human-centric design.</li></ul><p>Stay tuned for more deep dives into ${topic} on our blog.</p>`;
}

function generateZHContent(title, topic) {
    return `<h2>${title}</h2><p>在 2026 年的数字格局中，${topic} 已成为技术领导者关注的核心。本文探讨了当前的趋势和未来展望。</p><h3>关键点</h3><ul><li>技术集成在所有领域都在加速。</li><li>可靠性和安全性仍然是首要任务。</li><li>创新由以人为本的设计驱动。</li></ul><p>请关注我们博客中关于 ${topic} 的更多深度探讨。</p>`;
}

function generateJAContent(title, topic) {
    return `<h2>${title}</h2><p>2026年のデジタル環境において、${topic}は技術リーダーたちの中心的な焦点となっています。この記事では、現在のトレンドと将来の展望を探ります。</p><h3>主なポイント</h3><ul><li>技術の統合があらゆるセクターで加速しています。</li><li>信頼性とセキュリティが引き続き最優先事項です。</li><li>イノベーションは人間中心のデザインによって推進されます。</li></ul><p>私たちのブログで${topic}についてのさらなる詳細をチェックしてください。</p>`;
}

topics.forEach((article, index) => {
    const idNum = startId + index;
    const date = new Date(Date.now() - idNum * 86400000).toISOString();

    locales.forEach(locale => {
        let content = '';
        if (locale === 'en') content = generateContent(article.en.title, article.tags[0]);
        else if (locale === 'zh') content = generateZHContent(article.zh.title, article.tags[0]);
        else if (locale === 'ja') content = generateJAContent(article.ja.title, article.tags[0]);

        const data = {
            id: `${locale}-${idNum}`,
            title: article[locale].title,
            slug: article.slug,
            description: article[locale].desc,
            content: content,
            author: authors[index % authors.length],
            date: date,
            tags: article.tags,
            image: `/images/blog/${article.slug}.png`
        };

        const dir = path.join(process.cwd(), 'src/content/articles', locale);
        fs.writeFileSync(
            path.join(dir, `${article.slug}.json`),
            JSON.stringify(data, null, 2)
        );
    });
});
console.log(`Generated ${topics.length} more articles.`);
