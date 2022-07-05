import defineStore from './modules/category'

export default function useStore(){
  return {
    categroy:defineStore()
  }
}