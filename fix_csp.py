#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复CSP (Content Security Policy) 问题
"""

import os
import re
from pathlib import Path

def fix_setTimeout_calls(file_path):
    """修复setTimeout调用，避免使用字符串参数"""
    print(f"修复文件: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # 修复 setTimeout(function() { ... }, delay) 格式
    # 这种格式是安全的，不需要修改
    
    # 查找可能有问题的setTimeout调用
    setTimeout_patterns = [
        # 匹配 setTimeout("string", delay) 格式
        (r'setTimeout\s*\(\s*["\']([^"\']+)["\']\s*,\s*(\d+)\s*\)', 
         r'setTimeout(function() { \1 }, \2)'),
        
        # 匹配 setTimeout('string', delay) 格式  
        (r"setTimeout\s*\(\s*['\"]([^'\"]+)['\"]\s*,\s*(\d+)\s*\)",
         r'setTimeout(function() { \1 }, \2)')
    ]
    
    changes_made = False
    for pattern, replacement in setTimeout_patterns:
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            changes_made = True
            print(f"  - 修复了setTimeout字符串调用")
    
    # 检查是否有其他可能的CSP违规
    csp_violations = []
    
    # 检查eval()调用
    if re.search(r'\beval\s*\(', content):
        csp_violations.append("发现eval()调用")
    
    # 检查new Function()调用
    if re.search(r'\bnew\s+Function\s*\(', content):
        csp_violations.append("发现new Function()调用")
    
    # 检查内联事件处理器
    inline_events = re.findall(r'on\w+\s*=\s*["\'][^"\']*["\']', content)
    if inline_events:
        csp_violations.append(f"发现{len(inline_events)}个内联事件处理器")
    
    if csp_violations:
        print(f"  ⚠️ 发现潜在CSP违规: {', '.join(csp_violations)}")
    
    if changes_made:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✅ 文件已更新")
    else:
        print(f"  ℹ️ 无需修改")
    
    return changes_made

def add_csp_headers_to_app():
    """在Flask应用中添加CSP头部"""
    app_py_path = "app.py"
    
    print(f"添加CSP头部到 {app_py_path}")
    
    with open(app_py_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 检查是否已经有CSP配置
    if 'Content-Security-Policy' in content:
        print("  ℹ️ CSP头部已存在")
        return False
    
    # 在Flask应用创建后添加CSP中间件
    csp_middleware = '''
    # 添加CSP头部中间件
    @app.after_request
    def add_security_headers(response):
        """添加安全头部，包括CSP"""
        # Content Security Policy
        csp_policy = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' "
            "https://cdn.tailwindcss.com "
            "https://cdn.jsdelivr.net "
            "https://mk.wisdomitc.com; "
            "style-src 'self' 'unsafe-inline' "
            "https://cdn.tailwindcss.com "
            "https://cdn.jsdelivr.net; "
            "img-src 'self' data: https:; "
            "font-src 'self' https://cdn.jsdelivr.net; "
            "connect-src 'self' https://mk.wisdomitc.com; "
            "frame-src 'self' https://mk.wisdomitc.com; "
            "object-src 'none'; "
            "base-uri 'self';"
        )
        response.headers['Content-Security-Policy'] = csp_policy
        
        # 其他安全头部
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'SAMEORIGIN'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        
        return response
'''
    
    # 在return app之前插入CSP中间件
    insertion_point = content.rfind('return app')
    if insertion_point != -1:
        content = content[:insertion_point] + csp_middleware + '\n    ' + content[insertion_point:]
        
        with open(app_py_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print("  ✅ CSP头部已添加到Flask应用")
        return True
    else:
        print("  ❌ 无法找到插入点")
        return False

def main():
    """主函数"""
    print("=== CSP问题修复工具 ===\n")
    
    # 查找所有HTML文件
    html_files = []
    for root, dirs, files in os.walk('templates'):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    print(f"找到 {len(html_files)} 个HTML文件")
    
    # 修复每个HTML文件
    total_changes = 0
    for html_file in html_files:
        if fix_setTimeout_calls(html_file):
            total_changes += 1
    
    print(f"\n修复了 {total_changes} 个文件")
    
    # 添加CSP头部到Flask应用
    print("\n" + "="*50)
    if add_csp_headers_to_app():
        print("✅ CSP配置已添加到Flask应用")
    
    print("\n=== 修复完成 ===")
    print("建议:")
    print("1. 重启Flask应用以应用CSP头部")
    print("2. 测试网站功能是否正常")
    print("3. 如果仍有CSP错误，检查浏览器控制台获取详细信息")

if __name__ == '__main__':
    main()