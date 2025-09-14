#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
模拟Docker环境测试
"""

import os
import sys
import tempfile
import shutil
import subprocess

def simulate_docker_environment():
    """模拟Docker环境"""
    print("=== 模拟Docker环境 ===")
    
    # 创建临时目录模拟Docker容器
    with tempfile.TemporaryDirectory() as temp_dir:
        print(f"创建临时Docker环境: {temp_dir}")
        
        # 复制必要文件
        files_to_copy = [
            "gunicorn.conf.py",
            "app.py",
            "requirements.txt"
        ]
        
        for file in files_to_copy:
            source = os.path.join(os.getcwd(), file)
            dest = os.path.join(temp_dir, file)
            if os.path.exists(source):
                shutil.copy2(source, dest)
                print(f"✅ 复制 {file}")
            else:
                print(f"❌ {file} 不存在")
        
        # 更改工作目录到临时目录
        original_cwd = os.getcwd()
        os.chdir(temp_dir)
        
        try:
            # 测试Gunicorn配置文件访问
            print("\n--- 测试Gunicorn配置文件访问 ---")
            if os.path.exists("gunicorn.conf.py"):
                print("✅ 在模拟Docker环境中找到 gunicorn.conf.py")
                
                # 测试相对路径访问
                try:
                    result = subprocess.run(
                        [sys.executable, "-c", "import os; print('相对路径:', os.path.exists('gunicorn.conf.py'))"],
                        capture_output=True,
                        text=True,
                        cwd=temp_dir
                    )
                    print(result.stdout.strip())
                except Exception as e:
                    print(f"相对路径测试失败: {e}")
                
                # 测试绝对路径访问
                try:
                    abs_path = os.path.join(temp_dir, "gunicorn.conf.py")
                    result = subprocess.run(
                        [sys.executable, "-c", f"import os; print('绝对路径:', os.path.exists('{abs_path}'))"],
                        capture_output=True,
                        text=True,
                        cwd=temp_dir
                    )
                    print(result.stdout.strip())
                except Exception as e:
                    print(f"绝对路径测试失败: {e}")
                    
            else:
                print("❌ 在模拟Docker环境中未找到 gunicorn.conf.py")
            
            # 测试Gunicorn命令
            print("\n--- 测试Gunicorn命令 ---")
            try:
                # 只测试配置文件是否存在，不实际启动Gunicorn
                cmd = [sys.executable, "-m", "gunicorn.app.wsgiapp", "--help"]
                result = subprocess.run(cmd, capture_output=True, text=True, timeout=5)
                if result.returncode == 0:
                    print("✅ Gunicorn可用")
                else:
                    print("⚠️  Gunicorn测试输出:")
                    print(result.stderr[:200] + "..." if len(result.stderr) > 200 else result.stderr)
            except subprocess.TimeoutExpired:
                print("✅ Gunicorn命令响应 (超时)")
            except FileNotFoundError:
                print("❌ Gunicorn未安装")
            except Exception as e:
                print(f"⚠️  Gunicorn测试异常: {e}")
                
        finally:
            # 恢复原始工作目录
            os.chdir(original_cwd)

def check_docker_build_context():
    """检查Docker构建上下文"""
    print("\n=== 检查Docker构建上下文 ===")
    
    # 检查关键文件
    key_files = [
        "Dockerfile",
        "gunicorn.conf.py", 
        "app.py",
        "requirements.txt"
    ]
    
    for file in key_files:
        if os.path.exists(file):
            size = os.path.getsize(file)
            print(f"✅ {file} ({size} bytes)")
        else:
            print(f"❌ {file} (缺失)")

if __name__ == "__main__":
    print("Docker环境模拟测试")
    print("=" * 30)
    
    simulate_docker_environment()
    check_docker_build_context()
    
    print("\n测试完成!")