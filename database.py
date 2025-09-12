#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sqlite3
import os
from datetime import datetime

# 数据库文件路径
DB_PATH = 'consultations.db'

def init_db():
    """初始化数据库，创建咨询表"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # 创建咨询表
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS consultations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            company TEXT,
            email TEXT NOT NULL,
            phone TEXT,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'pending'
        )
    ''')
    
    # 创建索引以提高查询性能
    cursor.execute('''
        CREATE INDEX IF NOT EXISTS idx_consultations_email 
        ON consultations (email)
    ''')
    
    cursor.execute('''
        CREATE INDEX IF NOT EXISTS idx_consultations_created_at 
        ON consultations (created_at)
    ''')
    
    conn.commit()
    conn.close()
    print(f"数据库已初始化: {DB_PATH}")

def add_consultation(name, company, email, phone, message):
    """添加新的咨询请求"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO consultations (name, company, email, phone, message)
        VALUES (?, ?, ?, ?, ?)
    ''', (name, company, email, phone, message))
    
    consultation_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return consultation_id

def get_all_consultations():
    """获取所有咨询请求"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT id, name, company, email, phone, message, created_at, status
        FROM consultations
        ORDER BY created_at DESC
    ''')
    
    consultations = cursor.fetchall()
    conn.close()
    
    return consultations

def get_consultation_by_id(consultation_id):
    """根据ID获取咨询请求"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT id, name, company, email, phone, message, created_at, status
        FROM consultations
        WHERE id = ?
    ''', (consultation_id,))
    
    consultation = cursor.fetchone()
    conn.close()
    
    return consultation

def update_consultation_status(consultation_id, status):
    """更新咨询请求状态"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        UPDATE consultations
        SET status = ?
        WHERE id = ?
    ''', (status, consultation_id))
    
    conn.commit()
    conn.close()

def delete_consultation(consultation_id):
    """删除咨询请求"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        DELETE FROM consultations
        WHERE id = ?
    ''', (consultation_id,))
    
    conn.commit()
    conn.close()

def get_consultations_count():
    """获取咨询请求数量"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('SELECT COUNT(*) FROM consultations')
    count = cursor.fetchone()[0]
    
    conn.close()
    return count

def get_pending_consultations_count():
    """获取待处理的咨询请求数量"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM consultations WHERE status = 'pending'")
    count = cursor.fetchone()[0]
    
    conn.close()
    return count

# 初始化数据库
if __name__ == '__main__':
    init_db()
    print("数据库初始化完成")