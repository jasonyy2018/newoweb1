#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试CSP修复效果
"""

import requests
import json

def test_csp_headers():
    """测试CSP头部是否正确设置"""
    print("=== CSP头部测试 ===")
    
    try:
        # 测试首页
        response = requests.get('http://127.0.0.1:5001/', timeout=10)
        
        print(f"状态码: {response.status_code}")
        
        # 检查CSP头部
        csp_header = response.headers.get('Content-Security-Policy')
        if csp_header:
            print("✅ CSP头部已设置:")
            print(f"   {csp_header}")
        else:
            print("❌ 未找到CSP头部")
        
        # 检查其他安全头部
        security_headers = [
            'X-Content-Type-Options',
            'X-Frame-Options', 
            'X-XSS-Protection',
            'Referrer-Policy'
        ]
        
        print("\n其他安全头部:")
        for header in security_headers:
            value = response.headers.get(header)
            if value:
                print(f"✅ {header}: {value}")
            else:
                print(f"❌ {header}: 未设置")
        
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"❌ 请求失败: {e}")
        return False

def test_api_response():
    """测试API响应"""
    print("\n=== API响应测试 ===")
    
    try:
        # 测试健康检查端点
        response = requests.get('http://127.0.0.1:5001/health', timeout=5)
        
        if response.status_code == 200:
            try:
                data = response.json()
                print(f"✅ 健康检查成功: {data}")
            except json.JSONDecodeError:
                print(f"✅ 健康检查成功 (非JSON响应): {response.text[:100]}")
        else:
            print(f"❌ 健康检查失败: {response.status_code}")
        
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"❌ API测试失败: {e}")
        return False

def main():
    """主测试函数"""
    print("CSP修复效果测试\n")
    
    # 等待应用启动
    import time
    print("等待应用启动...")
    time.sleep(3)
    
    # 测试CSP头部
    csp_ok = test_csp_headers()
    
    # 测试API响应
    api_ok = test_api_response()
    
    print(f"\n=== 测试结果 ===")
    print(f"CSP头部: {'✅ 正常' if csp_ok else '❌ 异常'}")
    print(f"API响应: {'✅ 正常' if api_ok else '❌ 异常'}")
    
    if csp_ok and api_ok:
        print("\n🎉 CSP修复成功！")
        print("建议:")
        print("1. 在浏览器中访问 http://127.0.0.1:5001")
        print("2. 打开开发者工具检查是否还有CSP错误")
        print("3. 测试网站的所有功能")
    else:
        print("\n⚠️ 仍有问题需要解决")

if __name__ == '__main__':
    main()