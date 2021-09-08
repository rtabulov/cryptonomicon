import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import eslint from 'vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite'
import viteSvgIcons from 'vite-plugin-svg-icons'
import Pages from 'vite-plugin-pages'

import path from 'path'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/cryptonomicon/' : '/',
  plugins: [
    vue(),
    Pages(),
    WindiCSS(),
    eslint({ cache: false }),
    Components(),
    viteSvgIcons({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
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
