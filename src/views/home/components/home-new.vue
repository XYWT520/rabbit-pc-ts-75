<script lang="ts" setup>
import HomePanel from './home-pannel.vue'
import useStore from '@/store';
import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';
const { home } = useStore()
// home.getNewLists()
const target = ref(null)
// 实现数据懒加载
// useIntersectionObserver 可以返回一个函数, 里面有一个 stop 方法
const { stop } = useIntersectionObserver(target,([{isIntersecting}]) => {
  if(!isIntersecting) return
    home.getNewLists()
    stop()
})

</script>
<template>
  <div class="home-new">
    <HomePanel ref="target" title="新鲜好物" subtitle="新鲜出炉 品质靠谱">
      <template #right><XtxMore path="/" /></template>
      <!-- 面板内容 -->
      <ul class="goods-list">
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