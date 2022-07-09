<script lang="ts" setup>
import useStore from '@/store'
import { useLazyDate } from '@/utils/hooks';
import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';
import HomePanel from './home-pannel.vue'
import HomeSkeleton from './home-skeleton.vue';
const { home } = useStore()
// home.getHotLists()
// const target = ref(null)
// const { stop } = useIntersectionObserver(target,([{isIntersecting}]) => {
//   if(!isIntersecting) return
//   home.getHotLists()
//   stop()
// })

// const target = useLazyDate(() => home.getHotLists())

const target = useLazyDate(home.getHotLists)

</script>
<template>
  <HomePanel ref="target" title="人气推荐" subtitle="人气爆款 不容错过">
    <ul ref="pannel" class="goods-list" v-if="home.HotList.length" >
      <li v-for="item in home.HotList" :key="item.id">
        <RouterLink to="/">
          <img v-lazy="item.picture" alt="" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
    <HomeSkeleton :count="4" v-else/>
  </HomePanel>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>