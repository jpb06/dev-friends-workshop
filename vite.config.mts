import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.tests.ts'],
    include: [
      './src/**/*.test.tsx',
      './src/**/*.spec.tsx',
      './src/**/*.test.ts',
    ],
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html', 'lcov', "json-summary"],
      all: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/tests/**/*', 'src/**/*.type.ts', 'src/**/*/index.ts'],
    },
  },
});
