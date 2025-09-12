#!/usr/bin/env python3
from flask import Flask
from flask_babel import Babel, gettext as _

app = Flask(__name__)
app.secret_key = 'test-key'

# Configuration for Flask-Babel
app.config['LANGUAGES'] = ['zh', 'en', 'ja']
app.config['BABEL_DEFAULT_LOCALE'] = 'zh'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'
app.config['BABEL_TRANSLATION_DIRECTORIES'] = 'translations'

def get_locale():
    return 'en'  # Force English

babel = Babel(app, locale_selector=get_locale)

if __name__ == '__main__':
    with app.app_context():
        # Test the problematic string
        try:
            result = _('我们的AI解决方案平均为客户带来35%% 的业务增长')
            print(f"SUCCESS: {result}")
        except Exception as e:
            print(f"ERROR: {e}")
        
        try:
            result = _('平均业务增长(%%)')
            print(f"SUCCESS: {result}")
        except Exception as e:
            print(f"ERROR: {e}")
            
        try:
            result = _('客户成本降低(%%)')
            print(f"SUCCESS: {result}")
        except Exception as e:
            print(f"ERROR: {e}")