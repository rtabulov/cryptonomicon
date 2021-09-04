import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import eslint from 'vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite'

import path from 'path'

export default defineConfig({
  plugins: [vue(), WindiCSS(), eslint(), Components()],
  server: {
    port: 8080,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  build: {
    chunkSizeWarningLimit: 600,
    cssCodeSplit: false,
  },
})
