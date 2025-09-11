from flask import Flask, render_template, request, session, make_response, jsonify
from flask_babel import Babel, gettext as _
import os
import time
import uuid

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'

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

babel = Babel()
babel.init_app(app, locale_selector=get_locale)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

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

@app.errorhandler(500)
def internal_server_error(error):
    """
    处理内部服务器错误 (500)
    提供用户友好的错误信息和详细的JSON响应
    """
    # 生成唯一的错误ID和时间戳
    error_id = str(uuid.uuid4())
    timestamp = time.strftime('%Y-%m-%d %H:%M:%S')
    
    # 用户友好的错误消息
    user_message = _("抱歉，服务器遇到了意外错误。我们的技术团队已收到通知并正在处理此问题。")
    
    # 技术细节
    technical_details = {
        "status_code": 500,
        "error_type": "Internal Server Error",
        "possible_causes": [
            _("服务器暂时过载"),
            _("应用程序代码错误"),
            _("数据库连接问题"),
            _("第三方服务不可用")
        ],
        "error_id": error_id,
        "timestamp": timestamp
    }
    
    # 建议用户操作
    user_actions = [
        _("请稍后重试操作"),
        _("如果问题持续存在，请联系技术支持"),
        _("提供错误ID以便我们更快定位问题: {}").format(error_id)
    ]
    
    # 结构化JSON响应
    json_response = {
        "error": {
            "code": "INTERNAL_SERVER_ERROR",
            "message": user_message,
            "details": technical_details,
            "suggested_actions": user_actions,
            "request_id": error_id,
            "timestamp": timestamp
        }
    }
    
    # 根据请求的Accept头返回相应格式
    if request.accept_mimetypes.accept_json and not request.accept_mimetypes.accept_html:
        return jsonify(json_response), 500
    else:
        # 返回HTML错误页面
        return render_template('error.html', 
                             error_message=user_message,
                             error_details=technical_details,
                             user_actions=user_actions,
                             error_id=error_id,
                             locale=get_locale()), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)