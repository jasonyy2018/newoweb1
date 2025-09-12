#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask
from flask_babel import Babel, gettext as _

app = Flask(__name__)
app.config['LANGUAGES'] = ['zh', 'en', 'ja']
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'
app.config['BABEL_TRANSLATION_DIRECTORIES'] = 'translations'

def get_locale():
    return 'ja'

babel = Babel(app, locale_selector=get_locale)

with app.app_context():
    print("=== 日文页面完整翻译检查 ===")
    print("=" * 60)
    
    # 从英文翻译文件中提取的所有主要条目
    all_items = [
        # 基础导航和UI
        "上海葳澄信息科技有限公司 - WSAI", "首页", "解决方案", "成功案例", "联系我们",
        "咨询专家", "中文", "English", "日本語", "中", "EN", "日",
        
        # 英雄区域
        "人工智能驱动", "企业数字化转型", "上海葳澄信息科技有限公司(WSAI)",
        "专注于为企业提供专业、定制化的AI解决方案，助力企业实现业务增长与价值创造",
        "探索解决方案",
        
        # 关于我们
        "关于", "葳澄科技", "我们的", "故事", "使命", "公司成立", "AI专家", "客户满意度", "了解更多",
        
        # 解决方案
        "AI", "智能数据分析", "自然语言处理", "计算机视觉", "预测性分析", "智能自动化", "定制化AI模型开发", "了解详情",
        
        # 成功案例
        "成功", "案例", "案例分析", "制造业智能质检系统", "检测精度提升", "检测效率提升", "人工成本降低",
        "金融行业智能风控系统", "审批效率提升", "不良贷款率降低", "风险识别准确率",
        "零售业智能推荐系统", "点击率提升", "客单价提升", "用户满意度",
        "医疗影像智能诊断系统", "诊断准确率", "诊断时间缩短", "早期检出率提升",
        "物流行业智能调度系统", "配送效率提升", "运输成本降低", "准时送达率",
        "教育行业个性化学习系统", "学习效率提升", "知识掌握率", "学生满意度",
        "查看完整案例",
        
        # 联系我们
        "联系", "我们", "姓名", "请输入您的姓名", "邮箱", "请输入您的邮箱",
        "公司名称", "请输入您的公司名称", "电话", "请输入您的电话",
        "咨询内容", "请输入您的咨询内容", "提交咨询", "发送咨询",
        "公司地址", "公司位置", "联系电话", "电子邮箱",
        
        # 页脚
        "WSAI", "上海葳澄信息科技", "上海葳澄信息科技有限公司", "快速链接", "版权所有",
        "关注我们", "通过社交媒体获取更多AI行业资讯和公司动态"
    ]
    
    untranslated = []
    translated = []
    
    for item in all_items:
        translation = _(item)
        if translation == item:  # 未翻译
            untranslated.append(item)
        else:  # 已翻译
            translated.append(item)
    
    print(f"已翻译项目数: {len(translated)}")
    print(f"未翻译项目数: {len(untranslated)}")
    print(f"翻译完成度: {(len(translated)/(len(translated)+len(untranslated))*100):.1f}%")
    
    if untranslated:
        print("\n❌ 未翻译的内容:")
        print("-" * 40)
        for i, item in enumerate(untranslated, 1):
            print(f"{i:2d}. {item}")
    
    print("\n" + "=" * 60)
    
    if len(untranslated) == 0:
        print("🎉 所有内容都已翻译!")
    elif len(untranslated) <= 5:
        print("✅ 翻译基本完成，还有少量内容需要处理")
    else:
        print("⚠️  还有较多内容需要翻译")