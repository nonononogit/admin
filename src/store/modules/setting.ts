// 设置菜单栏仓库
import { defineStore } from 'pinia'
interface LayoutSetData {
  fold: boolean
}
export const useLayoutSet = defineStore('layoutSet', {
  state: (): LayoutSetData => {
    return {
      fold: false,
    }
  },
})
