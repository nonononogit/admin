<template>
  <el-drawer v-model="drawer" title="分配角色（职位）" direction="rtl">
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input disabled :value="currentUser.username" />
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <el-checkbox-group
            v-model="checkedRoles"
            @change="handleCheckedRoleChange"
          >
            <el-checkbox
              v-for="item in userRoles.allRolesList"
              :key="item.id"
              :label="item"
            >
              {{ item.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="drawer = false">取消</el-button>
      <el-button type="primary" @click="assignRoles">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useAclStore } from '@/store/modules/acl'
import { storeToRefs } from 'pinia'
import { UserRolesData } from '@/api/acl/user/type'
import aclApi from '@/api/acl/user/user'
import { ElMessage } from 'element-plus'
// 抽屉开关
let drawer = ref(false)
const props = defineProps(['currentUser'])
const aclStore = useAclStore()
const { userRoles } = storeToRefs(aclStore)
// 收集给用户分配角色的id集合
let checkedRoles = ref<Array<UserRolesData>>([])
// 多选状态
const checkAll = computed(
  () => checkedRoles.value.length === userRoles.value.allRolesList.length,
)
// 不确定状态（多选框中的-）
const isIndeterminate = computed(
  () =>
    checkedRoles.value.length !== userRoles.value.allRolesList.length &&
    checkedRoles.value.length > 0,
)
// 点击全选
const handleCheckAllChange = (val: boolean) => {
  checkedRoles.value = val ? userRoles.value.allRolesList : []
}
// 单个选择
const handleCheckedRoleChange = (value: Array<UserRolesData>) => {
  checkedRoles.value = value
}
// 点击确定
const assignRoles = async () => {
  const roleIdList = checkedRoles.value.map((item) => item.id)
  const obj = {
    roleIdList,
    userId: props.currentUser.id as number,
  }
  await aclApi.reqUserAssignRoles(obj)
  drawer.value = false
  ElMessage.success('角色分配成功')
  aclStore.getUserPageList(
    props.currentUser.currentPage,
    props.currentUser.pageSize,
  )
}
// 请求获取当前用户角色的方法
const getCurrentUserRoles = (id: number) => {
  aclStore.getUserRoles(id)
}
// 监听用户角色，初始化展示
watch(
  () => userRoles.value.assignRoles,
  () => {
    checkedRoles.value = userRoles.value.assignRoles
  },
  { deep: true },
)
defineExpose({
  drawer,
  getCurrentUserRoles,
  checkedRoles,
})
</script>

<style lang="scss" scoped></style>
