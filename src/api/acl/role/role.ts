import request from '@/utils/request'
import {
  ReqAddOrUpdateRoleData,
  ResRolePermissionListData,
  RoleApi,
  RoleListData,
} from './type'
export default {
  // 请求获取角色管理分页列表数据
  reqRolePageList(page: number, limit: number, roleName?: string) {
    return request.get<RoleListData, any>(
      `${RoleApi.ROLELIMIT_URL}/${page}/${
        limit + (roleName ? '?roleName=' + roleName : '')
      }`,
    )
  },
  // 请求添加或更新职位
  reqAddOrUpdateRole(data: ReqAddOrUpdateRoleData) {
    if (data.id) {
      return request.put<null, any>(RoleApi.UPDATEROLE_URL, data)
    } else {
      return request.post<null, any>(RoleApi.ADDROLE_URL, data)
    }
  },
  // 请求获取用户权限
  reqRolePermission(id: number) {
    return request.get<ResRolePermissionListData, any>(
      `${RoleApi.ROLEPERMISSION_URL}/${id}`,
    )
  },
  // 请求分配角色权限
  reqAssignRolePermission(roleId: number, permissionId: Array<number>) {
    return request.post<null, any>(
      `${RoleApi.ASSINGROLESPERMISSION_URL}roleId=${roleId}&permissionId=${permissionId}`,
    )
  },
  // 请求删除职位
  reqDeleteRole(roleId: number) {
    return request.delete<null, any>(RoleApi.DELETEROLE_URL + '/' + roleId)
  },
}
