import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    // vue 3.2.25 中要求加的属性 必须在@vitejs/plugin-vue 是2.0.0以上才可以
    // 
    reactivityTransform:true
  }),vueSetupExtend()],
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
  server:{
    port:8080,
    host:'www.corho.com',
    open:true,
    cors:true
  }
})
