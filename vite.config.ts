import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: './postcss.config.js', // 确保路径正确
  },
  server: {
    host: true, // 或者设置为 '0.0.0.0'
  },
  resolve: {
    alias: {
      '@': '/src', // 确保路径别名正确
    },
  },
})
