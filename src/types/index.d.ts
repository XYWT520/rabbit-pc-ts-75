// 所有的接口的通用类型
export interface ApiRes<T> {
  code: string,
  mes: string,
  result: T[],
}

// 单个分类的类型
export interface categroyItem {
  id: string,
  name: string,
  picture: string,
  children:categroyItem[]
}