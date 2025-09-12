from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def index():
    lang = request.args.get('lang', 'zh')
    return f"""
    <html>
    <head><title>Simple Test</title></head>
    <body>
        <h1>Basic Test - Language: {lang}</h1>
        <p>English: <a href="?lang=en">Switch to English</a></p>
        <p>Japanese: <a href="?lang=ja">Switch to Japanese</a></p>
        <p>Chinese: <a href="?lang=zh">Switch to Chinese</a></p>
        <hr>
        <h2>Translation Test Status:</h2>
        <p>Flask is working ✓</p>
        <p>Templates not loaded yet - testing basic functionality first</p>
    </body>
    </html>
    """

@app.route('/test')
def test():
    return "Basic Flask is working!"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)