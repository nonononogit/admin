// 权限管理仓库
import { defineStore } from 'pinia'
import { AclStoreData } from './types/acl'
import user from '@/api/acl/user/user'
import role from '@/api/acl/role/role'
import { ResRolePermissionListData } from '@/api/acl/role/type'
// 从当前职位权限数据中，过滤出已有的权限的方法
function filterDefaultPermission(
  rolePermissionList: ResRolePermissionListData,
  idList: Array<number>,
) {
  rolePermissionList.forEach((item) => {
    if (item.select && item.level === 4) {
      idList.push(item.id)
    }
    if (item.children && item.children.length) {
      filterDefaultPermission(item.children, idList)
    }
  })
  return idList
}
export const useAclStore = defineStore('acl', {
  state: (): AclStoreData<any> => {
    return {
      // 用户管理或角色管理分页列表数据
      userPageList: {
        countId: '',
        current: 1,
        hitCount: '',
        maxLimit: '',
        optimizeCountSql: '',
        orders: [],
        pages: '',
        records: [],
        searchCount: '',
        size: 1,
        total: 0,
      },
      // 用户角色列表数据
      userRoles: {
        allRolesList: [],
        assignRoles: [],
      },
      // 当前职位权限数据
      rolePermissionList: [],
    }
  },
  actions: {
    // 请求用户管理或角色管理分页列表数据
    async getUserPageList(
      page: number,
      limit: number,
      type: string,
      kewords?: string,
    ) {
      let result
      if (type === 'user') {
        result = await user.reqUserPageList(page, limit, kewords)
      } else {
        result = await role.reqRolePageList(page, limit, kewords)
      }
      this.userPageList = result
    },
    // 请求当前用户角色列表数据
    async getUserRoles(id: number) {
      const result = await user.reqUserRoles(id)
      this.userRoles = result
    },
    // 请求当前职位权限shuju
    async getRolePremission(id: number) {
      const result = await role.reqRolePermission(id)
      this.rolePermissionList = result
    },
  },
  getters: {
    defaultPermission: (state) =>
      filterDefaultPermission(state.rolePermissionList, []),
  },
})
