#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
将SVG文件转换为PNG格式
"""

import os
from cairosvg import svg2png

# 定义SVG和PNG文件路径
static_dir = 'static'
images_dir = os.path.join(static_dir, 'images')

# 确保PNG文件保存在同一目录下
for i in range(1, 7):
    svg_filename = f'case{i}.svg'
    png_filename = f'case{i}.png'
    
    svg_path = os.path.join(images_dir, svg_filename)
    png_path = os.path.join(images_dir, png_filename)
    
    # 检查SVG文件是否存在
    if os.path.exists(svg_path):
        # 转换SVG到PNG
        with open(svg_path, 'rb') as svg_file:
            svg2png(file_obj=svg_file, write_to=png_path, output_width=600, output_height=400)
        print(f"已转换 {svg_filename} 到 {png_filename}")
    else:
        print(f"文件 {svg_path} 不存在")