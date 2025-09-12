#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask
from flask_babel import Babel, gettext as _

app = Flask(__name__)
app.config['LANGUAGES'] = ['zh', 'en', 'ja']
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'
app.config['BABEL_TRANSLATION_DIRECTORIES'] = 'translations'

def get_locale():
    return 'ja'

babel = Babel(app, locale_selector=get_locale)

# 从翻译文件中提取实际的msgid
import polib
po = polib.pofile('translations/ja/LC_MESSAGES/messages.po')
test_items = [entry.msgid for entry in po if entry.msgid.strip()]

with app.app_context():
    print("=== 日文页面完整翻译检查 ===")
    print("=" * 60)
    
    untranslated = []
    translated = []
    
    for item in test_items:
        translation = _(item)
        if translation == item:  # 未翻译
            untranslated.append(item)
        else:  # 已翻译
            translated.append(item)
    
    print(f"总条目数: {len(test_items)}")
    print(f"已翻译项目数: {len(translated)}")
    print(f"未翻译项目数: {len(untranslated)}")
    print(f"翻译完成度: {(len(translated)/(len(translated)+len(untranslated))*100):.1f}%")
    
    if untranslated:
        print("\n❌ 未翻译的内容:")
        print("-" * 40)
        for i, item in enumerate(untranslated[:30], 1):  # 只显示前30个
            print(f"{i:2d}. {item}")
        if len(untranslated) > 30:
            print(f"... 还有 {len(untranslated) - 30} 个未翻译项")
    
    print("\n" + "=" * 60)
    
    if len(untranslated) == 0:
        print("🎉 所有内容都已翻译!")
    elif len(untranslated) <= 5:
        print("✅ 翻译基本完成，还有少量内容需要处理")
    else:
        print("⚠️  还有较多内容需要翻译")