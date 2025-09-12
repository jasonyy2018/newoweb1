#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import polib

# 加载日文翻译文件
po = polib.pofile('translations/ja/LC_MESSAGES/messages.po')

# 统计翻译状态
total_entries = 0
translated_entries = 0
untranslated_entries = 0

untranslated_list = []

for entry in po:
    if entry.msgid.strip():  # 忽略空的msgid
        total_entries += 1
        if entry.msgstr and entry.msgstr.strip():
            translated_entries += 1
        else:
            untranslated_entries += 1
            untranslated_list.append(entry.msgid)

# 计算完成度
completion_rate = (translated_entries / total_entries * 100) if total_entries > 0 else 0

print("=== 日文翻译最终验证报告 ===")
print("=" * 50)
print(f"总条目数: {total_entries}")
print(f"已翻译条目: {translated_entries}")
print(f"未翻译条目: {untranslated_entries}")
print(f"翻译完成度: {completion_rate:.1f}%")
print("=" * 50)

# 检查特定条目
target_msgid = "专注于人工智能解决方案的高科技企业，致力于成为客户信赖的人工智能解决方案专家"
entry = po.find(target_msgid)

if entry and entry.msgstr and not 'fuzzy' in entry.flags:
    print("\n✅ 指定的条目已正确翻译:")
    print(f"   原文: {target_msgid}")
    print(f"   译文: {entry.msgstr}")
else:
    print("\n❌ 指定的条目仍存在问题")

print("\n" + "=" * 50)
print("验证完成")