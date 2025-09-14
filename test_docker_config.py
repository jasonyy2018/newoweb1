#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试Docker配置文件
"""

import os
import sys

def test_gunicorn_config():
    """测试Gunicorn配置文件"""
    print("=== 测试Gunicorn配置文件 ===")
    
    # 检查文件是否存在
    config_file = "gunicorn.conf.py"
    absolute_path = "/app/gunicorn.conf.py"
    
    print(f"检查相对路径 '{config_file}':")
    if os.path.exists(config_file):
        print("✅ 相对路径文件存在")
        print(f"   文件大小: {os.path.getsize(config_file)} bytes")
    else:
        print("❌ 相对路径文件不存在")
    
    print(f"检查绝对路径 '{absolute_path}':")
    if os.path.exists(absolute_path):
        print("✅ 绝对路径文件存在")
        print(f"   文件大小: {os.path.getsize(absolute_path)} bytes")
    else:
        print("❌ 绝对路径文件不存在")
    
    # 检查当前工作目录
    print(f"当前工作目录: {os.getcwd()}")
    print(f"目录内容: {os.listdir('.')}")

def test_docker_paths():
    """测试Docker中的路径配置"""
    print("\n=== 测试Docker路径配置 ===")
    
    paths_to_check = [
        "/app",
        "/app/logs",
        "/app/data",
        "/app/gunicorn.conf.py",
        "/app/app.py"
    ]
    
    for path in paths_to_check:
        if os.path.exists(path):
            if os.path.isfile(path):
                print(f"✅ 文件存在: {path} ({os.path.getsize(path)} bytes)")
            else:
                print(f"✅ 目录存在: {path}")
        else:
            print(f"❌ 路径不存在: {path}")

if __name__ == "__main__":
    test_gunicorn_config()
    test_docker_paths()