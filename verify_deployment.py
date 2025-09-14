#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
部署环境验证脚本
用于检查服务器部署时的文件完整性
"""

import os
import sys

def check_file_exists(filepath, description):
    """检查文件是否存在"""
    if os.path.exists(filepath):
        print(f"✅ {description} 存在: {filepath}")
        return True
    else:
        print(f"❌ {description} 不存在: {filepath}")
        return False

def check_directory_contents(directory):
    """检查目录内容"""
    if os.path.exists(directory):
        print(f"\n📁 {directory} 目录内容:")
        try:
            files = os.listdir(directory)
            for file in sorted(files):
                print(f"  {file}")
        except Exception as e:
            print(f"  无法列出目录内容: {e}")
    else:
        print(f"\n📁 {directory} 目录不存在")

def main():
    """主函数"""
    print("=== 部署环境验证 ===")
    print(f"当前工作目录: {os.getcwd()}")
    
    # 检查关键文件
    print("\n🔍 检查关键文件:")
    critical_files = [
        ("gunicorn.conf.py", "Gunicorn配置文件"),
        ("app.py", "应用主文件"),
        ("requirements.txt", "依赖文件"),
        ("Dockerfile", "Docker配置文件"),
        ("docker-compose.yml", "服务编排文件")
    ]
    
    all_files_exist = True
    for filepath, description in critical_files:
        if not check_file_exists(filepath, description):
            all_files_exist = False
    
    # 检查目录结构
    print("\n📂 检查目录结构:")
    directories = ["templates", "static", "data", "logs"]
    for directory in directories:
        check_file_exists(directory, f"{directory} 目录")
    
    # 显示当前目录内容
    print("\n📂 当前目录文件列表:")
    try:
        files = [f for f in os.listdir('.') if not f.startswith('.')]
        for file in sorted(files):
            if os.path.isdir(file):
                print(f"  📁 {file}/")
            else:
                print(f"  📄 {file}")
    except Exception as e:
        print(f"  无法列出当前目录内容: {e}")
    
    # 检查模板目录
    check_directory_contents("templates")
    
    # 检查静态文件目录
    check_directory_contents("static")
    
    # 检查Gunicorn配置内容
    if os.path.exists("gunicorn.conf.py"):
        print("\n🔧 Gunicorn配置检查:")
        try:
            with open("gunicorn.conf.py", "r", encoding="utf-8") as f:
                content = f.read()
                required_configs = ["bind", "workers", "accesslog", "errorlog"]
                for config in required_configs:
                    if config in content:
                        print(f"  ✅ {config} 配置存在")
                    else:
                        print(f"  ❌ {config} 配置缺失")
        except Exception as e:
            print(f"  无法读取 gunicorn.conf.py: {e}")
    
    # 总结
    print("\n" + "="*50)
    if all_files_exist:
        print("🎉 所有关键文件都存在，部署环境看起来正常!")
        return 0
    else:
        print("❌ 一些关键文件缺失，请检查部署过程!")
        return 1

if __name__ == "__main__":
    sys.exit(main())