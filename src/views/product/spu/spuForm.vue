<template>
        <el-form label-width="100px">
            <!-- SPU名称 -->
            <el-form-item label="SPU名称">
                <el-input placeholder="请输入SPU名称" v-model="spuParams.spuName"></el-input>
            </el-form-item>



            <!-- SPU品牌 -->
            <el-form-item label="SPU品牌">
                <el-select v-model="spuParams.tmId">
                    <el-option v-for="(item,_index) in spuTrademarkList" :key="item.id" :value="item.id" :label="item.tmName"></el-option>
                </el-select>
            </el-form-item>



            <!-- SPU描述 -->
            <el-form-item label="SPU描述">
                <el-input type="textarea" placeholder="请输入SPU描述" v-model="spuParams.description"></el-input>
            </el-form-item>



            <!-- SPU图片 -->
            <el-form-item label="SPU图片">
                <el-upload
                    v-model:file-list="spuImageList"
                    action="/api/admin/product/fileUpload"
                    list-type="picture-card"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-upload="handleUpload"
                >
                    <el-icon><Plus /></el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" style="width:100%;height: 100%;"/>
                </el-dialog>
            </el-form-item>



            <!-- SPU销售属性 -->
            <el-form-item label="SPU销售属性">
                <!-- 下拉属性框 -->
                <el-select v-model="spuSelectAttr" :placeholder="unSelectAttr.length?`还有${unSelectAttr.length}个未选择`:'无'">
                    <el-option v-for="(item,_index) in unSelectAttr" :key="item.id" :value="`${item.id}:${item.name}`" :label="item.name"></el-option>
                </el-select>
                <el-button type="primary" icon="Plus" @click="addAttr" style="margin:0 10px;" :disabled="spuSelectAttr?false:true">添加属性</el-button>
                <!-- table展示属性 -->
                <el-table border style="margin:10px 0" :data="spuAttrValueList">
                    <el-table-column label="序号" align="center" width="80px" type="index"></el-table-column>
                    <el-table-column label="销售属性名" width="120px" prop="saleAttrName"></el-table-column>
                    <el-table-column label="销售属性值">
                        <!-- 添加属性值 -->
                        <template #="{row,$index}">
                            <el-tag v-for="(item,index) in row.spuSaleAttrValueList" :key="item.id" closable class="mx-1" style="margin:0 10px" @close="row.spuSaleAttrValueList.splice(index,1)">{{ item.saleAttrValueName }}</el-tag>
                             <el-input v-model="row.saleAttrValue" ref="attrInput" @blur="addAttrValue(row)" size="small" style="width:110px;" v-if="row.flag" placeholder="请输入属性值"></el-input>
                             <el-button type="primary" @click="toAdd(row)" icon="Plus" size="small" :disabled="attrButtonStatus" v-else></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template #="{row,$index}">
                            <el-button type="danger" size="small" icon="Delete" @click="spuAttrValueList.splice($index,1)"></el-button>
                        </template>
                    </el-table-column>
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
import { computed, onBeforeMount, ref } from 'vue';
import {SpuAttrData, SpuAttrValue, SpuAttrValueData, SpuAttrValuesResponse, SpuAttrsResponse, SpuDataRecord, SpuImageData, SpuImagesResponse, SpuTrademarkData, SpuTrademarksResponse} from '@/api/product/spu/type'
import { reqSpuAttrValues, reqSpuAttrs, reqSpuImages, reqSpuTrademarks, reqUpdateOrAddSpu } from '@/api/product/spu';
import { ElMessage } from 'element-plus';
// dialog是否可见
let dialogVisible = ref(false)
// dialog展示的图片url
let dialogImageUrl = ref()
// 存放品牌列表数据
let spuTrademarkList = ref<SpuTrademarkData[]>([])
// 存放spuimg列表数据
let spuImageList = ref<SpuImageData[]>([]) // 1
// 存放所有属性列表数据
let spuAllAttrList = ref<SpuAttrData[]>([])
// 存放所有属性值列表数据
let spuAttrValueList = ref<SpuAttrValueData[]>([]) // 1
// 存放被选中的属性
let spuSelectAttr = ref<string>('') // 1
// 存放总体的数据
let spuParams = ref<SpuDataRecord>({
    spuName:'',
    description:'',
    category3Id:'',
    tmId:'',
    spuSaleAttrList:[],
    spuImageList:[]
})


// 获取el-input实例(添加属性值input)
let attrInput = ref()
let attrButtonStatus = ref<boolean>(false)

