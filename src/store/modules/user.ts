import { defineStore } from "pinia";
import axios from '@/utils/request'
import { ApiRes } from "@/types";
import { profile } from "@/types/uset";
import { removeProfile, setProfile } from "@/utils/storage";

export default defineStore('user', {
  state: () => ({
    profile: {} as profile
  }),
  actions: {
    // 用户名和密码登录
    async login(data: { account: string, password: string }) {
      const res = await axios.post<ApiRes<profile>>('/login', data)
      this.profile = res.data.result
      setProfile(res.data.result)
    },
    async sendMobileMsg(mobile:string) {
      await axios.get('/login/code',{
        params:{mobile}
      })
    },
    // 短信登录
    async mobileLogin(data: { mobile: string, code: string }) {
      const res = await axios.post<ApiRes<profile>>('/login/code', data)
      setProfile(res.data.result)
    },
    // 退出登录
    logout() {
      this.profile = {} as profile
      removeProfile()
    }
  }
})
