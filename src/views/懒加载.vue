<template>
  <div>
    哈哈哈哈哈哈<br>
    <button @click="falg = !falg">切换显示</button> <br>
    <transition>
      <img v-if="falg" ref="target" alt="" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver  } from '@vueuse/core'; 
import { ref } from 'vue'
const img = document.createElement('img')
const target = ref<HTMLImageElement | null>(null)
const falg = ref(true)
useIntersectionObserver(target,([{isIntersecting}]) => {
// console.log(isinterserting);
  if(isIntersecting) {
    target.value!.src = 'https://th.wallhaven.cc/lg/y8/y8622k.jpg'
  }
})

</script>

<style scoped>
.v-leave-form{
  opacity: 1;
}
.v-leave-active{
  transition: all 1s;
}
.v-leave-to{
  opacity: 0;
}

.v-enter-to{
  opacity: 1;
}
.v-enter-active{
  transition: all 1s;
}
.v-enter-from{
  opacity: 0;
}
</style>