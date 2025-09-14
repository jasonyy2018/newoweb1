#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动化测试运行脚本
"""

import subprocess
import time
import sys
import os

def run_tests():
    """运行所有测试"""
    print("=== 自动化测试运行脚本 ===")
    print("正在启动Flask应用...")
    
    # 启动Flask应用
    try:
        flask_process = subprocess.Popen(
            [sys.executable, "app.py"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        print("Flask应用已启动")
        
        # 等待应用启动
        time.sleep(5)
        
        # 运行测试
        print("运行综合测试...")
        test_process = subprocess.run(
            [sys.executable, "test_all.py"],
            input="\n",
            text=True,
            capture_output=True
        )
        
        print("测试输出:")
        print(test_process.stdout)
        if test_process.stderr:
            print("测试错误:")
            print(test_process.stderr)
        
        # 终止Flask应用
        flask_process.terminate()
        flask_process.wait()
        
        print("测试完成")
        
    except Exception as e:
        print(f"测试过程中出现错误: {e}")

if __name__ == "__main__":
    run_tests()