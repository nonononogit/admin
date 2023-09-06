import request from '@/utils/request'
import {
  ReqLoginData,
  ResToken,
  ResUserInfoData,
  ResUserPageData,
  UserApi,
  ReqAddOrUpdateUser,
  ResUserRolesListData,
  UserAssignRolesData,
} from './type'

export default {
  // 用户登录
  reqLogin(reqLoginData: ReqLoginData) {
    return request.post<ResToken, any>(UserApi.LOGIN_URL, reqLoginData)
  },
  // 获取用户信息
  reqUserInfo() {
    return request.get<ResUserInfoData, any>(UserApi.USERINFO_URL)
  },
  // 退出登录
  reqLogout() {
    return request.post<null, any>(UserApi.LOGOUT_URL)
  },
  // 添加或修改用户
  reqAddOrUpdateUser(addOrUpdateUserParanms: ReqAddOrUpdateUser) {
    if (addOrUpdateUserParanms.id) {
      return request.put<any, any>(
        UserApi.UPDATEUSER_URL,
        addOrUpdateUserParanms,
      )
    } else {
      return request.post<any, any>(UserApi.ADDUSER_URL, addOrUpdateUserParanms)
    }
  },
  // 获取用户管理分页列表
  reqUserPageList(page: number, limit: number, userName?: string) {
    return request.get<ResUserPageData<any>, any>(
      `${UserApi.USERLIMIT_URL}/${page}/${
        limit + (userName ? '?username=' + userName : '')
      }`,
    )
  },
  // 删除单个用户
  reqDeleteSingleUser(id: number) {
    return request.delete<any, any>(`${UserApi.DELETESINGLEUSER_URL}/${id}`)
  },
  // 批量删除用户
  reqDeleteBatchUser(idArr: Array<Number>) {
    return request.delete<any, any>(UserApi.DELETEBATCHUSER_URL, {
      data: idArr,
    })
  },
  // 请求用户当前角色
  reqUserRoles(id: number) {
    return request.get<ResUserRolesListData, any>(
      `${UserApi.USERROLES_URL}/${id}`,
    )
  },
  // 分配用户角色
  reqUserAssignRoles(assignRolesParams: UserAssignRolesData) {
    return request.post<null, any>(
      UserApi.USERASSIGNROLES_URL,
      assignRolesParams,
    )
  },
}
