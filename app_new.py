from flask import Flask, render_template, request, session, make_response
from flask_babel import Babel, gettext as _

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
        return render_template('index.html')
    except Exception as e:
        import traceback
        return f"<h1>Error:</h1><pre>{traceback.format_exc()}</pre>", 500

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/set_language/<lang>')
def set_language(lang):
    if lang in app.config['LANGUAGES']:
        session['lang'] = lang
    return make_response('', 204)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)