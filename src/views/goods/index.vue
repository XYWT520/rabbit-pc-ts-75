<script lang="ts" setup>
import useStore from '@/store';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue';
import GoodsName from './components/goods-name.vue';
import GoodsSku from './components/goods-sku.vue';
const route = useRoute()
const { goods } = useStore()


watchEffect(() => {
  if(route.fullPath !== '/goods/' + route.params.id) return  
  goods.resetGoodsInfo()
  goods.getGoodsList(route.params.id as string)
})

const hChangeSku = (skuId:string) => {
  // console.log(skuId);
  // 父组件获取到了子组件传递过来的id, 通过 id 查找出整个对象
  const sku = goods.info.skus.find(item => item.id === skuId)
  // console.log(sku);
  if(!sku) return
  goods.info.price = sku.price
  goods.info.oldPrice = sku.oldPrice
}
</script>

<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread v-if="goods.info.categories">
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.info.categories[1].id}`">{{goods.info.categories[1].name}}</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.info.categories[0].id}`">{{goods.info.categories[0].name}}</XtxBreadItem>
        <XtxBreadItem >{{goods.info.name}}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :image="goods.info.mainPictures"></GoodsImage>
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="goods.info"/>
          <GoodsSku @change-sku="hChangeSku" skuId="1369155864430120962" :goods="goods.info" />
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>