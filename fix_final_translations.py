#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import polib

# 加载日文翻译文件
po = polib.pofile('translations/ja/LC_MESSAGES/messages.po')

# 定义需要修复的条目映射（日文msgid -> 正确的中文msgid -> 正确的日文翻译）
fix_mapping = {
    "チーム紹介": {
        "correct_msgid": "团队介绍",
        "correct_msgstr": "チーム紹介"
    },
    "无论您有任何疑问或需求，我们的团队都将为您提供专业的咨询服务": {
        "correct_msgid": "无论您有任何疑问或需求，我们的团队都将为您提供专业的咨询服务",
        "correct_msgstr": "どのような疑問やニーズをお持ちでも、私たちのチームが専門的なコンサルティングサービスを提供いたします"
    },
    "抱歉、服务器遇到了意外错误。我们的技术团队已收到通知并正在处理此问题。": {
        "correct_msgid": "抱歉、服务器遇到了意外错误。我们的技术团队已收到通知并正在处理此问题。",
        "correct_msgstr": "申し訳ありませんが、サーバーに予期しないエラーが発生しました。技術チームに通知が送られ、現在この問題を処理中です。"
    },
    "应用程序代码错误": {
        "correct_msgid": "应用程序代码错误", 
        "correct_msgstr": "アプリケーションコードエラー"
    },
    "数据库连接问题": {
        "correct_msgid": "数据库连接问题",
        "correct_msgstr": "データベース接続問題"
    },
    "第三方服务不可用": {
        "correct_msgid": "第三方服务不可用",
        "correct_msgstr": "サードパーティサービス利用不可"
    },
    "请稍后再试": {
        "correct_msgid": "请稍后再试",
        "correct_msgstr": "少し時間を置いてから再度お試しください"
    },
    "如果问题持续存在，请联系技术支持": {
        "correct_msgid": "如果问题持续存在，请联系技术支持",
        "correct_msgstr": "問題が継続する場合は、技術サポートにご連絡ください"
    }
}

# 修复条目
updated_count = 0
for entry in po:
    # 检查是否有需要修复的条目
    if entry.msgid in fix_mapping:
        mapping = fix_mapping[entry.msgid]
        # 保存当前的翻译内容
        current_msgstr = entry.msgstr if entry.msgstr else ""
        # 修复msgid为正确的中文
        entry.msgid = mapping["correct_msgid"]
        # 设置正确的日文翻译
        entry.msgstr = mapping["correct_msgstr"]
        updated_count += 1
        # 移除fuzzy标记
        if 'fuzzy' in entry.flags:
            entry.flags.remove('fuzzy')

# 处理其他未翻译的条目
translations = {
    "团队介绍": "チーム紹介",
    "无论您有任何疑问或需求，我们的团队都将为您提供专业的咨询服务": "どのような疑問やニーズをお持ちでも、私たちのチームが専門的なコンサルティングサービスを提供いたします",
    "抱歉、服务器遇到了意外错误。我们的技术团队已收到通知并正在处理此问题。": "申し訳ありませんが、サーバーに予期しないエラーが発生しました。技術チームに通知が送られ、現在この問題を処理中です。",
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
for entry in po:
    # 如果msgid在翻译映射中且当前没有翻译或翻译为空
    if entry.msgid in translations and (not entry.msgstr or entry.msgstr.strip() == ""):
        entry.msgstr = translations[entry.msgid]
        updated_count += 1
        # 移除fuzzy标记
        if 'fuzzy' in entry.flags:
            entry.flags.remove('fuzzy')

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

# 最终检查
untranslated = []
for entry in po:
    if entry.msgid.strip() and (not entry.msgstr or entry.msgstr.strip() == ""):
        untranslated.append(entry.msgid)

print(f"\n=== 最终状态 ===")
print(f"剩余未翻译条目: {len(untranslated)}")
if untranslated:
    print("未翻译的条目:")
    for item in untranslated:
        print(f"  - {item}")
else:
    print("🎉 所有条目都已翻译完成！")