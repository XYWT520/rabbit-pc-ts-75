// 导入 pinia
import { defineStore } from 'pinia'
// 导入 axios
import axios from '@/utils/request'
import { ApiRes, home, NewItem, hotItem, brandItem, goodsItem, specialItem } from '@/types'


export default defineStore('home', {
  state: () => {
    return {
      bannerList: [] as home[],
      getNewList: [] as NewItem[],
      HotList: [] as hotItem[],
      brandList:[] as brandItem[],
      goodsList:[] as goodsItem[],
      specialList:[] as specialItem[]
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
    },
    async getBrandList() {
      const res = await axios.get<ApiRes<brandItem>>('home/brand')
      // console.log(res);
      this.brandList = res.data.result
    },
    async getGoodsList() {
      const res = await axios.get<ApiRes<goodsItem>>('home/goods')
      // console.log(res);
      this.goodsList = res.data.result
    },
    async getSpecialList() {
      const res = await axios.get<ApiRes<specialItem>>('home/special')
      // console.log(res);3
      this.specialList = res.data.result
    }
  }
})
