#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import polib

# 加载日文翻译文件
po = polib.pofile('translations/ja/LC_MESSAGES/messages.po')

# 定义错误页面的翻译映射
error_translations = {
    "服务器遇到问题": "サーバーで問題が発生しました",
    "错误ID": "エラーID",
    "时间": "時間",
    "建议操作": "推奨操作",
    "技术信息": "技術情報",
    "状态码": "ステータスコード",
    "错误类型": "エラーの種類",
    "可能原因": "考えられる原因",
    "返回首页": "ホームに戻る",
    "如果您是技术支持人员，请记录此错误ID以便排查问题": "技術サポートの方は、問題調査のためこのエラーIDを記録してください"
}

# 更新翻译条目
updated_count = 0
for entry in po:
    # 处理错误页面条目
    if entry.msgid in error_translations and (not entry.msgstr or entry.msgstr.strip() == ""):
        entry.msgstr = error_translations[entry.msgid]
        updated_count += 1
        # 移除fuzzy标记
        if 'fuzzy' in entry.flags:
            entry.flags.remove('fuzzy')
    
    # 特殊处理：修复"返回首页"条目
    elif entry.msgid == "返回首页" and entry.msgstr == "ホーム":
        # 这个条目已经有翻译，但可能需要更新
        pass

# 保存更新后的文件
po.save()

print(f"已更新 {updated_count} 个翻译条目")
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