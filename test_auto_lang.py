import requests

def test_auto_language_detection():
    print("=== 测试浏览器语言自动检测功能 ===")
    
    # 测试英文浏览器语言
    print("\\n1. 测试英文浏览器语言检测:")
    headers = {'Accept-Language': 'en-US,en;q=0.9'}
    r = requests.get('http://127.0.0.1:5000', headers=headers, allow_redirects=False)
    print(f"   状态码: {r.status_code}")
    print(f"   重定向位置: {r.headers.get('Location')}")
    print(f"   内容长度: {len(r.text)}")
    
    # 测试日文浏览器语言  
    print("\\n2. 测试日文浏览器语言检测:")
    headers = {'Accept-Language': 'ja-JP,ja;q=0.9'}
    r = requests.get('http://127.0.0.1:5000', headers=headers, allow_redirects=False)
    print(f"   状态码: {r.status_code}")
    print(f"   重定向位置: {r.headers.get('Location')}")
    print(f"   内容长度: {len(r.text)}")
    
    # 测试中文浏览器语言
    print("\\n3. 测试中文浏览器语言检测:")
    headers = {'Accept-Language': 'zh-CN,zh;q=0.9'}
    r = requests.get('http://127.0.0.1:5000', headers=headers, allow_redirects=False)
    print(f"   状态码: {r.status_code}")
    print(f"   重定向位置: {r.headers.get('Location')}")
    print(f"   内容长度: {len(r.text)}")
    
    print("\\n=== 测试完成 ===")

if __name__ == "__main__":
    test_auto_language_detection()