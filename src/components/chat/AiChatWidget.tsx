'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function AiChatWidget() {
    useEffect(() => {
        const trigger = () => {
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('load'));
            }
        };

        const timer = setTimeout(trigger, 400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Script
            src="http://156.238.249.149:8082/chat/api/embed?protocol=http&host=156.238.249.149:8082&token=dfacb5320257c918"
            strategy="afterInteractive"
            onLoad={() => {
                window.dispatchEvent(new Event('load'));
            }}
        />
    );
}
