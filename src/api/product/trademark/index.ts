import request from '@/utils/request'
import {TradeMarkResponseData,TradeMark,ResponseData} from './type'

enum API{
    GET_TRADEMARK_URL="/admin/product/baseTrademark/",
    ADD_TRADEMARK_URL="/admin/product/baseTrademark/save",
    UPDATE_TRADEMARK_URL="/admin/product/baseTrademark/update",
    DELETE_TRADMEARK_URL="/admin/product/baseTrademark/remove/"
}

export const reqGetTrademark = (page:number,limit:number)=>request.get<any,TradeMarkResponseData>(API.GET_TRADEMARK_URL+`${page}/${limit}`)

export const reqAddTrademark = (data:TradeMark)=>request.post<any,ResponseData>(API.ADD_TRADEMARK_URL,data)

export const reqUpdateTrademark = (data:TradeMark)=>request.put<any,ResponseData>(API.UPDATE_TRADEMARK_URL,data)

export const reqDeleteTrademark = (id:number)=>request.delete<any,ResponseData>(API.DELETE_TRADMEARK_URL+`${id}`)
