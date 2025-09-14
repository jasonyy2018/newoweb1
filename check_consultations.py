#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
检查咨询记录脚本
"""

from db_manager import db_manager

def check_consultations():
    """检查咨询记录"""
    print("正在获取所有咨询记录...")
    consultations = db_manager.get_all_consultations()
    print(f"总共找到 {len(consultations)} 条记录")
    
    if consultations:
        print("\n前5条记录:")
        for i, consultation in enumerate(consultations[:5]):
            print(f"{i+1}. ID: {consultation.get('id', 'N/A')}")
            print(f"   姓名: {consultation.get('name', 'N/A')}")
            print(f"   邮箱: {consultation.get('email', 'N/A')}")
            print(f"   公司: {consultation.get('company', 'N/A')}")
            print(f"   电话: {consultation.get('phone', 'N/A')}")
            print(f"   服务: {consultation.get('service', 'N/A')}")
            print(f"   消息: {consultation.get('message', 'N/A')}")
            print(f"   时间: {consultation.get('timestamp', 'N/A')}")
            print()
    else:
        print("没有找到任何记录")

if __name__ == "__main__":
    check_consultations()