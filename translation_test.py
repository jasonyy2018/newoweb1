from flask import Flask, request
from flask_babel import Babel, gettext as _

app = Flask(__name__)
app.secret_key = 'test-key'

# 配置Babel
app.config['LANGUAGES'] = ['zh', 'en', 'ja']
app.config['BABEL_DEFAULT_LOCALE'] = 'zh'
app.config['BABEL_TRANSLATION_DIRECTORIES'] = 'translations'

def get_locale():
    lang = request.args.get('lang')
    if lang in app.config['LANGUAGES']:
        return lang
    return app.config['BABEL_DEFAULT_LOCALE']

try:
    babel = Babel()
    babel.init_app(app, locale_selector=get_locale)
    babel_status = "✓ Babel initialized successfully"
except Exception as e:
    babel_status = f"✗ Babel error: {str(e)}"

@app.route('/')
def index():
    lang = request.args.get('lang', 'zh')
    
    # 测试翻译
    try:
        translated = _('探索解决方案')
        translation_status = f"✓ Translation working: {translated}"
    except Exception as e:
        translation_status = f"✗ Translation error: {str(e)}"
    
    return f"""
    <html>
    <head><title>Translation Test</title></head>
    <body>
        <h1>翻译功能测试</h1>
        <p><strong>当前语言:</strong> {lang}</p>
        <p><strong>Babel状态:</strong> {babel_status}</p>
        <p><strong>翻译状态:</strong> {translation_status}</p>
        
        <hr>
        <h2>语言切换测试:</h2>
        <p><a href="?lang=en">English</a> | <a href="?lang=ja">日本語</a> | <a href="?lang=zh">中文</a></p>
        
        <hr>
        <h2>翻译对比:</h2>
        <table border="1">
            <tr><th>语言</th><th>原文</th><th>翻译结果</th></tr>
            <tr><td>中文</td><td>探索解决方案</td><td>探索解决方案</td></tr>
            <tr><td>英文</td><td>探索解决方案</td><td>{_('探索解决方案') if lang == 'en' else '...'}</td></tr>
            <tr><td>日文</td><td>探索解决方案</td><td>{_('探索解决方案') if lang == 'ja' else '...'}</td></tr>
        </table>
    </body>
    </html>
    """

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)