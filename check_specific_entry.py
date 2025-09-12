#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import polib

# 加载日文翻译文件
po = polib.pofile('translations/ja/LC_MESSAGES/messages.po')

# 查找特定条目
target_msgid = "专注于人工智能解决方案的高科技企业，致力于成为客户信赖的人工智能解决方案专家"
entry = po.find(target_msgid)

if entry:
    print("=== 条目状态 ===")
    print(f"msgid: {entry.msgid}")
    print(f"msgstr: {entry.msgstr}")
    print(f"flags: {entry.flags}")
    
    if entry.msgstr and not 'fuzzy' in entry.flags:
        print("\n✅ 该条目已正确翻译且无fuzzy标记")
    elif entry.msgstr:
        print("\n⚠️ 该条目已翻译但可能仍有fuzzy标记")
    else:
        print("\n❌ 该条目仍未翻译")
else:
    print("未找到该条目")