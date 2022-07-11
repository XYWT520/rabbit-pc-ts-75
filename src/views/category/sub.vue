<script lang="ts" setup name="SubCategory">
import useStore from '@/store';
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const { categroy }  = useStore()
const { subCategory } = storeToRefs(categroy)


watchEffect(() => {
  if (route.fullPath !== `/category/sub/${route.params.id}`) return
  // 清空数据
  categroy.resetCategory()
  categroy.getSubCategory(route.params.id as string)
})
</script>

<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread v-if="subCategory.name">
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${subCategory.parentId}`">
        {{subCategory.parentName}}
        </XtxBreadItem>
        <XtxBreadItem>{{subCategory.name}}</XtxBreadItem>
      </XtxBread>

      <XtxBread v-else>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>
          <XtxSkeleton bg="#27bb9a" opacity="0.2" animated :width="28" :height="18" />
        </XtxBreadItem>
        <XtxBreadItem>
          <XtxSkeleton bg="#27bb9a" opacity="0.2" animated :width="76" :height="18" />
        </XtxBreadItem>
      </XtxBread>

      <!-- 筛选区 -->
      <div class="sub-filter">
        <div class="item">
          <div class="head">品牌：</div>
          <div class="body">
            <a href="javascript:;">全部</a>
            <a href="javascript:;" v-for="brand in subCategory.brands" :key="brand.id">{{brand.name}}</a>
          </div>
        </div>

        <div class="item" v-for="item in subCategory.saleProperties" :key="item.id">
          <div class="head">{{item.name}}</div>
          <div class="body">
            <a href="javascript:;">全部</a>
            <a href="javascript:;" v-for="sub in item.properties" :key="sub.id">{{sub.name}}</a>
          </div>
        </div>
      </div>

        


    </div>
  </div>
</template>

<style scoed lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>