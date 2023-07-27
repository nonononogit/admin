import request from '@/utils/request'
import { ReqLoginData, ResToken, ResUserInfoData } from './type'

export default {
  // 用户登录
  reqLogin(reqLoginData: ReqLoginData) {
    return request.post<ResToken, any>('/admin/acl/index/login', reqLoginData)
  },
  // 获取用户信息
  reqUserInfo() {
    return request.get<ResUserInfoData, any>('/admin/acl/index/info')
  },
  // 退出登录
  reqLogout() {
    return request.post<null, any>('/admin/acl/index/logout')
  },
}
