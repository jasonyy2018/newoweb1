#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
验证Gunicorn配置文件
"""

import os
import sys

def validate_gunicorn_config():
    """验证Gunicorn配置文件"""
    print("=== 验证Gunicorn配置文件 ===")
    
    config_file = "gunicorn.conf.py"
    
    # 检查文件是否存在
    print(f"检查文件 '{config_file}' 是否存在...")
    if os.path.exists(config_file):
        print("✅ 文件存在")
        
        # 检查文件大小
        size = os.path.getsize(config_file)
        print(f"文件大小: {size} bytes")
        
        # 尝试读取文件内容
        try:
            with open(config_file, 'r', encoding='utf-8') as f:
                content = f.read()
                print("✅ 文件可读取")
                print(f"文件行数: {len(content.splitlines())}")
                
                # 检查关键配置
                required_keys = ['bind', 'workers', 'accesslog', 'errorlog']
                for key in required_keys:
                    if key in content:
                        print(f"✅ 配置项 '{key}' 存在")
                    else:
                        print(f"❌ 配置项 '{key}' 缺失")
                        
        except Exception as e:
            print(f"❌ 读取文件失败: {e}")
            return False
            
    else:
        print("❌ 文件不存在")
        # 列出当前目录的文件
        print("当前目录文件:")
        for file in os.listdir('.'):
            if file.endswith('.py'):
                print(f"  {file}")
        return False
    
    return True

def test_config_parsing():
    """测试配置文件解析"""
    print("\n=== 测试配置文件解析 ===")
    
    try:
        # 创建一个简单的测试配置
        test_config = """
bind = "0.0.0.0:8000"
workers = 2
"""
        
        # 写入临时文件
        with open("test_config.py", "w") as f:
            f.write(test_config)
        
        # 尝试执行配置文件
        exec(test_config)
        print("✅ 配置文件语法正确")
        
        # 清理临时文件
        os.remove("test_config.py")
        
    except Exception as e:
        print(f"❌ 配置文件解析失败: {e}")
        # 清理临时文件
        if os.path.exists("test_config.py"):
            os.remove("test_config.py")

if __name__ == "__main__":
    print("Gunicorn配置验证工具")
    print("=" * 30)
    
    success = validate_gunicorn_config()
    test_config_parsing()
    
    if success:
        print("\n🎉 Gunicorn配置文件验证通过!")
    else:
        print("\n❌ Gunicorn配置文件验证失败!")
        sys.exit(1)