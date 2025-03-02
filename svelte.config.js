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
			'@data': './src/data',
			'@store': './src/business/store',
			'@presentation': './src/presentation',
			'@atom': './src/presentation/component/atom',
			'@organism': './src/presentation/component/organism'
		}
	},

	extensions: ['.svelte', '.svx']
};

export default config;
