// 导入 pinia
import { defineStore } from 'pinia'
// 导入 axios
import axios from '@/utils/request'
// 导入泛型声明文件
import { ApiRes, categroyItem } from '@/types'
import { topCategory } from '../constants'

const defaultCategory = topCategory.map(item => {
  return { name: item }
})

export default defineStore('categroy', {
  state: () => {
    return {
      list: defaultCategory as categroyItem[]
    }
  },
  actions: {
    async getAllCategroy() {
      const res = await axios.get<ApiRes<categroyItem>>('/home/category/head')
      // 传入一个 open 
      res.data.result.forEach(item => item.open = false)
      this.list = res.data.result
    },

    show(id: string) {
      let item = this.list.find(item => item.id === id)
      item!.open = true
    },
    hide(id: string) {
      let item = this.list.find(item => item.id === id)
      item!.open = false
    }
  }
})