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

print("=== 日文翻译状态检查 ===")
print(f"总条目数: {len(translated) + len(untranslated)}")
print(f"已翻译: {len(translated)}")
print(f"未翻译: {len(untranslated)}")
print(f"翻译完成度: {len(translated)/(len(translated)+len(untranslated))*100:.1f}%")

print("\n未翻译的条目前10个:")
for i, item in enumerate(untranslated[:10], 1):
    print(f"{i:2d}. {item}")

print("\n已翻译的条目前10个:")
for i, item in enumerate(translated[:10], 1):
    print(f"{i:2d}. {item} -> {po.find(item).msgstr}")