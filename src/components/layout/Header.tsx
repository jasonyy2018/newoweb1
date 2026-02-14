'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
    const t = useTranslations('Common');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark/90 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                        <img
                            src="/logo.png"
                            alt="WSAI Logo"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <span className="text-white font-bold text-xl hidden md:block">WSAI</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    <Link href="/" className="text-white hover:text-secondary transition-colors">{t('home')}</Link>
                    <Link href="/about" className="text-white hover:text-secondary transition-colors">{t('about')}</Link>
                    <Link href="/solutions" className="text-white hover:text-secondary transition-colors">{t('solutions')}</Link>
                    <Link href="/case-studies" className="text-white hover:text-secondary transition-colors">{t('cases')}</Link>
                    <Link href="/blog" className="text-white hover:text-secondary transition-colors">{t('blog')}</Link>
                    <Link href="/pricing" className="text-white hover:text-secondary transition-colors">{t('pricing')}</Link>
                    <Link href="/contact" className="text-white hover:text-secondary transition-colors">{t('contact')}</Link>
                </nav>

                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/contact" className="bg-white text-primary px-6 py-2 rounded-full font-medium hover:bg-secondary hover:text-white transition-all shadow-lg">
                        {t('consult')}
                    </Link>
                    <LanguageSwitcher />
                </div>

                {/* Mobile menu button */}
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden bg-dark transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'}`}>
                <nav className="flex flex-col space-y-4 px-4 pb-4">
                    <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-white py-2 border-b border-white/10">{t('home')}</Link>
                    <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-white py-2 border-b border-white/10">{t('about')}</Link>
                    <Link href="/solutions" onClick={() => setIsMenuOpen(false)} className="text-white py-2 border-b border-white/10">{t('solutions')}</Link>
                    <Link href="/case-studies" onClick={() => setIsMenuOpen(false)} className="text-white py-2 border-b border-white/10">{t('cases')}</Link>
                    <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="text-white py-2 border-b border-white/10">{t('blog')}</Link>
                    <Link href="/pricing" onClick={() => setIsMenuOpen(false)} className="text-white py-2 border-b border-white/10">{t('pricing')}</Link>
                    <Link href="/#contact" onClick={() => setIsMenuOpen(false)} className="text-white py-2 border-b border-white/10">{t('contact')}</Link>
                    <div className="flex justify-between items-center pt-2">
                        <LanguageSwitcher />
                        <Link href="/#contact" onClick={() => setIsMenuOpen(false)} className="bg-primary text-white px-6 py-2 rounded-full font-medium">
                            {t('consult')}
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
