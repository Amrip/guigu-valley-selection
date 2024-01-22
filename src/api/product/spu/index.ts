import request from '@/utils/request'
import {SpuDataResponse,SpuTrademarksResponse,SpuImagesResponse, SpuAttrValuesResponse, SpuAttrsResponse, SpuDataRecord, SkuData, SkuDataResponse} from './type'

enum API{
    GET_SPUDATA_URL = '/admin/product/',
    GET_SPUTRADEMARKS_URL = '/admin/product/baseTrademark/getTrademarkList',
    GET_SPUIMAGES_URL = '/admin/product/spuImageList/',
    GET_SPUATTRS_URL = '/admin/product/baseSaleAttrList',
    GET_SPUATTRVALUES_URL = '/admin/product/spuSaleAttrList/',
    UPDATE_SPU_URL = '/admin/product/updateSpuInfo',
    ADD_SPU_URL = '/admin/product/saveSpuInfo',
    DELETE_SPU_URL = '/admin/product/deleteSpu/',

    ADD_SKU_URL = '/admin/product/saveSkuInfo',
    GET_SKU_URL = '/admin/product/findBySpuId/'
}

// 请求获取SPU展示数据
export const reqSpuData = (category3Id:number|string,page:number,limit:number)=>request.get<any,SpuDataResponse>(API.GET_SPUDATA_URL+`${page}/${limit}?category3Id=${category3Id}`)
// 请求获取品牌列表
export const reqSpuTrademarks = ()=>request.get<any,SpuTrademarksResponse>(API.GET_SPUTRADEMARKS_URL)
// 请求获取SPU图标列表
export const reqSpuImages = (spuId:number)=>request.get<any,SpuImagesResponse>(API.GET_SPUIMAGES_URL+spuId)
// 请求获取SPU销售属性列表
export const reqSpuAttrs = ()=>request.get<any,SpuAttrsResponse>(API.GET_SPUATTRS_URL)
// 请求获取SPU已有销售属性值列表
export const reqSpuAttrValues = (spuId:number)=>request.get<any,SpuAttrValuesResponse>(API.GET_SPUATTRVALUES_URL+spuId)

// 请求修改|添加SPU
export const reqUpdateOrAddSpu = (spuData:SpuDataRecord)=>{
    if(spuData.id){
        return request.post<any,any>(API.UPDATE_SPU_URL,spuData)
    }else{
        return request.post<any,any>(API.ADD_SPU_URL,spuData)
    }
}

// 删除SPU
export const reqDeleteSpu = (spuId:number) => request.delete<any,any>(API.DELETE_SPU_URL+spuId)



// 添加SKU
export const reqAddSku = (skuData:SkuData) => request.post<any,any>(API.ADD_SKU_URL,skuData)
// 查找SKU
export const reqGetSkus = (spuId:number) => request.get<any,SkuDataResponse>(API.GET_SKU_URL+spuId)