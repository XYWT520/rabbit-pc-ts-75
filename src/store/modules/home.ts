// 导入 pinia
import { defineStore } from 'pinia'
// 导入 axios
import axios from '@/utils/request'
import { ApiRes, home } from '@/types'


export default defineStore('home', {
  state: () => {
    return {
      bannerList:[] as home[]
    }
  },
  actions: {
    async getBannerList(){
      const res = await axios.get<ApiRes<home>>('/home/banner') 
      // console.log(res);
      this.bannerList = res.data.result
    }
  }
})
