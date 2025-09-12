#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import polib

# 加载日文翻译文件
po = polib.pofile('translations/ja/LC_MESSAGES/messages.po')

# 找出未翻译的条目
untranslated = [entry for entry in po if not entry.msgstr and entry.msgid.strip()]

print(f"未翻译条目数: {len(untranslated)}")
for i, entry in enumerate(untranslated, 1):
    print(f"{i:2d}. {entry.msgid}")