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
  open:boolean,
  // 当两个泛型相同的时候可以自己调自己
  children:categroyItem[],
  goods:Goods[]
}

interface Goods {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: any;
  orderNum?: any;
}


export interface home {
  id: string;
  imgUrl: string;
  hrefUrl: string;
  type: string;
}