import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr({
    include: '**/*.svg',
  })],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@types': path.resolve(__dirname, './src/types.ts'),
      '@utils': path.resolve(__dirname, './src/utils.ts'),
      '@consts': path.resolve(__dirname, './src/consts.ts'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@': path.resolve(__dirname, './src'),

    },
  },
})
