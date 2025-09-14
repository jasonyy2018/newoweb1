#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SQLite到PostgreSQL数据库迁移工具
"""

import sqlite3
import psycopg2
import os
import json
from datetime import datetime
from contextlib import contextmanager

# PostgreSQL连接配置
PG_CONFIG = {
    'host': '156.238.249.149',
    'port': 5432,
    'database': 'aiow',
    'user': 'aiow',
    'password': 'EZH3HPYzy3QNGTEz'
}

class DatabaseMigrator:
    def __init__(self):
        self.sqlite_db_path = 'data/consultations.db'
        self.backup_data = []
        
    def test_postgresql_connection(self):
        """测试PostgreSQL连接"""
        try:
            print("🔗 测试PostgreSQL连接...")
            conn = psycopg2.connect(**PG_CONFIG)
            cursor = conn.cursor()
            cursor.execute("SELECT version();")
            version = cursor.fetchone()
            print(f"✅ PostgreSQL连接成功: {version[0]}")
            conn.close()
            return True
        except Exception as e:
            print(f"❌ PostgreSQL连接失败: {e}")
            return False
    
    def backup_sqlite_data(self):
        """备份SQLite数据"""
        print("💾 备份SQLite数据...")
        
        if not os.path.exists(self.sqlite_db_path):
            print(f"⚠️  SQLite数据库不存在: {self.sqlite_db_path}")
            return False
        
        try:
            conn = sqlite3.connect(self.sqlite_db_path)
            cursor = conn.cursor()
            
            # 检查表是否存在
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='consultations';")
            if not cursor.fetchone():
                print("⚠️  consultations表不存在")
                conn.close()
                return False
            
            # 获取所有数据
            cursor.execute("SELECT * FROM consultations ORDER BY id;")
            rows = cursor.fetchall()
            
            # 获取列信息
            cursor.execute("PRAGMA table_info(consultations);")
            columns = cursor.fetchall()
            column_names = [col[1] for col in columns]
            
            # 转换为字典格式
            self.backup_data = []
            for row in rows:
                record = dict(zip(column_names, row))
                self.backup_data.append(record)
            
            conn.close()
            print(f"✅ 成功备份 {len(self.backup_data)} 条记录")
            print(f"📋 字段: {column_names}")
            return True
            
        except Exception as e:
            print(f"❌ 备份失败: {e}")
            return False
    
    def create_postgresql_table(self):
        """在PostgreSQL中创建表"""
        print("🏗️  创建PostgreSQL表结构...")
        
        try:
            conn = psycopg2.connect(**PG_CONFIG)
            cursor = conn.cursor()
            
            # 删除现有表（如果存在）
            cursor.execute("DROP TABLE IF EXISTS consultations;")
            
            # 创建新表 - 统一字段结构
            create_table_sql = """
            CREATE TABLE consultations (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                company VARCHAR(255),
                phone VARCHAR(50),
                service VARCHAR(255),
                message TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """
            
            cursor.execute(create_table_sql)
            conn.commit()
            
            print("✅ PostgreSQL表创建成功")
            
            # 创建索引
            cursor.execute("CREATE INDEX idx_consultations_email ON consultations(email);")
            cursor.execute("CREATE INDEX idx_consultations_timestamp ON consultations(timestamp);")
            conn.commit()
            
            print("✅ 索引创建成功")
            
            conn.close()
            return True
            
        except Exception as e:
            print(f"❌ 创建表失败: {e}")
            return False
    
    def migrate_data(self):
        """迁移数据到PostgreSQL"""
        print("📦 迁移数据到PostgreSQL...")
        
        if not self.backup_data:
            print("⚠️  没有数据需要迁移")
            return True
        
        try:
            conn = psycopg2.connect(**PG_CONFIG)
            cursor = conn.cursor()
            
            migrated_count = 0
            for record in self.backup_data:
                # 映射字段 - 处理不同的字段名
                name = record.get('name', '')
                email = record.get('email', '')
                company = record.get('company', '')
                phone = record.get('phone', '')
                
                # 处理service字段 - 如果原数据没有service，使用空字符串
                service = record.get('service', '')
                if not service and 'status' in record:
                    # 如果有status字段，可以作为service的替代
                    service = record.get('status', '')
                
                message = record.get('message', '')
                
                # 处理时间戳字段
                timestamp = record.get('timestamp') or record.get('created_at')
                if not timestamp:
                    timestamp = datetime.now()
                
                # 插入数据
                insert_sql = """
                INSERT INTO consultations (name, email, company, phone, service, message, timestamp)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
                
                cursor.execute(insert_sql, (name, email, company, phone, service, message, timestamp))
                migrated_count += 1
            
            conn.commit()
            conn.close()
            
            print(f"✅ 成功迁移 {migrated_count} 条记录")
            return True
            
        except Exception as e:
            print(f"❌ 数据迁移失败: {e}")
            return False
    
    def verify_migration(self):
        """验证迁移结果"""
        print("🔍 验证迁移结果...")
        
        try:
            conn = psycopg2.connect(**PG_CONFIG)
            cursor = conn.cursor()
            
            # 检查记录数
            cursor.execute("SELECT COUNT(*) FROM consultations;")
            count = cursor.fetchone()[0]
            print(f"📊 PostgreSQL中的记录数: {count}")
            
            # 检查最新记录
            cursor.execute("SELECT * FROM consultations ORDER BY id DESC LIMIT 3;")
            recent_records = cursor.fetchall()
            
            print("📋 最新的3条记录:")
            for i, record in enumerate(recent_records, 1):
                print(f"   {i}. ID:{record[0]}, 姓名:{record[1]}, 邮箱:{record[2]}")
            
            conn.close()
            return True
            
        except Exception as e:
            print(f"❌ 验证失败: {e}")
            return False
    
    def run_migration(self):
        """执行完整迁移流程"""
        print("🚀 开始数据库迁移流程")
        print("="*50)
        
        # 1. 测试PostgreSQL连接
        if not self.test_postgresql_connection():
            return False
        
        # 2. 备份SQLite数据
        if not self.backup_sqlite_data():
            print("⚠️  跳过数据备份，继续创建表结构")
        
        # 3. 创建PostgreSQL表
        if not self.create_postgresql_table():
            return False
        
        # 4. 迁移数据
        if not self.migrate_data():
            return False
        
        # 5. 验证迁移
        if not self.verify_migration():
            return False
        
        print("\n🎉 数据库迁移完成!")
        return True

if __name__ == "__main__":
    migrator = DatabaseMigrator()
    success = migrator.run_migration()
    
    if success:
        print("\n📝 下一步:")
        print("1. 安装 psycopg2: pip install psycopg2-binary")
        print("2. 更新 Flask 应用配置")
        print("3. 测试应用连接")
    else:
        print("\n❌ 迁移失败，请检查错误信息")