<template>
  <div class="crumb">
    <el-icon @click="layoutSetChange">
      <component :is="layoutSet.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="item in route.matched" v-show="item.meta.title" :key="item.path" :to="{ path: item.path }">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>
          {{ item.meta.title }}
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { useLayoutSet } from '@/store/modules/setting'
import { useRoute } from 'vue-router'
// 从store中引入控制菜单折叠的变量
const layoutSet = useLayoutSet()
// 点击控制菜单折叠
const layoutSetChange = () => {
  layoutSet.fold = !layoutSet.fold
}
const route = useRoute()

</script>

<style lang="scss" scoped>
.crumb {
  display: flex;
  justify-content: center;
  align-items: center;

  :deep(.el-breadcrumb) {
    margin-left: 10px;
    .el-breadcrumb__inner{
      display: flex;
      align-items: center;
      i{
        margin-right: 3px;
      }
    }
  }
}
</style>
