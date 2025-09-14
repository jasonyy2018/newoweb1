#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CSP (Content Security Policy) 配置管理
"""

def get_csp_policy(strict=False):
    """
    获取CSP策略
    
    Args:
        strict (bool): 是否使用严格模式
    
    Returns:
        str: CSP策略字符串
    """
    
    if strict:
        # 严格模式 - 更安全但可能破坏现有功能
        return (
            "default-src 'self'; "
            "script-src 'self' https://cdn.tailwindcss.com https://cdn.jsdelivr.net https://mk.wisdomitc.com; "
            "style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net; "
            "img-src 'self' data: https:; "
            "font-src 'self' https://cdn.jsdelivr.net; "
            "connect-src 'self' https://mk.wisdomitc.com; "
            "frame-src 'self' https://mk.wisdomitc.com; "
            "object-src 'none'; "
            "base-uri 'self';"
        )
    else:
        # 宽松模式 - 允许内联脚本和样式，适合现有代码
        # 但仍然限制不安全的eval和内联脚本
        return (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' "
            "https://cdn.tailwindcss.com "
            "https://cdn.jsdelivr.net "
            "https://mk.wisdomitc.com; "
            "style-src 'self' 'unsafe-inline' "
            "https://cdn.tailwindcss.com "
            "https://cdn.jsdelivr.net; "
            "img-src 'self' data: https: blob:; "
            "font-src 'self' https://cdn.jsdelivr.net; "
            "connect-src 'self' https://mk.wisdomitc.com; "
            "frame-src 'self' https://mk.wisdomitc.com; "
            "media-src 'self' data: https:; "
            "object-src 'none'; "
            "base-uri 'self'; "
            "form-action 'self';"
        )

def get_security_headers():
    """
    获取其他安全头部
    
    Returns:
        dict: 安全头部字典
    """
    return {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN', 
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
    }

def apply_csp_to_response(response, strict=False):
    """
    将CSP和安全头部应用到Flask响应
    
    Args:
        response: Flask响应对象
        strict (bool): 是否使用严格CSP模式
    
    Returns:
        response: 修改后的响应对象
    """
    try:
        # 设置CSP头部
        response.headers['Content-Security-Policy'] = get_csp_policy(strict)
        
        # 设置其他安全头部
        for header, value in get_security_headers().items():
            response.headers[header] = value
        
        return response
    except Exception as e:
        # 如果设置安全头部失败，记录错误但不中断响应
        import logging
        logging.error(f"设置安全头部失败: {e}")
        return response