#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests

# 测试咨询表单提交功能
def test_consultation_submission():
    url = 'http://127.0.0.1:5000/submit_consultation'
    
    # 测试数据
    data = {
        'name': '张三',
        'company': '测试公司',
        'email': 'zhangsan@test.com',
        'phone': '13800138000',
        'message': '这是一个测试咨询信息'
    }
    
    try:
        # 发送POST请求
        response = requests.post(url, data=data)
        print(f"状态码: {response.status_code}")
        print(f"响应内容: {response.json()}")
        return response.json()
    except Exception as e:
        print(f"测试过程中出错: {e}")
        return None

if __name__ == '__main__':
    print("开始测试咨询表单提交功能...")
    result = test_consultation_submission()
    if result and result.get('success'):
        print("测试成功！咨询信息已提交。")
    else:
        print("测试失败！")