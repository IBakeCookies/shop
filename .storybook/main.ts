import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
    stories: ['../src/presentation/component/**/*.stories.@(js|ts|svelte)'],
    addons: [
        '@storybook/addon-svelte-csf',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/sveltekit',
        options: {},
    },
    staticDirs: ['../static'],
};
export default config;
