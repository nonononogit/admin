// 用户信息仓库
import { defineStore } from 'pinia'
import { UserStoreData } from './types/user'
import user from '@/api/acl/user/user'
import { ReqLoginData } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
import { staticRoutes } from '@/router/routes'
// 初始化用户信息
function initUserInfo() {
  return {
    avatar: '',
    buttons: [],
    name: '',
    roles: [],
    routes: [],
  }
}
// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore('user', {
  state: (): UserStoreData => ({
    token: localStorage.getItem('token') as string,
    userInfo: initUserInfo(),
    menu: staticRoutes,
  }),
  actions: {
    // 登录获取token
    async getLogin(reqLoginData: ReqLoginData) {
      try {
        const result = await user.reqLogin(reqLoginData)
        this.token = result
        localStorage.setItem('token', result)
      } catch (error) {
        ElMessage.error('登录失败，请检查用户名或密码无误！')
      }
    },
    // 成功获取token后，拿获取用户信息
    async getUserInfo() {
      const result = await user.reqUserInfo()
      this.userInfo = result
    },
    // 退出登录
    async getLogout() {
      try {
        await user.reqLogout()
        localStorage.removeItem('token')
        this.token = ''
        this.userInfo = initUserInfo()
      } catch (error) {
        ElMessage.error('退出失败，请稍后重试！')
      }
    },
  },
  getters: {},
})
