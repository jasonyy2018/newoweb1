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

print("=== 日文翻译最终状态报告 ===")
print("=" * 50)
print(f"总条目数: {total_entries}")
print(f"已翻译条目: {translated_entries}")
print(f"未翻译条目: {untranslated_entries}")
print(f"翻译完成度: {completion_rate:.1f}%")
print("=" * 50)

if untranslated_entries == 0:
    print("\n🎉 恭喜！所有内容都已翻译完成！")
    print("✅ 日文页面的翻译工作已全部完成！")
elif untranslated_entries <= 5:
    print("\n✅ 翻译工作接近完成！")
    print("剩余未翻译的条目:")
    for i, item in enumerate(untranslated_list, 1):
        print(f"  {i}. {item}")
else:
    print("\n⚠️ 还有一些条目需要翻译:")
    for i, item in enumerate(untranslated_list[:10], 1):
        print(f"  {i}. {item}")
    if len(untranslated_list) > 10:
        print(f"  ... 还有 {len(untranslated_list) - 10} 个条目")

print("\n" + "=" * 50)