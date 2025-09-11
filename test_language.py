import requests
import json

def test_language_detection():
    print("Testing language detection...")
    
    # Test 1: English language header
    print("\n1. Testing with English language header:")
    headers = {'Accept-Language': 'en-US,en;q=0.9'}
    response = requests.get('http://127.0.0.1:5000', headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Content length: {len(response.text)}")
    
    # Test 2: Japanese language header  
    print("\n2. Testing with Japanese language header:")
    headers = {'Accept-Language': 'ja-JP,ja;q=0.9'}
    response = requests.get('http://127.0.0.1:5000', headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Content length: {len(response.text)}")
    
    # Test 3: Chinese language header
    print("\n3. Testing with Chinese language header:")
    headers = {'Accept-Language': 'zh-CN,zh;q=0.9'}
    response = requests.get('http://127.0.0.1:5000', headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Content length: {len(response.text)}")
    
    # Test 4: No language header (should use default)
    print("\n4. Testing with no language header:")
    response = requests.get('http://127.0.0.1:5000')
    print(f"Status: {response.status_code}")
    print(f"Content length: {len(response.text)}")

if __name__ == '__main__':
    test_language_detection()