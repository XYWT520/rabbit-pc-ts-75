<template>
  <RouterLink :to="`/goods/${good?.id}`" class="goods-item">
    <!-- src="https://yanxuan-item.nosdn.127.net/46898c7fa475dbfc89dac2f7e7c2c16f.jpg" -->
    <img
      v-lazy="good?.picture"
      alt=""
    />
    <p class="name ellipsis">{{good?.name}}</p>
    <p class="desc ellipsis">{{good?.desc}}</p>
    <p class="price">&yen;{{good?.price}}</p>
  </RouterLink>

</template>

<script lang="ts" setup name="GoodsItem">
import { Goods } from '@/types';

defineProps<{
  good?:Goods
}>()

// defineProps({
//   goods:{
//     type:Array,
//     required:true
//     }
// })
</script>

<style scoped lang="less">
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  .hoverShadow();
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: @priceColor;
    font-size: 20px;
  }
}
</style>