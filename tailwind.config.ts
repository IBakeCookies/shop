import type { Config } from 'tailwindcss';

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/presentation/component/**/*.{js,ts,jsx,tsx,mdx,svelte}',
    ],
    plugins: [],
} satisfies Config;
