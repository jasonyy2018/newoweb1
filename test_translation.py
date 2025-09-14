#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
翻译功能测试脚本
"""

import os
import sys
from flask import Flask, render_template_string, session, request
from flask_babel import Babel, _

# 添加项目根目录到Python路径
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# 导入项目配置
from app import create_app

def test_translation():
    """测试翻译功能"""
    print("=== 翻译功能测试 ===")
    
    # 创建应用
    app = create_app()
    
    # 创建测试客户端
    with app.test_client() as client:
        # 测试默认语言(中文)
        print("\n1. 测试默认语言(中文):")
        response = client.get('/')
        if response.status_code == 200:
            content = response.get_data(as_text=True)
            if '上海葳澄信息科技有限公司' in content:
                print("✅ 默认中文翻译正常")
            else:
                print("❌ 默认中文翻译异常")
        else:
            print(f"❌ 首页访问失败: {response.status_code}")
        
        # 测试英语翻译
        print("\n2. 测试英语翻译:")
        response = client.get('/?lang=en')
        if response.status_code == 200:
            content = response.get_data(as_text=True)
            if 'Shanghai Weicheng Information Technology Co., Ltd.' in content:
                print("✅ 英文翻译正常")
            else:
                print("❌ 英文翻译异常")
        else:
            print(f"❌ 英文页面访问失败: {response.status_code}")
        
        # 测试日语翻译
        print("\n3. 测试日语翻译:")
        response = client.get('/?lang=ja')
        if response.status_code == 200:
            content = response.get_data(as_text=True)
            # 这里可以添加日语内容检查
            print("✅ 日语翻译请求正常")
        else:
            print(f"❌ 日语页面访问失败: {response.status_code}")

def check_translation_files():
    """检查翻译文件完整性"""
    print("\n=== 翻译文件检查 ===")
    
    locales = ['en', 'ja']
    for locale in locales:
        po_file = f'translations/{locale}/LC_MESSAGES/messages.po'
        mo_file = f'translations/{locale}/LC_MESSAGES/messages.mo'
        
        if os.path.exists(po_file):
            size = os.path.getsize(po_file)
            print(f"✅ {po_file} 存在 ({size} bytes)")
        else:
            print(f"❌ {po_file} 不存在")
        
        if os.path.exists(mo_file):
            size = os.path.getsize(mo_file)
            print(f"✅ {mo_file} 存在 ({size} bytes)")
        else:
            print(f"❌ {mo_file} 不存在")

if __name__ == '__main__':
    check_translation_files()
    test_translation()