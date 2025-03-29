import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs['flat/recommended'],
    prettier,
    ...svelte.configs['flat/prettier'],
    {
        ignores: ['src/paraglide/**'],
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        files: ['**/*.svelte'],
        languageOptions: {
            parserOptions: {
                parser: ts.parser,
            },
        },
    },
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                },
            ],
            'tailwindcss/no-custom-classname': 'off',
            'no-console': 'warn',
            'no-debugger': 'error',
            'no-eval': 'error',
            'no-alert': 'error',
            'no-var': 'error',
            // 'no-restricted-imports': [
            //     'error',
            //     {
            //         patterns: [
            //             {
            //                 group: ['./*', '../*'],
            //             },
            //         ],
            //     },
            // ],
            'comma-dangle': ['error', 'always-multiline'],
            'arrow-parens': ['error', 'always'],
            'no-return-await': 'error',
            'object-curly-newline': [
                'error',
                {
                    ObjectExpression: {
                        multiline: true,
                        minProperties: 1,
                    },
                },
            ],
            'max-depth': ['error', 3],
            'no-else-return': [
                'error',
                {
                    allowElseIf: false,
                },
            ],
            'eol-last': ['error', 'always'],
            'prefer-template': 'error',
            'padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: ['if'],
                    next: ['*'],
                },
                {
                    blankLine: 'always',
                    prev: ['*'],
                    next: ['if'],
                },
                {
                    blankLine: 'always',
                    prev: ['*'],
                    next: ['return'],
                },
                {
                    blankLine: 'always',
                    prev: ['import'],
                    next: ['*'],
                },
                {
                    blankLine: 'never',
                    prev: ['import'],
                    next: ['import'],
                },
                {
                    blankLine: 'never',
                    prev: ['const', 'let'],
                    next: ['const', 'let'],
                },
                {
                    blankLine: 'always',
                    prev: [
                        'block',
                        'block-like',
                        'multiline-block-like',
                        'multiline-expression',
                        'multiline-const',
                    ],
                    next: ['const', 'let'],
                },
                {
                    blankLine: 'always',
                    prev: ['const', 'let'],
                    next: [
                        'block',
                        'block-like',
                        'multiline-block-like',
                        'multiline-expression',
                        'multiline-const',
                    ],
                },
                {
                    blankLine: 'always',
                    prev: ['*'],
                    next: [
                        'block',
                        'block-like',
                        'multiline-block-like',
                        'multiline-expression',
                        'multiline-const',
                        'export',
                    ],
                },
                {
                    blankLine: 'always',
                    prev: [
                        'block',
                        'block-like',
                        'multiline-block-like',
                        'multiline-expression',
                        'multiline-const',
                        'export',
                    ],
                    next: ['*'],
                },
            ],
        },
    },
);
