import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import '@/assets/style/common.less'
// 导入路由
import router from './router'

createApp(App).use(router).mount('#app')
