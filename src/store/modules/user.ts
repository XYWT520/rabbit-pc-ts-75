import { defineStore } from "pinia";
import axios from '@/utils/request'
import { ApiRes } from "@/types";
import { profile } from "@/types/uset";

export default defineStore('user', {
  state: () => ({
    profile: {} as profile
  }),
  actions: {
    async login(data: { account: string, password: string }) {
      const res = await axios.post<ApiRes<profile>>('/login', data)
      this.profile = res.data.result
    },
    async sendMobileMsg(mobile:string) {
      await axios.get('/login/code',{
        params:{mobile}
      })
    }
  }
})
