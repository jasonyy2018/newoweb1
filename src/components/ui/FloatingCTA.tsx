'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';

export default function FloatingCTA() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                setIsOpen(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-[60]">
            <AnimatePresence>
                {isVisible && (
                    <div className="relative">
                        {/* Action Menu */}
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                    className="absolute bottom-20 right-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 space-y-4"
                                >
                                    <h3 className="font-bold text-dark text-lg">开启您的AI之旅</h3>
                                    <p className="text-sm text-gray-500">我们的技术专家随时准备为您提供免费咨询与定制化方案。</p>

                                    <div className="space-y-2">
                                        <a href="tel:+86-123-4567-8910" className="flex items-center space-x-3 p-3 bg-light rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">
                                            <Phone size={18} />
                                            <span className="font-medium">电话咨询</span>
                                        </a>
                                        <Link href="/#contact" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-lg">
                                            <MessageCircle size={18} />
                                            <span className="font-medium">在线预约</span>
                                        </Link>
                                    </div>

                                    <div className="pt-2 border-t border-gray-50 flex items-center text-xs text-gray-400">
                                        <Mail size={12} className="mr-2" />
                                        <span>contact@wsai.example.com</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Toggle Button */}
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-dark text-white' : 'bg-primary text-white shadow-primary/40'}`}
                        >
                            {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
                            {!isOpen && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                            )}
                        </motion.button>

                        {!isOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="absolute right-20 bottom-4 bg-dark text-white text-sm py-2 px-4 rounded-full shadow-xl whitespace-nowrap pointer-events-none"
                            >
                                马上预约专家咨询
                            </motion.div>
                        )}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
