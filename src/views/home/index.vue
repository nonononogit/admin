<template>
  <div class="home-container">
    <el-card>
      <div class="top-welcome">
        <el-avatar :size="100" shape="circle" :src="userInfo.avatar" fit="fill"></el-avatar>
        <div class="welcome-content">
          <h1>{{ getTime() + '，' + userInfo.name }}</h1>
          <p>运营平台</p>
        </div>
      </div>
    </el-card>
    <div class="bottom-img">
      <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
import { storeToRefs } from 'pinia';
import { getTime } from '@/utils/getTime'
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

</script>

<style lang="scss" scoped>
.top-welcome {
  display: flex;

  .welcome-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 20px;

    h1 {
      font-weight: bold;
      font-size: 30px;
    }

    p {
      font-style: italic;
      color: skyblue;
    }
  }
}

.bottom-img {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}
</style>
