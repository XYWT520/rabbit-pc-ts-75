<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, valuesItem ,specsItem } from '@/types';
import bwPowerSet from '@/utils/bwPowerSet'

const props = defineProps<{
  goods: GoodsInfo
}>()

const changeSelected = (sub:valuesItem,item:specsItem) => {
  // 排他思想 
  item.values.forEach(i => i.selected = false)
  sub.selected = !sub.selected
}
 
 // 测试 powrset 算法
//  const result = bwPowerSet(['冷雪瞳','舒月舞'])
//  console.log(result);
console.log(props.goods.skus)
function getParhMap () {
  // 筛选无效的(没有库存的)
  const skus = props.goods.skus.filter(item => item.inventory > 0 )
  // console.log(skus);
  // 创建路劲字典
  const pathMap:any = {}
  skus.forEach(item => {
    const arr = item.specs.map(v => v.valueName)
    // console.log(arr);
    const result = bwPowerSet(arr)
    // console.log(result);
    result.forEach(arrItem => {
      const key = arrItem.join('★')
      if(key in pathMap) {
        pathMap[key].push(item.id)
      } else {
        pathMap[key] = [item.id]
      }
    })
  })
  return pathMap
}

const pathMap = getParhMap()
console.log(pathMap);

</script>
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="sub in item.values" :key="sub.name">
          <img 
          v-if="sub.picture" 
          :class="{ selected:sub.selected}" 
          :src="sub.picture" 
          :title="sub.name" 
          @click="changeSelected(sub,item)"
          />
          <span v-else :class="{ selected:sub.selected}" @click="changeSelected(sub,item)">{{sub.name}}</span>
        </template>
      </dd>
    </dl>
  </div>

</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: @xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
