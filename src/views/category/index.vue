<template>
  <div class="category">
    分类组件
    <XtxBread>
      <XtxBreadItem to="/">首页</XtxBreadItem>
      <XtxBreadItem>{{ categroy.topCategoryList.name }}</XtxBreadItem>
    </XtxBread>
  </div>
</template>

<script lang="ts" name="TopCategory" setup>
import useStore from '@/store';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const { categroy } = useStore()
const route = useRoute()
// console.log(route.params.id);
watch(() =>  route.params.id , () => {
  // 解决跳回首页 没有 id 报错
  // if(!route.params.id) return
  if(route.fullPath === `/category/${route.params.id}`) {
    categroy.getTopCategory(route.params.id as string)
  }
},{immediate:true})
</script>


<style>
</style>