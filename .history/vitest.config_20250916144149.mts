import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // 根据库类型选择 'jsdom' 或 'node'
    setupFiles: './test/setup.ts',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        '**/index.ts',
        '**/*.d.ts',
        '**/__mocks__/**',
        'test/**',
        'examples/**'
      ],
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    },
    include: [
      'test/**/*.test.ts'
      'test/**/*.test.ts',
      'test/**/*.spec.ts'
    ],
    exclude: [
      'test/integration/**',
      'node_modules/**',
      'dist/**',
      'examples/**'
    ],
    alias: {
      '@': resolve(__dirname, 'src'),
      '@test': resolve(__dirname, 'test')
    },
    testTimeout: 30000,
    hookTimeout: 30000,
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@test': resolve(__dirname, 'test')
    }
  }
});