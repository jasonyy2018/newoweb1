#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
数据库检查脚本
"""

import sqlite3
import os

def check_database(db_path):
    """检查数据库表结构"""
    print(f"检查数据库: {db_path}")
    if not os.path.exists(db_path):
        print(f"数据库文件不存在: {db_path}")
        return
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # 检查表
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        print(f"表列表: {tables}")
        
        # 如果有consultations表，检查结构
        if ('consultations',) in tables:
            cursor.execute("PRAGMA table_info(consultations);")
            columns = cursor.fetchall()
            print(f"consultations表结构: {columns}")
            
            # 检查数据
            cursor.execute("SELECT COUNT(*) FROM consultations;")
            count = cursor.fetchone()[0]
            print(f"consultations表记录数: {count}")
        else:
            print("consultations表不存在")
        
        conn.close()
    except Exception as e:
        print(f"检查数据库时出错: {e}")

if __name__ == "__main__":
    # 检查根目录的数据库
    check_database("consultations.db")
    print("-" * 50)
    # 检查data目录的数据库
    check_database("data/consultations.db")