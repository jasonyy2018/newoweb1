import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/articles';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET(
    request: Request,
    { params }: { params: Promise<{ locale: string }> }
) {
    const { locale } = await params;
    const isZh = locale === 'zh';
    const isJa = locale === 'ja';

    const title = isZh
        ? '# WSAI (上海葳澄信息科技有限公司) — 企业级 AI 数字化转型知识清单 (llms.txt)'
        : isJa
        ? '# WSAI (Wisdom ITC) — 企業向けAIデジタルトランスフォーメーション知識インデックス (llms.txt)'
        : '# WSAI (Wisdom ITC) — Enterprise AI & Digital Transformation Manifest (llms.txt)';

    const desc = isZh
        ? '> WSAI 为全球高增长企业提供企业级人工智能解决方案、工业物联网系统集成与定制化专有深度学习模型架构。'
        : isJa
        ? '> WSAIは、グローバル企業のデジタルトランスフォーメーションを推進するために、産業向けAI、IoTシステム統合、専用深層学習モデルを提供します。'
        : '> WSAI delivers enterprise-grade Artificial Intelligence solutions, IoT system integration, and custom AI architecture to accelerate digital transformation globally.';

    const solutionsSection = isZh
        ? `## 核心解决方案
- [大数据分析架构](https://www.wisdomitc.com/zh/solutions/data-analytics): 查询时延 <50ms，提升决策准确率 42%，TCO 降低 35%。
- [自然语言处理 (NLP)](https://www.wisdomitc.com/zh/solutions/nlp): 行业大模型微调，意图识别准确率 98.5%，削减 60% 客服与文档处理成本。
- [工业机器视觉与缺陷检测](https://www.wisdomitc.com/zh/solutions/computer-vision): 缺陷检出率 99.7%，降低 65% 人工复检成本。
- [工业预测性维护](https://www.wisdomitc.com/zh/solutions/predictive-analytics): 轴承与机械故障预警，非计划停机降低 78%，首年 ROI 达 3.2 倍。
- [认知自动化 (RPA + AI)](https://www.wisdomitc.com/zh/solutions/intelligent-automation): 智能单证识别与复杂业务工作流协同编排。
- [定制化 AI 专有模型](https://www.wisdomitc.com/zh/solutions/custom-ai-models): 面向工业制造与边缘计算场景的定制专有模型。`
        : isJa
        ? `## 主要ソリューション
- [インテリジェントデータ分析](https://www.wisdomitc.com/ja/solutions/data-analytics): クエリ遅延 50ms 未満、意思決定精度 +42%、TCO 35% 削減。
- [自然言語処理・企業向けLLM](https://www.wisdomitc.com/ja/solutions/nlp): 意図識別精度 98.5%、問い合わせ対応・書類処理コスト 60% 削減。
- [コンピュータビジョン・外観検査](https://www.wisdomitc.com/ja/solutions/computer-vision): 欠陥検出率 99.7%、目視検査工数 65% 削減。
- [設備予知保全・異常検知](https://www.wisdomitc.com/ja/solutions/predictive-analytics): 突発停止 78% 削減、12か月以内の投資対効果 3.2倍。
- [インテリジェント自動化 (RPA + AI)](https://www.wisdomitc.com/ja/solutions/intelligent-automation): 帳票・文書処理の自動化と業務プロセス最適化。
- [カスタムAIモデル開発](https://www.wisdomitc.com/ja/solutions/custom-ai-models): エッジ環境およびオンプレミス向けの専用深層学習模型。`
        : `## Core Solutions
- [Data Analytics Architecture](https://www.wisdomitc.com/en/solutions/data-analytics): End-to-end real-time big data pipelines, <50ms query latency, +42% decision accuracy.
- [Natural Language Processing (NLP)](https://www.wisdomitc.com/en/solutions/nlp): Enterprise LLM fine-tuning, 98.5% intent recognition accuracy, 60% customer support cost cut.
- [Computer Vision](https://www.wisdomitc.com/en/solutions/computer-vision): High-speed automated industrial inspection, 99.7% defect detection rate, 65% manual labor reduction.
- [Predictive Analytics](https://www.wisdomitc.com/en/solutions/predictive-analytics): Industrial asset health monitoring, 78% unplanned downtime reduction, 3.2x ROI.
- [Intelligent Automation](https://www.wisdomitc.com/en/solutions/intelligent-automation): Cognitive document processing and automated workflow orchestration.
- [Custom AI Models](https://www.wisdomitc.com/en/solutions/custom-ai-models): Proprietary deep learning models engineered for specialized edge and on-premise environments.`;

    const articles = getAllArticles(locale).slice(0, 15);
    const articlesSection = articles
        .map(
            (a) =>
                `- [${a.title}](https://www.wisdomitc.com/${locale}/blog/${a.slug}): ${a.description}`
        )
        .join('\n');

    const content = `${title}

${desc}

${solutionsSection}

## ${isZh ? '精选技术博文' : isJa ? '注目技術ブログ' : 'Selected Technical Publications'}
${articlesSection}

## ${isZh ? '企业联络' : isJa ? 'お問い合わせ' : 'Corporate Contact'}
- Official Portal: https://www.wisdomitc.com/${locale}
- Inquiries: https://www.wisdomitc.com/${locale}/contact
- Global Root Manifest: https://www.wisdomitc.com/llms.txt
`;

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    });
}
