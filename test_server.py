#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests

def test_server_endpoint():
    """直接测试服务器端点"""
    url = 'http://127.0.0.1:5001/submit_consultation'
    
    # 测试数据
    data = {
        'name': '服务器测试用户',
        'company': '服务器测试公司',
        'email': 'server_test@example.com',
        'phone': '13800138001',
        'message': '这是服务器端测试消息'
    }
    
    try:
        # 发送POST请求
        response = requests.post(url, data=data)
        print(f"状态码: {response.status_code}")
        print(f"响应头: {response.headers}")
        print(f"响应内容: {response.text}")
        
        # 尝试解析JSON
        try:
            json_data = response.json()
            print(f"JSON响应: {json_data}")
        except:
            print("响应不是有效的JSON格式")
            
    except Exception as e:
        print(f"请求过程中出错: {e}")

if __name__ == '__main__':
    print("开始测试服务器端点...")
    test_server_endpoint()