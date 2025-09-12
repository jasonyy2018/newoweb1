#!/usr/bin/env python3
from flask import Flask, render_template, request
from flask_babel import Babel, gettext as _

app = Flask(__name__)
app.secret_key = 'test-key'

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
    try:
        # Test the problematic translation first
        test_msg = _('我们的AI解决方案平均为客户带来35%% 的业务增长')
        print(f"Translation test successful: {test_msg}")
        
        # Try to render template
        return render_template('index.html')
    except Exception as e:
        print(f"Error in index route: {e}")
        import traceback
        traceback.print_exc()
        return f"Error: {e}", 500

if __name__ == '__main__':
    print("Starting debug Flask app...")
    app.run(debug=True, host='0.0.0.0', port=5001)