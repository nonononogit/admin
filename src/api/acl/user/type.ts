// 地址
export enum AclApi {
  // 用户登录
  LOGIN_URL = '/admin/acl/index/login',
  // 获取用户信息
  USERINFO_URL = '/admin/acl/index/info',
  // 退出登录
  LOGOUT_URL = '/admin/acl/index/logout',
  // 获取用户管理分页列表数据
  USERLIMIT_URL = '/admin/acl/user',
  // 添加用户
  ADDUSER_URL = '/admin/acl/user/save',
  // 更新用户
  UPDATEUSER_URL = '/admin/acl/user/update',
  // 删除单个用户
  DELETESINGLEUSER_URL = '/admin/acl/user/remove',
  // 批量删除用户
  DELETEBATCHUSER_URL = '/admin/acl/user/batchRemove',
  // 获取用户角色
  USERROLES_URL = '/admin/acl/user/toAssign',
  // 分配用户角色
  USERASSIGNROLES_URL = '/admin/acl/user/doAssignRole',
}
// 登录参数类型
export interface ReqLoginData {
  username: string
  password: string
}
// token参数类型
export type ResToken = string
// 用户信息参数类型
export interface ResUserInfoData {
  avatar: string
  buttons: Array<string>
  name: string
  roles: Array<string>
  routes: Array<string>
}
// 用户管理分页列表数据类型
export interface ResUserPageData<T> {
  countId: null | string
  current: number
  hitCount: boolean | string
  maxLimit: null | string
  optimizeCountSql: boolean | string
  orders: Array<T>
  pages: number | string
  records: Array<RecordsData>
  searchCount: boolean | string
  size: number
  total: number
}
// 用户管理分页列表数据中records属性值类型
export interface RecordsData {
  createTime: string
  id: number | string
  name: string
  password: string
  phone: null | string
  roleName: string
  updateTime: string
  username: string
}
// 添加或修改用户参数类型
export interface ReqAddOrUpdateUser {
  username: string
  name: string
  password: string
  id?: Number
  createTime?: string
  updateTime?: string
  phone?: null | number | string
  roleName?: string
}
// 用户角色数据类类型
export interface ResUserRolesListData {
  allRolesList: Array<UserRolesData>
  assignRoles: Array<UserRolesData>
}
export interface UserRolesData {
  createTime: string
  id: number
  remark: null | string
  roleName: string
  updateTime: string
}
// 分配角色请求参数类型
export interface UserAssignRolesData{
  roleIdList:Array<number>
  userId:number
}
