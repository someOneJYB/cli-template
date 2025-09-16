import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import vitestPlugin from 'eslint-plugin-vitest';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  // 基础 JavaScript 配置
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },

  // TypeScript 配置
  ...tseslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: ['**/*.{ts,mts,cts}'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      import: importPlugin,
      vitest: vitestPlugin
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        }
      }
    },
    rules: {
      // TypeScript 规则
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public'
          }
        }
      ],
      '@typescript-eslint/prefer-readonly': 'warn',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // 导入规则
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always'
        }
      ],
      'import/no-unresolved': 'error',
      'import/newline-after-import': 'error',
      'import/no-default-export': 'error',

      // 其他规则
      'no-console': 'warn',
      curly: 'error',
      eqeqeq: ['error', 'smart'],
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }]
    }
  },

  // Vitest 测试文件配置
  {
    files: ['test/unit/**/*.test.ts', 'test/unit/**/*.spec.ts'],
    rules: {
      'vitest/consistent-test-it': ['error', { fn: 'it' }],
      'vitest/no-identical-title': 'error',
      'vitest/no-focused-tests': 'error',
      'vitest/no-disabled-tests': 'warn',
      'vitest/prefer-to-be': 'error',
      'vitest/prefer-to-contain': 'error',

      // 在测试文件中放宽类型检查
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/require-await': 'off',
      'import/no-default-export': 'off'
    }
  },

  // 配置文件特殊规则
  {
    files: ['*.config.ts', 'vite.config.ts', 'vitest.config.ts', 'tsup.config.ts'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      'import/no-default-export': 'off',
      'no-console': 'off'
    }
  },

  // 忽略文件配置
  {
    ignores: [
      '*.sh',
      'node_modules',
      '*.md',
      '*.woff',
      '*.ttf',
      '.vscode',
      '.idea',
      'dist',
      'public',
      'docs',
      '.husky',
      '.local',
      'bin',
      'src/mock/*',
      'coverage',
      '*.d.ts',
      '*.log',
      '*.min.*',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
      '.eslintcache',
      '.vitest',
      'examples/**',
      'test/integration/**',
      'test/__mocks__/**'
    ]
  },

  // Prettier 配置（必须放在最后）
  prettierConfig
]);
