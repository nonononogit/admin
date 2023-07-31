<template>
  <template v-for="menu in menuList">
    <!-- 没有子路由 -->
    <el-menu-item
      @click="goRoute"
      v-if="!menu.children && !menu.meta?.hidden"
      :index="menu.path"
    >
      <el-icon>
        <component :is="menu.meta?.icon"></component>
      </el-icon>
      <template #title>
        {{ menu.meta?.title }}
      </template>
    </el-menu-item>
    <!-- 有且只有1个子路由 -->
    <el-menu-item
      @click="goRoute"
      v-if="
        menu.children &&
        menu.children.length === 1 &&
        !menu.children[0].meta?.hidden
      "
      :index="menu.children[0].path"
    >
      <el-icon>
        <component :is="menu.children[0].meta?.icon"></component>
      </el-icon>
      <template #title>
        {{ menu.children[0].meta?.title }}
      </template>
    </el-menu-item>
    <!-- 有多个子路由 -->
    <el-sub-menu
      v-if="menu.children && menu.children.length > 1"
      :index="menu.path"
    >
      <template #title>
        <el-icon>
          <component :is="menu.meta?.icon"></component>
        </el-icon>
        <span>{{ menu.meta?.title }}</span>
      </template>
      <Menu :menuList="menu.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import Menu from '@/layout/menu/index.vue'
import router from '@/router'
import type { RouteRecordRaw } from 'vue-router'
// 接收父组件传来的路由数组
defineProps<{
  menuList: RouteRecordRaw[]
}>()
// 点击跳转至对应的路由
const goRoute = (menuItem: any) => {
  router.push(menuItem.index)
}
</script>
<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<style lang="scss" scoped>
.el-menu-item:hover{
  background-color: #dcdcf5;
}
</style>
