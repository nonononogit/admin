import { ResRolePermissionListData } from '../role/type'

export enum PermissionApi {
  // 请求菜单数据
  PERMISSION_URL = '/admin/acl/permission',
  // 请求添加菜单数据
  ADDPERMISSION_URL = '/admin/acl/permission/save',
  // 请求更新菜单数据
  UPDATEPERMISSION_URL = '/admin/acl/permission/update',
  // 请求删除菜单数据
  DELETEPERMISSION_URL = '/admin/acl/permission/remove',
}
export type PermissionData = ResRolePermissionListData
