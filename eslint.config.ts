//@ts-nocheck

import { defineConfig } from 'eslint/config'
import importX from 'eslint-plugin-import-x'
import cspell from '@cspell/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

/**
 * Разрешённые пути для проверки Eslint
 */
const ALLOW_ECMA_PATHS = ['./src/**/*.{js,ts,jsx,tsx,mjs,mts,cts,cjs}']

/**
 * Конфигурация Eslint
 */
const config = defineConfig(
  {
    files: ALLOW_ECMA_PATHS,
    languageOptions: {
      parser: tsParser,
    },
  },
  {
    files: ALLOW_ECMA_PATHS,
    plugins: { importX },
    rules: {
      'importX/first': 2,
      'importX/export': 2,
      'importX/no-cycle': 2,
      'importX/no-duplicates': 2,
      'importX/no-absolute-path': 2,
      'importX/no-unused-modules': 2,
      'importX/no-rename-default': 2,
      'importX/no-mutable-exports': 2,
      'importX/no-named-as-default': 2,
      'importX/newline-after-import': 2,
      'importX/consistent-type-specifier-style': 2,
      'importX/order': [
        2,
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type', 'unknown'],
          'pathGroups': [
            {
              group: 'internal',
              pattern: '#/**',
              position: 'after',
            },
          ],
          'distinctGroup': true,
          'newlines-between': 'always',
        },
      ],
    },
  },
  {
    files: ALLOW_ECMA_PATHS,
    plugins: { cspell },
    rules: {
      'cspell/spellchecker': [
        1,
        {
          autoFix: true,
          configFile: './cspell.config.yml',
          cspellOptionsRoot: import.meta.url,
        },
      ],
    },
  },
)

export default config
