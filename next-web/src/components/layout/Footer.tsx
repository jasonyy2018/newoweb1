import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
    const tCommon = useTranslations('Common');
    const tContact = useTranslations('Contact');

    return (
        <footer className="bg-dark text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-6">
                            <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                                <img
                                    src="/logo.png"
                                    alt="WSAI Logo"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <span className="text-white font-bold text-xl">WSAI</span>
                        </Link>
                        <p className="text-gray-400 max-w-sm mb-6">
                            {tCommon('title')}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">{tCommon('solutions')}</h4>
                        <ul className="space-y-4">
                            <li><Link href="/solutions/data-analytics" className="text-gray-400 hover:text-primary transition-colors">智能数据分析</Link></li>
                            <li><Link href="/solutions/nlp" className="text-gray-400 hover:text-primary transition-colors">自然语言处理</Link></li>
                            <li><Link href="/solutions/computer-vision" className="text-gray-400 hover:text-primary transition-colors">计算机视觉</Link></li>
                            <li><Link href="/solutions/predictive-analytics" className="text-gray-400 hover:text-primary transition-colors">预测性分析</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">{tCommon('contact')}</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start">
                                <span className="mr-3 text-primary">📍</span>
                                <span>{tContact('address')}</span>
                            </li>
                            <li className="flex items-center">
                                <span className="mr-3 text-primary">📞</span>
                                <span>+86-18964673689</span>
                            </li>
                            <li className="flex items-center">
                                <span className="mr-3 text-primary">📧</span>
                                <span>jyu@wisdomitc.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:row justify-between items-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} WSAI. All Rights Reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
