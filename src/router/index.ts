import { createRouter, createWebHashHistory } from 'vue-router'
import { staticRoutes } from '@/router/routes'
const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
})
export default router
