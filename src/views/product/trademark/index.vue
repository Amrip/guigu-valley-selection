<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" size="default" icon="Plus" @click="addTrademark"
        >添加品牌</el-button
      >

      <el-table border :data="trademarkData" style="margin: 10px 0">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        />
        <el-table-column label="品牌名称" prop="tmName" />
        <el-table-column label="品牌LOGO">
          <template #="{ row, $index }">
            <img :src="row.logoUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark(row)"
            ></el-button>
            <el-popconfirm
              :title="`您确定要删除${row.tmName}?`"
              width="250px"
              icon="Delete"
              @confirm="removeTrademark(row.id)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        @size-change="getTrademark(pageNo)"
        @current-change="getTrademark"
        :page-sizes="[3, 5, 7, 9]"
        layout="prev, pager, next,jumper,->,total,sizes"
        :total="total"
      />
      <!-- 弹窗 -->
      <el-dialog
        v-model="dialogFormVisible"
        :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
      >
        <el-form
          style="width: 80%"
          :model="trademarkParams"
          :rules="rules"
          ref="formRef"
        >
          <el-form-item label="品牌名称" label-width="100px" prop="tmName">
            <el-input
              placeholder="请输入品牌名称"
              v-model="trademarkParams.tmName"
            ></el-input>
          </el-form-item>
          <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
            <el-upload
              class="avatar-uploader"
              action="/api/admin/product/fileUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :beforeAvatarUpload="beforeAvatarUpload"
            >
              <img
                v-if="trademarkParams.logoUrl"
                :src="trademarkParams.logoUrl"
                class="avatar"
              />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button type="primary" size="default" @click="cancel"
            >取消</el-button
          >
          <el-button type="primary" size="default" @click="confirm"
            >确定</el-button
          >
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import {
  reqGetTrademark,
  reqAddTrademark,
  reqUpdateTrademark,
  reqDeleteTrademark,
} from "@/api/product/trademark";
import {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from "@/api/product/trademark/type";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, UploadProps, resultProps, formEmits } from "element-plus";
let pageNo = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
let trademarkData = ref<Records>([]);
let dialogFormVisible = ref<boolean>(false);
let trademarkParams = reactive<TradeMark>({
  tmName: "",
  logoUrl: "",
});
let formRef = ref();
// 数据展示
const getTrademark = async (pager = 1) => {
  pageNo.value = pager;
  let result: TradeMarkResponseData = await reqGetTrademark(
    pageNo.value,
    limit.value
  );
  if (result.code == 200) {
    total.value = result.data.total;
    trademarkData.value = result.data.records;
  }
};

// 添加品牌按钮回调
const addTrademark = () => {
  dialogFormVisible.value = true;
  // 添加时弹窗内没有内容
  trademarkParams.id = 0;
  trademarkParams.tmName = "";
  trademarkParams.logoUrl = "";
  formRef.value?.clearValidate("tmName");
  formRef.value?.clearValidate("logoUrl");
};

// 更新品牌按钮回调
const updateTrademark = (row: TradeMark) => {
  dialogFormVisible.value = true;
  Object.assign(trademarkParams, row);
  console.log(trademarkParams);
  formRef.value?.clearValidate("tmName");
  formRef.value?.clearValidate("logoUrl");
};

// 删除品牌按钮回调
const removeTrademark = async (id: number) => {
  let result: any = await reqDeleteTrademark(id);
  if (result.code == 200) {
    //删除成功提示信息
    ElMessage({
      type: "success",
      message: "删除品牌成功",
    });
    //再次获取已有的品牌数据
    getTrademark(
      trademarkData.value.length > 1 ? pageNo.value : pageNo.value - 1
    );
  } else {
    ElMessage({
      type: "error",
      message: "删除品牌失败",
    });
  }
};

// 弹窗界面确认按钮回调
const confirm = async () => {
  await formRef.value.validate();
  let result: any = trademarkParams.id
    ? await reqUpdateTrademark(trademarkParams)
    : await reqAddTrademark(trademarkParams);
  console.log(result);
  if (result.code == 200) {
    //关闭对话框
    dialogFormVisible.value = false;
    //弹出提示信息
    ElMessage({
      type: "success",
      message: trademarkParams.id ? "修改品牌成功" : "添加品牌成功",
    });
    //再次发请求获取已有全部的品牌数据
    getTrademark(trademarkParams.id ? pageNo.value : 1);
  } else {
    //添加品牌失败
    ElMessage({
      type: "error",
      message: trademarkParams.id ? "修改品牌失败" : "添加品牌失败",
    });
    //关闭对话框
    dialogFormVisible.value = false;
  }
};

// 弹窗界面取消按钮回调
const cancel = () => {
  dialogFormVisible.value = false;
};

// 图片上传钩子
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  _uploadFile
) => {
  trademarkParams.logoUrl = response.data;
  formRef.value.clearValidate("logoUrl");
};
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (
    rawFile.type == "image/png" ||
    rawFile.type == "image/jpeg" ||
    rawFile.type == "image/gif"
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "上传文件大小小于4M",
      });
      return false;
    }
  } else {
    ElMessage({
      type: "error",
      message: "上传文件格式务必PNG|JPG|GIF",
    });
    return false;
  }
};

// 表单校验
const validatorTmName = (_rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error("品牌名称位数需要大于两位！"));
  }
};
const validatorLogoUrl = (_rule: any, value: any, callBack: any) => {
  if (value) {
    callBack();
  } else {
    callBack(new Error("Logo务必上传！"));
  }
};
const rules = {
  tmName: [{ required: true, trigger: "blur", validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
};

onMounted(() => {
  getTrademark();
});
</script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
}
</style>

<style>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
