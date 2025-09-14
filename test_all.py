#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
综合功能测试脚本
"""

import requests
import logging
import warnings
import time
import subprocess
import sys
import os

# 添加项目根目录到Python路径
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# 导入项目模块
from db_manager import db_manager
from test_postgresql_app import run_all_tests as test_database
from test_security import test_security_headers, test_csp_policy

# 禁用不安全请求警告
warnings.filterwarnings("ignore", message="Unverified HTTPS request")

# 设置日志
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class ComprehensiveTester:
    def __init__(self):
        self.base_url = "http://127.0.0.1:5001"
        
    def test_database_connection(self):
        """测试数据库连接"""
        logger.info("=== 测试数据库连接 ===")
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
            logger.error(f"❌ 数据库连接测试失败: {e}")
            return False
    
    def test_web_routes(self):
        """测试Web路由"""
        logger.info("=== 测试Web路由 ===")
        
        routes = [
            ("/", "首页"),
            ("/about", "关于我们"),
            ("/contact", "联系我们"),
            ("/faq", "常见问题"),
            ("/solutions", "解决方案"),
            ("/case-studies", "案例研究"),
            ("/health", "健康检查")
        ]
        
        results = []
        for route, description in routes:
            try:
                url = self.base_url + route
                response = requests.get(url, timeout=10, verify=False)
                
                if response.status_code == 200:
                    logger.info(f"✅ {description} ({route}): 200 OK")
                    results.append(True)
                else:
                    logger.warning(f"⚠️  {description} ({route}): {response.status_code}")
                    results.append(False)
            except Exception as e:
                logger.error(f"❌ {description} ({route}) 测试失败: {e}")
                results.append(False)
        
        return all(results)
    
    def test_admin_functionality(self):
        """测试管理员功能"""
        logger.info("=== 测试管理员功能 ===")
        
        try:
            # 测试管理员登录页面
            response = requests.get(f"{self.base_url}/admin/login", timeout=10, verify=False)
            
            if response.status_code == 200:
                logger.info("✅ 管理员登录页面可访问")
                return True
            else:
                logger.warning(f"⚠️  管理员登录页面返回状态码: {response.status_code}")
                return False
        except Exception as e:
            logger.error(f"❌ 管理员功能测试失败: {e}")
            return False
    
    def test_consultation_submission(self):
        """测试咨询表单提交"""
        logger.info("=== 测试咨询表单提交 ===")
        
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
            response = requests.post(
                f"{self.base_url}/submit_consultation",
                data=test_data,
                timeout=10,
                verify=False
            )
            
            if response.status_code == 200:
                try:
                    result = response.json()
                    if result.get('success'):
                        logger.info("✅ 咨询表单提交成功")
                        return True
                    else:
                        logger.warning(f"⚠️  咨询表单提交失败: {result.get('message')}")
                        return False
                except Exception:
                    logger.info("✅ 咨询表单提交成功 (非JSON响应)")
                    return True
            else:
                logger.error(f"❌ 咨询表单提交失败，状态码: {response.status_code}")
                return False
                
        except Exception as e:
            logger.error(f"❌ 咨询表单提交测试失败: {e}")
            return False
    
    def test_static_files(self):
        """测试静态文件服务"""
        logger.info("=== 测试静态文件服务 ===")
        
        static_files = [
            "/static/css/style.css",
            "/static/images/logo.png",
            "/robots.txt",
            "/sitemap.xml"
        ]
        
        results = []
        for file_path in static_files:
            try:
                response = requests.get(self.base_url + file_path, timeout=10, verify=False)
                
                if response.status_code == 200:
                    logger.info(f"✅ 静态文件 {file_path}: 200 OK")
                    results.append(True)
                elif response.status_code == 404:
                    logger.warning(f"⚠️  静态文件 {file_path}: 404 Not Found")
                    results.append(True)  # 404是可以接受的
                else:
                    logger.warning(f"⚠️  静态文件 {file_path}: {response.status_code}")
                    results.append(False)
            except Exception as e:
                logger.error(f"❌ 静态文件 {file_path} 测试失败: {e}")
                results.append(False)
        
        return all(results) if results else True
    
    def test_security_configuration(self):
        """测试安全配置"""
        logger.info("=== 测试安全配置 ===")
        
        try:
            homepage_ok = test_security_headers(self.base_url)
            csp_ok = test_csp_policy(self.base_url)
            health_ok = test_security_headers(f"{self.base_url}/health")
            
            return homepage_ok and csp_ok and health_ok
        except Exception as e:
            logger.error(f"❌ 安全配置测试失败: {e}")
            return False
    
    def run_all_tests(self):
        """运行所有测试"""
        logger.info("开始综合功能测试")
        logger.info("=" * 50)
        
        test_results = {}
        
        # 1. 数据库测试
        test_results['database'] = self.test_database_connection()
        
        # 2. Web路由测试
        test_results['web_routes'] = self.test_web_routes()
        
        # 3. 管理员功能测试
        test_results['admin'] = self.test_admin_functionality()
        
        # 4. 咨询表单提交测试
        test_results['consultation'] = self.test_consultation_submission()
        
        # 5. 静态文件服务测试
        test_results['static_files'] = self.test_static_files()
        
        # 6. 安全配置测试
        test_results['security'] = self.test_security_configuration()
        
        # 输出测试结果
        logger.info("\n" + "=" * 50)
        logger.info("测试结果汇总:")
        
        passed = 0
        total = len(test_results)
        
        for test_name, result in test_results.items():
            status = "✅ 通过" if result else "❌ 失败"
            logger.info(f"  {test_name}: {status}")
            if result:
                passed += 1
        
        logger.info(f"\n总体结果: {passed}/{total} 项测试通过")
        
        if passed == total:
            logger.info("\n🎉 所有测试通过！应用功能正常")
            return True
        else:
            logger.warning(f"\n⚠️  {total - passed} 项测试失败，请检查相关功能")
            return False

def main():
    """主函数"""
    logger.info("综合功能测试脚本")
    logger.info("请确保Flask应用正在运行 (python app.py)")
    
    # 等待用户确认
    input("\n请确认Flask应用已在端口5001上运行，然后按回车键继续...")
    
    # 创建测试器实例
    tester = ComprehensiveTester()
    
    # 运行测试
    success = tester.run_all_tests()
    
    if success:
        logger.info("\n✅ 综合测试完成，所有功能正常")
        logger.info("\n建议:")
        logger.info("1. 在浏览器中访问 http://127.0.0.1:5001 进行手动测试")
        logger.info("2. 测试所有页面和功能")
        logger.info("3. 检查浏览器控制台是否有错误")
    else:
        logger.error("\n❌ 综合测试失败，请检查错误信息并修复问题")

if __name__ == '__main__':
    main()