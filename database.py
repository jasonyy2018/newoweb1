#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
数据库操作模块
处理咨询表单数据的存储和检索
"""

import sqlite3
import os
from datetime import datetime
from contextlib import contextmanager

# 数据库文件路径
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'consultations.db')

def init_db():
    """初始化数据库"""
    # 确保data目录存在
    data_dir = os.path.dirname(DB_PATH)
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)
    
    # 创建数据库连接
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    # 创建咨询表
    c.execute('''CREATE TABLE IF NOT EXISTS consultations
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT NOT NULL,
                  email TEXT NOT NULL,
                  company TEXT,
                  phone TEXT,
                  service TEXT,
                  message TEXT,
                  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
    
    conn.commit()
    conn.close()

@contextmanager
def get_db_connection():
    """数据库连接上下文管理器"""
    conn = sqlite3.connect(DB_PATH)
    try:
        yield conn
    finally:
        conn.close()

def save_consultation(name, email, company, phone, service, message):
    """保存咨询信息"""
    try:
        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute("INSERT INTO consultations (name, email, company, phone, service, message) VALUES (?, ?, ?, ?, ?, ?)",
                     (name, email, company, phone, service, message))
            conn.commit()
            return c.lastrowid
    except Exception as e:
        print(f"保存咨询信息时出错: {e}")
        return None

def get_all_consultations():
    """获取所有咨询信息"""
    try:
        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute("SELECT * FROM consultations ORDER BY timestamp DESC")
            return c.fetchall()
    except Exception as e:
        print(f"获取咨询信息时出错: {e}")
        return []

def get_consultation_by_id(consultation_id):
    """根据ID获取咨询信息"""
    try:
        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute("SELECT * FROM consultations WHERE id = ?", (consultation_id,))
            return c.fetchone()
    except Exception as e:
        print(f"获取咨询信息时出错: {e}")
        return None

def delete_consultation(consultation_id):
    """删除咨询信息"""
    try:
        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute("DELETE FROM consultations WHERE id = ?", (consultation_id,))
            conn.commit()
            return c.rowcount > 0
    except Exception as e:
        print(f"删除咨询信息时出错: {e}")
        return False

# 初始化数据库
if __name__ == "__main__":
    init_db()
    print("数据库初始化完成")