import requests
import time

def test_language_detection():
    print("测试自动语言检测功能...")
    
    # 测试英文语言检测
    print("\n1. 测试英文语言检测:")
    try:
        response = requests.get('http://127.0.0.1:5000', 
                              headers={'Accept-Language': 'en-US,en;q=0.9'},
                              allow_redirects=False)
        print(f"状态码: {response.status_code}")
        print(f"重定向URL: {response.headers.get('Location', '无重定向')}")
        print(f"响应长度: {len(response.text)}")
    except Exception as e:
        print(f"错误: {e}")
    
    # 测试日文语言检测
    print("\n2. 测试日文语言检测:")
    try:
        response = requests.get('http://127.0.0.1:5000', 
                              headers={'Accept-Language': 'ja,en;q=0.8'},
                              allow_redirects=False)
        print(f"状态码: {response.status_code}")
        print(f"重定向URL: {response.headers.get('Location', '无重定向')}")
        print(f"响应长度: {len(response.text)}")
    except Exception as e:
        print(f"错误: {e}")
    
    # 测试中文语言检测（应该不重定向）
    print("\n3. 测试中文语言检测:")
    try:
        response = requests.get('http://127.0.0.1:5000', 
                              headers={'Accept-Language': 'zh-CN,zh;q=0.9'},
                              allow_redirects=False)
        print(f"状态码: {response.status_code}")
        print(f"重定向URL: {response.headers.get('Location', '无重定向')}")
        print(f"响应长度: {len(response.text)}")
    except Exception as e:
        print(f"错误: {e}")

if __name__ == "__main__":
    test_language_detection()