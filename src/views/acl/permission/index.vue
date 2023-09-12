<template>
  <div class="permission-container">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-table :data="permissionList" row-key="id" border>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="权限值" />
        <el-table-column prop="updateTime" label="修改时间" />
        <el-table-column label="操作 ">
          <template #="{ row }">
            <el-button v-if="row.level < 4" type="primary" size="small" @click="addOrUpdatePermission(row, 'add')">{{
              row.level > 2 ? '添加功能' : '添加菜单' }}</el-button>
            <el-button v-if="row.level > 1" type="warning" size="small"
              @click="addOrUpdatePermission(row, 'update')">编辑</el-button>
            <el-popconfirm v-if="row.level > 1" :title="`你确定要删除${row.name}吗？`" @confirm="deletePermission(row.id)">
              <template #reference>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <AddOrUpdatePermission ref="addOrUpdatePermissionRef" :currentPermission="currentPermission"></AddOrUpdatePermission>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { usePermissionStore } from '@/store/modules/permission';
import { storeToRefs } from 'pinia';
import { ResRolePermissionData } from '@/api/acl/role/type';
import AddOrUpdatePermission from './addOrUpdatePermission/index.vue'
import permissionApi from '@/api/acl/permission/permission'
import { ElMessage } from 'element-plus';
// 获取菜单仓库
const permissionStore = usePermissionStore()
// 从仓库中取出菜单列表数据
const { permissionList } = storeToRefs(permissionStore)
// 添加或更新菜单组件实例
const addOrUpdatePermissionRef = ref()
// 点击当前的菜单初始化数据
let currentPermission: ResRolePermissionData = reactive({
  children: [],
  code: '',
  createTime: '',
  id: 0,
  level: 0,
  name: '',
  pid: 0,
  select: false,
  status: '',
  toCode: '',
  type: 0,
  updateTime: '',
})
// 点击添加菜单或者更新菜单
const addOrUpdatePermission = (row: ResRolePermissionData, type: string) => {
  // 判断是添加菜单还是更新菜单
  if (type === 'add') {
    // 添加菜单，先初始化数据
    Object.assign(currentPermission, { code: '', name: '', id: 0 })
    currentPermission.pid = row.id
    currentPermission.level = row.level + 1
  } else {
    Object.assign(currentPermission, row)
  }
  addOrUpdatePermissionRef.value.dialogFormVisible = true
}
// 点击删除菜单
const deletePermission = async (id:number)=>{
  await permissionApi.reqDeletePermission(id)
  permissionStore.getPremission()
  ElMessage.success('删除成功！')
}
onMounted(() => {
  permissionStore.getPremission()
})
</script>

<style lang="scss" scoped></style>
