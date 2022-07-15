import { h, render } from "vue";
import message from './message.vue'

type Options = {
  type: 'success' | 'error' | 'warning'
  text: string
  duration?: number
}

// Message({ type: 'success', text: '刘狄威牛逼' })
// 封装到函数
// { text, type } 结构参数
// 参数 1 是配置对象
export function Message({ type, text, duration = 2000 }: Options) {
  const div = document.createElement('div')
  div.setAttribute('class','xtx-message-container')
  document.body.appendChild(div)

  // 创建 message 组件的虚拟 DOM
  const vnode = h(message, {type, text})
  
  // 渲染到 body
  render(vnode, div)

  setTimeout(() => {
    // 调用 render 函数,传入 null
    render(null,div)
    // 移除div
    div.remove()
  },2000)
}

Message.error = function (text: string, duration = 2000) {
  Message({
    type: 'error',
    text,
    duration,
  })
}
Message.success = function (text: string, duration = 2000) {
  Message({
    type: 'success',
    text,
    duration,
  })
}
Message.warning = function (text: string, duration = 2000) {
  Message({
    type: 'warning',
    text,
    duration,
  })
}