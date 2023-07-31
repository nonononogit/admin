<template>
  <div class="right-set">
    <el-button icon="Refresh" circle></el-button>
    <el-button icon="FullScreen" circle @click="FullScreen"></el-button>
    <el-button icon="Setting" circle></el-button>
    <el-avatar :size="30" :src="userInfo.avatar" />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userInfo.name }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)
const router = useRouter()
const route = useRoute()
const FullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
// 退出登录
const logout = async () => {
  await userStore.getLogout()
  router.push({ path: '/login', query: { redirect: route.path } })
}
</script>

<style lang="scss" scoped>
.right-set {
  display: flex;
  justify-content: center;
  align-items: center;
  .el-avatar{
    margin: 0 10px;
  }
}
</style>
