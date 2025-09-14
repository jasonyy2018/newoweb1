#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
统一数据库管理模块
支持SQLite和PostgreSQL数据库
"""

import os
import sqlite3
import psycopg2
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
from typing import Optional, Dict, Any, List
from datetime import datetime
import logging

class DatabaseManager:
    def __init__(self, db_type='postgresql'):
        """
        初始化数据库管理器
        
        Args:
            db_type (str): 数据库类型，'sqlite' 或 'postgresql'
        """
        self.db_type = db_type.lower()
        self.logger = logging.getLogger(__name__)
        
        if self.db_type == 'postgresql':
            self.config = {
                'host': os.environ.get('POSTGRESQL_HOST', '156.238.249.149'),
                'port': int(os.environ.get('POSTGRESQL_PORT', 5432)),
                'database': os.environ.get('POSTGRESQL_DATABASE', 'aiow'),
                'user': os.environ.get('POSTGRESQL_USER', 'aiow'),
                'password': os.environ.get('POSTGRESQL_PASSWORD', 'EZH3HPYzy3QNGTEz')
            }
        else:
            # SQLite配置
            self.db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'consultations.db')
    
    def get_connection(self):
        """获取数据库连接"""
        if self.db_type == 'postgresql':
            try:
                conn = psycopg2.connect(**self.config, cursor_factory=RealDictCursor)
                return conn
            except Exception as e:
                self.logger.error(f"PostgreSQL数据库连接失败: {e}")
                return None
        else:
            try:
                # 确保data目录存在
                data_dir = os.path.dirname(self.db_path)
                if not os.path.exists(data_dir):
                    os.makedirs(data_dir)
                conn = sqlite3.connect(self.db_path)
                conn.row_factory = sqlite3.Row  # 使结果可以通过列名访问
                return conn
            except Exception as e:
                self.logger.error(f"SQLite数据库连接失败: {e}")
                return None
    
    def init_database(self):
        """初始化数据库表"""
        try:
            conn = self.get_connection()
            if not conn:
                return False
            
            if self.db_type == 'postgresql':
                return self._init_postgresql(conn)
            else:
                return self._init_sqlite(conn)
        except Exception as e:
            self.logger.error(f"数据库初始化失败: {e}")
            return False
    
    def _init_postgresql(self, conn):
        """初始化PostgreSQL数据库"""
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
            self.logger.info("PostgreSQL数据库表初始化成功")
            return True
            
        except Exception as e:
            self.logger.error(f"PostgreSQL数据库初始化失败: {e}")
            conn.rollback()
            return False
        finally:
            cursor.close()
            conn.close()
    
    def _init_sqlite(self, conn):
        """初始化SQLite数据库"""
        try:
            cursor = conn.cursor()
            
            # 创建咨询表
            cursor.execute('''CREATE TABLE IF NOT EXISTS consultations
                             (id INTEGER PRIMARY KEY AUTOINCREMENT,
                              name TEXT NOT NULL,
                              email TEXT NOT NULL,
                              company TEXT,
                              phone TEXT,
                              service TEXT,
                              message TEXT,
                              timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
            
            conn.commit()
            self.logger.info("SQLite数据库表初始化成功")
            return True
        except Exception as e:
            self.logger.error(f"SQLite数据库初始化失败: {e}")
            return False
        finally:
            conn.close()
    
    def save_consultation(self, name: str, email: str, company: str, phone: str, service: str, message: str) -> Optional[int]:
        """保存咨询信息"""
        try:
            conn = self.get_connection()
            if not conn:
                return None
            
            if self.db_type == 'postgresql':
                return self._save_consultation_postgresql(conn, name, email, company, phone, service, message)
            else:
                return self._save_consultation_sqlite(conn, name, email, company, phone, service, message)
        except Exception as e:
            self.logger.error(f"保存咨询信息失败: {e}")
            return None
    
    def _save_consultation_postgresql(self, conn, name, email, company, phone, service, message):
        """保存咨询信息到PostgreSQL"""
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
            self.logger.error(f"保存咨询信息到PostgreSQL失败: {e}")
            conn.rollback()
            return None
        finally:
            cursor.close()
            conn.close()
    
    def _save_consultation_sqlite(self, conn, name, email, company, phone, service, message):
        """保存咨询信息到SQLite"""
        try:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO consultations (name, email, company, phone, service, message) VALUES (?, ?, ?, ?, ?, ?)",
                         (name, email, company, phone, service, message))
            conn.commit()
            return cursor.lastrowid
        except Exception as e:
            self.logger.error(f"保存咨询信息到SQLite失败: {e}")
            return None
        finally:
            conn.close()
    
    def get_all_consultations(self) -> List[Dict[str, Any]]:
        """获取所有咨询信息"""
        try:
            conn = self.get_connection()
            if not conn:
                return []
            
            if self.db_type == 'postgresql':
                return self._get_all_consultations_postgresql(conn)
            else:
                return self._get_all_consultations_sqlite(conn)
        except Exception as e:
            self.logger.error(f"获取咨询信息失败: {e}")
            return []
    
    def _get_all_consultations_postgresql(self, conn):
        """从PostgreSQL获取所有咨询信息"""
        try:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT * FROM consultations 
                ORDER BY timestamp DESC
            """)
            
            consultations = cursor.fetchall()
            return [dict(row) for row in consultations]
        except Exception as e:
            self.logger.error(f"从PostgreSQL获取咨询信息失败: {e}")
            return []
        finally:
            cursor.close()
            conn.close()
    
    def _get_all_consultations_sqlite(self, conn):
        """从SQLite获取所有咨询信息"""
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM consultations ORDER BY timestamp DESC")
            rows = cursor.fetchall()
            # 转换为字典列表
            columns = [description[0] for description in cursor.description]
            return [dict(zip(columns, row)) for row in rows]
        except Exception as e:
            self.logger.error(f"从SQLite获取咨询信息失败: {e}")
            return []
        finally:
            conn.close()
    
    def get_consultation_stats(self) -> Dict[str, Any]:
        """获取咨询统计信息"""
        if self.db_type != 'postgresql':
            # SQLite不支持复杂的统计查询，返回空字典
            return {}
        
        try:
            conn = self.get_connection()
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
                self.logger.error(f"获取统计信息失败: {e}")
                return {}
            finally:
                cursor.close()
                conn.close()
        except Exception as e:
            self.logger.error(f"数据库连接失败: {e}")
            return {}

# 创建全局数据库管理器实例
db_manager = DatabaseManager('postgresql')