// 分类相关的数据的ts类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 分类ts类型
export interface CategoryObj {
  id: number | string;
  name: string;
  category1Id?: number;
  category2Id?: number;
}

// 相应的分类接口返回数据的类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[];
}

// 属性与属性值对应的返回数据类型
// 属性值对象的类型
export interface AttrValue {
  id?: number;
  valueName: string;
  attrId?: number;
  flag?: boolean;
}
export type AttrValueList = AttrValue[];
export interface Attr {
  id?: number;
  attrName: string;
  categoryId: number | string;
  categoryLevel: number;
  attrValueList: AttrValueList;
}
export type AttrList = Attr[];
export interface AttrInfoResponseDate extends ResponseData {
  data: Attr[];
}
