<template>
  <el-drawer
    ref="drawerRef"
    v-model="dialog"
    :title="addOrUpdateUserForm.id ? '修改用户' : '添加用户'"
    direction="rtl"
    class="demo-drawer"
  >
    <div class="demo-drawer__content">
      <el-form :model="addOrUpdateUserForm" :rules="rules" ref="ruleFormRef">
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="addOrUpdateUserForm.name" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="username">
          <el-input v-model="addOrUpdateUserForm.username" />
        </el-form-item>
        <el-form-item
          label="用户密码"
          prop="password"
          v-if="!addOrUpdateUserForm.id"
        >
          <el-input v-model="addOrUpdateUserForm.password" />
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="dialog = false">取消</el-button>
        <el-button type="primary" @click="addOrUpdateConfirm">确定</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ReqAddOrUpdateUser } from '@/api/acl/user/type'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import aclApi from '@/api/acl/user/user'
// 接收父组件传来的更新哪一行的数据
const props = defineProps<{
  updateUser: ReqAddOrUpdateUser
}>()
// 控制抽屉的开关
let dialog = ref(false)
// 添加用户初始化参数
let addOrUpdateUserForm = reactive<ReqAddOrUpdateUser>({
  id: 0,
  username: '',
  name: '',
  password: '',
})
// 表单DOM
const ruleFormRef = ref<FormInstance>()
// 表单验证项
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入完整的姓名', trigger: 'blur' },
    { min: 5, message: '长度至少5个字符', trigger: 'blur' },
  ],
  username: [
    { required: true, message: '请输入完整的昵称', trigger: 'blur' },
    { min: 5, message: '长度至少5个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入完整的密码', trigger: 'blur' },
    { min: 6, max: 16, message: '长度保持在6-16个字符', trigger: 'blur' },
  ],
})
// 点击确定
const addOrUpdateConfirm = async () => {
  await ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      await aclApi.reqAddOrUpdateUser(addOrUpdateUserForm)
      ElMessage.success(
        addOrUpdateUserForm.id ? '修改用户成功' : '添加用户成功',
      )
      dialog.value = false
      // 刷新页面
      document.location.reload()
    }
  })
}
watch(
  [() => props.updateUser, dialog],
  (newVal) => {
    // 根据id判断，更新数据还是新增数据
    if (newVal[0].id) {
      Object.assign(addOrUpdateUserForm, props.updateUser)
    } else {
      Object.assign(addOrUpdateUserForm, {
        id: 0,
        username: '',
        name: '',
        password: '',
      })
    }
    // 清除校验结果
    ruleFormRef.value?.clearValidate()
  },
  { deep: true },
)
// 将本组件的dialog暴露出去，给父组件通过ref操作抽屉的开关
defineExpose({
  dialog,
})
</script>

<style lang="scss" scoped></style>
