// Vue.use()
// app.use()
import { App } from "vue";
import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel/index.vue'
import XtxMore from '@/components/more/index.vue'
import XtxBread from '@/components/bread/index.vue'
import XtxBreadItem from '@/components/bread/item.vue'
import XtxCity from '@/components/city/index.vue'
import XtxNumbox from '@/components/Numbox/index.vue'
import XtxButton from '@/components/button/index.vue'

import { useIntersectionObserver } from "@vueuse/core";
import defaultImage from '@/assets/images/200.png'
// 全局注册组件
export default {
  install(app:App){
    app.component('XtxSkeleton',XtxSkeleton)
    app.component('XtxCarousel',XtxCarousel)
    app.component('XtxMore',XtxMore)
    app.component('XtxBread',XtxBread)
    app.component('XtxBreadItem',XtxBreadItem)
    app.component('XtxCity',XtxCity)
    app.component('XtxNumbox',XtxNumbox)
    app.component('XtxButton',XtxButton)

    // 全局注册组件
    // 参数1. 指令名
    // 参数2. 配置对象
    app.directive('lazy',{
      mounted(el,binding) {
        // console.log(el,binding);
        // el 代码 dom 元素
        useIntersectionObserver(el,([{isIntersecting}]) => {
          if(isIntersecting) {
            el.src = binding.value
          }
          // 给图片一个默认值 有一个 el.onerror 的方法
          el.onerror = () => {
            el.src = defaultImage
          }
        })
      }
    })
  }
  
}