<template>
  <div class="content">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>
<script lang="ts">
export default {
  name: 'Content',
}
</script>
<style lang="scss" scoped>
.content {
  padding: 16px;
  height: calc(100vh - 50px);
  background-color: azure;
}
// 路由切换动画
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
