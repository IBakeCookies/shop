import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: [vitePreprocess(), mdsvex()],

    kit: {
        adapter: adapter(),
        alias: {
            '@src': './src',
            '@data': './src/data',
            '@business': './src/business',
            '@store': './src/business/store',
            '@storage': './src/business/storage',
            '@presentation': './src/presentation',
            '@atom': './src/presentation/component/atom',
            '@molecule': './src/presentation/component/molecule',
            '@organism': './src/presentation/component/organism',
        },
    },

    extensions: ['.svelte', '.svx'],
};

export default config;
