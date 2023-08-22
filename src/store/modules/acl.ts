// 权限管理仓库
import { defineStore } from 'pinia'
import { AclStoreData } from './types/acl'
import acl from '@/api/acl/user/user'
import { ElMessage } from 'element-plus'
export const useAclStore = defineStore('acl', {
  state: (): AclStoreData<any> => {
    return {
      // 用户管理分页列表数据
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
    }
  },
  actions: {
    // 请求用户管理分页列表数据
    async getUserPageList(page: number, limit: number, userName?: string) {
      try {
        const result = await acl.reqUserPageList(page, limit, userName)
        this.userPageList = result
      } catch (error) {
        ElMessage.error('请求用户管理分页列表数据失败')
      }
    },
    // 请求当前用户角色列表数据
    async getUserRoles(id: number) {
      const result = await acl.reqUserRoles(id)
      this.userRoles = result
    },
  },
  getters: {},
})
