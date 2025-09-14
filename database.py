#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SQLite数据库操作模块（已弃用）
此模块已弃用，推荐使用db_manager.py中的DatabaseManager类
"""

from db_manager import db_manager

# 创建SQLite数据库管理器实例
sqlite_db_manager = db_manager if db_manager.db_type == 'sqlite' else None

def init_db():
    """初始化数据库（已弃用，请使用db_manager）"""
    print("警告：init_db已弃用，请使用db_manager.init_database()")
    if sqlite_db_manager:
        return sqlite_db_manager.init_database()
    return False

def save_consultation(name, email, company, phone, service, message):
    """保存咨询信息（已弃用，请使用db_manager）"""
    print("警告：save_consultation已弃用，请使用db_manager.save_consultation()")
    if sqlite_db_manager:
        return sqlite_db_manager.save_consultation(name, email, company, phone, service, message)
    return None

def get_all_consultations():
    """获取所有咨询信息（已弃用，请使用db_manager）"""
    print("警告：get_all_consultations已弃用，请使用db_manager.get_all_consultations()")
    if sqlite_db_manager:
        return sqlite_db_manager.get_all_consultations()
    return []

def get_consultation_by_id(consultation_id):
    """根据ID获取咨询信息（已弃用）"""
    print("警告：get_consultation_by_id已弃用")
    return None

def delete_consultation(consultation_id):
    """删除咨询信息（已弃用）"""
    print("警告：delete_consultation已弃用")
    return False

# 初始化数据库
if __name__ == "__main__":
    init_db()
    print("数据库初始化完成")