import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel/index.vue'
// 查看全部的组件的封装
import XtxMore from '@/components/more/index.vue'
import XtxBread from '@/components/bread/index.vue'
import XtxBreadItem from '@/components/bread/item.vue'
import XtxCity from '@/components/city/index.vue'
import XtxNumbox from '@/components/Numbox/index.vue'
import XtxButton from '@/components/button/index.vue'
import XtxCheck from '@/components/checkbox/index.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    XtxSkeleton: typeof XtxSkeleton
    XtxCarousel: typeof XtxCarousel
    XtxMore: typeof XtxMore
    XtxBread: typeof XtxBread
    XtxBreadItem: typeof XtxBreadItem
    XtxCity: typeof XtxCity
    XtxButton: typeof XtxButton
    XtxCheck: typeof XtxCheck
  }
}
