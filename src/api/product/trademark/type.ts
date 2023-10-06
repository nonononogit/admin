import { ResUserPageData } from '@/api/acl/user/type'

export enum TrademarkApi {
  // 请求获取品牌列表分页数据
  TRADEMARKLIMITLIST_URL = '/admin/product/baseTrademark',
  // 请求修改品牌数据
  UPDATETM_URL = '/admin/product/baseTrademark/update',
  // 请求添加品牌数据
  ADDTM_URL = '/admin/product/baseTrademark/save',
  // 请求删除品牌
  DELETETM_URL = '/admin/product/baseTrademark/remove'
}
export interface TrademarkLimitData extends ResUserPageData<any> {}
