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


export interface NewItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  orderNum: number;
}

export interface hotItem {
  id: string;
  picture: string;
  title: string;
  alt: string;
}


export interface brandItem {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  picture: string;
  type?: any;
  desc: string;
  place: string;
}


export interface goodsItem {
  id: string;
  name: string;
  picture: string;
  saleInfo: string;
  children: Child[];
  goods: Good[];
}

export interface goods {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: any;
  orderNum: number;
}

export interface Child {
  id: string;
  name: string;
  layer: number;
  parent?: any;
}

export interface specialItem {
  creator: string;
  isDelete: number;
  createTime: string;
  updateTime: string;
  id: string;
  classificationId: string;
  title: string;
  summary: string;
  lowestPrice: number;
  cover: string;
  detailsUrl: string;
  collectNum: number;
  viewNum: number;
  replyNum: number;
}

// 顶级分类类型
export type TopCategory = {
  id: string
  name: string
  picture: string
  children: CategoryItem[]
}
