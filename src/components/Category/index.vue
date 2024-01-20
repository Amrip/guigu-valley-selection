<template>
    <div>
        <el-card>
            <el-form :inline="true">
                <el-form-item label="一级分类">
                    <el-select :disabled="scene==0?false:true" v-model="categoryStore.c1Id"  @change="getC2">
                        <el-option v-for="(c1,index) in categoryStore.c1Data" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                    <el-select :disabled="scene==0?false:true" v-model="categoryStore.c2Id" @change="getC3">
                        <el-option v-for="(c2,index) in categoryStore.c2Data" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="三级分类">
                    <el-select :disabled="scene==0?false:true" v-model="categoryStore.c3Id">
                        <el-option v-for="(c3,index) in categoryStore.c3Data" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import {reqC1} from '@/api/product/attr'
import {onMounted,ref,defineProps} from 'vue'
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
// 通知仓库获取一级分类的方法
const getC1 = ()=>{
    categoryStore.getC1()
}
// change事件回调
const getC2 = ()=>{
    categoryStore.c2Id='';
    categoryStore.c3Data=[];
    categoryStore.c3Id='';
    categoryStore.getC2()
}
const getC3 = ()=>{
    categoryStore.c3Id='';
    categoryStore.c3Data=[];
    categoryStore.getC3()
}
onMounted(() => {
    getC1()
});

defineProps(['scene'])
</script>
<style scoped>

</style>