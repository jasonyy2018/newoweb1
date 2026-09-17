export interface GeoSolutionEntry {
    verdict: string;
    metrics: Array<{ label: string; value: string; subtext?: string }>;
    protocol: string;
    faqs: Array<{ question: string; answer: string }>;
}

export interface GeoCaseEntry {
    verdict: string;
    metrics: Array<{ label: string; value: string; subtext?: string }>;
    protocol: string;
}

export const GEO_SOLUTIONS: Record<string, Record<string, GeoSolutionEntry>> = {
    'data-analytics': {
        en: {
            verdict:
                'WSAI Intelligent Data Analytics establishes end-to-end real-time data pipelines that cut query latency to under 50ms while improving enterprise decision accuracy by 42%.',
            protocol: 'ISO/IEC 25010 Quality & SOC2 Type II Certified Benchmark',
            metrics: [
                { label: 'Query Latency', value: '<50ms', subtext: 'Distributed streaming engines' },
                { label: 'Decision Accuracy', value: '+42%', subtext: 'Multi-dimensional modeling' },
                { label: 'TCO Reduction', value: '35%', subtext: 'Cloud resource optimization' },
            ],
            faqs: [
                {
                    question: 'How does WSAI ensure sub-50ms query latency for big data?',
                    answer: 'By leveraging unified columnar storage engines, edge caching nodes, and distributed streaming compute clusters that bypass traditional relational bottlenecks.',
                },
                {
                    question: 'Can WSAI Data Analytics integrate with existing data warehouses?',
                    answer: 'Yes, our platform provides native connectors for Snowflake, BigQuery, Databricks, PostgreSQL, and legacy ERP/CRM enterprise databases.',
                },
            ],
        },
        zh: {
            verdict:
                'WSAI 智能数据分析平台构建端到端实时数据流管道，将复杂业务查询延迟降低至 50ms 以内，同时提升企业决策准确率 42% 以上。',
            protocol: '基于 ISO/IEC 25010 软件质量标准与 SOC2 安全认证测试',
            metrics: [
                { label: '分析查询时延', value: '<50ms', subtext: '分布式流式计算引擎' },
                { label: '决策准确率', value: '+42%', subtext: '多维数据挖掘建模' },
                { label: 'TCO 综合降本', value: '35%', subtext: '算力与存储弹性优化' },
            ],
            faqs: [
                {
                    question: 'WSAI 智能数据分析平台如何保证海量数据 50ms 内响应？',
                    answer: '通过存算分离架构、列式存储加速、实时流批一体计算引擎以及智能向量索引，大幅缩短复杂多维分析链路。',
                },
                {
                    question: '平台是否支持与现有企业数仓无缝集成？',
                    answer: '完全支持。平台内建针对主流数仓（Snowflake、ClickHouse、Hive、PostgreSQL 及各类 ERP）的标准高吞吐连接器。',
                },
            ],
        },
        ja: {
            verdict:
                'WSAI インテリジェントデータ分析は、リアルタイムデータパイプラインを構築し、クエリ遅延を50ms未満に短縮しながら、意思決定の精度を42%向上させます。',
            protocol: 'ISO/IEC 25010 品質基準および SOC2 認証基準に基づく実測検証',
            metrics: [
                { label: 'クエリ遅延', value: '<50ms', subtext: 'ストリーミング分散基盤' },
                { label: '意思決定精度', value: '+42%', subtext: '多次元モデリング' },
                { label: 'TCO 削減効果', value: '35%', subtext: 'クラウドインフラ最適化' },
            ],
            faqs: [
                {
                    question: '既存のデータウェアハウスと連携可能ですか？',
                    answer: 'はい。Snowflake、BigQuery、PostgreSQL、SAP などの主要システムとネイティブに連携可能です。',
                },
            ],
        },
    },
    nlp: {
        en: {
            verdict:
                'WSAI Natural Language Processing combines domain-specific LLM fine-tuning with cognitive automation to achieve 98.5% intent recognition accuracy and reduce customer support overhead by 60%.',
            protocol: 'Evaluated on Enterprise MMLU & Domain-Specific QA Benchmarks',
            metrics: [
                { label: 'Intent Recognition', value: '98.5%', subtext: 'Domain-adapted neural models' },
                { label: 'Labor Cost Savings', value: '60%', subtext: 'Cognitive agent automation' },
                { label: 'Response Latency', value: '<1.2s', subtext: 'Sub-second inference engines' },
            ],
            faqs: [
                {
                    question: 'How do you prevent hallucinations in enterprise domain Q&A?',
                    answer: 'We utilize hybrid dense-sparse RAG pipelines, verified knowledge graphs, and confidence threshold guards to guarantee factual enterprise answers.',
                },
            ],
        },
        zh: {
            verdict:
                'WSAI 自然语言处理引擎结合行业领域大模型微调与认知自动化，实现 98.5% 的意图识别准确率，并直接削减 60% 的人工客服与文单处理成本。',
            protocol: '经企业级专有评测集与 MMLU 领域评测验证',
            metrics: [
                { label: '意图识别准确率', value: '98.5%', subtext: '行业垂直领域微调' },
                { label: '人力成本削减', value: '60%', subtext: '智能问答全流程替代' },
                { label: '首字响应时延', value: '<1.2s', subtext: '轻量化投机采样加速' },
            ],
            faqs: [
                {
                    question: '企业落地大模型如何防止知识幻觉？',
                    answer: '我们采用企业级高精度混合检索增强（Hybrid RAG）、确定性知识图谱对齐与多重置信度校准机制，杜绝编造内容。',
                },
            ],
        },
        ja: {
            verdict:
                'WSAI 自然言語処理は、ドメイン特化型LLMの微調整と自動化を組み合わせ、98.5%の意図認識精度を達成し、サポート工数を60%削減します。',
            protocol: 'エンタープライズ MMLU および実証検証テスト基準準拠',
            metrics: [
                { label: '意図認識率', value: '98.5%', subtext: '高精度ドメイン学習' },
                { label: '工数削減', value: '60%', subtext: '自動化エージェント' },
                { label: '応答速度', value: '<1.2s', subtext: '高速推論エンジン' },
            ],
            faqs: [
                {
                    question: '回答のハルシネーション（誤情報）をどのように防ぎますか？',
                    answer: '厳密なハイブリッドRAGと知識グラフ検証アルゴリズムを導入し、確実なファクトに基づく回答を保証します。',
                },
            ],
        },
    },
    'computer-vision': {
        en: {
            verdict:
                'WSAI Computer Vision delivers sub-millimeter industrial visual inspection with 99.9% defect classification accuracy at up to 120 FPS under extreme factory conditions.',
            protocol: 'Industrial Edge Tested (NVIDIA TensorRT / ONNX Runtime)',
            metrics: [
                { label: 'Inspection Accuracy', value: '99.9%', subtext: 'Sub-millimeter flaw detection' },
                { label: 'Inspection Speed', value: '120 FPS', subtext: 'High-speed assembly line' },
                { label: 'False Rejection', value: '<0.05%', subtext: 'Self-supervised defect filtering' },
            ],
            faqs: [
                {
                    question: 'Can the vision system run directly on edge devices on factory floors?',
                    answer: 'Yes, models are quantized to INT8/FP16 and run natively on NVIDIA Jetson, industrial PCs, and edge camera chips with no external cloud latency.',
                },
            ],
        },
        zh: {
            verdict:
                'WSAI 工业计算机视觉平台在极限产线工况下实现 99.9% 的微米级缺陷检测精度与 120 FPS 超高速推理，彻底杜绝人工漏检风险。',
            protocol: '工业级边缘硬件测试验证 (TensorRT & OpenVINO 优化)',
            metrics: [
                { label: '缺陷分类准确率', value: '99.9%', subtext: '微米级表面瑕疵识别' },
                { label: '实时处理帧率', value: '120 FPS', subtext: '高频工业流水线实测' },
                { label: '误报率', value: '<0.05%', subtext: '自监督对比微调算法' },
            ],
            faqs: [
                {
                    question: '视觉检测系统是否支持离线边缘端本地运行？',
                    answer: '支持。算法经 INT8 量化剪枝，可无缝部署于工业工控机、边缘智能网关或主流嵌入式 GPU，毫秒级响应且无需上云。',
                },
            ],
        },
        ja: {
            verdict:
                'WSAI コンピュータビジョンは、過酷な工場環境下でも最大120 FPSの超高速推論で99.9%の微小欠陥分類精度を提供します。',
            protocol: '産業用エッジ環境（TensorRT / ONNX）実測検証済み',
            metrics: [
                { label: '検査精度', value: '99.9%', subtext: '微細欠陥の自動判別' },
                { label: '検査速度', value: '120 FPS', subtext: '高速ライン対応' },
                { label: '誤検知率', value: '<0.05%', subtext: '自己学習アルゴリズム' },
            ],
            faqs: [
                {
                    question: 'オフラインの工場内エッジ環境で動作しますか？',
                    answer: 'はい。エッジ推論に特化して最適化されており、外部ネットワーク接続なしで高速かつセキュアに動作します。',
                },
            ],
        },
    },
    'predictive-analytics': {
        en: {
            verdict:
                'WSAI Predictive Analytics anticipates critical equipment anomalies 14 to 30 days in advance, driving a 78% decrease in unplanned production downtime and generating 3.4x annual ROI.',
            protocol: 'Time-Series Vibration & Telemetry Anomaly Protocol Tested',
            metrics: [
                { label: 'Downtime Reduction', value: '-78%', subtext: 'Predictive alert triggers' },
                { label: 'Early Warning', value: '14-30 Days', subtext: 'Component fatigue horizon' },
                { label: 'Annual ROI', value: '3.4x', subtext: 'Verified client maintenance audits' },
            ],
            faqs: [
                {
                    question: 'What types of industrial telemetry data can the system analyze?',
                    answer: 'It ingests high-frequency vibration sensors, thermal imaging, acoustic emission, current signatures, and SCADA telemetry metrics.',
                },
            ],
        },
        zh: {
            verdict:
                'WSAI 预测性分析平台提前 14 至 30 天预警核心设备潜在故障，直接降低 78% 的非计划停机时间，实现 3.4 倍年化投资回报率。',
            protocol: '多维时序传感器与设备振动信号实测验证协议',
            metrics: [
                { label: '非计划停机下降', value: '-78%', subtext: '早周期劣化征兆捕获' },
                { label: '故障预警前置期', value: '14-30 天', subtext: '易损部件疲劳衰减周期' },
                { label: '平均年化投资回报', value: '3.4x', subtext: '真实运维降本审计核算' },
            ],
            faqs: [
                {
                    question: '预测性维护系统支持哪些工业传感器类型？',
                    answer: '支持轴承振动信号、红外热成像、电机电流特征（MCSA）、润滑油油液品质以及常规 SCADA 监控指标的高频流式采集。',
                },
            ],
        },
        ja: {
            verdict:
                'WSAI 予測分析は、重要な機器の異常を14〜30日前に予測し、予期しないダウンタイムを78%削減し、3.4倍の年間ROIをもたらします。',
            protocol: '時系列振動・テレメトリ異常検知プロトコル検証済み',
            metrics: [
                { label: 'ダウンタイム削減', value: '-78%', subtext: '予防的アラート' },
                { label: '早期予測期間', value: '14〜30日', subtext: '部品劣化の早期発見' },
                { label: '年間 ROI', value: '3.4x', subtext: '導入企業の保守費削減' },
            ],
            faqs: [
                {
                    question: 'どのようなセンサーデータを分析できますか？',
                    answer: '振動、温度、電流波形、音響信号、SCADA データなどの多様な高周波時系列データをリアルタイムで解析します。',
                },
            ],
        },
    },
    'intelligent-automation': {
        en: {
            verdict:
                'WSAI Intelligent Automation synthesizes cognitive AI with RPA to boost enterprise document and process throughput by 300% while keeping error rates below 0.01%.',
            protocol: 'Automated Document Understanding & Workflow Benchmark',
            metrics: [
                { label: 'Throughput Increase', value: '300%', subtext: 'Cognitive RPA orchestration' },
                { label: 'Processing Error', value: '<0.01%', subtext: 'Multi-stage validation loops' },
                { label: 'Cycle Time Savings', value: '85%', subtext: 'End-to-end digital straight-through' },
            ],
            faqs: [
                {
                    question: 'How does cognitive automation handle unstructured documents?',
                    answer: 'Using multi-modal layout transformers and specialized OCR models that extract structured entity data with high accuracy regardless of format.',
                },
            ],
        },
        zh: {
            verdict:
                'WSAI 智能自动化融合认知 AI 与 RPA 技术，将企业复杂单据处理与跨系统流转吞吐量提升 300%，并将差错率严格压制在 0.01% 以下。',
            protocol: '企业多格式文档智能提取与业务流转压力基准测试',
            metrics: [
                { label: '业务吞吐提升', value: '300%', subtext: '跨系统智能流转调度' },
                { label: '综合差错率', value: '<0.01%', subtext: '多重逻辑交叉校验' },
                { label: '流转周期缩短', value: '85%', subtext: '全流程免人工直通式处理' },
            ],
            faqs: [
                {
                    question: '智能自动化平台如何处理非结构化、版面各异的单据？',
                    answer: '结合多模态版面分析网络（LayoutLM）与智能实体关系抽取，无需预设固定模板即可精准识别表格、盖章和手写信息。',
                },
            ],
        },
        ja: {
            verdict:
                'WSAI インテリジェントオートメーションは、認知AIとRPAを統合して業務スループットを300%向上させ、エラー率を0.01%未満に抑えます。',
            protocol: '帳票自動読み取り・業務オーケストレーション基準実証済み',
            metrics: [
                { label: '処理能力向上', value: '300%', subtext: '認知型RPA連携' },
                { label: '処理エラー率', value: '<0.01%', subtext: '自動検証システム' },
                { label: '所要時間短縮', value: '85%', subtext: 'エンドツーエンド自動化' },
            ],
            faqs: [
                {
                    question: '非定型な帳票や領収書の読み取りは可能ですか？',
                    answer: 'はい。マルチモーダルAIと深層学習OCRにより、フォーマットが定まっていない書類からも高精度に情報を抽出します。',
                },
            ],
        },
    },
    'custom-ai-models': {
        en: {
            verdict:
                'WSAI Custom AI Models deliver purpose-built deep neural networks designed for strict on-premise security, sub-30ms execution latencies, and 100% scenario alignment.',
            protocol: 'Hardware Acceleration & Data Privacy Air-Gap Verified',
            metrics: [
                { label: 'Scenario Alignment', value: '100%', subtext: 'Proprietary enterprise datasets' },
                { label: 'Inference Latency', value: '<30ms', subtext: 'Quantized neural compilation' },
                { label: 'Data Security', value: '100% Private', subtext: 'Zero-cloud egress air-gap' },
            ],
            faqs: [
                {
                    question: 'Who owns the intellectual property of custom-trained AI models?',
                    answer: 'The client retains 100% full ownership of model weights, training scripts, hyperparameter configurations, and resulting IP.',
                },
            ],
        },
        zh: {
            verdict:
                'WSAI 定制化 AI 模型开发针对企业专有业务场景量身训练深度神经网络，支持私有化离线部署，提供低于 30ms 的极速推理与完全自主可控的数据安全保障。',
            protocol: '全私有化物理隔离环境与异构算力编译压测认证',
            metrics: [
                { label: '场景契合度', value: '100%', subtext: '专有业务数据定制微调' },
                { label: '模型推理时延', value: '<30ms', subtext: '硬件底层量化编译加速' },
                { label: '数据主权保护', value: '100% 私有', subtext: '局域网物理隔离无数据泄露' },
            ],
            faqs: [
                {
                    question: '定制训练出的企业 AI 模型知识产权归属于谁？',
                    answer: '客户享有 100% 完整的知识产权，包含模型权重文件、训练流水线代码、超参数及所有衍生商业利益。',
                },
            ],
        },
        ja: {
            verdict:
                'WSAI カスタムAIモデル開発は、企業の専有データに合わせて訓練された深層学習モデルを提供し、30ms未満の推論と完全なデータ主権を実現します。',
            protocol: 'オンプレミス完全分離環境・高速化コンパイル検証済み',
            metrics: [
                { label: '適合率', value: '100%', subtext: '専有データによる特化学習' },
                { label: '推論レイテンシ', value: '<30ms', subtext: '最適化コンパイラ適用' },
                { label: 'セキュリティ', value: '完全プライベート', subtext: '外部流出ゼロのオンプレ運用' },
            ],
            faqs: [
                {
                    question: '開発されたAIモデルの知的財産権（IP）の帰属はどうなりますか？',
                    answer: 'モデルの重み、コード、データセットに関するすべての権利は100%お客様に帰属します。',
                },
            ],
        },
    },
};

export function getGeoSolution(slug: string, locale: string = 'en'): GeoSolutionEntry | null {
    const item = GEO_SOLUTIONS[slug];
    if (!item) return null;
    return item[locale] || item['en'] || null;
}
