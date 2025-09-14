#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生产环境启动脚本
确保应用在生产环境中正确运行
"""

import os
import sys
import logging
from app import create_app

def setup_production_logging():
    """设置生产环境日志"""
    # 确保logs目录存在
    os.makedirs('logs', exist_ok=True)
    
    # 配置日志
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s %(levelname)s: %(message)s',
        handlers=[
            logging.FileHandler('logs/app.log'),
            logging.StreamHandler(sys.stdout)
        ]
    )

def main():
    """主启动函数"""
    setup_production_logging()
    
    # 创建应用
    app = create_app()
    
    # 记录启动信息
    logging.info("=== 生产环境启动 ===")
    logging.info(f"当前工作目录: {os.getcwd()}")
    logging.info(f"静态文件夹: {app.static_folder}")
    logging.info(f"模板文件夹: {app.template_folder}")
    logging.info(f"Python版本: {sys.version}")
    
    # 验证关键文件
    critical_files = [
        'templates/index.html',
        'templates/error.html',
        'static'
    ]
    
    for file_path in critical_files:
        if os.path.exists(file_path):
            logging.info(f"✅ {file_path} 存在")
        else:
            logging.error(f"❌ {file_path} 不存在")
    
    # 启动应用
    logging.info("启动Flask应用...")
    app.run(
        host='0.0.0.0',
        port=5001,
        debug=False,
        threaded=True
    )

if __name__ == '__main__':
    main()