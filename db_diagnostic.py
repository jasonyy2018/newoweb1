#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Flask数据库诊断工具
检测数据库文件和路径配置问题
"""

import sqlite3
import os
import json
from datetime import datetime
from pathlib import Path

# 导入新的数据库管理器
from db_manager import db_manager

class DatabaseDiagnostic:
    def __init__(self, project_root="."):
        self.project_root = Path(project_root)
        self.db_files = []
        self.analysis_result = {}
        
    def find_database_files(self):
        """查找所有数据库文件"""
        print("🔍 正在扫描数据库文件...")
        
        # 查找.db文件
        for db_file in self.project_root.rglob("*.db"):
            if db_file.is_file():
                file_info = {
                    'path': str(db_file),
                    'size': db_file.stat().st_size,
                    'modified': datetime.fromtimestamp(db_file.stat().st_mtime).strftime('%Y-%m-%d %H:%M:%S'),
                    'relative_path': str(db_file.relative_to(self.project_root))
                }
                self.db_files.append(file_info)
        
        print(f"📁 发现 {len(self.db_files)} 个数据库文件:")
        for db in self.db_files:
            print(f"   • {db['relative_path']} ({db['size']} bytes, 修改时间: {db['modified']})")
        
        return self.db_files
    
    def analyze_table_structure(self, db_path):
        """分析数据库表结构"""
        try:
            conn = sqlite3.connect(db_path)
            cursor = conn.cursor()
            
            # 获取所有表
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
            tables = [row[0] for row in cursor.fetchall()]
            
            table_info = {}
            for table in tables:
                cursor.execute(f"PRAGMA table_info({table});")
                columns = cursor.fetchall()
                table_info[table] = {
                    'columns': columns,
                    'column_names': [col[1] for col in columns]
                }
                
                # 获取记录数
                cursor.execute(f"SELECT COUNT(*) FROM {table};")
                table_info[table]['record_count'] = cursor.fetchone()[0]
            
            conn.close()
            return table_info
            
        except Exception as e:
            return {'error': str(e)}
    
    def compare_databases(self):
        """对比数据库结构"""
        print("\n📊 分析数据库表结构...")
        
        db_structures = {}
        for db_file in self.db_files:
            db_path = db_file['path']
            print(f"   分析: {db_file['relative_path']}")
            structure = self.analyze_table_structure(db_path)
            db_structures[db_file['relative_path']] = structure
        
        return db_structures
    
    def check_flask_config(self):
        """检查Flask配置中的数据库路径"""
        print("\n⚙️  检查Flask配置...")
        
        config_info = {}
        
        # 检查app.py中的数据库配置
        app_py_path = self.project_root / "app.py"
        if app_py_path.exists():
            with open(app_py_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # 查找数据库配置
            if "DATABASE" in content:
                lines = content.split('\n')
                for i, line in enumerate(lines):
                    if "DATABASE" in line and "=" in line:
                        config_info['app_py_database_config'] = {
                            'line_number': i + 1,
                            'content': line.strip()
                        }
                        break
        
        # 检查database.py中的路径配置
        db_py_path = self.project_root / "database.py"
        if db_py_path.exists():
            with open(db_py_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            if "DB_PATH" in content:
                lines = content.split('\n')
                for i, line in enumerate(lines):
                    if "DB_PATH" in line and "=" in line:
                        config_info['database_py_path_config'] = {
                            'line_number': i + 1,
                            'content': line.strip()
                        }
                        break
        
        return config_info
    
    def test_database_connections(self):
        """测试数据库连接"""
        print("\n🔌 测试数据库连接...")
        
        # 测试PostgreSQL连接
        try:
            conn = db_manager.get_connection()
            if conn:
                print("   ✅ PostgreSQL连接成功")
                conn.close()
            else:
                print("   ❌ PostgreSQL连接失败")
        except Exception as e:
            print(f"   ❌ PostgreSQL连接失败: {e}")
    
    def generate_diagnostic_report(self):
        """生成诊断报告"""
        print("\n" + "="*60)
        print("📋 Flask数据库诊断报告")
        print("="*60)
        
        # 1. 数据库文件发现
        self.find_database_files()
        
        # 2. 表结构对比
        db_structures = self.compare_databases()
        
        # 3. Flask配置检查
        config_info = self.check_flask_config()
        
        # 4. 数据库连接测试
        self.test_database_connections()
        
        # 5. 问题诊断
        print("\n🔧 问题诊断:")
        issues = []
        
        # 检查是否有consultations表
        consultations_dbs = []
        for db_path, structure in db_structures.items():
            if 'consultations' in structure:
                consultations_dbs.append(db_path)
                print(f"   ✅ {db_path} 包含 consultations 表 ({structure['consultations']['record_count']} 条记录)")
            else:
                print(f"   ❌ {db_path} 缺少 consultations 表")
                issues.append(f"数据库 {db_path} 缺少 consultations 表")
        
        # 检查表结构一致性
        if len(consultations_dbs) > 1:
            print("\n   📋 consultations表结构对比:")
            first_db = consultations_dbs[0]
            first_columns = db_structures[first_db]['consultations']['column_names']
            
            for db_path in consultations_dbs[1:]:
                columns = db_structures[db_path]['consultations']['column_names']
                if columns != first_columns:
                    print(f"   ⚠️  表结构不一致:")
                    print(f"      {first_db}: {first_columns}")
                    print(f"      {db_path}: {columns}")
                    issues.append(f"数据库表结构不一致: {first_db} vs {db_path}")
        
        # 保存诊断结果
        self.analysis_result = {
            'timestamp': datetime.now().isoformat(),
            'database_files': self.db_files,
            'structures': db_structures,
            'config': config_info,
            'issues': issues
        }
        
        # 输出建议
        print(f"\n💡 发现 {len(issues)} 个问题:")
        for i, issue in enumerate(issues, 1):
            print(f"   {i}. {issue}")
        
        return self.analysis_result

if __name__ == "__main__":
    diagnostic = DatabaseDiagnostic()
    result = diagnostic.generate_diagnostic_report()