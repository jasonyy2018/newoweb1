#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import polib

# 加载日文翻译文件
po = polib.pofile('translations/ja/LC_MESSAGES/messages.po')

# 定义剩余需要翻译的内容映射
translations = {
    "葳澄科技为企业提供专业、定制化的AI解决方案。我们的服务已帮助众多客户在关键的业务指标上取得了显著提升，有力证明了AI技术在实际应用中的巨大价值和商业效益。": "葳澄科技は企業に専門的でカスタマイズされたAIソリューションを提供しています。私たちのサービスは、多くのお客様の重要なビジネス指標において顕著な改善を達成し、AI技術の実用的な巨大な価値と商業的メリットを証明しています。",
    "通过前沿的人工智能技术，赋能企业实现数字化转型，驱动业务增长并创造更大价值。我们专注于理解企业需求，利用AI技术解决核心业务挑战，是企业在智能化时代寻求创新与突破的理想合作伙伴。": "最先端のAI技術を通じて、企業のデジタルトランスフォーメーションを実現し、ビジネスの成長とより大きな価値創造を推進します。私たちは企業のニーズを理解し、AI技術で主要なビジネス課題を解決し、インテリジェント時代においてイノベーションとブレークスルーを求める企業の理想的なパートナーです。",
    "在高德地图中查看": "Amapで表示",
    "无论您有任何疑问或需求，我们的团队都将为您提供专业的咨询服务": "どのような疑問やニーズをお持ちでも、私たちのチームが専門的なコンサルティングサービスを提供いたします",
    "抱歉、服务器遇到了意外错误。我们的技术团队已收到通知并正在处理此问题。": "申し訳ありませんが、サーバーに予期しないエラーが発生しました。技術チームに通知が送られ、現在この問題を処理中です。",
    "请稍后再试": "少し時間を置いてから再度お試しください",
    "如果问题持续存在，请联系技术支持": "問題が継続する場合は、技術サポートにご連絡ください",
    "提供错误ID以便我们更快定位问题: {}": "問題を迅速に特定できるよう、エラーIDを提供してください: {}",
    "平均业务增长(%)": "平均業務成長(%)",
    "客户成本降低(%)": "顧客コスト削減(%)"
}

# 更新翻译条目
updated_count = 0
for entry in po:
    # 如果msgid在翻译映射中且当前没有翻译或翻译为空
    if entry.msgid in translations and (not entry.msgstr or entry.msgstr.strip() == ""):
        entry.msgstr = translations[entry.msgid]
        updated_count += 1
        # 移除fuzzy标记
        if 'fuzzy' in entry.flags:
            entry.flags.remove('fuzzy')

# 保存更新后的文件
po.save()

print(f"已更新 {updated_count} 个翻译条目")
print("翻译文件已保存")

# 编译翻译文件
import subprocess
try:
    result = subprocess.run(['pybabel', 'compile', '-d', 'translations'], 
                          capture_output=True, text=True, cwd='.')
    if result.returncode == 0:
        print("翻译文件编译成功")
    else:
        print(f"编译错误: {result.stderr}")
except Exception as e:
    print(f"编译过程出错: {e}")

# 最终状态检查
untranslated = []
for entry in po:
    if entry.msgid.strip() and (not entry.msgstr or entry.msgstr.strip() == ""):
        untranslated.append(entry.msgid)

print(f"\n=== 最终翻译状态 ===")
print(f"总条目数: {len(po)}")
print(f"已翻译条目: {len(po) - len(untranslated)}")
print(f"未翻译条目: {len(untranslated)}")
print(f"翻译完成度: {(len(po) - len(untranslated))/len(po)*100:.1f}%" if len(po) > 0 else "0%")

if len(untranslated) == 0:
    print("\n🎉 恭喜！所有内容都已翻译完成！")
    print("✅ 日文页面的翻译工作已全部完成！")
elif len(untranslated) <= 3:
    print("\n✅ 几乎完成！只剩下很少的条目需要翻译:")
    for item in untranslated:
        print(f"  - {item}")
else:
    print("\n⚠️ 还有一些条目需要翻译:")
    for i, item in enumerate(untranslated, 1):
        print(f"  {i}. {item}")