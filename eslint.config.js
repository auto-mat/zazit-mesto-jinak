// @ts-check
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...vuePlugin.configs['flat/recommended'], // Vue recommended rules
  {
    files: ['**/*.vue', '**/*.ts'],
    ignores: [
      '/dist',
      '/src-capacitor',
      '/src-cordova',
      '/.quasar',
      '/node_modules',
      '.eslintrc.js',
      '/src-ssr',
    ],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      vue: vuePlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
    },
  },
];
