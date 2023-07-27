<template>
  <div class="tabbar">
    <Crumb></Crumb>
    <Set></Set>
  </div>
</template>

<script setup lang="ts">
import Crumb from './crumb/index.vue'
import Set from './set/index.vue'
</script>

<style lang="scss" scoped>
.tabbar {
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 0 16px;
}
</style>
