import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueSetupExtend()],
  // 配置路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
          @import "@/assets/style/variables.less";
          @import "@/assets/style/mixins.less";
        `
      }
    }
  },
  
})
