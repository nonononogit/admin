import { createApp } from 'vue'
import '@/styles/index.scss'
import App from './App.vue'
// 引入element-plus
import ElementPlus from 'element-plus'
// 引入element样式
import 'element-plus/dist/index.css'
//配置element-plus国际化
//@ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 配置element-plus暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// SVG插件
import 'virtual:svg-icons-register'
import gloablComponent from './components/index'
// 路由
import router from './router'
// 仓库
import pinia from './store'
// 路由权限
import './permisstion'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(gloablComponent)
app.use(router)
app.use(pinia)
app.mount('#app')
