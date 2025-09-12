#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import polib

# 加载日文翻译文件
po = polib.pofile('translations/ja/LC_MESSAGES/messages.po')

# 定义剩余需要翻译的内容映射
translations = {
    "会社概要": "会社概要",
    "团队介绍": "チーム紹介",
    "メインオレンジ色": "メインオレンジ色",
    "ライトオレンジ色": "ライトオレンジ色",
    "ダークテキスト": "ダークテキスト",
    "ライト背景": "ライト背景",
    "常に最新のAI技術を探求し、お客様に最も先進的なソリューションを提供します": "常に最新のAI技術を探求し、お客様に最も先進的なソリューションを提供します",
    "お客様のニーズを深く理解し、カスタマイズされたソリューションを提供し、実用的な価値を創造します": "お客様のニーズを深く理解し、カスタマイズされたソリューションを提供し、実用的な価値を創造します",
    "コンサルティングから実装までの全プロセスサービスで、プロジェクトの成功を保証します": "コンサルティングから実装までの全プロセスサービスで、プロジェクトの成功を保証します",
    "私たちはプロフェッショナルでカスタマイズされたAIソリューションを提供し、企業の主要なビジネス課題を解決し、デジタルトランスフォーメーションを実現します": "私たちはプロフェッショナルでカスタマイズされたAIソリューションを提供し、企業の主要なビジネス課題を解決し、デジタルトランスフォーメーションを実現します",
    "无论您有任何疑问或需求，我们的团队都将为您提供专业的咨询服务": "どのような疑問やニーズをお持ちでも、私たちのチームが専門的なコンサルティングサービスを提供いたします",
    "请输入您的問い合わせ内容": "問い合わせ内容をご入力ください",
    "抱歉、サーバ遇到了意外错误。我们的技术团队已收到通知并正在处理此问题。": "申し訳ありませんが、サーバーに予期しないエラーが発生しました。技術チームに通知が送られ、現在この問題を処理中です。",
    "サーバ暂时過載": "サーバー一時過負荷",
    "应用程序代码错误": "アプリケーションコードエラー",
    "数据库连接问题": "データベース接続問題",
    "第三方服务不可用": "サードパーティサービス利用不可",
    "请稍后再试": "少し時間を置いてから再度お試しください",
    "如果问题持续存在，请联系技术支持": "問題が継続する場合は、技術サポートにご連絡ください",
    "提供错误ID以便我们更快定位问题: {}": "問題を迅速に特定できるよう、エラーIDを提供してください: {}",
    "平均业务增长(%)": "平均業務成長(%)",
    "客户成本降低(%)": "顧客コスト削減(%)"
}

# 更新翻译条目
updated_count = 0
for entry in po:
    # 如果msgid在翻译映射中且当前没有翻译或翻译为空
    if entry.msgid in translations and (not entry.msgstr or entry.msgstr.strip() == ""):
        entry.msgstr = translations[entry.msgid]
        updated_count += 1
        # 移除fuzzy标记
        if 'fuzzy' in entry.flags:
            entry.flags.remove('fuzzy')
    # 特别处理一些有fuzzy标记的条目
    elif entry.msgid == "我们的AI解决方案平均为客户带来35%% 的业务增长" and 'fuzzy' in entry.flags:
        entry.flags.remove('fuzzy')
        updated_count += 1
    elif entry.msgid == "上海葳澄信息科技有限公司 - WSAI" and 'fuzzy' in entry.flags:
        entry.flags.remove('fuzzy')
        updated_count += 1

# 保存更新后的文件
po.save()

print(f"已更新 {updated_count} 个翻译条目")
print("翻译文件已保存")

# 编译翻译文件
import subprocess
try:
    result = subprocess.run(['pybabel', 'compile', '-d', 'translations'], 
                          capture_output=True, text=True, cwd='.')
    if result.returncode == 0:
        print("翻译文件编译成功")
    else:
        print(f"编译错误: {result.stderr}")
except Exception as e:
    print(f"编译过程出错: {e}")