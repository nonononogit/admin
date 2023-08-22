// 用户信息仓库对应的类型库
import { ResToken, ResUserInfoData } from '@/api/acl/user/type'
import { RouteRecordRaw } from 'vue-router'

export interface UserStoreData {
  token: ResToken
  userInfo: ResUserInfoData
  menu: RouteRecordRaw[]
}
