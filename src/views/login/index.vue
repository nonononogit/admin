<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login-form" :model="loginForm" ref="loginFormRef" :rules="rules">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item>
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input :prefix-icon="Lock" type="password" show-password v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login-btn" type="primary" @click="login">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/user'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
// 登录参数
const loginForm = ref({
  username: 'admin',
  password: 'atguigu123',
})
const loading = ref(false)
// 登录表单DOM
const loginFormRef = ref<FormInstance>()
// 登录验证规则
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入正确的用户名', trigger: 'blur' },
  ],
  password: [{ required: true, message: '请输入正确的密码', trigger: 'blur' }],
})
const userStore = useUserStore()
// 点击登录
const login = () => {
  loginFormRef.value?.validate(async (valid) => {
    if (valid) {
      loading.value = true
      await userStore.getLogin(loginForm.value).then(() => {
        let redirect = route.query.redirect as string
        router.push({ path: redirect || '/' })
        ElNotification({
          title: `欢迎回来`,
          dangerouslyUseHTMLString: true,
          message: '运营平台',
          duration: 1000,
          type: 'success'
        })
        loading.value = false
      }).catch(() => {
        loading.value = false
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url(@/assets/images/background.jpg) no-repeat;
  background-size: cover;

  .login-form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }

    .login-btn {
      width: 100%;
    }
  }
}
</style>
