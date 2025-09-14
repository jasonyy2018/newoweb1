#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
安全配置测试工具
"""

import requests
import logging
import warnings

# 禁用不安全请求警告
warnings.filterwarnings("ignore", message="Unverified HTTPS request")

# 设置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_security_headers(url="http://127.0.0.1:5001"):
    """测试安全头部配置"""
    logger.info(f"=== 安全头部测试: {url} ===")
    
    try:
        # 发送请求
        response = requests.get(url, timeout=10, verify=False)
        
        logger.info(f"状态码: {response.status_code}")
        
        # 检查安全头部
        security_headers = {
            'Content-Security-Policy': 'CSP策略',
            'X-Content-Type-Options': '内容类型选项',
            'X-Frame-Options': '框架选项',
            'X-XSS-Protection': 'XSS保护',
            'Referrer-Policy': '引用策略',
            'Permissions-Policy': '权限策略',
            'Strict-Transport-Security': 'HSTS'
        }
        
        found_headers = []
        missing_headers = []
        
        for header, description in security_headers.items():
            value = response.headers.get(header)
            if value:
                found_headers.append(f"✅ {description} ({header}): {value}")
            else:
                missing_headers.append(f"❌ {description} ({header}): 未设置")
        
        # 输出结果
        if found_headers:
            logger.info("已设置的安全头部:")
            for header in found_headers:
                logger.info(f"  {header}")
        
        if missing_headers:
            logger.warning("缺失的安全头部:")
            for header in missing_headers:
                logger.warning(f"  {header}")
        else:
            logger.info("🎉 所有推荐的安全头部均已设置")
        
        return len(missing_headers) == 0
        
    except requests.exceptions.RequestException as e:
        logger.error(f"请求失败: {e}")
        return False
    except Exception as e:
        logger.error(f"测试失败: {e}")
        return False

def test_csp_policy(url="http://127.0.0.1:5001"):
    """测试CSP策略"""
    logger.info(f"\n=== CSP策略测试: {url} ===")
    
    try:
        response = requests.get(url, timeout=10, verify=False)
        csp_header = response.headers.get('Content-Security-Policy')
        
        if csp_header:
            logger.info("✅ CSP头部已设置")
            logger.info(f"策略内容: {csp_header}")
            
            # 检查关键指令
            key_directives = ['default-src', 'script-src', 'style-src', 'img-src', 'object-src']
            missing_directives = []
            
            for directive in key_directives:
                if directive not in csp_header:
                    missing_directives.append(directive)
            
            if missing_directives:
                logger.warning(f"缺失的关键指令: {', '.join(missing_directives)}")
            else:
                logger.info("✅ 所有关键CSP指令均已设置")
            
            return len(missing_directives) == 0
        else:
            logger.error("❌ CSP头部未设置")
            return False
            
    except Exception as e:
        logger.error(f"CSP测试失败: {e}")
        return False

def main():
    """主测试函数"""
    logger.info("安全配置测试工具\n")
    
    # 测试主页
    homepage_ok = test_security_headers("http://127.0.0.1:5001")
    csp_ok = test_csp_policy("http://127.0.0.1:5001")
    
    # 测试健康检查端点
    health_ok = test_security_headers("http://127.0.0.1:5001/health")
    
    logger.info(f"\n=== 测试结果 ===")
    logger.info(f"主页安全头部: {'✅ 正常' if homepage_ok else '❌ 异常'}")
    logger.info(f"CSP策略: {'✅ 正常' if csp_ok else '❌ 异常'}")
    logger.info(f"健康检查安全: {'✅ 正常' if health_ok else '❌ 异常'}")
    
    if homepage_ok and csp_ok:
        logger.info("\n🎉 安全配置测试通过！")
        logger.info("建议:")
        logger.info("1. 定期检查CSP策略是否需要更新")
        logger.info("2. 考虑启用严格模式CSP")
        logger.info("3. 监控浏览器控制台的安全警告")
    else:
        logger.warning("\n⚠️  安全配置需要改进")

if __name__ == '__main__':
    main()