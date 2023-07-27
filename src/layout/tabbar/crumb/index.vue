<template>
  <div class="crumb">
    <el-icon @click="layoutSetChange">
      <component :is="layoutSet.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>promotion management</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { useLayoutSet } from '@/store/modules/setting'
const layoutSet = useLayoutSet()
const layoutSetChange = () => {
  layoutSet.fold = !layoutSet.fold
}
</script>

<style lang="scss" scoped>
.crumb {
  display: flex;
  justify-content: center;
  align-items: center;
  .el-breadcrumb {
    margin-left: 10px;
  }
}
</style>
