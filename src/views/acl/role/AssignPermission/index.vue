<template>
  <el-drawer v-model="dialog" title="分配菜单与按钮的权限" direction="rtl" class="demo-drawer">
    <template #default>
      <el-tree ref="tree" :data="rolePermissionList" show-checkbox node-key="id" :default-checked-keys="defaultPermission"
        :props="defaultProps" :default-expand-all="true" />
    </template>
    <template #footer>
      <el-button @click="dialog = false">取消</el-button>
      <el-button type="primary" @click="confirmAssignPermission">确认</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { useAclStore } from '@/store/modules/acl';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import aclApi from '@/api/acl/role/role'
import { ElMessage } from 'element-plus';
// 从父组件中获取当前职位的id
const props = defineProps(['roleId'])
// 获取角色管理的仓库
const aclStore = useAclStore()
// 从仓库中获取角色列表分页数据
const { rolePermissionList, defaultPermission } = storeToRefs(aclStore)
const dialog = ref(false)
// 树形控件组件实例
const tree = ref()
const defaultProps = {
  children: 'children',// 指定子树节点为对象里的children属性
  label: 'name',// 指定树形控件节点标签为对象里的name属性
}
const confirmAssignPermission = async () => {
  // 获取当前选择的节点id数组
  const arr = tree.value.getHalfCheckedKeys().concat(tree.value.getCheckedKeys())
  await aclApi.reqAssignRolePermission(props.roleId, arr)
  ElMessage.success('分配角色成功')
  window.location.reload()
}
defineExpose({
  dialog
})
</script>

<style lang="scss" scoped></style>