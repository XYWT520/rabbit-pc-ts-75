<script lang="ts" setup name="XtxCity">
import { ref, watchEffect } from 'vue';
import axios from 'axios';
import { onClickOutside } from '@vueuse/core';

// 选择的城市结果类型
export type CityResult = {
  provinceCode: string
  provinceName: string
  cityCode: string
  cityName: string
  countyCode: string
  countyName: string
}
type cityItem = {
  code: string,
  level: number,
  name: string,
  areaList: cityItem[]
}

defineProps<{
  address:string
}>()

const emit = defineEmits<{
  (e:'changeCity',city:CityResult): void
}>()
const cityList = ref<cityItem[]>([])
const cacheList = ref<cityItem[]>([])
const active = ref(false)
const target = ref(null)

// 定义一个新的响应式数据
const changeResult = ref({
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: '',
  countyCode: '',
  countyName: ''
})

// 请求
async function getCityList() {
  const res = await axios.get<cityItem[]>('https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json')
  // console.log(res);
  cityList.value = res.data
  // 点完后重置
  cacheList.value = res.data
}
getCityList()

// vueuse 的新方法 可以判断是否点击你选择的元素的外面
onClickOutside(target, () => {
  // console.log('点外面了');
  active.value = false
})

// 点击事件
const seletCity = (item:cityItem) => {
  // 根据后台的数据 leave 判断选择的是省市县
  if(item.level === 0 ) {
    changeResult.value.provinceName = item.name
    changeResult.value.provinceCode = item.code
  }
  if(item.level === 1 ) {
    changeResult.value.cityName = item.name
    changeResult.value.cityCode = item.code
  }
  if(item.level === 2 ) {
    changeResult.value.countyName = item.name
    changeResult.value.countyCode = item.code
    // 通知父组件, 数据携带过去
    emit('changeCity',changeResult.value)
  }
  if(!item.areaList) return active.value = false
  cityList.value = item.areaList
}

// 侦听器
watchEffect(() => {
  if(!active.value) cityList.value = cacheList.value
})

</script>
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="active = !active" :class="{ active }">
      <span v-if="address" class="placeholder">{{address}}</span>
      <span v-else class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <span @click="seletCity(item)" class="ellipsis" v-for="item in cityList" :key="item.name">{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;

  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;
    }

    .value {
      color: #666;
      font-size: 12px;
    }

    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }

  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    >span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;

      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>