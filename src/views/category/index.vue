<template>
  <div class="top-category">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>{{ categroy.topCategoryList.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :slides="home.bannerList" :duration="1500" :autoplay="true" style="height: 500px"/>

      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategoryList.children" :key="item.id">
            <a href="javascript:;">
              <img v-lazy="item.picture" >
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>

      <!-- 分类关联商品 -->
      <div v-if="topCategoryList.children" class="ref-goods" v-for="sub in topCategoryList.children" :key="sub.id">
        <div class="head">
          <h3>-{{sub.name}} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem :good="goods" v-for='goods in sub.goods' :key="goods.id"/>
        </div>
      </div>


      <div v-else class="ref-goods" v-for="i in 5" :key="i">
        <div class="head">
          <h3><XtxSkeleton :height="30" :width="300" animated /></h3>
          <p class="tag"></p>
          <XtxSkeleton style="position: absolute; right: 20px; top: 40px;" :height="21" :width="70" animated />
        </div>
        <div class="body" style="display: flex; justify-content: space-between;">
          <XtxSkeleton :height="300" :width="200" animated v-for="item in 5" :key="item" />
        </div>
      </div>


    </div>
  </div>
</template>

<script lang="ts" name="TopCategory" setup>
import useStore from '@/store';
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import GoodsItem from './components/goods-item.vue'

const { categroy,home } = useStore()
const route = useRoute()
const { topCategoryList } = storeToRefs(categroy)
home.getBannerList()

// console.log(route.params.id);
// watch(() =>  route.params.id , () => {
//   // 解决跳回首页 没有 id 报错
//   // if(!route.params.id) return
//   if(route.fullPath === `/category/${route.params.id}`) {
//     categroy.getTopCategory(route.params.id as string)
//   }
// },{immediate:true})

// 相当于 watch 的加强版, 写在函数内的数据被自动监听 
watchEffect(() => {
  // if(!route.params.id) return
  if(route.fullPath !== '/category/' + route.params.id) return
  categroy.getTopCategory(route.params.id as string)
})

</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}

.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>