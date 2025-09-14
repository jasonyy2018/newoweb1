#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
上海葳澄信息科技有限公司网站
AI Solutions for Business
"""

import os
import psycopg2
from flask import Flask, render_template, request, redirect, url_for, jsonify, send_from_directory, g, session, flash
from flask_babel import Babel, _
import json
from datetime import datetime
import mimetypes
import hashlib
import logging
import traceback

# 添加SVG MIME类型支持
mimetypes.add_type('image/svg+xml', '.svg')

# 导入统一数据库管理器
from db_manager import db_manager

def setup_logging(app):
    """设置应用日志"""
    if not os.path.exists('logs'):
        os.makedirs('logs')
    
    # 创建文件处理器
    file_handler = logging.FileHandler('logs/app.log')
    file_handler.setLevel(logging.INFO)
    
    # 创建控制台处理器
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    
    # 创建格式化器
    formatter = logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    )
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)
    
    # 添加处理器到应用日志器
    app.logger.addHandler(file_handler)
    app.logger.addHandler(console_handler)
    app.logger.setLevel(logging.INFO)
    
    # 确保日志器处于活动状态
    app.logger.info('日志系统初始化完成')

def create_app():
    # 明确指定静态文件夹和模板文件夹的绝对路径
    basedir = os.path.abspath(os.path.dirname(__file__))
    app = Flask(__name__, 
                static_folder=os.path.join(basedir, 'static'),
                template_folder=os.path.join(basedir, 'templates'))
    
    # 设置日志
    setup_logging(app)
    
    # 配置应用
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    app.config['BABEL_DEFAULT_LOCALE'] = 'zh'
    app.config['BABEL_SUPPORTED_LOCALES'] = ['zh', 'en', 'ja']
    app.config['BABEL_DEFAULT_TIMEZONE'] = 'Asia/Shanghai'
    
    # PostgreSQL数据库配置 - 优先使用环境变量
    app.config['POSTGRESQL'] = {
        'host': os.environ.get('POSTGRESQL_HOST', '156.238.249.149'),
        'port': int(os.environ.get('POSTGRESQL_PORT', 5432)),
        'database': os.environ.get('POSTGRESQL_DATABASE', 'aiow'),
        'user': os.environ.get('POSTGRESQL_USER', 'aiow'),
        'password': os.environ.get('POSTGRESQL_PASSWORD', 'EZH3HPYzy3QNGTEz')
    }
    
    # Redis配置 - 使用环境变量或默认的外部Redis配置
    app.config['REDIS_URL'] = os.environ.get('REDIS_URL') or 'redis://redis_C7DGKB@156.238.249.149:6379/0'
    
    # 添加自定义属性
    setattr(app, 'redis_client', None)
    
    # Redis可用性标志
    REDIS_AVAILABLE = False
    redis_module = None
    
    # 初始化Babel
    babel = Babel(app)
    
    # 在Flask-Babel 3.1.0中，使用这种方式定义语言选择器
    def get_locale():
        # 首先检查URL参数
        locale = request.args.get('lang')
        if locale and locale in app.config['BABEL_SUPPORTED_LOCALES']:
            session['language'] = locale
            return locale
        
        # 检查session
        if 'language' in session:
            return session['language']
        
        # 尝试从浏览器Accept-Language头获取
        try:
            return request.accept_languages.best_match(app.config['BABEL_SUPPORTED_LOCALES']) or app.config['BABEL_DEFAULT_LOCALE']
        except:
            return app.config['BABEL_DEFAULT_LOCALE']
    
    # 注册语言选择器 - 使用新版本的正确方法
    babel.init_app(app, locale_selector=get_locale)
    
    def init_database():
        """确保PostgreSQL数据库已初始化"""
        try:
            success = db_manager.init_database()
            if success:
                app.logger.info('PostgreSQL数据库初始化成功')
            else:
                app.logger.error('PostgreSQL数据库初始化失败')
        except Exception as e:
            app.logger.error(f'PostgreSQL数据库初始化失败: {e}')
            app.logger.error(traceback.format_exc())
    
    # 尝试初始化Redis
    try:
        import importlib
        redis_module = importlib.import_module('redis')
        REDIS_AVAILABLE = True
        # 使用更安全的连接方式
        redis_options = {
            'retry_on_timeout': True,
            'health_check_interval': 30,
            'socket_keepalive': True,
            'socket_keepalive_options': {2: 30}
        }
        redis_client = redis_module.from_url(app.config['REDIS_URL'], **redis_options)  # type: ignore
        setattr(app, 'redis_client', redis_client)
        app.logger.info('Redis连接成功')
    except ImportError:
        app.logger.warning('Redis库未安装，缓存功能将不可用')
    except Exception as e:
        setattr(app, 'redis_client', None)
        app.logger.error(f'Redis连接失败: {e}')
        app.logger.error(traceback.format_exc())
    
    def get_db():
        """获取PostgreSQL数据库连接"""
        if 'db' not in g:
            # 确保数据库已初始化
            init_database()
            
            g.db = psycopg2.connect(**app.config['POSTGRESQL'])
        return g.db
    
    def close_db(e=None):
        """关闭PostgreSQL数据库连接"""
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
        """在每个请求之前执行"""
        pass
    
    @app.teardown_appcontext
    def close_db_error(e=None):
        """在应用上下文结束时关闭数据库连接"""
        close_db(e)
    
    # ==================== 路由定义 ====================
    
    @app.route('/')
    def index():
        """首页"""
        try:
            return render_template('index.html')
        except Exception as e:
            app.logger.error(f'首页加载失败: {e}')
            app.logger.error(traceback.format_exc())
            return render_template('error.html', 
                                 message=_('页面加载失败'),
                                 error_details={
                                     'status_code': 500,
                                     'error_type': _('服务器内部错误'),
                                     'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                                 }), 500
    
    @app.route('/about')
    def about():
        """关于我们页面"""
        try:
            return render_template('about.html')
        except Exception as e:
            app.logger.error(f'关于我们页面加载失败: {e}')
            app.logger.error(traceback.format_exc())
            return render_template('error.html', 
                                 message=_('页面加载失败'),
                                 error_details={
                                     'status_code': 500,
                                     'error_type': _('服务器内部错误'),
                                     'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                                 }), 500
    
    @app.route('/contact')
    def contact():
        """联系我们页面"""
        try:
            return render_template('contact.html')
        except Exception as e:
            app.logger.error(f'联系我们页面加载失败: {e}')
            app.logger.error(traceback.format_exc())
            return render_template('error.html', 
                                 message=_('页面加载失败'),
                                 error_details={
                                     'status_code': 500,
                                     'error_type': _('服务器内部错误'),
                                     'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                                 }), 500
    
    @app.route('/faq')
    def faq():
        """常见问题页面"""
        try:
            return render_template('faq.html')
        except Exception as e:
            app.logger.error(f'常见问题页面加载失败: {e}')
            app.logger.error(traceback.format_exc())
            return render_template('error.html', 
                                 message=_('页面加载失败'),
                                 error_details={
                                     'status_code': 500,
                                     'error_type': _('服务器内部错误'),
                                     'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                                 }), 500
    
    @app.route('/admin/login', methods=['GET', 'POST'])
    def admin_login():
        """管理员登录页面"""
        try:
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
        except Exception as e:
            app.logger.error(f'管理员登录页面加载失败: {e}')
            app.logger.error(traceback.format_exc())
            return render_template('error.html', 
                                 message=_('页面加载失败'),
                                 error_details={
                                     'status_code': 500,
                                     'error_type': _('服务器内部错误'),
                                     'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                                 }), 500
    
    @app.route('/admin/logout')
    def admin_logout():
        """管理员退出登录"""
        try:
            session.pop('admin_logged_in', None)
            session.pop('admin_username', None)
            flash(_('您已成功退出登录'), 'info')
            return redirect(url_for('admin_login'))
        except Exception as e:
            app.logger.error(f'管理员退出登录失败: {e}')
            app.logger.error(traceback.format_exc())
            return render_template('error.html', 
                                 message=_('操作失败'),
                                 error_details={
                                     'status_code': 500,
                                     'error_type': _('服务器内部错误'),
                                     'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                                 }), 500
    
    @app.route('/admin/consultations')
    def admin_consultations():
        """管理员查看咨询信息页面"""
        try:
            # 检查管理员权限
            if not check_admin_auth():
                flash(_('请先登录管理员账号'), 'warning')
                return redirect(url_for('admin_login'))
            
            consultations = db_manager.get_all_consultations()
            return render_template('admin_consultations.html', consultations=consultations)
        except Exception as e:
            app.logger.error(f'获取咨询信息失败: {e}')
            app.logger.error(traceback.format_exc())
            flash(_('获取咨询信息失败'), 'error')
            return render_template('admin_consultations.html', consultations=[])
    
    @app.route('/submit_consultation', methods=['POST'])
    def submit_consultation():
        """提交咨询表单"""
        try:
            # 获取表单数据
            name = request.form['name']
            email = request.form['email']
            company = request.form.get('company', '')
            phone = request.form.get('phone', '')
            service = request.form.get('service', '')
            message = request.form.get('message', '')
            
            app.logger.info(f'接收到咨询表单提交: name={name}, email={email}, company={company}, phone={phone}, service={service}')
            
            # 保存到PostgreSQL数据库
            try:
                consultation_id = db_manager.save_consultation(name, email, company, phone, service, message)
                if consultation_id:
                    app.logger.info(f'咨询信息已成功保存到PostgreSQL数据库，ID: {consultation_id}')
                else:
                    raise Exception("保存失败")
            except Exception as e:
                app.logger.error(f'保存到PostgreSQL失败: {e}')
                app.logger.error(traceback.format_exc())
                raise e
            
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
                    # 测试Redis连接
                    app.redis_client.ping()  # type: ignore
                    app.redis_client.lpush('recent_consultations', json.dumps(consultation_data))  # type: ignore
                    # 只保留最近的100条咨询记录
                    app.redis_client.ltrim('recent_consultations', 0, 99)  # type: ignore
                    app.logger.info('咨询信息已成功缓存到Redis')
                except Exception as e:
                    app.logger.error(f'Redis缓存失败: {e}')
                    app.logger.error(traceback.format_exc())
            else:
                app.logger.info('Redis不可用，跳过缓存')
            
            return jsonify({
                'success': True,
                'message': _('感谢您的咨询！我们的专家团队会尽快与您联系。')
            })
        except Exception as e:
            app.logger.error(f'提交咨询失败: {e}', exc_info=True)
            app.logger.error(traceback.format_exc())
            return jsonify({
                'success': False,
                'message': _('提交咨询时发生错误，请稍后再试。')
            }), 400
    
    @app.route('/solution/<solution_name>')
    def solution(solution_name):
        """解决方案详情页面"""
        try:
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
        except Exception as e:
            app.logger.error(f'解决方案页面加载失败: {e}')
            app.logger.error(traceback.format_exc())
            return render_template('error.html', 
                                 message=_('页面加载失败'),
                                 error_details={
                                     'status_code': 500,
                                     'error_type': _('服务器内部错误'),
                                     'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                                 }), 500
    
    @app.route('/case-study/<case_name>')
    def case_study(case_name):
        """案例研究详情页面"""
        try:
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
        except Exception as e:
            app.logger.error(f'案例研究页面加载失败: {e}')
            app.logger.error(traceback.format_exc())
            return render_template('error.html', 
                                 message=_('页面加载失败'),
                                 error_details={
                                     'status_code': 500,
                                     'error_type': _('服务器内部错误'),
                                     'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                                 }), 500
    
    @app.route('/solutions')
    def solutions_index():
        """解决方案索引页面"""
        try:
            return render_template('solutions/index.html')
        except Exception as e:
            app.logger.error(f'解决方案索引页面加载失败: {e}')
            app.logger.error(traceback.format_exc())
            return render_template('error.html', 
                                 message=_('页面加载失败'),
                                 error_details={
                                     'status_code': 500,
                                     'error_type': _('服务器内部错误'),
                                     'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                                 }), 500
    
    @app.route('/case-studies')
    def case_studies_index():
        """案例研究索引页面"""
        try:
            return render_template('case-studies/index.html')
        except Exception as e:
            app.logger.error(f'案例研究索引页面加载失败: {e}')
            app.logger.error(traceback.format_exc())
            return render_template('error.html', 
                                 message=_('页面加载失败'),
                                 error_details={
                                     'status_code': 500,
                                     'error_type': _('服务器内部错误'),
                                     'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                                 }), 500
    
    @app.route('/static/<path:filename>')
    def static_files(filename):
        """静态文件服务"""
        try:
            static_folder = app.static_folder or 'static'
            return send_from_directory(static_folder, filename)
        except Exception as e:
            app.logger.error(f'静态文件服务失败: {e}')
            app.logger.error(traceback.format_exc())
            return render_template('error.html', 
                                 message=_('文件未找到'),
                                 error_details={
                                     'status_code': 404,
                                     'error_type': _('文件未找到'),
                                     'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                                 }), 404

    @app.route('/robots.txt')
    def robots_txt():
        """robots.txt文件"""
        try:
            return send_from_directory(str(app.static_folder), 'robots.txt')
        except Exception as e:
            app.logger.error(f'robots.txt文件服务失败: {e}')
            app.logger.error(traceback.format_exc())
            return '', 404
    
    @app.route('/sitemap.xml')
    def sitemap_xml():
        """sitemap.xml文件"""
        try:
            return send_from_directory(str(app.static_folder), 'sitemap.xml')
        except Exception as e:
            app.logger.error(f'sitemap.xml文件服务失败: {e}')
            app.logger.error(traceback.format_exc())
            return '', 404
    
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
            app.logger.error(f'GEO优化失败: {e}')
            app.logger.error(traceback.format_exc())
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
            app.logger.error(f'自动GEO优化失败: {e}')
            app.logger.error(traceback.format_exc())
            return jsonify({
                "success": False,
                "message": f"自动GEO优化失败: {str(e)}"
            })
    
    @app.route('/health')
    def health_check():
        """健康检查端点"""
        try:
            return jsonify({
                "status": "healthy",
                "timestamp": datetime.now().isoformat()
            })
        except Exception as e:
            app.logger.error(f'健康检查失败: {e}')
            app.logger.error(traceback.format_exc())
            return jsonify({
                "status": "unhealthy",
                "timestamp": datetime.now().isoformat(),
                "error": str(e)
            }), 500
    
    @app.route('/set_language/<language>')
    def set_language(language=None):
        """设置语言"""
        if language and language in app.config['BABEL_SUPPORTED_LOCALES']:
            session['language'] = language
            flash(_('语言已切换为: %(language)s', language=language), 'info')
        else:
            flash(_('不支持的语言'), 'error')
        
        # 重定向回上一个页面或首页
        return redirect(request.referrer or url_for('index'))
    
    @app.errorhandler(404)
    def page_not_found(e):
        """404错误处理"""
        app.logger.warning(f'404错误: {request.url}')
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
        """500错误处理"""
        app.logger.error(f'服务器内部错误: {e}')
        app.logger.error(traceback.format_exc())
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

    
    # 导入CSP配置
    csp_available = False
    apply_csp_to_response = None
    try:
        from csp_config import apply_csp_to_response
        csp_available = True
    except ImportError:
        csp_available = False
        app.logger.warning("CSP配置模块未找到，将使用基本安全头部")
    
    # 添加安全头部中间件
    @app.after_request
    def add_security_headers(response):
        """添加安全头部，包括CSP"""
        try:
            if csp_available and apply_csp_to_response:
                # 使用宽松模式CSP以兼容现有代码
                response = apply_csp_to_response(response, strict=False)
            else:
                # 基本安全头部
                response.headers['X-Content-Type-Options'] = 'nosniff'
                response.headers['X-Frame-Options'] = 'SAMEORIGIN'
                response.headers['X-XSS-Protection'] = '1; mode=block'
                response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        except Exception as e:
            app.logger.error(f'添加安全头部失败: {e}')
            app.logger.error(traceback.format_exc())
        
        return response

    return app

# 为Gunicorn创建应用实例
# 使用更标准的方式暴露Flask应用实例
app = create_app()

# 添加调试信息 - 使用新的Flask方式
with app.app_context():
    app.logger.info(f"应用启动完成，静态文件夹: {app.static_folder}")
    app.logger.info(f"模板文件夹: {app.template_folder}")
    app.logger.info(f"当前工作目录: {os.getcwd()}")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False)