import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#FF7A00',
                    50: '#FFF2E5',
                    100: '#FFE5CC',
                    200: '#FFCB99',
                    300: '#FFB166',
                    400: '#FF9633',
                    500: '#FF7A00',
                    600: '#CC6200',
                    700: '#994900',
                    800: '#663100',
                    900: '#331800',
                },
                secondary: '#FFB166',
                dark: '#2A2A2A',
                light: '#F9F9F9',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
} satisfies Config;
