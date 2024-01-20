// 通用响应类型
export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}







// 定义GET_SPUDATA_URL数据类型
// SPU展示图片数据类型
export interface SpuImg{
    id?:number, // id
    imgName?:string, // 图片名
    imgUrl?:string, // 图片URL
    spuId?:number // 对应的SPUid
}
// SPU属性值数据类型
export interface SpuAttrValue{
    id?:number, // id
    spuId?:number|string, // 对应的SPUid
    baseSaleAttrId:number|string, // 对应的销售属性id
    saleAttrName:string, // 销售属性名称
    saleAttrValueName:string, // 销售属性值名称
    isChecked?:boolean
}
// SPU属性数据类型
export interface SpuAttr{
    id?:number, // id
    baseSaleAttrId:number|string, // 销售属性id
    saleAttrName:string, // 销售属性名称
    spuId?:number, // 对应的SPUid
    spuSaleAttrValueList:SpuAttrValue[] // 对应的销售属性值列表
}
// SPU数据类型
export interface SpuDataRecord{
    id?:number|string, // id
    spuName:string, // SPU名称
    description:string, // SPU描述
    category3Id:number|string, // 三级分类id 
    tmId:number|string, // 品牌id
    spuSaleAttrList:null|SpuAttr[], // SPU销售属性列表
    spuImageList:null|SpuImg[], // SPU展示图片列表

}
export interface SpuDataResponse extends ResponseData{
    data:{
        records:SpuDataRecord[], // 主要数据
        total: number, // 数据总数
        size: number, // 该页请求的数据数量
        current: number, // 现在的页码
        searchCount: boolean, // 前往的页码
        pages: number // 总页码
    }
}





// 定义GET_SPUTRADEMARKS_URL数据类型
export interface SpuTrademarkData{
    id: number, 
    tmName: string, // 品牌名字
    logoUrl: string // 品牌logourl
}
export interface SpuTrademarksResponse extends ResponseData{
    data:SpuTrademarkData[]
}






// 定义GET_SPUIMAGES_URL数据类型
export interface SpuImageData{
    id: number,
    spuId: number|string,
    imgName:string,
    imgUrl:string
}
export interface SpuImagesResponse extends ResponseData{
    data:SpuImageData[]
}





// 定义GET_SPUATTRS_URL数据类型
export interface SpuAttrData{
    id: number,
    name: string
}
export interface SpuAttrsResponse extends ResponseData{
    data:SpuAttrData[]
}






// 定义GET_SPUATTRVALUES_URL数据类型
export interface SpuAttrValueData{
    id: number,
    spuId: number,
    baseSaleAttrId: number,
    saleAttrName:string,
    spuSaleAttrValueList: SpuAttrValue[]
}
export interface SpuAttrValuesResponse extends ResponseData{
    data:SpuAttrValueData[]
}