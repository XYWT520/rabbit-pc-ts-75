<!-- <template>
  <div>

  </div>
</template>

<script setup lang="ts">
import { h, ref, render,onMounted } from 'vue';

const dv = ref<HTMLDivElement | null>(null)
const vnode = h('h1',{title:'姓名'},'冷雪瞳')

onMounted(() => {
  render(vnode,dv.value as HTMLDivElement)
})

</script>

<style scoped>

</style> -->