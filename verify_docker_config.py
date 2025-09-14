#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
验证Docker配置文件
"""

import os
import yaml
import json

def verify_dockerfile():
    """验证Dockerfile配置"""
    print("=== 验证Dockerfile ===")
    
    try:
        with open("Dockerfile", "r", encoding="utf-8") as f:
            content = f.read()
        
        # 检查关键配置
        checks = [
            ("FROM python:3.9-slim", "基础镜像"),
            ("WORKDIR /app", "工作目录"),
            ("COPY requirements.txt .", "复制依赖文件"),
            ("COPY . .", "复制应用代码"),
            ("gunicorn.conf.py", "Gunicorn配置文件引用"),
            ("EXPOSE 5001", "端口暴露")
        ]
        
        for check, description in checks:
            if check in content:
                print(f"✅ {description}: 找到")
            else:
                print(f"❌ {description}: 未找到")
                
    except Exception as e:
        print(f"❌ 验证Dockerfile时出错: {e}")

def verify_docker_compose():
    """验证docker-compose.yml配置"""
    print("\n=== 验证docker-compose.yml ===")
    
    try:
        with open("docker-compose.yml", "r", encoding="utf-8") as f:
            content = f.read()
        
        # 解析YAML
        config = yaml.safe_load(content)
        
        # 检查服务配置
        if "services" in config and "web" in config["services"]:
            web_service = config["services"]["web"]
            print("✅ web服务配置存在")
            
            # 检查构建配置
            if "build" in web_service:
                print(f"✅ 构建配置: {web_service['build']}")
            
            # 检查端口配置
            if "ports" in web_service:
                print(f"✅ 端口配置: {web_service['ports']}")
            
            # 检查命令配置
            if "command" in web_service:
                print(f"✅ 启动命令: {web_service['command']}")
                if "gunicorn.conf.py" in web_service['command']:
                    print("✅ Gunicorn配置文件引用正确")
                else:
                    print("❌ Gunicorn配置文件引用缺失")
        else:
            print("❌ web服务配置缺失")
            
    except yaml.YAMLError as e:
        print(f"❌ 解析docker-compose.yml时出错: {e}")
    except Exception as e:
        print(f"❌ 验证docker-compose.yml时出错: {e}")

def verify_gunicorn_config():
    """验证Gunicorn配置"""
    print("\n=== 验证Gunicorn配置 ===")
    
    try:
        with open("gunicorn.conf.py", "r", encoding="utf-8") as f:
            content = f.read()
        
        # 检查关键配置项
        required_configs = [
            "bind",
            "workers", 
            "accesslog",
            "errorlog"
        ]
        
        for config in required_configs:
            if config in content:
                print(f"✅ {config} 配置存在")
            else:
                print(f"❌ {config} 配置缺失")
                
    except Exception as e:
        print(f"❌ 验证Gunicorn配置时出错: {e}")

def main():
    """主函数"""
    print("Docker配置验证工具")
    print("=" * 30)
    
    verify_dockerfile()
    verify_docker_compose()
    verify_gunicorn_config()
    
    print("\n验证完成!")

if __name__ == "__main__":
    main()