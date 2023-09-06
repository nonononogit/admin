<template>
  <div class="role-container">
    <el-card class="top-card">
      <Search :type="'职位'"></Search>
    </el-card>
    <el-card>
      <el-button style="{margin-bottom: 10px;}" type="primary" @click="addOrUpdateRole" :icon="Plus">添加职位</el-button>
      <el-table class="table" :data="userPageList.records" border :show-overflow-tooltip="true">
        <el-table-column label="#" type="index" width="50" align="center" />
        <el-table-column prop="id" label="ID" align="center" />
        <el-table-column prop="roleName" label="职位名称" align="center" />
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column prop="updateTime" label="更新时间" align="center" />
        <el-table-column prop="address" label="操作" width="300" align="center">
          <template #default="scoped">
            <el-button :icon="User" type="primary" size="small" @click="assignPermission(scoped.row.id)">
              分配角色
            </el-button>
            <el-button :icon="Edit" type="warning" size="small" @click="addOrUpdateRole(scoped.row)">
              编辑
            </el-button>
            <el-popconfirm :title="`确定删除${scoped.row?.roleName}吗?`" @confirm="deleteRole(scoped.row?.id)">
              <template #reference>
                <el-button :icon="Delete" type="danger" size="small">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50]"
        layout="prev, pager, next, jumper,->,sizes,total" :total="userPageList.total" @size-change="handleSizeChange"
        @current-change="getRolePageList" />
    </el-card>
    <AddOrUpdateRole ref="addOrUpdateRoleRef" :currentRole="currentRole" :pager="pager"></AddOrUpdateRole>
    <AssignPermission ref="assignPermissionRef" :roleId="roleId"></AssignPermission>
  </div>
</template>

<script setup lang="ts">
import Search from '@/components/Search/index.vue'
import { Plus, User, Edit, Delete } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue';
import { useAclStore } from '@/store/modules/acl'
import { storeToRefs } from 'pinia';
import AddOrUpdateRole from './AddOrUpdateRole/index.vue'
import AssignPermission from './AssignPermission/index.vue'
import { ReqAddOrUpdateRoleData } from '@/api/acl/role/type';
import aclApi from '@/api/acl/role/role'
import { ElMessage } from 'element-plus';
// 获取角色管理的仓库
const aclStore = useAclStore()
// 从仓库中获取角色列表分页数据
const { userPageList } = storeToRefs(aclStore)
// 定义初始化当前页和当前列表数
const currentPage = ref(1)
const pageSize = ref(10)
// 获取添加或更新职位的组件
const addOrUpdateRoleRef = ref()
// 获取分配权限的组件
const assignPermissionRef = ref()
// 定义更新职位的初始化数据
const currentRole = ref()
// 定义传给子组件当前分页器的数据
const pager = ref({
  currentPage: 1,
  pageSize: 10
})
// 定义传给分配角色子组件当前职位的id数据
const roleId = ref(0)
// 请求分页数据
const getRolePageList = (page = 1) => {
  currentPage.value = page
  aclStore.getUserPageList(currentPage.value, pageSize.value, 'role')
}
// 点击分页器的方法
const handleSizeChange = () => {
  getRolePageList()
}
// 进页面先请求分页列表数据
onMounted(() => {
  getRolePageList()
})
// 点击添加职位或更新职位
const addOrUpdateRole = (row?: ReqAddOrUpdateRoleData) => {
  // 直接操作子组件的参考值，打开dialog
  addOrUpdateRoleRef.value.dialogRoleFormVisible = true
  // 将当前角色数据传给子组件
  currentRole.value = row
  // 将当前分页数据传给子组件，便于添加或更新成功后，请求最新的列表数据
  pager.value.currentPage = currentPage.value
  pager.value.pageSize = pageSize.value
}
// 点击分配权限
const assignPermission = (id: number) => {
  roleId.value = id
  aclStore.getRolePremission(id).then(() => {
    assignPermissionRef.value.dialog = true
  })
}
// 点击删除
const deleteRole = async (id: number) => {
  await aclApi.reqDeleteRole(id)
  ElMessage.success('删除成功！')
  getRolePageList(userPageList.value.records.length > 1 ? currentPage.value  : currentPage.value - 1)
}
</script>

<style lang="scss" scoped>
.role-container {
  .top-card {
    margin-bottom: 15px;
  }

  .table {
    margin: 15px 0;
  }
}
</style>
