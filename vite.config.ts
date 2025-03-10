import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/tests/vitest-setup.ts',
      exclude: ['**/e2e/**', '**/node_modules/**', '**/dist/**'],
      coverage: {
        all: false,
        include: ['src/**'],
      },
    },
  };
});
