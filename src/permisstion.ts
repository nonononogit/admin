import router from './router'
import pinia from './store'
import { useUserStore } from './store/modules/user'
//@ts-ignore
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
const userStore = useUserStore(pinia)
router.beforeEach(async (to, from, next) => {
  // document.title = `${setting.title} - ${to.meta.title}`
  nprogress.start()
  const token = userStore.token
  const userName = userStore.userInfo.name
  // token是否存在
  if (token) {
    // 如果已登录去登录页，则直接指向首页
    if (to.name === 'login') {
      next({ path: '/' })
    } else {
      // 是否获取到用户信息
      if (userName) {
        next()
      } else {
        try {
          // 如果不存在则请求用户信息
          await userStore.getUserInfo()
          next({ ...to })
        } catch (error) {
          // 如果请求失败，清空token
          await userStore.getLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    //用户未登录判断
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
//全局后置守卫
router.afterEach((to, from) => {
  nprogress.done()
})
