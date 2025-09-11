# 测试语言检测逻辑
from flask import Flask, Request
from werkzeug.datastructures import Headers

# 模拟请求对象
class MockRequest:
    def __init__(self, accept_language):
        self.args = {}
        self.cookies = {}
        self.accept_languages = MockAcceptLanguages(accept_language)
    
class MockAcceptLanguages:
    def __init__(self, accept_language):
        self.accept_language = accept_language
    
    def best_match(self, languages):
        # 简单模拟语言匹配
        if 'en' in self.accept_language:
            return 'en'
        elif 'ja' in self.accept_language:
            return 'ja'
        elif 'zh' in self.accept_language:
            return 'zh'
        return None

# 测试get_locale函数逻辑
def test_get_locale():
    print("测试语言检测逻辑:")
    
    # 测试英文
    request = MockRequest('en-US,en;q=0.9')
    result = request.accept_languages.best_match(['en', 'zh', 'ja'])
    print(f"英文检测: {result} (期望: en)")
    
    # 测试日文
    request = MockRequest('ja,en;q=0.8')
    result = request.accept_languages.best_match(['en', 'zh', 'ja'])
    print(f"日文检测: {result} (期望: ja)")
    
    # 测试中文
    request = MockRequest('zh-CN,zh;q=0.9')
    result = request.accept_languages.best_match(['en', 'zh', 'ja'])
    print(f"中文检测: {result} (期望: zh)")
    
    # 测试其他语言
    request = MockRequest('fr,en;q=0.7')
    result = request.accept_languages.best_match(['en', 'zh', 'ja'])
    print(f"法语检测: {result} (期望: en)")

if __name__ == "__main__":
    test_get_locale()