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
