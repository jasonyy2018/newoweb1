#!/bin/bash

echo "=== Testing Automatic Language Detection ==="

# 测试英文浏览器
echo -e "\n1. Testing English browser:"
curl -s -H "Accept-Language: en-US,en;q=0.9" -I http://127.0.0.1:5000/ | head -5

# 测试日文浏览器  
echo -e "\n2. Testing Japanese browser:"
curl -s -H "Accept-Language: ja-JP,ja;q=0.9" -I http://127.0.0.1:5000/ | head -5

# 测试中文浏览器
echo -e "\n3. Testing Chinese browser:"
curl -s -H "Accept-Language: zh-CN,zh;q=0.9" -I http://127.0.0.1:5000/ | head -5

echo -e "\n=== Test completed ==="