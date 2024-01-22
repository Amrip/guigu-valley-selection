import { CategoryObj } from "@/api/product/attr/type";
import { RouteRecordRaw } from "vue-router";

// 小仓库数据state类型
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
}

export interface CategoryState {
  c1Data: CategoryObj[];
  c1Id: string | number;
  c2Data: CategoryObj[];
  c2Id: string | number;
  c3Data: CategoryObj[];
  c3Id: string | number;
}
