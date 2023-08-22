<template>
  <div class="layout-container">
    <div class="left-menu" :class="{ fold: layoutSet.fold }">
      <Logo></Logo>
      <el-scrollbar>
        <el-menu
          :collapse="layoutSet.fold"
          background-color="linear-gradient(180deg, #efeaef, #dcdcf5 99%)"
        >
          <Menu :menuList="userStore.menu"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="right-main" :class="{ fold: layoutSet.fold }">
      <Tabbar></Tabbar>
      <Content></Content>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Content from './content/index.vue'
import Tabbar from './tabbar/index.vue'
import { useUserStore } from '@/store/modules/user'
import { useLayoutSet } from '@/store/modules/setting'
// 从store中获取控制菜单折叠的变量
const layoutSet = useLayoutSet()
const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100vh;
  display: flex;

  .left-menu {
    width: 256px;
    background: radial-gradient(
        circle at 100% 0,
        #efe8eb 0,
        rgba(239, 232, 235, 0) 33%
      ),
      radial-gradient(circle at 100% 25%, #e8ebea 0, hsla(160, 7%, 92%, 0) 39%),
      radial-gradient(
        circle at 100% 36%,
        hsla(160, 7%, 92%, 0.6) 0,
        hsla(160, 7%, 92%, 0) 38%
      ),
      linear-gradient(180deg, #efeaef, #dcdcf5 99%);
    transition: all 0.3s;

    .el-scrollbar {
      height: calc(100vh - 50px);
    }

    :deep(.el-menu) {
      border: none;

      .el-menu-item,
      .el-sub-menu__title {
        --el-menu-hover-bg-color: #dcdcf5;
      }
    }

    &.fold {
      width: 64px;
    }
  }

  .right-main {
    width: calc(100% - 256px);
    transition: all 0.3s;

    &.fold {
      width: calc(100% - 64px);
    }
  }
}
</style>
