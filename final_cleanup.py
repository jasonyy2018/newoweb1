#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import polib

# 加载日文翻译文件
po = polib.pofile('translations/ja/LC_MESSAGES/messages.po')

# 定义最终需要翻译的内容映射
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
updated_count = 0
for entry in po:
    # 如果msgid在翻译映射中且当前没有翻译或翻译为空
    if entry.msgid in translations and (not entry.msgstr or entry.msgstr.strip() == ""):
        entry.msgstr = translations[entry.msgid]
        updated_count += 1
        # 移除fuzzy标记
        if 'fuzzy' in entry.flags:
            entry.flags.remove('fuzzy')

# 特别处理一些条目
for entry in po:
    if entry.msgid == "团队介绍" and (not entry.msgstr or entry.msgstr.strip() == ""):
        entry.msgstr = "チーム紹介"
        updated_count += 1
    elif entry.msgid == "无论您有任何疑问或需求，我们的团队都将为您提供专业的咨询服务" and (not entry.msgstr or entry.msgstr.strip() == ""):
        entry.msgstr = "どのような疑問やニーズをお持ちでも、私たちのチームが専門的なコンサルティングサービスを提供いたします"
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

# 最终状态检查
untranslated = []
for entry in po:
    if entry.msgid.strip() and (not entry.msgstr or entry.msgstr.strip() == ""):
        untranslated.append(entry.msgid)

print(f"\n=== 最终翻译状态 ===")
print(f"总条目数: {len(po)}")
print(f"已翻译条目: {len(po) - len(untranslated)}")
print(f"未翻译条目: {len(untranslated)}")
print(f"翻译完成度: {(len(po) - len(untranslated))/len(po)*100:.1f}%" if len(po) > 0 else "0%")

if len(untranslated) <= 5:
    print("\n🎉 几乎所有内容都已翻译完成！")
    if untranslated:
        print("剩余未翻译的条目:")
        for item in untranslated:
            print(f"  - {item}")
else:
    print("\n⚠️ 还有一些条目需要翻译:")
    for i, item in enumerate(untranslated[:10], 1):
        print(f"  {i}. {item}")
    if len(untranslated) > 10:
        print(f"  ... 还有 {len(untranslated) - 10} 个条目")