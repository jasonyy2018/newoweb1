#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试Docker文件复制过程
"""

import os
import tempfile
import shutil

def simulate_docker_copy():
    """模拟Docker的COPY . .过程"""
    print("=== 模拟Docker文件复制过程 ===")
    
    # 创建临时目录模拟/app
    with tempfile.TemporaryDirectory() as temp_dir:
        print(f"临时目录: {temp_dir}")
        
        # 获取当前目录的文件列表
        current_dir = os.getcwd()
        files_to_copy = [
            "gunicorn.conf.py",
            "app.py", 
            "requirements.txt",
            "Dockerfile"
        ]
        
        # 模拟COPY过程
        for file in files_to_copy:
            source_path = os.path.join(current_dir, file)
            dest_path = os.path.join(temp_dir, file)
            
            if os.path.exists(source_path):
                try:
                    shutil.copy2(source_path, dest_path)
                    print(f"✅ 复制 {file}")
                except Exception as e:
                    print(f"❌ 复制 {file} 失败: {e}")
            else:
                print(f"❌ 源文件 {file} 不存在")
        
        # 检查复制结果
        print(f"\n复制后的文件列表:")
        for file in os.listdir(temp_dir):
            file_path = os.path.join(temp_dir, file)
            if os.path.isfile(file_path):
                size = os.path.getsize(file_path)
                print(f"  {file} ({size} bytes)")

def check_file_permissions():
    """检查文件权限"""
    print("\n=== 检查文件权限 ===")
    
    files_to_check = [
        "gunicorn.conf.py",
        "app.py",
        "requirements.txt"
    ]
    
    for file in files_to_check:
        if os.path.exists(file):
            try:
                stat = os.stat(file)
                print(f"✅ {file}: 权限 {oct(stat.st_mode)[-3:]}")
            except Exception as e:
                print(f"❌ 检查 {file} 权限失败: {e}")
        else:
            print(f"❌ {file} 不存在")

if __name__ == "__main__":
    simulate_docker_copy()
    check_file_permissions()