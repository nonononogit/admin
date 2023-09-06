<template>
  <div class="acl-container">
    <el-card class="top-card">
      <Search :type="'用户名'"></Search>
    </el-card>
    <el-card class="bottom-card">
      <div class="btn">
        <el-button type="primary" @click="addOrUpdateUser">添加用户</el-button>
        <el-button type="primary" :disabled="!userArr.length" @click="deleteBatchUser">
          批量删除
        </el-button>
      </div>
      <el-table class="table" :data="userPageList.records" border ref="multipleTableRef"
        @selection-change="handleSelectionChange">
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" label="#" width="50"></el-table-column>
        <el-table-column align="center" prop="id" label="ID" width="80"></el-table-column>
        <el-table-column align="center" prop="username" label="用户名字" width="" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="name" label="用户名称" width="" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="roleName" label="用户角色" width="" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" width="" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新时间" width="" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="" label="操作" width="300">
          <template #default="scoped">
            <el-button :icon="User" type="primary" size="small" @click="assignRoles(scoped.row)">
              分配角色
            </el-button>
            <el-button :icon="Edit" type="warning" size="small" @click="addOrUpdateUser(scoped.row)">
              编辑
            </el-button>
            <el-popconfirm :title="`确定删除${scoped.row?.username}吗?`" @confirm="confirmDelete(scoped.row?.id)">
              <template #reference>
                <el-button :icon="Delete" type="danger" size="small">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15]"
        layout="prev, pager, next, jumper,->,sizes,total" :total="userPageList.total" @size-change="handleSizeChange"
        @current-change="getPageList" />
    </el-card>
    <AddOrUpdateUser ref="addOrUpdateUserRef" :updateUser="updateUser"></AddOrUpdateUser>
    <AssignRoles ref="assignRolesRef" :currentUser="currentUser"></AssignRoles>
  </div>
</template>

<script setup lang="ts">
import { useAclStore } from '@/store/modules/acl'
import { Edit, User, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import Search from '@/components/Search/index.vue'
import AddOrUpdateUser from './AddOrUpdateUser/index.vue'
import AssignRoles from './AssignRoles/index.vue'
import { ReqAddOrUpdateUser } from '@/api/acl/user/type.ts'
import aclApi from '@/api/acl/user/user'
// 从store中取出数据
const aclStore = useAclStore()
const { userPageList } = storeToRefs(aclStore)
// 分页器数据
const currentPage = ref(1)
const pageSize = ref(5)
// 表格DOM
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
// 添加用户或更新用户的子组件
const addOrUpdateUserRef = ref()
// 分配角色的子组件
const assignRolesRef = ref()
// 勾选的多个用户
const userArr = ref<ReqAddOrUpdateUser[]>([])
// 初始化用户信息
let updateUser = ref<ReqAddOrUpdateUser>({
  id: 0,
  username: '',
  name: '',
  password: '',
})
// 传给分配角色子组件的姓名
let currentUser = ref()
// 表格多选事件
const handleSelectionChange = (value: ReqAddOrUpdateUser[]) => {
  userArr.value = value
}
// 获取分页列表数据
const getPageList = (page = 1)=>{
  currentPage.value = page
  aclStore.getUserPageList(currentPage.value, pageSize.value, 'user')
}
// 分页器事件
const handleSizeChange = () => {
  getPageList()
}
// 点击添加用户或编辑按钮
const addOrUpdateUser = (row?: ReqAddOrUpdateUser) => {
  if (row) updateUser.value = row
  addOrUpdateUserRef.value.dialog = true
}
// 点击单行删除按钮
const confirmDelete = async (id: number) => {
  await aclApi.reqDeleteSingleUser(id)
  ElMessage.success('删除成功')
  getPageList(userPageList.value.records.length < 1? currentPage.value - 1: currentPage.value,)
}
// 批量删除
const deleteBatchUser = () => {
  ElMessageBox.confirm('确定删除这些用户吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const idArr = userArr.value.map((item: ReqAddOrUpdateUser) => item.id)
      await aclApi.reqDeleteBatchUser(idArr as Array<Number>)
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getPageList(userPageList.value.records.length < 1? currentPage.value - 1: currentPage.value,)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
// 点击分配角色
const assignRoles = (row: ReqAddOrUpdateUser) => {
  currentUser.value = row
  currentUser.value.currentPage = currentPage.value
  currentUser.value.pageSize = pageSize.value
  aclStore.getUserRoles(row.id as number).then(() => {
    assignRolesRef.value.drawer = true
  })
}
onMounted(() => {
  getPageList()
})
</script>

<style lang="scss" scoped>
.top-card {
  margin-bottom: 15px;

  :deep(.el-card__body) {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }

  span {
    font-size: 14px;
  }

  .ipt {
    width: 12.5rem;
  }

  .btn {
    margin-left: 10px;
  }
}

.bottom-card {
  .table {
    margin: 15px 0;
  }
}
</style>
