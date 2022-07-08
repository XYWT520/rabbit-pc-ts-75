// 导入 pinia
import { defineStore } from 'pinia'
// 导入 axios
import axios from '@/utils/request'
import { ApiRes, home, NewItem, hotItem } from '@/types'


export default defineStore('home', {
  state: () => {
    return {
      bannerList: [] as home[],
      getNewList: [] as NewItem[],
      HotList: [] as hotItem[]
    }
  },
  actions: {
    async getBannerList() {
      const res = await axios.get<ApiRes<home>>('/home/banner')
      // console.log(res);
      this.bannerList = res.data.result
    },
    async getNewLists() {
      const res = await axios.get<ApiRes<NewItem>>('/home/new')
      // console.log(res);
      this.getNewList = res.data.result
    },
    async getHotLists() {
      const res = await axios.get<ApiRes<hotItem>>('/home/hot')
      // console.log(res);
      this.HotList = res.data.result
    }
  }
})
