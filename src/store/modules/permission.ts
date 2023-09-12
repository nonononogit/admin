// 菜单管理仓库
import { defineStore } from 'pinia'
import { PermissionStoreData } from './types/permission'
import permissionApi from '@/api/acl/permission/permission'

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionStoreData => {
    return {
      // 菜单数据
      permissionList: [],
    }
  },
  actions: {
    // 请求当前职位权限shuju
    async getPremission() {
      const result = await permissionApi.reqPermission()
      this.permissionList = result
    },
  },
  getters: {},
})
