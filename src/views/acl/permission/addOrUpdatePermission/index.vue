<template>
  <el-dialog v-model="dialogFormVisible" title="添加菜单">
    <el-form :model="form">
      <el-form-item label="菜单名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="菜单权限">
        <el-input v-model="form.code" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddOrUpdatePermission">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import permissionApi from '@/api/acl/permission/permission'
import { ElMessage } from 'element-plus'
import { usePermissionStore } from '@/store/modules/permission'
// 获取菜单仓库
const permissionStore = usePermissionStore()
// 控制dialog的参考值
const dialogFormVisible = ref(false)
// 接收父组件传过来的数据
const props = defineProps(['currentPermission'])
// 定义dialog中表单初始化数据
const form = reactive({
  name: '',
  code: '',
})
// 点击确认
const confirmAddOrUpdatePermission = async () => {
  // 先将表单的数据与父组件传过来的数据合并，然后发请求
  let data = Object.assign(props.currentPermission, form)
  await permissionApi.reqAddOrUpdatePermission(data)
  ElMessage.success(data.id ? '修改菜单成功' : '添加菜单成功')
  permissionStore.getPremission()
  dialogFormVisible.value = false
}
watch(
  () => props.currentPermission,
  () => {
    // 监听父组件传过来的数据，判断是添加还是更新菜单
    if (props.currentPermission.id) {
      form.name = props.currentPermission.name
      form.code = props.currentPermission.code
    } else {
      // 如果是添加菜单，则初始化表单数据
      form.name = ''
      form.code = ''
    }
  },
  { deep: true },
)
defineExpose({
  dialogFormVisible,
})
</script>

<style lang="scss" scoped></style>
