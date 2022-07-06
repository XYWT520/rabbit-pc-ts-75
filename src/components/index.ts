// Vue.use()
// app.use()
import { App } from "vue";
import XtxSkeleton from '@/components/skeleton/index.vue'

// 全局注册组件
export default {
  install(app:App){
    app.component('XtxSkeleton',XtxSkeleton)
  }
}