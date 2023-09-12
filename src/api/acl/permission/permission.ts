import request from '@/utils/request'
import { PermissionApi, PermissionData } from './type'
import { ResRolePermissionData } from '../role/type'
export default {
  // 请求菜单数据
  reqPermission() {
    return request.get<PermissionData, any>(PermissionApi.PERMISSION_URL)
  },
  // 请求添加菜单数据
  reqAddOrUpdatePermission(data: ResRolePermissionData) {
    if (data.id) {
      return request.put<null, any>(PermissionApi.UPDATEPERMISSION_URL, data)
    } else {
      return request.post<null, any>(PermissionApi.ADDPERMISSION_URL, data)
    }
  },
  // 请求删除菜单数据
  reqDeletePermission(id: number) {
    return request.delete<null, any>(
      PermissionApi.DELETEPERMISSION_URL + '/' + id,
    )
  },
}
