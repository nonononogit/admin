import request from '@/utils/request'
import { TrademarkApi, TrademarkLimitData } from './type'
import { RecordsData } from '@/api/acl/user/type'
export default {
  // 请求品牌分页列表数据
  reqTrademarkLimitList(page: number, limit: number) {
    return request<TrademarkLimitData, any>({
      method: 'get',
      url: `${TrademarkApi.TRADEMARKLIMITLIST_URL}/${page}/${limit}`,
    })
  },
  // 请求添加或修改品牌数据
  reqAddOrUpdateTm(trademark:RecordsData){
    if(trademark.id){
      return request.put<null,any>(TrademarkApi.UPDATETM_URL,trademark)
    }else{
      return request.post<null,any>(TrademarkApi.ADDTM_URL,trademark)
    }
  },
  // 请求删除品牌
  reqDeleteTm(id:number){
    return request.delete<null,any>(`${TrademarkApi.DELETETM_URL}/${id}`)
  }
}
