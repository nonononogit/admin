import request from '@/utils/request'
import {
  ReqLoginData,
  ResToken,
  ResUserInfoData,
  ResUserPageData,
  AclApi,
  ReqAddOrUpdateUser,
  ResUserRolesListData,
  UserAssignRolesData,
} from './type'

export default {
  // 用户登录
  reqLogin(reqLoginData: ReqLoginData) {
    return request.post<ResToken, any>(AclApi.LOGIN_URL, reqLoginData)
  },
  // 获取用户信息
  reqUserInfo() {
    return request.get<ResUserInfoData, any>(AclApi.USERINFO_URL)
  },
  // 退出登录
  reqLogout() {
    return request.post<null, any>(AclApi.LOGOUT_URL)
  },
  // 添加或修改用户
  reqAddOrUpdateUser(addOrUpdateUserParanms: ReqAddOrUpdateUser) {
    if (addOrUpdateUserParanms.id) {
      return request.put<any, any>(
        AclApi.UPDATEUSER_URL,
        addOrUpdateUserParanms,
      )
    } else {
      return request.post<any, any>(AclApi.ADDUSER_URL, addOrUpdateUserParanms)
    }
  },
  // 获取用户管理分页列表
  reqUserPageList(page: number, limit: number, userName?: string) {
    return request.get<ResUserPageData<any>, any>(
      `${AclApi.USERLIMIT_URL}/${page}/${
        limit + (userName ? '?username=' + userName : '')
      }`,
    )
  },
  // 删除单个用户
  reqDeleteSingleUser(id: number) {
    return request.delete<any, any>(`${AclApi.DELETESINGLEUSER_URL}/${id}`)
  },
  // 批量删除用户
  reqDeleteBatchUser(idArr: Array<Number>) {
    return request.delete<any, any>(AclApi.DELETEBATCHUSER_URL, { data: idArr })
  },
  // 请求用户当前角色
  reqUserRoles(id: number) {
    return request.get<ResUserRolesListData, any>(
      `${AclApi.USERROLES_URL}/${id}`,
    )
  },
  // 分配用户角色
  reqUserAssignRoles(assignRolesParams: UserAssignRolesData) {
    return request.post<null, any>(
      AclApi.USERASSIGNROLES_URL,
      assignRolesParams,
    )
  },
}
