import requests

# 清除所有cookie并测试英文语言检测
s = requests.Session()
s.cookies.clear()

print("Testing English language detection with clean session...")
r = s.get('http://127.0.0.1:5000/', headers={'Accept-Language': 'en-US,en;q=0.9'}, allow_redirects=False)
print(f"Status: {r.status_code}")
print(f"Location: {r.headers.get('Location')}")
print(f"Set-Cookie: {r.headers.get('Set-Cookie')}")

# 测试日文语言检测
print("\nTesting Japanese language detection...")
r = s.get('http://127.0.0.1:5000/', headers={'Accept-Language': 'ja-JP,ja;q=0.9'}, allow_redirects=False)
print(f"Status: {r.status_code}")
print(f"Location: {r.headers.get('Location')}")
print(f"Set-Cookie: {r.headers.get('Set-Cookie')}")

# 测试中文语言检测
print("\nTesting Chinese language detection...")
r = s.get('http://127.0.0.1:5000/', headers={'Accept-Language': 'zh-CN,zh;q=0.9'}, allow_redirects=False)
print(f"Status: {r.status_code}")
print(f"Location: {r.headers.get('Location')}")
print(f"Set-Cookie: {r.headers.get('Set-Cookie')}")