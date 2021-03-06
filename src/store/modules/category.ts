// 导入 pinia
import { defineStore } from 'pinia'
// 导入 axios
import axios from '@/utils/request'
// 导入泛型声明文件
import { ApiRes, categroyItem,TopCategory,SubCategory } from '@/types'
import { topCategory } from '../constants'

const defaultCategory = topCategory.map(item => {
  return { name: item }
})

export default defineStore('categroy', {
  state: () => {
    return {
      list: defaultCategory as categroyItem[],
      topCategoryList:{} as TopCategory,
      subCategory:{} as SubCategory
    }
  },
  actions: {
    async getAllCategroy() {
      const res = await axios.get<ApiRes<categroyItem[]>>('/home/category/head')
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
    },
    async getTopCategory(id:string) {
      const res = await axios.get<ApiRes<TopCategory>>('/category',{
        params:{id}
      })
      // console.log(res);
      this.topCategoryList = res.data.result
    },
    async getSubCategory(id:string) {
      const res = await axios.get<ApiRes<SubCategory>>('/category/sub/filter',{params:{id}})
      this.subCategory = res.data.result
    },
    resetCategory() {
      this.subCategory = {} as SubCategory
    },
    resetTopcategory() {
      this.topCategoryList = {} as TopCategory
    }
  }
})