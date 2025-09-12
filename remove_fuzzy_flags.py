#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import polib

# 加载日文翻译文件
po = polib.pofile('translations/ja/LC_MESSAGES/messages.po')

# 移除所有fuzzy标记
fixed_count = 0
for entry in po:
    if 'fuzzy' in entry.flags:
        entry.flags.remove('fuzzy')
        fixed_count += 1

# 特别处理您指出的条目
target_msgid = "专注于人工智能解决方案的高科技企业，致力于成为客户信赖的人工智能解决方案专家"
for entry in po:
    if entry.msgid == target_msgid:
        # 确保这个条目有正确的翻译
        if not entry.msgstr:
            entry.msgstr = "AIソリューションに特化したハイテク企業で、お客様から信頼されるAIソリューションの専門家になることを目指しています"
        break

# 保存更新后的文件
po.save()

print(f"已移除 {fixed_count} 个fuzzy标记")
print("翻译文件已保存")

# 编译翻译文件
import subprocess
try:
    result = subprocess.run(['pybabel', 'compile', '-d', 'translations'], 
                          capture_output=True, text=True, cwd='.')
    if result.returncode == 0:
        print("翻译文件编译成功")
    else:
        print(f"编译错误: {result.stderr}")
except Exception as e:
    print(f"编译过程出错: {e}")