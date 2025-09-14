#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Docker环境数据库连接测试
"""

import os
import psycopg2
from psycopg2 import sql

def test_postgresql_connection():
    """测试PostgreSQL连接"""
    print("=== Docker环境PostgreSQL连接测试 ===")
    
    # 从环境变量获取数据库配置
    db_config = {
        'host': os.environ.get('POSTGRESQL_HOST', '156.238.249.149'),
        'port': int(os.environ.get('POSTGRESQL_PORT', 5432)),
        'database': os.environ.get('POSTGRESQL_DATABASE', 'aiow'),
        'user': os.environ.get('POSTGRESQL_USER', 'aiow'),
        'password': os.environ.get('POSTGRESQL_PASSWORD', 'EZH3HPYzy3QNGTEz')
    }
    
    print(f"连接配置: {db_config['host']}:{db_config['port']}/{db_config['database']}")
    
    try:
        # 测试连接
        conn = psycopg2.connect(**db_config)
        cursor = conn.cursor()
        
        # 测试查询
        cursor.execute("SELECT version();")
        version = cursor.fetchone()
        print(f"✅ PostgreSQL连接成功: {version[0]}")
        
        # 检查consultations表
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'consultations'
            );
        """)
        table_exists = cursor.fetchone()[0]
        
        if table_exists:
            cursor.execute("SELECT COUNT(*) FROM consultations;")
            count = cursor.fetchone()[0]
            print(f"✅ consultations表存在，记录数: {count}")
        else:
            print("❌ consultations表不存在")
            
        cursor.close()
        conn.close()
        
        return True
        
    except Exception as e:
        print(f"❌ PostgreSQL连接失败: {e}")
        return False

def test_redis_connection():
    """测试Redis连接"""
    print("\n=== Redis连接测试 ===")
    
    redis_url = os.environ.get('REDIS_URL', 'redis://redis_C7DGKB@156.238.249.149:6379/0')
    print(f"Redis URL: {redis_url}")
    
    try:
        import redis
        r = redis.from_url(redis_url)
        r.ping()
        print("✅ Redis连接成功")
        return True
    except ImportError:
        print("⚠️ Redis库未安装，跳过测试")
        return True
    except Exception as e:
        print(f"❌ Redis连接失败: {e}")
        return False

if __name__ == '__main__':
    print("环境变量:")
    for key in ['POSTGRESQL_HOST', 'POSTGRESQL_PORT', 'POSTGRESQL_DATABASE', 'POSTGRESQL_USER', 'REDIS_URL']:
        value = os.environ.get(key, '未设置')
        if 'PASSWORD' in key:
            value = '***' if value != '未设置' else '未设置'
        print(f"  {key}: {value}")
    
    print()
    pg_ok = test_postgresql_connection()
    redis_ok = test_redis_connection()
    
    print(f"\n=== 测试结果 ===")
    print(f"PostgreSQL: {'✅ 正常' if pg_ok else '❌ 异常'}")
    print(f"Redis: {'✅ 正常' if redis_ok else '❌ 异常'}")