// 自定义事件：更换场景(子去调用父的方法)
let $emit = defineEmits(['changeScene'])
const cancle = ()=>{
    // 通知父组件更改为场景0
    $emit('changeScene',0)
}
// 编辑模式：初始化数据(现有的+请求到的)
const initSpuData = async(spuBaseData:SpuDataRecord)=>{
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
    

    spuTrademarkList.value = result1.data
    spuImageList.value = result2.data.map((item:any)=>{ // 这里要转换成elementPlus需要的格式
        return{
            name:item.imgName,
            url:item.imgUrl
        }
    })
    spuAllAttrList.value = result3.data
    spuAttrValueList.value = result4.data

    // 添加属性值按钮状态重置
    attrButtonStatus.value=false
    // 清空一下选择属性（源码中这里没有，所以会产生一个bug）
    spuSelectAttr.value=''
}
// 添加模式：初始化数据
const initAddSpu = async(c3Id:number)=>{
    // 清空数据：总数据、图片数据、属性数据
    Object.assign(spuParams,{
        spuName:'',
        description:'',
        category3Id:'',
        tmId:'',
        spuSaleAttrList:[],
        spuImageList:[]
    })
    spuImageList.value = []
    spuAttrValueList.value = []
    // 存储该3级分类id
    spuParams.value.category3Id = c3Id
    // 获取品牌数据
    let result1:SpuTrademarksResponse = await reqSpuTrademarks()
    // 获取属性数据
    let result2:SpuAttrsResponse = await reqSpuAttrs()
    // 存储数据
    spuTrademarkList.value = result1.data
    spuAllAttrList.value = result2.data
}

// SPU图片展示el-upload的回调
const handlePreview = (uploadFile:any) =>{
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}
const handleRemove = () =>{
    return
}
const handleUpload = (uploadFile:any)=>{
    if (uploadFile.type == 'image/png' || uploadFile.type == 'image/jpeg' || uploadFile.type == 'image/gif') {
        if (uploadFile.size / 1024 / 1024 < 3) {
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件务必小于3M'
            })
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传文件务必PNG|JPG|GIF'
        })
        return false;
    }
}


// 计算出还没有的属性
const unSelectAttr = computed(()=>{
    const unSelectAttrFilter = spuAllAttrList.value.filter(item=>{
        return spuAttrValueList.value.every(item1=>{
            return item.name != item1.saleAttrName
        })
    })
    return unSelectAttrFilter
})


// 添加属性的回调
const addAttr = ()=>{
    const [spuAttrId,spuAttrName] = spuSelectAttr.value.split(':')
    let attr:SpuAttrValueData = {
        spuId:(spuParams.value.id as number),
        baseSaleAttrId:parseInt(spuAttrId),
        saleAttrName:spuAttrName,
        spuSaleAttrValueList:[],
    }
    spuAttrValueList.value.push(attr)
    spuSelectAttr.value=''
}



// 添加属性值的回调
const addAttrValue = (row:SpuAttrValueData)=>{
    // 非法情况1：为空
    if(row.saleAttrValue==undefined||row.saleAttrValue.trim()==''){
        ElMessage({
            type:'error',
            message:'请输入属性值！'
        })
        return
    }
    const attrValue:SpuAttrValue = {
        spuId:spuParams.value.id,
        baseSaleAttrId:row.baseSaleAttrId,
        saleAttrName:row.saleAttrName,
        saleAttrValueName:(row.saleAttrValue as string)
    }
    // 非法情况2：重复
    const isRepeat = row.spuSaleAttrValueList.find(item=>{
        return item.saleAttrValueName == row.saleAttrValue
    })
    if(isRepeat){
        ElMessage({
            type:'error',
            message:'属性值重复！'
        })
        return
    }
    row.spuSaleAttrValueList.push(attrValue)
    attrButtonStatus.value = false
    row.flag = false
}
const toAdd = (row:SpuAttrValueData)=>{
    row.saleAttrValue = ''
    attrButtonStatus.value=true
    row.flag = true
    attrInput.value.focus()
}




// 保存按钮回调
const save = async()=>{
    // 整合数据
    console.log(spuImageList)
    spuParams.value.spuImageList = spuImageList.value.map((item:any)=>{
        return{
            spuId:spuParams.value.id,
            imgName:item.name,
            imgUrl:(item.response && item.response.data) || item.url
        }
    })
    spuParams.value.spuSaleAttrList = spuAttrValueList.value
    // 发送请求
    let result:any = await reqUpdateOrAddSpu(spuParams.value)
    if(result.code==200){
        ElMessage({
            type:'success',
            message:spuParams.value.id?'修改成功':'添加成功'
        })
        cancle()
    }else{
        ElMessage({
            type:'success',
            message:spuParams.value.id?'修改失败':'添加失败'
        })
    }
}


defineExpose({
    initSpuData,
    initAddSpu
})
</script>

<style scoped>

</style>