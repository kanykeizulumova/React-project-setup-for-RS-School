import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactPlugin from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default [
  {
    ignores: ['dist', 'node_modules', 'eslint.config.js', 'coverage'],
  },
  ...compat.extends('airbnb', 'airbnb-typescript'),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react: reactPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'import/no-extraneous-dependencies': 'off', // Смягчаем для конфигов
      'react/function-component-definition': 'off', // Позволяет любые типы компонентов
      'import/extensions': 'off', // Иногда конфликтует с TS в редакторе
      'react/prefer-stateless-function': 'off', // Позволяет классовые компоненты без стейта
      'react/prop-types': 'off', // Отключаем prop-types, так как используется TypeScript
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  eslintConfigPrettier,
];
