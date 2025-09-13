from flask import Flask, render_template, request, session, make_response, jsonify, send_from_directory
from flask_babel import Babel, gettext as _
import time
import uuid
import traceback
import os

# 添加数据库模块导入
from database import init_db, add_consultation, get_all_consultations, get_consultation_by_id

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'your-secret-key-here')

# Configuration for Flask-Babel
app.config['LANGUAGES'] = ['zh', 'en', 'ja']
app.config['BABEL_DEFAULT_LOCALE'] = 'zh'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'
app.config['BABEL_TRANSLATION_DIRECTORIES'] = 'translations'

def get_locale():
    # Simple language detection from URL parameter
    lang = request.args.get('lang')
    if lang in app.config['LANGUAGES']:
        return lang
    return app.config['BABEL_DEFAULT_LOCALE']

babel = Babel(app, locale_selector=get_locale)

# 为模板提供get_locale函数
@app.context_processor
def inject_conf_vars():
    return dict(
        get_locale=get_locale
    )

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    breadcrumb_items = [
        {'name': _('关于我们'), 'url': None}
    ]
    return render_template('about.html', 
                         breadcrumb_items=breadcrumb_items,
                         page_title=_('关于我们'))

@app.route('/contact')
def contact():
    breadcrumb_items = [
        {'name': _('联系我们'), 'url': None}
    ]
    return render_template('contact.html',
                         breadcrumb_items=breadcrumb_items,
                         page_title=_('联系我们'))

# 添加FAQ页面路由
@app.route('/faq')
def faq():
    breadcrumb_items = [
        {'name': _('常见问题'), 'url': None}
    ]
    return render_template('faq.html',
                         breadcrumb_items=breadcrumb_items,
                         page_title=_('常见问题'))

# 添加解决方案页面路由
@app.route('/solutions/data-analytics')
def data_analytics():
    breadcrumb_items = [
        {'name': _('首页'), 'url': '/'},
        {'name': _('解决方案'), 'url': '/#services'},
        {'name': _('智能数据分析'), 'url': None}
    ]
    return render_template('solutions/data-analytics.html',
                         breadcrumb_items=breadcrumb_items,
                         page_title=_('智能数据分析'))

@app.route('/solutions/nlp')
def nlp():
    breadcrumb_items = [
        {'name': _('首页'), 'url': '/'},
        {'name': _('解决方案'), 'url': '/#services'},
        {'name': _('自然语言处理'), 'url': None}
    ]
    return render_template('solutions/nlp.html',
                         breadcrumb_items=breadcrumb_items,
                         page_title=_('自然语言处理'))

@app.route('/solutions/computer-vision')
def computer_vision():
    breadcrumb_items = [
        {'name': _('首页'), 'url': '/'},
        {'name': _('解决方案'), 'url': '/#services'},
        {'name': _('计算机视觉'), 'url': None}
    ]
    return render_template('solutions/computer-vision.html',
                         breadcrumb_items=breadcrumb_items,
                         page_title=_('计算机视觉'))

@app.route('/solutions/predictive-analytics')
def predictive_analytics():
    breadcrumb_items = [
        {'name': _('首页'), 'url': '/'},
        {'name': _('解决方案'), 'url': '/#services'},
        {'name': _('预测性分析'), 'url': None}
    ]
    return render_template('solutions/predictive-analytics.html',
                         breadcrumb_items=breadcrumb_items,
                         page_title=_('预测性分析'))

@app.route('/solutions/intelligent-automation')
def intelligent_automation():
    breadcrumb_items = [
        {'name': _('首页'), 'url': '/'},
        {'name': _('解决方案'), 'url': '/#services'},
        {'name': _('智能自动化'), 'url': None}
    ]
    return render_template('solutions/intelligent-automation.html',
                         breadcrumb_items=breadcrumb_items,
                         page_title=_('智能自动化'))

@app.route('/solutions/custom-ai-models')
def custom_ai_models():
    breadcrumb_items = [
        {'name': _('首页'), 'url': '/'},
        {'name': _('解决方案'), 'url': '/#services'},
        {'name': _('定制化AI模型开发'), 'url': None}
    ]
    return render_template('solutions/custom-ai-models.html',
                         breadcrumb_items=breadcrumb_items,
                         page_title=_('定制化AI模型开发'))

