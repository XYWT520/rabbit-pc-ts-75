import { useIntersectionObserver, useIntervalFn } from "@vueuse/core"
import { count } from "console"
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
export function useLazyDate(callback: () => void) {
  const target = ref(null)
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    if (!isIntersecting) return
    callback()
    stop()
  }, { threshold: 0 })
  return target
}

export function useCountDown(count:number) {
  const time = ref(0)
  // pause 标识暂停
  // resume 标识继续
  const { pause, resume } = useIntervalFn(() => {
    time.value--
    if (time.value === 0) return pause()
  }, 1000, {
    immediate: false
  })

  const start = () =>{
    if(time.value > 0 ) return
    time.value = count
    resume()
  }

  return {
    pause,
    resume,
    time,
    start
  }
}