import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools' // 可选

export default defineConfig({
  base: '/BambooCarving/',
  plugins: [
    vue(),
    // vueDevTools(), // 如果需要调试工具
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
