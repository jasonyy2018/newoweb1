#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试PostgreSQL Flask应用
"""

import requests
import json
import logging
import traceback
from db_manager import db_manager

# 设置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_database_connection():
    """测试数据库连接"""
    logger.info("🔗 测试PostgreSQL数据库连接...")
    try:
        conn = db_manager.get_connection()
        if conn:
            conn.close()
            logger.info("✅ 数据库连接成功")
            return True
        else:
            logger.error("❌ 数据库连接失败")
            return False
    except Exception as e:
        logger.error(f"❌ 数据库连接失败: {e}")
        logger.error(traceback.format_exc())
        return False

def test_consultation_submission():
    """测试咨询表单提交"""
    logger.info("\n📝 测试咨询表单提交...")
    
    # 测试数据
    test_data = {
        'name': '测试用户',
        'email': 'test@example.com',
        'company': '测试公司',
        'phone': '13800138000',
        'service': 'AI咨询',
        'message': '这是一个测试消息'
    }
    
    try:
        # 假设Flask应用运行在localhost:5001
        response = requests.post('http://localhost:5001/submit_consultation', 
                               data=test_data, 
                               timeout=10)
        
        if response.status_code == 200:
            result = response.json()
            if result.get('success'):
                logger.info("✅ 咨询表单提交成功")
                return True
            else:
                logger.error(f"❌ 咨询表单提交失败: {result.get('message')}")
                return False
        else:
            logger.error(f"❌ HTTP请求失败: {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        logger.warning("⚠️  Flask应用未运行，跳过HTTP测试")
        return None
    except Exception as e:
        logger.error(f"❌ 测试失败: {e}")
        logger.error(traceback.format_exc())
        return False

def test_admin_consultations():
    """测试管理员咨询列表"""
    logger.info("\n📋 测试咨询数据查询...")
    
    try:
        consultations = db_manager.get_all_consultations()
        logger.info(f"✅ 成功获取 {len(consultations)} 条咨询记录")
        
        if consultations:
            logger.info("📊 最新的3条记录:")
            for i, consultation in enumerate(consultations[:3], 1):
                logger.info(f"   {i}. {consultation['name']} - {consultation['email']}")
        
        return True
        
    except Exception as e:
        logger.error(f"❌ 查询失败: {e}")
        logger.error(traceback.format_exc())
        return False

def run_all_tests():
    """运行所有测试"""
    logger.info("🧪 开始PostgreSQL Flask应用测试")
    logger.info("="*50)
    
    results = []
    
    # 测试数据库连接
    results.append(test_database_connection())
    
    # 测试数据查询
    results.append(test_admin_consultations())
    
    # 测试HTTP接口（如果应用在运行）
    http_result = test_consultation_submission()
    if http_result is not None:
        results.append(http_result)
    
    # 统计结果
    passed = sum(1 for r in results if r is True)
    failed = sum(1 for r in results if r is False)
    
    logger.info(f"\n📊 测试结果: {passed} 通过, {failed} 失败")
    
    if failed == 0:
        logger.info("🎉 所有测试通过！PostgreSQL迁移成功！")
        return True
    else:
        logger.warning("⚠️  部分测试失败，请检查配置")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    
    if success:
        logger.info("\n✅ PostgreSQL数据库迁移验证完成")
        logger.info("📝 下一步:")
        logger.info("1. 启动Flask应用: python app.py")
        logger.info("2. 访问管理员页面测试功能")
        logger.info("3. 提交测试咨询表单")
    else:
        logger.error("\n❌ 验证失败，请检查配置和错误信息")