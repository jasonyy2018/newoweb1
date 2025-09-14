#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试Docker构建配置
"""

import subprocess
import sys

def test_docker_build():
    """测试Docker构建"""
    print("=== 测试Docker构建 ===")
    
    try:
        # 测试Dockerfile语法
        print("检查Dockerfile语法...")
        result = subprocess.run(
            ["docker", "build", "--dry-run", "."],
            capture_output=True,
            text=True,
            timeout=30
        )
        
        if result.returncode == 0:
            print("✅ Dockerfile语法正确")
        else:
            print("❌ Dockerfile语法错误:")
            print(result.stderr)
            
    except subprocess.TimeoutExpired:
        print("⚠️  Docker构建测试超时")
    except FileNotFoundError:
        print("⚠️  Docker未安装或未在PATH中")
    except Exception as e:
        print(f"❌ 测试过程中出现错误: {e}")

def check_required_files():
    """检查必需的文件是否存在"""
    print("\n=== 检查必需文件 ===")
    
    required_files = [
        "Dockerfile",
        "docker-compose.yml",
        "gunicorn.conf.py",
        "app.py",
        "requirements.txt"
    ]
    
    for file in required_files:
        try:
            with open(file, 'r') as f:
                print(f"✅ {file} 存在")
        except FileNotFoundError:
            print(f"❌ {file} 不存在")
        except Exception as e:
            print(f"❌ 检查 {file} 时出错: {e}")

if __name__ == "__main__":
    check_required_files()
    test_docker_build()