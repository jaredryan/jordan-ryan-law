// @ts-check
import { defineConfig } from 'eslint/config'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import astroPlugin from 'eslint-plugin-astro'

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  astroPlugin.configs.recommended,
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**'],
  },
  {
    languageOptions: {
      globals: {
        process: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
    },
  },
)
