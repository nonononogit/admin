import { RecordsData, ResUserPageData } from '../user/type'

export enum RoleApi {
  // 获取职位分页列表数据
  ROLELIMIT_URL = '/admin/acl/role',
  // 添加职位
  ADDROLE_URL = '/admin/acl/role/save',
  // 更新职位
  UPDATEROLE_URL = '/admin/acl/role/update',
  // 获取用户权限
  ROLEPERMISSION_URL = '/admin/acl/permission/toAssign',
  // 分配角色权限
  ASSINGROLESPERMISSION_URL='/admin/acl/permission/doAssign?',
  // 删除职位
  DELETEROLE_URL = '/admin/acl/role/remove',
}
// 职位分页列表数据
export type RoleListData = ResUserPageData<any>
// 添加职位或更新职位的请求参数类型
export type ReqAddOrUpdateRoleData = RecordsData
// 用户权限数据类型
export interface ResRolePermissionData {
  children: ResRolePermissionListData
  code: null | string
  createTime: string
  id: number 
  level: number 
  name: string
  pid: number 
  select: boolean
  status: null | string
  toCode: null | string
  type: number 
  updateTime: string
}
export type ResRolePermissionListData = ResRolePermissionData[]
