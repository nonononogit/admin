<template>
  <div class="logo">
    <img src="@/assets/images/Color-Superman-logo.png" alt="" />
    <p v-if="!layoutSet.fold">运营管理平台</p>
  </div>
</template>

<script setup lang="ts">
import { useLayoutSet } from '@/store/modules/setting'
// 从store中引入控制菜单折叠的变量
const layoutSet = useLayoutSet()
</script>

<script lang="ts">
export default {
  name: 'Logo',
}
</script>
<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 8px;
  height: 50px;
  img {
    width: 40px;
    height: 40px;
  }

  p {
    white-space: nowrap;
    color: #4955f5;
    font-weight: bolder;
    font-size: 24px;
  }
}
</style>
