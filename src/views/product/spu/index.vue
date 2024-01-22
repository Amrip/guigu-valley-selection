<template>
  <Category :scene="scene" />
  <el-card style="margin: 10px 0">
    <!-- 场景0：展示界面 -->
    <div v-show="scene == 0">
      <!-- 添加SPU按钮 -->
      <el-button
        type="primary"
        icon="Plus"
        @click="addSpu"
        style="margin: 10px 0"
        :disabled="categoryStore.c3Id ? false : true"
        >添加SPU</el-button
      >
      <!-- SPU展示 -->
      <el-table border :data="records">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column label="SPU描述" prop="description"></el-table-column>
        <el-table-column label="SPU操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              icon="Plus"
              size="small"
              title="添加SKU"
              @click="addSku(row)"
            ></el-button>
            <el-button
              type="warning"
              icon="Edit"
              size="small"
              @click="editSpu(row)"
              title="修改SPU"
            ></el-button>
            <el-button
              type="info"
              icon="View"
              size="small"
              title="查看SKU"
              @click="getSku(row)"
            ></el-button>
            <el-popconfirm
              :title="`你确定删除${row.spuName}?`"
              width="200px"
              @confirm="deleteSpu(row)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                  title="删除SPU"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        @size-change="changeSize"
        @current-change="changePage"
        :page-sizes="[3, 5, 7, 9]"
        layout="prev, pager, next,jumper,->,total,sizes"
        :total="total"
        style="margin: 10px 0"
      />
    </div>
    <!-- 场景1：添加|修改SPU -->
    <spuForm v-show="scene == 1" ref="spu" @changeScene="changeScene" />
    <!-- 场景2：添加SKU -->
    <skuForm v-show="scene == 2" ref="sku" @changeScene="changeScene" />

    <!-- 展示sku列表的el-dialog -->
    <!-- dialog对话框:展示已有的SKU数据 -->
    <el-dialog v-model="dialogVisible" title="SKU列表">
      <el-table border :data="skuList">
        <el-table-column label="SKU名字" prop="skuName"></el-table-column>
        <el-table-column label="SKU价格" prop="price"></el-table-column>
        <el-table-column label="SKU重量" prop="weight"></el-table-column>
        <el-table-column label="SKU图片">
          <template #="{ row, $index }">
            <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import Category from "@/components/Category/index.vue";
import { onMounted, ref, watch } from "vue";
import { reqDeleteSpu, reqGetSkus, reqSpuData } from "@/api/product/spu/index";
import {
  SpuDataResponse,
  SpuDataRecord,
  SkuData,
  SkuDataResponse,
} from "@/api/product/spu/type";
import { ElMessage } from "element-plus";
import useCategoryStore from "@/store/modules/category";
import spuForm from "./spuForm.vue";
import skuForm from "./skuForm.vue";
// category pinia
let categoryStore = useCategoryStore();
// Category组件场景变化
let scene = ref<number>(0); //0:显示已有SPU  1:添加或者修改已有SPU 2:添加SKU的结构
// 分页组件
let total = ref<number>(0); // 总数
let pageNo = ref<number>(1); // 页码
let limit = ref<number>(3); // 每页显示
const changeSize = () => {
  pageNo.value = 1;
  getSpu();
};
const changePage = (pager: number) => {
  getSpu(pager);
};
// records数据
let records = ref<SpuDataRecord[]>([]);
// 获取spuForm组件实例
let spu = ref<any>();
let sku = ref<any>();

// dialog的数据
let dialogVisible = ref<boolean>(false);
let skuList = ref<SkuData[]>([]);

// 获取spu数据请求
const getSpu = async (pager = 1) => {
  pageNo.value = pager;
  let result: SpuDataResponse = await reqSpuData(
    categoryStore.c3Id,
    pageNo.value,
    limit.value,
  );
  if (result.code == 200) {
    // 存储数据
    records.value = result.data.records;
    total.value = result.data.total;
  } else {
    ElMessage({
      type: "error",
      message: "主页数据请求失败！",
    });
  }
};

// 监听pinia里面c3Id的变化来获取数据
watch(
  () => categoryStore.c3Id,
  () => {
    // 预先清空records
    records.value = [];
    // 保证c3Id不为空才发请求
    if (categoryStore.c3Id) {
      // 发送请求获取spu数据
      getSpu();
    }
  },
);

// 添加SPU按钮回调（场景1）
const addSpu = () => {
  // 更换场景
  scene.value = 1;
  spu.value.initAddSpu(categoryStore.c3Id);
};
// 自定义事件：changeScene
const changeScene = (sceneValue: number) => {
  // 更改状态
  scene.value = sceneValue;
  getSpu(pageNo.value);
};

// 编辑SPU按钮回调（场景1）

const editSpu = (row: SpuDataRecord) => {
  scene.value = 1;
  spu.value.initSpuData(row);
};

// 添加SKU按钮回调（场景2）
const addSku = (row: SpuDataRecord) => {
  scene.value = 2;
  sku.value.initAddSku(row);
};

// 查看该SPU下所有SKU按钮回调
const getSku = async (row: SpuDataRecord) => {
  let result: SkuDataResponse = await reqGetSkus(row.id as number);
  if (result.code == 200) {
    skuList.value = result.data;
    dialogVisible.value = true;
  } else {
    ElMessage({
      type: "error",
      message: "获取失败！",
    });
  }
};

// 删除SPU按钮回调
const deleteSpu = async (row: SpuDataRecord) => {
  let result: any = await reqDeleteSpu(row.id as number);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功！",
    });
    //获取剩余SPU数据
    getSpu(pageNo.value);
  } else {
    ElMessage({
      type: "error",
      message: "删除失败！",
    });
  }
};
</script>

<style scoped></style>
