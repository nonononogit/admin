<template>
  <div class="right-set">
    <el-button icon="Refresh" circle></el-button>
    <el-button icon="FullScreen" circle></el-button>
    <el-button icon="Setting" circle></el-button>
    <el-image
      :src="avatar"
      style="width: 30px; height: 30px; margin: 0 8px"
      fit="fill"
      :lazy="true"
    ></el-image>
    <el-dropdown>
      <span class="el-dropdown-link">
        admin
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import avatarImg from '@/assets/images/Color-Superman-logo.png'
import { ref } from 'vue'
const avatar = ref(avatarImg)
</script>

<style lang="scss" scoped>
.right-set {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
