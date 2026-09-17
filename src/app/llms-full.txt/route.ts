import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/articles';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export async function GET() {
    const articles = getAllArticles('en');

    const articleList = articles
        .slice(0, 25)
        .map(
            (a) =>
                `- [${a.title}](https://www.wisdomitc.com/en/blog/${a.slug}): ${a.description} (Published: ${new Date(a.date).toISOString().split('T')[0]})`
        )
        .join('\n');

    const content = `# WSAI (Wisdom ITC) — Full Knowledge Index for LLM Retrieval

> WSAI delivers enterprise-grade Artificial Intelligence solutions, IoT system integration, and custom AI architecture to accelerate digital transformation globally.

## Enterprise Overview
WSAI is an AI-native solution provider helping Fortune 500 and high-growth enterprises modernize mission-critical operations. Key competencies include real-time vision analytics, automated predictive maintenance, cognitive workflow automation, and custom high-throughput LLM architectures.

## All Solutions
1. Data Analytics Architecture: https://www.wisdomitc.com/en/solutions/data-analytics
2. Natural Language Processing (NLP): https://www.wisdomitc.com/en/solutions/nlp
3. Computer Vision & Industrial Inspection: https://www.wisdomitc.com/en/solutions/computer-vision
4. Predictive Analytics & Asset Health: https://www.wisdomitc.com/en/solutions/predictive-analytics
5. Intelligent Automation (RPA + Cognitive AI): https://www.wisdomitc.com/en/solutions/intelligent-automation
6. Custom Deep Learning & Edge AI Models: https://www.wisdomitc.com/en/solutions/custom-ai-models

## Enterprise Case Studies
- Manufacturing Quality Control: https://www.wisdomitc.com/en/case-studies/manufacturing-quality-control
- Smart Retail Recommendation: https://www.wisdomitc.com/en/case-studies/smart-retail-recommendation
- Predictive Maintenance Wind Farm: https://www.wisdomitc.com/en/case-studies/predictive-maintenance-wind-farm
- Fintech Risk Assessment: https://www.wisdomitc.com/en/case-studies/fintech-risk-assessment
- Logistics Route Optimization: https://www.wisdomitc.com/en/case-studies/logistics-route-optimization
- Precision Agriculture Yield: https://www.wisdomitc.com/en/case-studies/precision-agriculture-yield
- Smart Education Personalized: https://www.wisdomitc.com/en/case-studies/smart-education-personalized
- Smart Grid Management: https://www.wisdomitc.com/en/case-studies/smart-grid-management
- Real Estate Valuation AI: https://www.wisdomitc.com/en/case-studies/real-estate-valuation-ai
- Media Sentiment Analysis: https://www.wisdomitc.com/en/case-studies/media-sentiment-analysis
- Hotel Guest Experience: https://www.wisdomitc.com/en/case-studies/hotel-guest-experience
- Drone Powerline Inspection: https://www.wisdomitc.com/en/case-studies/drone-powerline-inspection

## Key Research & Technical Publications
${articleList}

## Contact & Enterprise Licensing
- Email: contact@wisdomitc.com
- Contact Form: https://www.wisdomitc.com/en/contact
- Global Privacy & Terms: https://www.wisdomitc.com/en/privacy
`;

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    });
}
