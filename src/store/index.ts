import defineStore from './modules/category'
import deHomeStore from './modules/home'
import deGoodsStore from './modules/goods'

export default function useStore(){
  return {
    categroy:defineStore(),
    home:deHomeStore(),
    goods:deGoodsStore()
  }
}