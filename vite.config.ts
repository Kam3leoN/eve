import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: false,
  build: {
    emptyOutDir: true,
    minify: 'esbuild',
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Eve',
      formats: ['es', 'cjs', 'iife'],
      fileName: (format) => {
        if (format === 'es') return 'eve.min.mjs';
        if (format === 'cjs') return 'eve.min.cjs';
        return 'eve.min.js';
      },
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
});