# 添加案例研究页面路由
@app.route('/case-studies/manufacturing-quality-control')
def manufacturing_quality_control():
    breadcrumb_items = [
        {'name': _('首页'), 'url': '/'},
        {'name': _('成功案例'), 'url': '/#cases'},
        {'name': _('制造业智能质检系统'), 'url': None}
    ]
    return render_template('case-studies/manufacturing-quality-control.html',
                         breadcrumb_items=breadcrumb_items,
                         page_title=_('制造业智能质检系统'))

# 添加解决方案通用路由
@app.route('/solutions')
def solutions():
    breadcrumb_items = [
        {'name': _('首页'), 'url': '/'},
        {'name': _('解决方案'), 'url': None}
    ]
    return render_template('solutions/index.html',
                         breadcrumb_items=breadcrumb_items,
                         page_title=_('AI解决方案'))

# 添加案例研究通用路由
@app.route('/case-studies')
def case_studies():
    breadcrumb_items = [
        {'name': _('首页'), 'url': '/'},
        {'name': _('成功案例'), 'url': None}
    ]
    return render_template('case-studies/index.html',
                         breadcrumb_items=breadcrumb_items,
                         page_title=_('成功案例'))

@app.route('/robots.txt')
def robots_txt():
    return send_from_directory(str(app.static_folder), 'robots.txt')

@app.route('/sitemap.xml')
def sitemap_xml():
    return send_from_directory(str(app.static_folder), 'sitemap.xml')

# 添加处理咨询表单提交的路由
@app.route('/submit_consultation', methods=['POST'])
def submit_consultation():
    try:
        # 从表单获取数据
        name = request.form.get('name', '').strip()
        company = request.form.get('company', '').strip()
        email = request.form.get('email', '').strip()
        phone = request.form.get('phone', '').strip()
        message = request.form.get('message', '').strip()
        
        # 验证必填字段
        if not name or not email or not message:
            return jsonify({
                'success': False,
                'message': _('请填写所有必填字段')
            }), 400
        
        # 验证邮箱格式
        if '@' not in email:
            return jsonify({
                'success': False,
                'message': _('请输入有效的邮箱地址')
            }), 400
        
        # 保存到数据库
        consultation_id = add_consultation(name, company, email, phone, message)
        
        return jsonify({
            'success': True,
            'message': _('您的咨询已成功提交，我们会尽快与您联系！'),
            'consultation_id': consultation_id
        })
        
    except Exception as e:
        error_msg = f"提交咨询时出错: {str(e)}"
        print(error_msg)
        import traceback
        traceback.print_exc()
        return jsonify({
            'success': False,
            'message': _('提交咨询时发生错误，请稍后再试')
        }), 500

# 添加管理页面路由（可选，用于查看咨询请求）
@app.route('/admin/consultations')
def admin_consultations():
    try:
        consultations = get_all_consultations()
        return render_template('admin_consultations.html', consultations=consultations)
    except Exception as e:
        print(f"获取咨询列表时出错: {str(e)}")
        return "获取咨询列表时发生错误", 500

@app.route('/test-error')
def test_error():
    """
    测试错误处理功能的路由
    访问此路由会触发一个模拟的服务器错误
    """
    # 模拟一个服务器错误
    raise RuntimeError(_("这是一个测试错误，用于验证错误处理功能是否正常工作"))

@app.route('/set_language/<lang>')
def set_language(lang):
    if lang in app.config['LANGUAGES']:
        session['lang'] = lang
    return make_response('', 204)

if __name__ == '__main__':
    # 初始化数据库
    init_db()
    # 从环境变量获取主机和端口配置，如果没有则使用默认值
    host = os.environ.get('HOST', '0.0.0.0')
    port = int(os.environ.get('PORT', 5001))
    debug = os.environ.get('FLASK_ENV') != 'production'
    app.run(debug=debug, host=host, port=port)