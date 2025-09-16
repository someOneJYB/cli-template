import { resolve } from 'path';

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  splitting: true,
  treeshake: true,
  outDir: 'dist',
  tsconfig: 'tsconfig.json',
  esbuildOptions: (options) => {
    options.drop = ['console'];
    options.external = ['react', 'react-dom']; // 根据库依赖调整
  },
  // onSuccess: 'npm run test:ci',
  // @ts-ignore
  alias: {
    '@': resolve(__dirname, 'src'),
    '@test': resolve(__dirname, 'test')
  },
  loader: {
    '.json': 'json',
    '.svg': 'dataurl'
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});