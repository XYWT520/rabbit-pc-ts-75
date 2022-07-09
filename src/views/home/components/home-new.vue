<script lang="ts" setup>
import HomePanel from './home-pannel.vue'
import useStore from '@/store';
import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';
import {useLazyDate} from '@/utils/hooks';
import HomeSkeleton from './home-skeleton.vue';
const { home } = useStore()
// home.getNewLists()
// 实现数据懒加载
// useIntersectionObserver 可以返回一个函数, 里面有一个 stop 方法
// const { stop } = useIntersectionObserver(target,([{isIntersecting}]) => {
//   if(!isIntersecting) return
//     home.getNewLists()
//     stop()
// })
// 原始封装
// useLazyDate(target,() => home.getNewLists())

//  进阶封装 使用引用数据类型实现封装
// const target = useLazyDate(() => home.getNewLists())

// 再次进阶 , 直接传入函数体
 const target = useLazyDate(home.getNewLists)

</script>
<template>
  <div class="home-new">
    <HomePanel ref="target" title="新鲜好物" subtitle="新鲜出炉 品质靠谱">
      <template #right><XtxMore path="/" /></template>
      <!-- 面板内容 -->
      <ul class="goods-list" v-if="home.getNewList.length">
        <li v-for="item in home.getNewList" :key="item.id">
          <RouterLink to="/">
            <img
              v-lazy="item.picture"
              alt=""
            />
            <p class="name ellipsis">{{item.name}}</p>
            <p class="price">&yen;{{item.price}}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton v-else :count='4'/>
    </HomePanel>
  </div>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}


</style>