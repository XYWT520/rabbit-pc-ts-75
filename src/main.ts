import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import '@/assets/style/common.less'
// 导入路由
import router from './router'
// 导入 pinia
import { createPinia } from 'pinia'
// 导入组件 用来全局注册
import MyUi from '@/components'
const pinia = createPinia()
// const MyUi = XtxSkeleton()

// 完整写法
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(MyUi)
app.mount("#app")

// createApp(App).use(router).use(pinia).mount('#app')
