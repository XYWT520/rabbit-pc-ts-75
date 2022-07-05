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
      this.list = res.data.result
    }
  }
})