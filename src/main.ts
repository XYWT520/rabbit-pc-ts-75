import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import '@/assets/style/common.less'
// 导入路由
import router from './router'
// 导入 pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
createApp(App).use(router).use(pinia).mount('#app')
