<template>
  <el-form label-width="100px">
    <!-- SKU名称 -->
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
    </el-form-item>

    <!-- SKU价格 -->
    <el-form-item label="价格(元)">
      <el-input
        type="number"
        placeholder="价格(元)"
        v-model="skuParams.price"
      ></el-input>
    </el-form-item>

    <!-- SKU重量 -->
    <el-form-item label="重量(g)">
      <el-input
        type="number"
        placeholder="重量(g)"
        v-model="skuParams.weight"
      ></el-input>
    </el-form-item>

    <!-- SKU描述 -->
    <el-form-item label="SKU描述">
      <el-input
        type="textarea"
        placeholder="SKU描述"
        v-model="skuParams.skuDesc"
      ></el-input>
    </el-form-item>

    <!-- 平台属性 -->
    <el-form-item label="平台属性">
      <el-form :inline="true">
        <el-form-item
          v-for="(item, index) in platformAttrList"
          :key="item.id"
          :label="item.attrName"
          style="margin: 0 10px"
        >
          <el-select v-model="item.attrIdAndValueId">
            <el-option
              v-for="(platformAttrValue, index) in item.attrValueList"
              :key="platformAttrValue.id"
              :label="platformAttrValue.valueName"
              :value="`${item.id}:${platformAttrValue.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <!-- 销售属性 -->
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item
          v-for="(item, index) in saleAttrList"
          :key="item.id"
          :label="item.saleAttrName"
          style="margin: 0 10px"
        >
          <el-select v-model="item.attrIdAndValueId">
            <el-option
              v-for="(saleAttrValue, index) in item.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              :label="saleAttrValue.saleAttrValueName"
              :value="`${item.id}:${saleAttrValue.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <!-- 图片展示 -->
    <el-form-item label="图片展示">
      <el-table border :data="imgList" ref="imgShowTable">
        <el-table-column
          type="selection"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column label="图片">
          <template #="{ row, $index }">
            <img :src="row.imgUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" @click="setDefaultImg(row)"
              >设为默认</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <!-- 保存|取消 -->
    <el-form-item>
      <el-button type="primary" size="default" @click="save">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  reqAddSku,
  reqSpuAttrValues,
  reqSpuImages,
} from "@/api/product/spu/index";
import { reqAttrInfo } from "@/api/product/attr/index";
import { AttrInfoResponseDate } from "@/api/product/attr/type";
import {
  SkuData,
  SpuAttrValuesResponse,
  SpuDataRecord,
  SpuImagesResponse,
} from "@/api/product/spu/type";
import { ref } from "vue";
import useCategoryStore from "@/store/modules/category";
import { ElMessage } from "element-plus";
let categoryStore = useCategoryStore();
let skuParams = ref<SkuData>({
  //父组件传递过来的数据
  category3Id: "", //三级分类的ID
  spuId: "", //已有的SPU的ID
  tmId: "", //SPU品牌的ID
  //v-model收集
  skuName: "", //sku名字
  price: "", //sku价格
  weight: "", //sku重量
  skuDesc: "", //sku的描述
  skuAttrValueList: [
    //平台属性的收集
  ],
  skuSaleAttrValueList: [
    //销售属性
  ],
  skuDefaultImg: "", //sku图片地址
});
// 图片列表
let imgList = ref<any>([]);
let platformAttrList = ref<any>([]);
let saleAttrList = ref<any>([]);
let imgShowTable = ref();
let initAddSku = async (row: SpuDataRecord) => {
  skuParams.value = {
    //父组件传递过来的数据
    category3Id: "", //三级分类的ID
    spuId: "", //已有的SPU的ID
    tmId: "", //SPU品牌的ID
    //v-model收集
    skuName: "", //sku名字
    price: "", //sku价格
    weight: "", //sku重量
    skuDesc: "", //sku的描述
    skuAttrValueList: [
      //平台属性的收集
    ],
    skuSaleAttrValueList: [
      //销售属性
    ],
    skuDefaultImg: "", //sku图片地址
  };
  // 发请求拿数据
  // 获取平台属性
  let result1: AttrInfoResponseDate = await reqAttrInfo(
    categoryStore.c1Id,
    categoryStore.c2Id,
    categoryStore.c3Id,
  );
  // 获取销售属性
  let result2: SpuAttrValuesResponse = await reqSpuAttrValues(row.id as number);
  // 获取图片列表
  let result3: SpuImagesResponse = await reqSpuImages(row.id as number);

  // 存储数据
  skuParams.value.category3Id = row.category3Id;
  skuParams.value.spuId = row.id as number;
  skuParams.value.tmId = row.tmId;
  platformAttrList.value = result1.data;
  saleAttrList.value = result2.data;
  imgList.value = result3.data;
};

// 设为默认按钮回调
const setDefaultImg = (row: any) => {
  imgList.value.forEach((item: any) => {
    imgShowTable.value.toggleRowSelection(item, false);
  });
  imgShowTable.value.toggleRowSelection(row, true);
  skuParams.value.skuDefaultImg = row.imgUrl;
};
defineExpose({ initAddSku });

// 保存按钮的回调
const save = async () => {
  // 整合一下数据
  //平台属性
  skuParams.value.skuAttrValueList = platformAttrList.value.reduce(
    (prev: any, next: any) => {
      if (next.attrIdAndValueId) {
        let [attrId, valueId] = next.attrIdAndValueId.split(":");
        prev.push({
          attrId,
          valueId,
        });
      }
      return prev;
    },
    [],
  );
  //销售属性
  skuParams.value.skuSaleAttrValueList = saleAttrList.value.reduce(
    (prev: any, next: any) => {
      if (next.attrIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = next.attrIdAndValueId.split(":");
        prev.push({
          saleAttrId,
          saleAttrValueId,
        });
      }
      return prev;
    },
    [],
  );
  let result: any = await reqAddSku(skuParams.value);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "添加成功!",
    });
    cancel();
  } else {
    ElMessage({
      type: "success",
      message: "添加失败!",
    });
  }
};

// 取消按钮的回调
let $emit = defineEmits(["changeScene"]);
const cancel = () => {
  $emit("changeScene", 0);
};
</script>

<style scoped></style>
