#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import polib

# 加载日文翻译文件
po = polib.pofile('translations/ja/LC_MESSAGES/messages.po')

# 找出所有未翻译的条目
untranslated = []
translated = []

for entry in po:
    if entry.msgid.strip():  # 忽略空的msgid
        if not entry.msgstr or entry.msgstr.strip() == "":
            untranslated.append(entry.msgid)
        else:
            translated.append(entry.msgid)

print("=== 日文页面翻译最终状态 ===")
print("=" * 50)
print(f"总条目数: {len(translated) + len(untranslated)}")
print(f"已翻译项目数: {len(translated)}")
print(f"未翻译项目数: {len(untranslated)}")
print(f"翻译完成度: {len(translated)/(len(translated)+len(untranslated))*100:.1f}%")

if untranslated:
    print("\n❌ 未翻译的内容:")
    print("-" * 30)
    for i, item in enumerate(untranslated[:10], 1):  # 只显示前10个
        print(f"{i:2d}. {item}")
    if len(untranslated) > 10:
        print(f"... 还有 {len(untranslated) - 10} 个未翻译项")
else:
    print("\n🎉 所有内容都已翻译!")

print("\n" + "=" * 50)