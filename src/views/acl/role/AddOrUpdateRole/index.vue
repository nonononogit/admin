<template>
  <el-dialog v-model="dialogRoleFormVisible" :title="roleForm.id ? '修改职位' : '添加职位'">
    <el-form :model="roleForm" ref="ruleFormRef" :rules="rules">
      <el-form-item label="职位名称" prop="roleName">
        <el-input v-model="roleForm.roleName" placeholder="请输入职位名称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogRoleFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddOrUpdateRole">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useAclStore } from '@/store/modules/acl'
import aclApi from '@/api/acl/role/role'
import { ReqAddOrUpdateRoleData } from '@/api/acl/role/type';
// 获取角色管理的仓库
const aclStore = useAclStore()
// 接收父组件传过来的数据
const props = defineProps(['currentRole','pager'])
// 获取表单DOM
const ruleFormRef = ref<FormInstance>()
// 表单验证规则
const rules = reactive<FormRules>({
  roleName: [
    { required: true, message: '请输入正确的职位名称', trigger: 'blur' },
    { min: 2, max: 16, message: '职位名称长度应保持在2-16个字符之间', trigger: 'blur' },
  ],
})
// 控制dialog显隐的参考值
const dialogRoleFormVisible = ref(false)
// 表单初始化数据
const roleForm = ref<ReqAddOrUpdateRoleData>({
  roleName: ''
})
// 点击确定
const confirmAddOrUpdateRole = async () => {
  // 判断是不是更新职位，如果是更新职位，且与原职位相同，则不更新
  if (!!props.currentRole.roleName && props.currentRole.roleName === roleForm.value.roleName) return
  await ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      await aclApi.reqAddOrUpdateRole(roleForm.value)
      ElMessage.success(roleForm.value.id ? '修改职位成功' : '添加职位成功')
      dialogRoleFormVisible.value = false
      aclStore.getUserPageList(props.pager.currentPage || 1, props.pager.pageSize || 10, 'role')
    }
  })
}
// 监听父组件传过来的数据
watch([() => props.currentRole, dialogRoleFormVisible], (newVal) => {
  // 根据父组件传来的数据id判断，是如果id存在，则是更新职位
  if (newVal[0].id) {
    Object.assign(roleForm.value, props.currentRole)
  } else {
    // 如果不是更新职位，则初始化表单数据
    roleForm.value = { roleName: '' }
  }
  // 清除表单验证效果
  ruleFormRef.value?.clearValidate()
}, { deep: true })
// 将控制显隐的数据暴露给父组件
defineExpose({
  dialogRoleFormVisible
})
</script>

<style lang="scss" scoped></style>