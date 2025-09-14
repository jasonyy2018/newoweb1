#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Docker容器中翻译功能测试脚本
"""

import sys
import os

# 确保在/app目录下
sys.path.insert(0, '/app')

from app import create_app

def test_translation():
    """测试翻译功能"""
    print("=== Docker容器中翻译功能测试 ===")
    
    # 创建应用
    app = create_app()
    
    # 创建测试客户端
    with app.test_client() as client:
        # 测试默认语言(中文)
        print("\n1. 测试默认语言(中文):")
        response = client.get('/')
        print(f"   状态码: {response.status_code}")
        if response.status_code == 200:
            content = response.get_data(as_text=True)
            if '上海葳澄信息科技有限公司' in content:
                print("   ✅ 默认中文翻译正常")
            else:
                print("   ❌ 默认中文翻译异常")
                # 打印部分内容用于调试
                print(f"   内容预览: {content[:200]}")
        else:
            print(f"   ❌ 首页访问失败")
        
        # 测试英语翻译
        print("\n2. 测试英语翻译:")
        response = client.get('/?lang=en')
        print(f"   状态码: {response.status_code}")
        if response.status_code == 200:
            content = response.get_data(as_text=True)
            if 'Shanghai Weicheng Information Technology Co., Ltd.' in content:
                print("   ✅ 英文翻译正常")
            else:
                print("   ❌ 英文翻译异常")
                # 打印部分内容用于调试
                print(f"   内容预览: {content[:200]}")
        else:
            print(f"   ❌ 英文页面访问失败")

if __name__ == '__main__':
    test_translation()