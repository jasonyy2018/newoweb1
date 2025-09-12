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

print("=== 日文翻译详细检查 ===")
print(f"总条目数: {len(translated) + len(untranslated)}")
print(f"已翻译: {len(translated)}")
print(f"未翻译: {len(untranslated)}")
print(f"翻译完成度: {len(translated)/(len(translated)+len(untranslated))*100:.1f}%")

print("\n=== 未翻译的条目 ===")
for i, item in enumerate(untranslated, 1):
    print(f"{i:3d}. {repr(item)}")

# 检查特定条目
print("\n=== 检查特定条目 ===")
error_entries = [
    "服务器遇到问题",
    "错误ID", 
    "时间",
    "建议操作",
    "技术信息",
    "状态码",
    "错误类型",
    "可能原因",
    "返回首页"
]

for entry_text in error_entries:
    entry = po.find(entry_text)
    if entry:
        print(f"找到条目 '{entry_text}': msgstr='{entry.msgstr}', flags={entry.flags}")
    else:
        print(f"未找到条目 '{entry_text}'")