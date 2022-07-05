// 1. 下包 vue-router
// 2. 导入 vue- router
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
const router = createRouter({
  routes:[
    {
      path:'/',
      component:Layout
    },
    {
      path:'/login',
      component:() => import('@/views/login/index.vue')
    }
  ],
  history:createWebHashHistory()
})

export default router