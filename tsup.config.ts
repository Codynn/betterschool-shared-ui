import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', 'next', 'next/link', 'next/navigation'],
  esbuildOptions(options) {
    options.banner = { js: '"use client";' };
  },
  onSuccess: async () => {
    const fs = await import('node:fs');
    fs.copyFileSync('src/styles.css', 'dist/styles.css');
  },
});
