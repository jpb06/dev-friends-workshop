import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  // optimizeDeps: {
  //   include: ['@emotion/react'],
  // },
  // resolve: {
  //   dedupe: ['@emotion/react'],
  // },
  // build: {
  //   rollupOptions: {
  //     // External packages that should not be bundled into your library.
  //     external: [
  //       'react',
  //       'react-dom',
  //       'react/jsx-runtime',
  //       '@emotion/react',
  //       '@emotion/styled',
  //       '@mui/material',
  //       '@mui/styled-engine-sc',
  //     ],
  //   },
  // },
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
      reporter: ['text', 'json', 'html', 'lcov'],
      all: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/tests/**/*', 'src/**/*.type.ts', 'src/**/*/index.ts'],
    },
  },
});
