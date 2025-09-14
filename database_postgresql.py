#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PostgreSQL数据库操作模块
此模块已简化，推荐使用db_manager.py中的DatabaseManager类
"""

from db_manager import db_manager

def get_db_connection():
    """获取数据库连接（已弃用，请使用db_manager）"""
    print("警告：get_db_connection已弃用，请使用db_manager.get_connection()")
    return db_manager.get_connection()

def init_database():
    """初始化数据库表（已弃用，请使用db_manager）"""
    print("警告：init_database已弃用，请使用db_manager.init_database()")
    return db_manager.init_database()

def save_consultation(name: str, email: str, company: str, phone: str, service: str, message: str):
    """保存咨询信息（已弃用，请使用db_manager）"""
    print("警告：save_consultation已弃用，请使用db_manager.save_consultation()")
    return db_manager.save_consultation(name, email, company, phone, service, message)

def get_all_consultations():
    """获取所有咨询信息（已弃用，请使用db_manager）"""
    print("警告：get_all_consultations已弃用，请使用db_manager.get_all_consultations()")
    return db_manager.get_all_consultations()

def get_consultation_stats():
    """获取咨询统计信息（已弃用，请使用db_manager）"""
    print("警告：get_consultation_stats已弃用，请使用db_manager.get_consultation_stats()")
    return db_manager.get_consultation_stats()

def test_connection():
    """测试数据库连接"""
    try:
        conn = db_manager.get_connection()
        if conn:
            conn.close()
            return True
        return False
    except:
        return False

if __name__ == "__main__":
    # 测试数据库连接和初始化
    print("测试PostgreSQL数据库连接...")
    if init_database():
        print("数据库连接和初始化成功！")
        
        # 测试统计功能
        stats = get_consultation_stats()
        print(f"当前统计信息: {stats}")
    else:
        print("数据库连接或初始化失败！")