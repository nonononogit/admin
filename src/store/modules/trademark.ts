// 品牌管理仓库
import { defineStore } from 'pinia'
import { TrademarkStoreData } from './types/trademark'
import TrademarkApi from '@/api/product/trademark/trademark'

export const useTrademarkStore = defineStore('trademark', {
  state: (): TrademarkStoreData => {
    return {
      // 品牌分页列表数据
      trademarkLimitData: {
        countId: '',
        current: 1,
        hitCount: '',
        maxLimit: '',
        optimizeCountSql: '',
        orders: [],
        pages: '',
        records: [],
        searchCount: '',
        size: 1,
        total: 0,
      },
    }
  },
  actions: {
    // 请求品牌分页列表数据
    async getTrademarkLimitList(page: number, limit: number) {
      const result = await TrademarkApi.reqTrademarkLimitList(page, limit)
      this.trademarkLimitData = result
    },
  },
})
