import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入element-plus
import ElementPlus from 'element-plus'
//配置element-plus国际化
//@ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 配置element-plus暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// SVG插件
import 'virtual:svg-icons-register'
import gloablComponent from './components/index';

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(gloablComponent)
app.mount('#app')

