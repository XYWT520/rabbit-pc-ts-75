<script lang="ts" setup name="Layout">
// 导入组件
import AppTopnav from './components/app-topnav.vue';
import AppHeader from './components/app-header.vue';
import AppHeaderSticky from './components/app-header-sticky.vue';
import useStore from '@/store';
const { categroy } = useStore()
categroy.getAllCategroy()
</script>
<template>
  <AppTopnav />
  <AppHeader />
  <AppHeaderSticky />
  <router-view></router-view>
</template>

<style lang="less" scoped></style> 