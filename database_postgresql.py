#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PostgreSQL数据库操作模块
"""

import psycopg2
from psycopg2.extras import RealDictCursor
import json
from datetime import datetime
from typing import Optional, Dict, Any, List

# PostgreSQL数据库配置
DB_CONFIG = {
    'host': '156.238.249.149',
    'port': 5432,
    'database': 'aiow',
    'user': 'aiow',
    'password': 'EZH3HPYzy3QNGTEz'
}

def get_db_connection():
    """获取数据库连接"""
    try:
        conn = psycopg2.connect(**DB_CONFIG, cursor_factory=RealDictCursor)
        return conn
    except Exception as e:
        print(f"数据库连接失败: {e}")
        return None

def init_database():
    """初始化数据库表"""
    conn = get_db_connection()
    if not conn:
        return False
    
    try:
        cursor = conn.cursor()
        
        # 创建consultations表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS consultations (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                company VARCHAR(200),
                phone VARCHAR(50),
                service VARCHAR(100),
                message TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # 添加status列（如果不存在）
        cursor.execute("""
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                              WHERE table_name='consultations' AND column_name='status') THEN
                    ALTER TABLE consultations ADD COLUMN status VARCHAR(20) DEFAULT 'pending';
                END IF;
            END $$;
        """)
        
        # 创建索引
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_consultations_timestamp 
            ON consultations(timestamp DESC)
        """)
        
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_consultations_status 
            ON consultations(status)
        """)
        
        conn.commit()
        print("数据库表初始化成功")
        return True
        
    except Exception as e:
        print(f"数据库初始化失败: {e}")
        conn.rollback()
        return False
    finally:
        cursor.close()
        conn.close()

def save_consultation(name: str, email: str, company: str, phone: str, service: str, message: str) -> Optional[int]:
    """保存咨询信息"""
    conn = get_db_connection()
    if not conn:
        return None
    
    try:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO consultations (name, email, company, phone, service, message)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (name, email, company, phone, service, message))
        
        consultation_id = cursor.fetchone()['id']
        conn.commit()
        return consultation_id
        
    except Exception as e:
        print(f"保存咨询信息失败: {e}")
        conn.rollback()
        return None
    finally:
        cursor.close()
        conn.close()

def get_all_consultations() -> List[Dict[str, Any]]:
    """获取所有咨询信息"""
    conn = get_db_connection()
    if not conn:
        return []
    
    try:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT * FROM consultations 
            ORDER BY timestamp DESC
        """)
        
        consultations = cursor.fetchall()
        return [dict(row) for row in consultations]
        
    except Exception as e:
        print(f"获取咨询信息失败: {e}")
        return []
    finally:
        cursor.close()
        conn.close()

def get_consultation_stats() -> Dict[str, Any]:
    """获取咨询统计信息"""
    conn = get_db_connection()
    if not conn:
        return {}
    
    try:
        cursor = conn.cursor()
        
        # 总数统计
        cursor.execute("SELECT COUNT(*) as total FROM consultations")
        total = cursor.fetchone()['total']
        
        # 今日统计
        cursor.execute("""
            SELECT COUNT(*) as today 
            FROM consultations 
            WHERE DATE(timestamp) = CURRENT_DATE
        """)
        today = cursor.fetchone()['today']
        
        # 本月统计
        cursor.execute("""
            SELECT COUNT(*) as this_month 
            FROM consultations 
            WHERE DATE_TRUNC('month', timestamp) = DATE_TRUNC('month', CURRENT_DATE)
        """)
        this_month = cursor.fetchone()['this_month']
        
        # 状态统计
        cursor.execute("""
            SELECT status, COUNT(*) as count 
            FROM consultations 
            GROUP BY status
        """)
        status_stats = {row['status']: row['count'] for row in cursor.fetchall()}
        
        return {
            'total': total,
            'today': today,
            'this_month': this_month,
            'status_stats': status_stats
        }
        
    except Exception as e:
        print(f"获取统计信息失败: {e}")
        return {}
    finally:
        cursor.close()
        conn.close()

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