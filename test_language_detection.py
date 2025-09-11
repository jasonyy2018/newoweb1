import requests
import time

def test_language_detection():
    """测试语言自动检测功能"""
    base_url = "http://127.0.0.1:5000"
    
    print("=== 开始语言自动检测测试 ===\n")
    
    # 测试1: 英文浏览器语言首选项
    print("1. 测试英文浏览器语言检测")
    headers = {'Accept-Language': 'en-US,en;q=0.9'}
    response = requests.get(base_url, headers=headers, allow_redirects=False)
    print(f"   状态码: {response.status_code}")
    print(f"   重定向位置: {response.headers.get('Location', '无重定向')}")
    print(f"   内容长度: {len(response.text)} 字符")
    
    # 测试2: 日文浏览器语言首选项
    print("\n2. 测试日文浏览器语言检测")
    headers = {'Accept-Language': 'ja-JP,ja;q=0.9'}
    response = requests.get(base_url, headers=headers, allow_redirects=False)
    print(f"   状态码: {response.status_code}")
    print(f"   重定向位置: {response.headers.get('Location', '无重定向')}")
    print(f"   内容长度: {len(response.text)} 字符")
    
    # 测试3: 中文浏览器语言首选项
    print("\n3. 测试中文浏览器语言检测")
    headers = {'Accept-Language': 'zh-CN,zh;q=0.9'}
    response = requests.get(base_url, headers=headers, allow_redirects=False)
    print(f"   状态码: {response.status_code}")
    print(f"   重定向位置: {response.headers.get('Location', '无重定向')}")
    print(f"   内容长度: {len(response.text)} 字符")
    
    # 测试4: 无语言首选项（默认）
    print("\n4. 测试无语言首选项（默认）")
    response = requests.get(base_url, allow_redirects=False)
    print(f"   状态码: {response.status_code}")
    print(f"   重定向位置: {response.headers.get('Location', '无重定向')}")
    print(f"   内容长度: {len(response.text)} 字符")
    
    print("\n=== 测试完成 ===")

if __name__ == "__main__":
    # 等待服务器启动
    time.sleep(2)
    test_language_detection()