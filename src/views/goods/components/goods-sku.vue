<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, valuesItem ,specsItem } from '@/types';
import bwPowerSet from '@/utils/bwPowerSet'

const props = defineProps<{
  goods: GoodsInfo
}>()

const changeSelected = (sub:valuesItem,item:specsItem) => {
  // 如果禁用了就不要选中
  if(sub.disabled) return
  // 排他思想 
  item.values.filter(item => item.name !== sub.name).forEach(i => i.selected = false)
  sub.selected = !sub.selected
}
 
 // 测试 powrset 算法
//  const result = bwPowerSet(['冷雪瞳','舒月舞'])
//  console.log(result);
// console.log(props.goods.skus)
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

// // 修改禁用状态 页面加载时就对所有元素进行修改
function updateDisabledStatus() {
  // 该方法的作用: 循环所有 specs 去路劲字典里找,是否存在
  // 如果存在就不禁用, 不存在就禁用
  props.goods.specs.forEach(item => {
    item.values.forEach(sub => {
      // 去对象里查找这个属性, 该怎么做? 可以使用 key in obj 返回一个布尔值      
      // if(sub.name in pathMap) {
      //   sub.disabled = false
      // } else {
      //   sub.disabled = true
      // }
      sub.disabled = !(sub.name in pathMap)
    })
  })
}

// function updateDisabledStatus() {
//   props.goods.specs.forEach(item => {
//     item.values.forEach(sub => {
//       // if(sub.name in pathMap) {
//       //   sub.disabled = false
//       // } else {
//       //   sub.disabled = true
//       // }
//       sub.disabled = !(sub.name in pathMap)
//     })
//   })
// }

const pathMap = getParhMap()
updateDisabledStatus()
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
          :class="{ selected:sub.selected,disabled:sub.disabled}" 
          :src="sub.picture" 
          :title="sub.name" 
          @click="changeSelected(sub,item)"
          />
          <span v-else :class="{ selected:sub.selected, disabled:sub.disabled }" @click="changeSelected(sub,item)">{{sub.name}}</span>
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
