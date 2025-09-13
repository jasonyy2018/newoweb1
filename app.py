#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
上海葳澄信息科技有限公司网站
AI Solutions for Business
"""

import os
import sqlite3
from flask import Flask, render_template, request, redirect, url_for, jsonify, send_from_directory, g, session, flash
from flask_babel import Babel, _
import json
from datetime import datetime
import logging
from logging.handlers import RotatingFileHandler
from typing import Any, Optional
import mimetypes
import hashlib

# 添加SVG MIME类型支持
mimetypes.add_type('image/svg+xml', '.svg')

def create_app():
    # 明确指定静态文件夹和模板文件夹
    app = Flask(__name__, 
                static_folder='static',
                template_folder='templates')
    
    # 配置应用
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    app.config['BABEL_DEFAULT_LOCALE'] = 'zh'
    app.config['BABEL_SUPPORTED_LOCALES'] = ['zh', 'en', 'ja']
    app.config['BABEL_DEFAULT_TIMEZONE'] = 'Asia/Shanghai'
    
    # 数据库配置
    app.config['DATABASE'] = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'consultations.db')
    
    # Redis配置 - 使用环境变量或默认的外部Redis配置
    app.config['REDIS_URL'] = os.environ.get('REDIS_URL') or 'redis://redis_C7DGKB@156.238.249.149:6379/0'
    
    # 添加自定义属性
    setattr(app, 'redis_client', None)
    
    # 初始化Babel
    babel = Babel(app)
    
    def init_database():
        """确保数据库已初始化"""
        try:
            from database import init_db
            init_db()
            app.logger.info('数据库初始化成功')
        except Exception as e:
            app.logger.error(f'数据库初始化失败: {e}')
    
    # 确保数据库已初始化
    init_database()
    
    # 日志配置 - 添加权限检查和更安全的处理方式
    if not app.debug:
        try:
            logs_dir = 'logs'
            if not os.path.exists(logs_dir):
                os.mkdir(logs_dir)
            
            # 确保日志目录有正确的权限
            os.chmod(logs_dir, 0o755)
            
            # 检查是否有写入权限
            log_file_path = os.path.join(logs_dir, 'wisdomitc.log')
            file_handler = RotatingFileHandler(log_file_path, maxBytes=10240, backupCount=10)
            file_handler.setFormatter(logging.Formatter(
                '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
            ))
            file_handler.setLevel(logging.INFO)
            app.logger.addHandler(file_handler)
            app.logger.setLevel(logging.INFO)
            app.logger.info('上海葳澄信息科技有限公司网站启动')
        except PermissionError:
            # 如果没有权限写入文件，只使用控制台日志
            app.logger.setLevel(logging.INFO)
            app.logger.warning('无法创建日志文件，使用控制台日志')
        except Exception as e:
            # 其他异常情况
            app.logger.setLevel(logging.INFO)
            app.logger.error(f'日志配置失败: {e}')
    
    # 尝试初始化Redis
    REDIS_AVAILABLE = False
    redis_module = None
    try:
        import importlib
        redis_module = importlib.import_module('redis')
        REDIS_AVAILABLE = True
        redis_client = redis_module.from_url(app.config['REDIS_URL'])  # type: ignore
        setattr(app, 'redis_client', redis_client)
        app.logger.info('Redis连接成功')
    except ImportError:
        app.logger.warning('Redis库未安装，缓存功能将不可用')
    except Exception as e:
        setattr(app, 'redis_client', None)
        app.logger.error(f'Redis连接失败: {e}')
    
    def get_locale():
        # 检查URL参数
        locale = request.args.get('lang')
        if locale in app.config['BABEL_SUPPORTED_LOCALES']:
            return locale
        # 否则使用浏览器默认语言
        return request.accept_languages.best_match(app.config['BABEL_SUPPORTED_LOCALES']) or app.config['BABEL_DEFAULT_LOCALE']
    
    # 使用装饰器注册localeselector
    babel.init_app(app, locale_selector=get_locale)
    
    def get_db():
        """获取数据库连接"""
        if 'db' not in g:
            g.db = sqlite3.connect(app.config['DATABASE'])
            g.db.row_factory = sqlite3.Row
        return g.db
    
    def close_db(e=None):
        """关闭数据库连接"""
        db = g.pop('db', None)
        if db is not None:
            db.close()
    
    def hash_password(password):
        """密码哈希处理"""
        return hashlib.sha256((password + 'wisdomitc_salt').encode('utf-8')).hexdigest()
    
    def check_admin_auth():
        """检查管理员权限"""
        if 'admin_logged_in' not in session or not session['admin_logged_in']:
            return False
        return True
    
    @app.before_request
    def before_request():
        # 为所有请求初始化数据库连接
        pass
    
    @app.teardown_appcontext
    def close_db_error(e=None):
        close_db(e)
    
    @app.route('/')
    def index():
        return render_template('index.html')
    
    @app.route('/about')
    def about():
        return render_template('about.html')
    
    @app.route('/contact')
    def contact():
        return render_template('contact.html')
    
    @app.route('/faq')
    def faq():
        return render_template('faq.html')
    
    @app.route('/admin/login', methods=['GET', 'POST'])
    def admin_login():
        if request.method == 'POST':
            username = request.form.get('username')
            password = request.form.get('password')
            
            # 从环境变量获取管理员凭据，如果没有则使用默认值
            admin_username = os.environ.get('ADMIN_USERNAME', 'admin')
            admin_password = os.environ.get('ADMIN_PASSWORD', 'wisdomitc2025')
            
            # 验证管理员账号
            if username == admin_username and hash_password(password) == hash_password(admin_password):
                session['admin_logged_in'] = True
                session['admin_username'] = username
                return redirect(url_for('admin_consultations'))
            else:
                flash(_('用户名或密码错误'), 'error')
        
        return render_template('admin_login.html')
    
    @app.route('/admin/logout')
    def admin_logout():
        session.pop('admin_logged_in', None)
        session.pop('admin_username', None)
        flash(_('您已成功退出登录'), 'info')
        return redirect(url_for('admin_login'))
    
    @app.route('/admin/consultations')
    def admin_consultations():
        # 检查管理员权限
        if not check_admin_auth():
            flash(_('请先登录管理员账号'), 'warning')
            return redirect(url_for('admin_login'))
        
        # 这里应该添加身份验证
        db = get_db()
        consultations = db.execute('SELECT * FROM consultations ORDER BY timestamp DESC').fetchall()
        return render_template('admin_consultations.html', consultations=consultations)
    
    @app.route('/submit_consultation', methods=['POST'])
    def submit_consultation():
        try:
            # 获取表单数据
            name = request.form['name']
            email = request.form['email']
            company = request.form.get('company', '')
            phone = request.form.get('phone', '')
            service = request.form.get('service', '')
            message = request.form.get('message', '')
            
            # 保存到数据库
            db = get_db()
            db.execute(
                'INSERT INTO consultations (name, email, company, phone, service, message) VALUES (?, ?, ?, ?, ?, ?)',
                (name, email, company, phone, service, message)
            )
            db.commit()
            
            # 如果Redis可用，缓存咨询信息
            if getattr(app, 'redis_client', None) and REDIS_AVAILABLE and redis_module:
                try:
                    consultation_data = {
                        'name': name,
                        'email': email,
                        'company': company,
                        'phone': phone,
                        'service': service,
                        'message': message,
                        'timestamp': datetime.now().isoformat()
                    }
                    app.redis_client.lpush('recent_consultations', json.dumps(consultation_data))  # type: ignore
                    # 只保留最近的100条咨询记录
                    app.redis_client.ltrim('recent_consultations', 0, 99)  # type: ignore
                except Exception as e:
                    app.logger.error(f'Redis缓存失败: {e}')
            
            return jsonify({
                'success': True,
                'message': _('感谢您的咨询！我们的专家团队会尽快与您联系。')
            })
        except Exception as e:
            app.logger.error(f'提交咨询失败: {e}')
            return jsonify({
                'success': False,
                'message': _('提交咨询时发生错误，请稍后再试。')
            }), 400
    
    @app.route('/solution/<solution_name>')
    def solution(solution_name):
        # 验证解决方案名称
        valid_solutions = [
            'data-analytics', 'nlp', 'computer-vision', 
            'predictive-analytics', 'intelligent-automation', 'custom-ai-models'
        ]
        
        if solution_name not in valid_solutions:
            return render_template('error.html', 
                                 message=_('未找到指定的解决方案'),
                                 error_details={
                                     'status_code': 404,
                                     'error_type': _('页面未找到'),
                                     'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                                     'possible_causes': [
                                         _('URL输入错误'),
                                         _('页面已被移除'),
                                         _('链接已过期')
                                     ]
                                 }), 404
            
        template_path = f'solutions/{solution_name}.html'
        return render_template(template_path)
    
    @app.route('/case-study/<case_name>')
    def case_study(case_name):
        # 验证案例名称
        valid_cases = ['manufacturing-quality-control']
        
        if case_name not in valid_cases:
            return render_template('error.html', 
                                 message=_('未找到指定的案例研究'),
                                 error_details={
                                     'status_code': 404,
                                     'error_type': _('页面未找到'),
                                     'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                                     'possible_causes': [
                                         _('URL输入错误'),
                                         _('页面已被移除'),
                                         _('链接已过期')
                                     ]
                                 }), 404
            
        template_path = f'case-studies/{case_name}.html'
        return render_template(template_path)
    
    @app.route('/solutions')
    def solutions_index():
        return render_template('solutions/index.html')
    
    @app.route('/case-studies')
    def case_studies_index():
        return render_template('case-studies/index.html')
    
    @app.route('/static/<path:filename>')
    def static_files(filename):
        # 确保static_folder不是None
        static_folder = app.static_folder or 'static'
        return send_from_directory(static_folder, filename)

    @app.route('/robots.txt')
    def robots_txt():
        return send_from_directory(str(app.static_folder), 'robots.txt')
    
    @app.route('/sitemap.xml')
    def sitemap_xml():
        return send_from_directory(str(app.static_folder), 'sitemap.xml')
    
    @app.route('/run_geo_optimization')
    def run_geo_optimization():
        """手动触发GEO优化"""
        try:
            # 导入GEO优化器
            import sys
            sys.path.append(os.path.dirname(os.path.abspath(__file__)))
            from geo_optimizer import GEOOptimizer
            
            # 创建优化器实例并运行优化
            optimizer = GEOOptimizer(os.path.dirname(os.path.abspath(__file__)))
            report = optimizer.run_optimization_sequence()
            
            return jsonify({
                "success": True,
                "message": "GEO优化已完成",
                "report": report
            })
        except Exception as e:
            return jsonify({
                "success": False,
                "message": f"GEO优化失败: {str(e)}"
            })
    
    @app.route('/run_auto_geo_optimization')
    def run_auto_geo_optimization():
        """手动触发自动GEO优化"""
        try:
            # 导入自动GEO优化器
            import sys
            sys.path.append(os.path.dirname(os.path.abspath(__file__)))
            from auto_geo_optimizer import AutoGEOOptimizer
            
            # 创建优化器实例并运行优化
            auto_optimizer = AutoGEOOptimizer(os.path.dirname(os.path.abspath(__file__)))
            report = auto_optimizer.run_full_optimization_sequence()
            
            return jsonify({
                "success": True,
                "message": "自动GEO优化已完成",
                "report": report
            })
        except Exception as e:
            return jsonify({
                "success": False,
                "message": f"自动GEO优化失败: {str(e)}"
            })
    
    @app.route('/health')
    def health_check():
        """健康检查端点"""
        return jsonify({
            "status": "healthy",
            "timestamp": datetime.now().isoformat()
        })
    
    @app.errorhandler(404)
    def page_not_found(e):
        return render_template('error.html', 
                             message=_('页面未找到'),
                             error_id='ERR_404_' + datetime.now().strftime('%Y%m%d_%H%M%S'),
                             error_details={
                                 'status_code': 404,
                                 'error_type': _('页面未找到'),
                                 'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                                 'possible_causes': [
                                     _('URL输入错误'),
                                     _('页面已被移除'),
                                     _('链接已过期')
                                 ]
                             }), 404

    @app.errorhandler(500)
    def internal_error(e):
        app.logger.error(f'服务器内部错误: {e}')
        return render_template('error.html', 
                             message=_('服务器内部错误'),
                             error_id='ERR_500_' + datetime.now().strftime('%Y%m%d_%H%M%S'),
                             error_details={
                                 'status_code': 500,
                                 'error_type': _('服务器内部错误'),
                                 'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                                 'possible_causes': [
                                     _('服务器暂时不可用'),
                                     _('系统正在维护'),
                                     _('程序出现异常')
                                 ]
                             }), 500

    return app

# 为Gunicorn创建应用实例
# 使用更标准的方式暴露Flask应用实例
app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False)