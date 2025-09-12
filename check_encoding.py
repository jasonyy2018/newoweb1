#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import chardet

# 检测文件编码
with open('translations/ja/LC_MESSAGES/messages.po', 'rb') as f:
    raw_data = f.read()
    encoding = chardet.detect(raw_data)['encoding']
    print(f"文件编码: {encoding}")
    
    # 尝试以正确编码读取文件
    content = raw_data.decode(encoding)
    
    # 检查是否有乱码
    if '涓婃捣' in content:
        print("检测到乱码内容")
        # 尝试用UTF-8重新读取
        try:
            content_utf8 = raw_data.decode('utf-8')
            print("UTF-8解码成功")
            # 保存为UTF-8编码
            with open('translations/ja/LC_MESSAGES/messages.po', 'w', encoding='utf-8') as out_f:
                out_f.write(content_utf8)
            print("文件已重新保存为UTF-8编码")
        except UnicodeDecodeError:
            print("无法用UTF-8解码")