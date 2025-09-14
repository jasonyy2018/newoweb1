#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生产环境测试脚本
"""

import os
import sys
from app import create_app

def test_app_creation():
    """测试应用创建和路由"""
    print("=== 生产环境测试 ===")
    
    # 创建应用
    app = create_app()
    
    # 打印路径信息
    print(f"当前工作目录: {os.getcwd()}")
    print(f"应用静态文件夹: {app.static_folder}")
    print(f"应用模板文件夹: {app.template_folder}")
    print(f"静态文件夹是否存在: {os.path.exists(app.static_folder) if app.static_folder else False}")
    print(f"模板文件夹是否存在: {os.path.exists(app.template_folder) if app.template_folder else False}")
    
    # 测试路由
    with app.test_client() as client:
        print("\n=== 路由测试 ===")
        
        # 测试首页
        response = client.get('/')
        print(f"首页 (/): 状态码 {response.status_code}")
        if response.status_code != 200:
            print(f"错误内容: {response.data.decode('utf-8')[:200]}...")
        
        # 测试其他页面
        test_routes = ['/about', '/contact', '/faq', '/health']
        for route in test_routes:
            try:
                response = client.get(route)
                print(f"{route}: 状态码 {response.status_code}")
            except Exception as e:
                print(f"{route}: 错误 - {e}")
    
    print("\n=== 测试完成 ===")

if __name__ == '__main__':
    test_app_creation()