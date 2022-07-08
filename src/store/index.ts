import defineStore from './modules/category'
import deHomeStore from './modules/home'

export default function useStore(){
  return {
    categroy:defineStore(),
    home:deHomeStore()
  }
}