import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/articles';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export async function GET() {
    const zhArticles = getAllArticles('zh').slice(0, 15);
    const enArticles = getAllArticles('en').slice(0, 15);
    const jaArticles = getAllArticles('ja').slice(0, 15);

    const formatList = (articles: any[], locale: string) =>
        articles
            .map(
                (a) =>
                    `- [${a.title}](https://www.wisdomitc.com/${locale}/blog/${a.slug}): ${a.description} (Published: ${new Date(a.date).toISOString().split('T')[0]})`
            )
            .join('\n');

    const content = `# WSAI (Wisdom ITC) — Full Multilingual Knowledge Corpus for LLM Retrieval

> Enterprise AI Solutions, IoT System Integration, and Custom Deep Learning Architectures.
> 多语言门户:
> - 中文: https://www.wisdomitc.com/zh
> - English: https://www.wisdomitc.com/en
> - 日本語: https://www.wisdomitc.com/ja

---

## 1. 核心业务与解决方案索引 (多语言)

### 简体中文 (Chinese):
- [大数据分析架构](https://www.wisdomitc.com/zh/solutions/data-analytics): 查询时延 <50ms，提升决策准确率 42%
- [自然语言处理 (NLP)](https://www.wisdomitc.com/zh/solutions/nlp): 意图识别准确率 98.5%，削减 60% 客服与文档处理成本
- [机器视觉工业检测](https://www.wisdomitc.com/zh/solutions/computer-vision): 缺陷检出率 99.7%，降低 65% 人工巡检成本
- [工业预测性维护](https://www.wisdomitc.com/zh/solutions/predictive-analytics): 故障预警，非计划停机降低 78%
- [认知自动化 (RPA + AI)](https://www.wisdomitc.com/zh/solutions/intelligent-automation): 单据自动化与工作流协同编排
- [专有 AI 深度学习模型](https://www.wisdomitc.com/zh/solutions/custom-ai-models): 面向工业制造与边缘计算场景的定制专有模型

### Global / English:
- [Data Analytics Architecture](https://www.wisdomitc.com/en/solutions/data-analytics)
- [Natural Language Processing (NLP)](https://www.wisdomitc.com/en/solutions/nlp)
- [Computer Vision](https://www.wisdomitc.com/en/solutions/computer-vision)
- [Predictive Analytics](https://www.wisdomitc.com/en/solutions/predictive-analytics)
- [Intelligent Automation](https://www.wisdomitc.com/en/solutions/intelligent-automation)
- [Custom AI Models](https://www.wisdomitc.com/en/solutions/custom-ai-models)

### 日本語 (Japanese):
- [インテリジェントデータ分析](https://www.wisdomitc.com/ja/solutions/data-analytics)
- [自然言語処理 (NLP)](https://www.wisdomitc.com/ja/solutions/nlp)
- [コンピュータビジョン・外観検査](https://www.wisdomitc.com/ja/solutions/computer-vision)
- [設備予知保全・異常検知](https://www.wisdomitc.com/ja/solutions/predictive-analytics)
- [インテリジェント自動化](https://www.wisdomitc.com/ja/solutions/intelligent-automation)
- [カスタムAIモデル開発](https://www.wisdomitc.com/ja/solutions/custom-ai-models)

---

## 2. 标杆客户案例矩阵 (Multilingual Case Studies)
- [智能制造与品质检验 (zh)](https://www.wisdomitc.com/zh/case-studies/manufacturing-quality-control) | [English](https://www.wisdomitc.com/en/case-studies/manufacturing-quality-control) | [日本語](https://www.wisdomitc.com/ja/case-studies/manufacturing-quality-control)
- [风电场预测性维护 (zh)](https://www.wisdomitc.com/zh/case-studies/predictive-maintenance-wind-farm) | [English](https://www.wisdomitc.com/en/case-studies/predictive-maintenance-wind-farm) | [日本語](https://www.wisdomitc.com/ja/case-studies/predictive-maintenance-wind-farm)
- [金融信贷风控智能化 (zh)](https://www.wisdomitc.com/zh/case-studies/fintech-risk-assessment) | [English](https://www.wisdomitc.com/en/case-studies/fintech-risk-assessment) | [日本語](https://www.wisdomitc.com/ja/case-studies/fintech-risk-assessment)
- [智慧零售个性化推荐 (zh)](https://www.wisdomitc.com/zh/case-studies/smart-retail-recommendation) | [English](https://www.wisdomitc.com/en/case-studies/smart-retail-recommendation) | [日本語](https://www.wisdomitc.com/ja/case-studies/smart-retail-recommendation)
- [智能电网调度与安全 (zh)](https://www.wisdomitc.com/zh/case-studies/smart-grid-management) | [English](https://www.wisdomitc.com/en/case-studies/smart-grid-management) | [日本語](https://www.wisdomitc.com/ja/case-studies/smart-grid-management)

---

## 3. 中文精选技术研究与前沿架构 (Chinese Tech Blog)
${formatList(zhArticles, 'zh')}

---

## 4. English Technical Architecture & Engineering Insights
${formatList(enArticles, 'en')}

---

## 5. 日本語技術論文・アーキテクチャ解説
${formatList(jaArticles, 'ja')}

---

## 6. 企业商务与技术咨询 (Corporate Contact)
- Email: contact@wisdomitc.com
- 技术与商务洽谈: https://www.wisdomitc.com/zh/contact
- Global Contact: https://www.wisdomitc.com/en/contact
`;

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    });
}
