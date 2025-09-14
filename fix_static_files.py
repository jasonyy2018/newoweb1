#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复静态文件脚本
确保所有必需的CSS文件都存在且不为空
"""

import os

def create_css_content():
    """创建基本的CSS内容"""
    css_content = {
        'code.css': '/* Code CSS */\n',
        'laydate.css': '/* Laydate CSS */\n',
        'layer.css': '/* Layer CSS */\n'
    }
    return css_content

def fix_static_files():
    """修复静态文件"""
    print("正在修复静态文件...")
    
    # 确保目录结构存在
    directories = [
        'static/css/modules',
        'static/css/modules/laydate/default',
        'static/css/modules/layer/default'
    ]
    
    for directory in directories:
        if not os.path.exists(directory):
            os.makedirs(directory)
            print(f"创建目录: {directory}")
    
    # 创建CSS文件内容
    css_content = create_css_content()
    
    # 修复文件
    files_to_fix = {
        'static/css/modules/code.css': css_content['code.css'],
        'static/css/modules/laydate/default/laydate.css': css_content['laydate.css'],
        'static/css/modules/layer/default/layer.css': css_content['layer.css']
    }
    
    for file_path, content in files_to_fix.items():
        if not os.path.exists(file_path) or os.path.getsize(file_path) == 0:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"修复文件: {file_path}")
        else:
            print(f"文件已存在且非空: {file_path}")
    
    print("静态文件修复完成!")

if __name__ == "__main__":
    fix_static_files()