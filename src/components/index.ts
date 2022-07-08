// Vue.use()
// app.use()
import { App } from "vue";
import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel/index.vue'

// 全局注册组件
export default {
  install(app:App){
    app.component('XtxSkeleton',XtxSkeleton)
    app.component('XtxCarousel',XtxCarousel)
  }
}