// 1. 下包 vue-router
// 2. 导入 vue- router
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
const router = createRouter({
  routes:[
    {
      path:'/',
      component:Layout,
      children:[
        {
          path:'',
          component:Home
        },
        {
          path:'/category/:id',
          component:() => import('@/views/category/index.vue')
        },
        {
          path:'/category/sub/:id',
          component: () => import ('@/views/category/sub.vue')
        },
        {
          path:'/playground',
          component: () => import ('@/views/playground.vue')
        },
        {
          path:'/goods/:id',
          component:() => import('@/views/goods/index.vue')
        }
      ]
    },
    {
      path:'/login',
      component:() => import('@/views/login/index.vue')
    },
    {
      path:'/login/callback',
      component:() => import('@/views/login/callback.vue')
    }
  ],
  history:createWebHashHistory()
})

export default router