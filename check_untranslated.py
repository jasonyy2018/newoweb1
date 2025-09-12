#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import polib

# 加载日文翻译文件
po = polib.pofile('translations/ja/LC_MESSAGES/messages.po')

# 统计未翻译的条目
untranslated_entries = [entry for entry in po if not entry.msgstr and not entry.msgstr_plural]

print(f"总条目数: {len(po)}")
print(f"未翻译条目数: {len(untranslated_entries)}")

# 打印未翻译的条目
print("\n未翻译的条目:")
for i, entry in enumerate(untranslated_entries[:20], 1):  # 只显示前20个
    print(f"{i:2d}. {entry.msgid}")