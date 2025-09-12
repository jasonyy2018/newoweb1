#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import polib

# 加载英文和日文翻译文件
en_po = polib.pofile('translations/en/LC_MESSAGES/messages.po')
ja_po = polib.pofile('translations/ja/LC_MESSAGES/messages.po')

# 获取英文文件中的所有msgid
en_msgids = {entry.msgid for entry in en_po if entry.msgid.strip()}

# 获取日文文件中已翻译的msgid
ja_translated_msgids = {entry.msgid for entry in ja_po if entry.msgstr.strip()}

# 获取日文文件中未翻译的msgid
ja_untranslated_msgids = {entry.msgid for entry in ja_po if not entry.msgstr.strip() and entry.msgid.strip()}

# 找出在英文文件中存在但在日文文件中完全缺失的msgid
missing_in_ja = en_msgids - (ja_translated_msgids | ja_untranslated_msgids)

print(f"英文文件中的条目数: {len(en_msgids)}")
print(f"日文文件中已翻译的条目数: {len(ja_translated_msgids)}")
print(f"日文文件中未翻译的条目数: {len(ja_untranslated_msgids)}")
print(f"英文文件中有但日文文件中完全缺失的条目数: {len(missing_in_ja)}")

print("\n日文文件中未翻译的条目:")
for i, msgid in enumerate(sorted(ja_untranslated_msgids), 1):
    print(f"{i:2d}. {msgid}")

print("\n英文文件中有但日文文件中完全缺失的条目:")
for i, msgid in enumerate(sorted(missing_in_ja), 1):
    print(f"{i:2d}. {msgid}")