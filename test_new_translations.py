from flask import Flask, render_template_string, request
from flask_babel import Babel, gettext as _

app = Flask(__name__)
app.secret_key = 'test-key'

# Configuration for Flask-Babel
app.config['LANGUAGES'] = ['zh', 'en', 'ja']
app.config['BABEL_DEFAULT_LOCALE'] = 'zh'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'
app.config['BABEL_TRANSLATION_DIRECTORIES'] = 'translations'

def get_locale():
    lang = request.args.get('lang')
    if lang in app.config['LANGUAGES']:
        return lang
    return app.config['BABEL_DEFAULT_LOCALE']

babel = Babel(app, locale_selector=get_locale)

@app.context_processor
def inject_conf_vars():
    return dict(
        get_locale=get_locale
    )

@app.route('/')
def index():
    try:
        # 测试一些新添加的翻译
        test_translations = [
            _('审批效率提升'),
            _('不良贷款率降低'),
            _('点击率提升'),
            _('客单价提升'),
            _('用户满意度')
        ]
        
        template = '''
        <html>
        <head><title>Translation Test</title></head>
        <body>
            <h1>Language: {{ get_locale() }}</h1>
            <ul>
            {% for translation in translations %}
                <li>{{ translation }}</li>
            {% endfor %}
            </ul>
        </body>
        </html>
        '''
        
        return render_template_string(template, translations=test_translations)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return f"Error: {e}", 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)