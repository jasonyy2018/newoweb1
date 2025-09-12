from flask import Flask, render_template, request
from flask_babel import Babel, gettext as _

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'

# Configuration for Flask-Babel
app.config['LANGUAGES'] = ['zh', 'en', 'ja']
app.config['BABEL_DEFAULT_LOCALE'] = 'zh'
app.config['BABEL_TRANSLATION_DIRECTORIES'] = 'translations'

def get_locale():
    lang = request.args.get('lang')
    if lang in app.config['LANGUAGES']:
        return lang
    return app.config['BABEL_DEFAULT_LOCALE']

babel = Babel()
babel.init_app(app, locale_selector=get_locale)

@app.context_processor
def inject_conf_vars():
    return dict(
        get_locale=get_locale
    )

@app.route('/')
def index():
    try:
        return render_template('index.html')
    except Exception as e:
        return f"Template error: {str(e)}"

@app.route('/simple')
def simple():
    return f"""
    <html>
    <head><title>Test</title></head>
    <body>
        <h1>翻译测试</h1>
        <p>中文: 探索解决方案</p>
        <p>当前语言: {request.args.get('lang', 'zh')}</p>
        <p>翻译结果: {_('探索解决方案')}</p>
        <a href="?lang=en">English</a> | 
        <a href="?lang=ja">日本語</a> | 
        <a href="?lang=zh">中文</a>
    </body>
    </html>
    """

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)