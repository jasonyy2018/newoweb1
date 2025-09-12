#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests
import time
from database import get_all_consultations

def test_form_submission():
    """测试表单提交功能"""
    url = 'http://127.0.0.1:5000/submit_consultation'
    
    # 提交前的记录数
    initial_count = len(get_all_consultations())
    print(f"提交前记录数: {initial_count}")
    
    # 测试数据
    data = {
        'name': '测试用户',
        'company': '测试公司',
        'email': 'test@example.com',
        'phone': '13800138000',
        'message': '这是一条测试咨询信息'
    }
    
    try:
        # 发送POST请求
        response = requests.post(url, data=data)
        print(f"状态码: {response.status_code}")
        print(f"响应内容: {response.json()}")
        
        # 等待数据库写入
        time.sleep(1)
        
        # 提交后的记录数
        final_count = len(get_all_consultations())
        print(f"提交后记录数: {final_count}")
        
        if final_count > initial_count:
            print("✓ 表单提交成功，数据已存储到数据库")
            return True
        else:
            print("✗ 表单提交失败，数据未存储到数据库")
            return False
            
    except Exception as e:
        print(f"测试过程中出错: {e}")
        return False

if __name__ == '__main__':
    print("开始验证咨询表单修复...")
    success = test_form_submission()
    if success:
        print("修复验证成功！")
    else:
        print("修复验证失败！")