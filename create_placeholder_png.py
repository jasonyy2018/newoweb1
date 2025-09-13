#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
创建PNG占位符文件
"""

import os
from PIL import Image, ImageDraw, ImageFont

# 定义PNG文件路径
static_dir = 'static'
images_dir = os.path.join(static_dir, 'images')

# 确保PNG文件保存在同一目录下
for i in range(1, 7):
    png_filename = f'case{i}.png'
    png_path = os.path.join(images_dir, png_filename)
    
    # 创建一个占位符图像
    img = Image.new('RGB', (600, 400), color=(240, 240, 240))
    draw = ImageDraw.Draw(img)
    
    # 添加文本
    try:
        # 尝试使用默认字体
        draw.text((50, 50), f"Case {i} Image", fill=(100, 100, 100))
    except:
        # 如果默认字体不可用，使用基本绘制
        draw.rectangle([50, 50, 550, 100], fill=(200, 200, 200))
        draw.text((60, 60), f"Case {i}", fill=(50, 50, 50))
    
    # 保存PNG文件
    img.save(png_path, 'PNG')
    print(f"已创建占位符PNG文件: {png_filename}")