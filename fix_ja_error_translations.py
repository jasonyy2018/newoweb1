#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import polib

# 加载日文翻译文件
po = polib.pofile('translations/ja/LC_MESSAGES/messages.po')

# 定义错误页面的正确翻译映射（中文原文 -> 日文翻译）
error_translations = {
    "服务器遇到问题": "サーバーで問題が発生しました",
    "错误ID": "エラーID",
    "时间": "時間",
    "建议操作": "推奨操作",
    "技术信息": "技術情報",
    "状态码": "ステータスコード",
    "错误类型": "エラーの種類",
    "可能原因": "考えられる原因",
    "返回首页": "ホームに戻る",
    "如果您是技术支持人员，请记录此错误ID以便排查问题": "技術サポートの方は、問題調査のためこのエラーIDを記録してください",
    "服务器错误": "サーバーエラー",
    "多语言网站": "多言語ウェブサイト"
}

# 创建一个反向映射（日文原文 -> 中文原文）
reverse_mapping = {v: k for k, v in error_translations.items()}

# 更新翻译条目
updated_count = 0

# 首先处理那些msgid是日文的条目，将它们恢复为正确的中文原文
for entry in po:
    if entry.msgid in reverse_mapping:
        # 保存当前的日文翻译
        current_translation = entry.msgid
        # 恢复为正确的中文原文
        entry.msgid = reverse_mapping[entry.msgid]
        # 设置正确的日文翻译
        entry.msgstr = current_translation
        updated_count += 1
        # 移除fuzzy标记
        if 'fuzzy' in entry.flags:
            entry.flags.remove('fuzzy')

# 然后处理那些msgid是中文但msgstr为空的条目
for entry in po:
    if entry.msgid in error_translations and (not entry.msgstr or entry.msgstr.strip() == ""):
        entry.msgstr = error_translations[entry.msgid]
        updated_count += 1
        # 移除fuzzy标记
        if 'fuzzy' in entry.flags:
            entry.flags.remove('fuzzy')

# 保存更新后的文件
po.save()

print(f"已更新 {updated_count} 个翻译条目")
print("翻译文件已保存")

# 验证更新结果
print("\n=== 验证结果 ===")
for entry in po:
    if entry.msgid in error_translations:
        print(f"✓ {entry.msgid} -> {entry.msgstr}")