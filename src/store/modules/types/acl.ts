// 用户管理仓库对应的类型库
import { ResRolePermissionListData } from '@/api/acl/role/type'
import { ResUserPageData, ResUserRolesListData } from '@/api/acl/user/type'
export interface AclStoreData<T> {
  userPageList: ResUserPageData<T>
  userRoles: ResUserRolesListData
  rolePermissionList:ResRolePermissionListData
}
