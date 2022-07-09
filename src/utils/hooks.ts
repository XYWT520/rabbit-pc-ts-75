import { useIntersectionObserver } from "@vueuse/core"
import { ref } from "vue"

// 原始封装
// export function useLazyDate(target:any,callback:() => void) {
//   const { stop } = useIntersectionObserver(target,([{isIntersecting}]) => {
//     if(!isIntersecting) return
//     callback()
//     stop()
//   })
// }

//  进阶封装 使用引用数据类型实现封装
export function useLazyDate(callback:() => void) {
  const target = ref(null)
  const { stop } = useIntersectionObserver(target,([{isIntersecting}]) => {
    if(!isIntersecting) return
    callback()
    stop()
  },{threshold:0})
  return target
}