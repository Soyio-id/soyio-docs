import { fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { FlatCompat } from '@eslint/eslintrc';
import pluginReactHooks from 'eslint-plugin-react-hooks';

const compat = new FlatCompat();

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    files: ['src/**/*.{js,ts,jsx,tsx}'],
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: pluginReactHooks.configs.recommended.rules,
  },
  ...fixupConfigRules(
    compat.config({
      extends: ['plugin:@docusaurus/recommended'],
    }),
  ),
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/prop-types': 0,
      '@typescript-eslint/no-require-imports': 0,
    },
  },
  { ignores: ['.docusaurus/**', 'build/**'] },
];
