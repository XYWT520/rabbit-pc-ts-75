import { ApiRes, GoodsInfo } from '@/types'
import axios from '@/utils/request'
import { defineStore } from 'pinia'

export default defineStore('goods',{
  state() {
    return {
      info:{} as GoodsInfo
    }
  },
  actions:{
    async getGoodsList(id:string) {
      const res = await axios.get<ApiRes<GoodsInfo>>('/goods',{
        params:{id}
      })
      // console.log(res);
      this.info = res.data.result
    }
  }
})