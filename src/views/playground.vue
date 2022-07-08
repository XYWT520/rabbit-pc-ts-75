<template>
  <div>
    哈哈哈哈哈哈
  </div>
    <img  ref="target" alt="">
</template>

<script setup lang="ts">
import { useIntersectionObserver  } from '@vueuse/core'; 
import { ref } from 'vue'
const img = document.createElement('img')
const target = ref<HTMLImageElement | null>(null)

useIntersectionObserver(target,([{isIntersecting}]) => {
// console.log(isinterserting);
  if(isIntersecting) {
    target.value!.src = 'https://th.wallhaven.cc/lg/y8/y8622k.jpg'
  }
})

</script>

<style scoped>
div{
  height: 3000px;
}
</style>