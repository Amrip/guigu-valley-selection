<template>
        <el-form label-width="100px">
            <!-- SPU名称 -->
            <el-form-item label="SPU名称">
                <el-input placeholder="请输入SPU名称"></el-input>
            </el-form-item>
            <!-- SPU品牌 -->
            <el-form-item label="SPU品牌">
                <el-select>
                    <el-option></el-option>
                </el-select>
            </el-form-item>
            <!-- SPU描述 -->
            <el-form-item label="SPU描述">
                <el-input type="textarea" placeholder="请输入SPU描述"></el-input>
            </el-form-item>
            <!-- SPU图片 -->
            <el-form-item label="SPU图片">
                <el-upload
                    v-model:file-list="spuImageList"
                    action="/api/admin/product/fileUpload"
                    list-type="picture-card"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                >
                    <el-icon><Plus /></el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </el-form-item>
            <!-- SPU销售属性 -->
            <el-form-item label="SPU销售属性">
                <!-- 下拉属性框 -->
                <el-select>
                    <el-option></el-option>
                </el-select>
                <!-- table展示属性 -->
                <el-table border style="margin:10px 0">
                    <el-table-column label="序号" align="center" width="80px"></el-table-column>
                    <el-table-column label="销售属性名" width="120px"></el-table-column>
                    <el-table-column label="销售属性值"></el-table-column>
                    <el-table-column label="操作" width="120px"></el-table-column>
                </el-table>
            </el-form-item>
            <!-- 保存|取消 -->
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button type="primary" @click="cancle">取消</el-button>
            </el-form-item>
        </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {SpuAttrData, SpuAttrValueData, SpuAttrValuesResponse, SpuAttrsResponse, SpuDataRecord, SpuImageData, SpuImagesResponse, SpuTrademarkData, SpuTrademarksResponse} from '@/api/product/spu/type'
import { reqSpuAttrValues, reqSpuAttrs, reqSpuImages, reqSpuTrademarks } from '@/api/product/spu';
// dialog是否可见
let dialogVisible = ref(false)
// dialog展示的图片url
let dialogImageUrl = ref()
// 存放品牌列表数据
let spuTrademarkList = ref<SpuTrademarkData[]>([])
// 存放spuimg列表数据
let spuImageList = ref<SpuImageData[]>([])
// 存放所有属性列表数据
let spuAttrList = ref<SpuAttrData[]>([])
// 存放所有属性值列表数据
let spuAttrValueList = ref<SpuAttrValueData[]>([])
// 存放总体的数据
let spuParams = ref<SpuDataRecord>({
    spuName:'',
    description:'',
    category3Id:'',
    tmId:'',
    spuSaleAttrList:[],
    spuImageList:[]
})




// 自定义事件：更换场景(子去调用父的方法)
let $emit = defineEmits(['changeScene'])
const cancle = ()=>{
    // 通知父组件更改为场景0
    $emit('changeScene',0)
}
// 初始化数据(现有的+请求到的)
const initSpuData = async(spuBaseData:SpuDataRecord)=>{
    console.log(123)
    // 存储现有的数据
    spuParams.value = spuBaseData;
    // 发送请求获取品牌列表
    let result1:SpuTrademarksResponse = await reqSpuTrademarks()
    // 发送请求获取SPU图片列表
    let result2:SpuImagesResponse = await reqSpuImages((spuBaseData.id as number))
    // 发送请求获取SPU销售属性列表
    let result3:SpuAttrsResponse = await reqSpuAttrs()
    // 发送请求获取已有的销售属性值列表
    let result4:SpuAttrValuesResponse = await reqSpuAttrValues((spuBaseData.id as number))
    
    // 存储请求数据
    spuTrademarkList.value = result1.data
    spuImageList.value = result2.data
    spuAttrList.value = result3.data
    spuAttrValueList.value = result4.data

    // 记2024/1/21 0:24：完成了接口数据获取，接下来到完成数据展示
}

defineExpose({
    initSpuData
})
</script>

<style scoped>

</style>