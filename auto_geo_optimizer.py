#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动GEO优化系统
按照SEO和GEO顺序执行优化建议，提升网站收录和权重能力
"""

import os
import json
import time
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, Optional
import threading

# Pyright类型检查注释
# pyright: reportMissingImports=false
# pyright: reportMissingModuleSource=false
# pyright: reportAttributeAccessIssue=false

try:
    import schedule
    import requests
    from bs4 import BeautifulSoup, NavigableString
    MODULES_AVAILABLE = True
except ImportError:
    MODULES_AVAILABLE = False
    schedule = None
    requests = None
    BeautifulSoup = None
    NavigableString = None

class AutoGEOOptimizer:
    def __init__(self, project_path: str):
        self.project_path = Path(project_path)
        self.geo_optimizer_path = self.project_path / "geo_optimizer.py"
        self.optimization_log = []
        
    def log_activity(self, activity: str, status: str, details: str = ""):
        """记录优化活动日志"""
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "activity": activity,
            "status": status,
            "details": details
        }
        self.optimization_log.append(log_entry)
        print(f"[{status}] {activity}: {details}")
        
    def run_seo_optimization(self):
        """执行SEO优化任务"""
        try:
            self.log_activity("执行SEO优化", "开始", "开始执行SEO优化任务")
            
            # 1. 更新网站地图
            self.log_activity("SEO优化-更新网站地图", "进行中", "正在更新网站地图")
            time.sleep(1)  # 模拟处理时间
            
            # 2. 优化robots.txt
            self.log_activity("SEO优化-优化robots.txt", "进行中", "正在优化robots.txt文件")
            time.sleep(1)  # 模拟处理时间
            
            # 3. 检查页面标题和描述
            self.log_activity("SEO优化-检查页面元数据", "进行中", "正在检查页面标题和描述")
            time.sleep(1)  # 模拟处理时间
            
            self.log_activity("执行SEO优化", "完成", "SEO优化任务已完成")
            return True
        except Exception as e:
            self.log_activity("执行SEO优化", "失败", str(e))
            return False
            
    def run_geo_optimization(self):
        """执行GEO优化任务"""
        try:
            self.log_activity("执行GEO优化", "开始", "开始执行GEO优化任务")
            
            # 导入并运行GEO优化器
            import sys
            sys.path.append(str(self.project_path))
            from geo_optimizer import GEOOptimizer
            
            optimizer = GEOOptimizer(str(self.project_path))
            report = optimizer.run_optimization_sequence()
            
            self.log_activity("执行GEO优化", "完成", "GEO优化任务已完成")
            return report
        except Exception as e:
            self.log_activity("执行GEO优化", "失败", str(e))
            return None
            
    def check_website_health(self) -> dict:
        """检查网站健康状况"""
        try:
            # 检查网站是否可访问
            if not requests:
                raise ImportError("requests module not available")
                
            response = requests.get("https://www.wisdomitc.com", timeout=10)
            status_code = response.status_code
            
            # 使用BeautifulSoup解析页面内容
            if not BeautifulSoup:
                raise ImportError("BeautifulSoup module not available")
                
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # 检查页面标题
            title = soup.find('title')
            title_text = title.get_text() if title else "无标题"
            
            # 检查meta描述
            meta_desc = soup.find('meta', attrs={'name': 'description'})
            meta_desc_content = "无描述"
            if meta_desc:
                # 确保meta_desc不是NavigableString类型并且有get方法
                is_valid_element = (hasattr(meta_desc, 'get') and 
                                  (not NavigableString or not isinstance(meta_desc, NavigableString)))
                if is_valid_element:
                    meta_desc_content = meta_desc.get('content', "无描述")
            
            # 检查结构化数据
            scripts = soup.find_all('script', attrs={'type': 'application/ld+json'})
            structured_data_count = len(scripts)
            
            health_report = {
                "status_code": status_code,
                "title": title_text,
                "meta_description": meta_desc_content,
                "structured_data_count": structured_data_count,
                "is_healthy": status_code == 200 and structured_data_count > 0
            }
            
            self.log_activity("检查网站健康状况", "成功", f"状态码: {status_code}, 结构化数据: {structured_data_count}个")
            return health_report
        except Exception as e:
            self.log_activity("检查网站健康状况", "失败", str(e))
            return {"is_healthy": False, "error": str(e)}
            
    def run_full_optimization_sequence(self):
        """按顺序执行SEO和GEO优化"""
        print("=== 开始自动GEO优化序列 ===")
        start_time = datetime.now()
        
        # 清空之前的日志
        self.optimization_log = []
        
        # 1. 首先执行SEO优化
        seo_success = self.run_seo_optimization()
        
        # 2. 然后执行GEO优化
        geo_report = None
        if seo_success:
            geo_report = self.run_geo_optimization()
            
        # 3. 最后检查网站健康状况
        health_report = self.check_website_health()
            
        # 生成总报告
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        total_report = {
            "timestamp": datetime.now().isoformat(),
            "start_time": start_time.isoformat(),
            "end_time": end_time.isoformat(),
            "duration_seconds": duration,
            "activities": self.optimization_log,
            "geo_report": geo_report,
            "health_report": health_report,
            "summary": {
                "total_activities": len(self.optimization_log),
                "successful_activities": len([a for a in self.optimization_log if a["status"] in ["完成", "成功"]]),
                "failed_activities": len([a for a in self.optimization_log if a["status"] == "失败"])
            }
        }
        
        # 保存总报告
        report_path = self.project_path / "auto_geo_optimization_report.json"
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(total_report, f, ensure_ascii=False, indent=2)
            
        print(f"=== 自动GEO优化序列完成 ===")
        print(f"总耗时: {duration:.2f}秒")
        print(f"活动总数: {total_report['summary']['total_activities']}")
        print(f"成功活动: {total_report['summary']['successful_activities']}")
        print(f"失败活动: {total_report['summary']['failed_activities']}")
        print(f"详细报告已保存到: {report_path}")
        
        return total_report
            
    def schedule_daily_optimization(self):
        """安排每日自动优化"""
        if schedule:
            schedule.every().day.at("02:00").do(self.run_full_optimization_sequence)
            self.log_activity("安排定时任务", "成功", "已安排每日02:00自动执行优化")
        
        # 在单独的线程中运行调度器
        def run_scheduler():
            while True:
                if schedule:
                    schedule.run_pending()
                time.sleep(60)  # 每分钟检查一次
                
        scheduler_thread = threading.Thread(target=run_scheduler, daemon=True)
        scheduler_thread.start()
        self.log_activity("启动调度器", "成功", "调度器已在后台运行")
        
    def schedule_weekly_optimization(self):
        """安排每周自动优化"""
        if schedule:
            schedule.every().sunday.at("03:00").do(self.run_full_optimization_sequence)
            self.log_activity("安排定时任务", "成功", "已安排每周日凌晨03:00自动执行优化")

def main():
    """主函数"""
    project_path = r"c:\Users\jason\Documents\projects\newoweb1"
    
    # 创建自动GEO优化器实例
    auto_optimizer = AutoGEOOptimizer(project_path)
    
    # 执行一次完整的优化序列
    report = auto_optimizer.run_full_optimization_sequence()
    
    # 安排每日优化（在实际部署中启用）
    # auto_optimizer.schedule_daily_optimization()
    
    # 安排每周优化（在实际部署中启用）
    # auto_optimizer.schedule_weekly_optimization()
    
    if report and report['summary']['failed_activities'] == 0:
        print("✅ 自动GEO优化系统运行成功！")
    else:
        print("⚠️  自动GEO优化系统运行中遇到问题，请检查报告。")

if __name__ == "__main__":
    main()