
import { CENTERED_ALIGNMENT } from 'element-plus/es/components/virtual-list/src/defaults.mjs';
<template>
    <div class="tabbar_container">
        <!-- 左侧部分 -->
        <div class="tabbar_left">
            <Breadcrumb></Breadcrumb>
        </div>
        <!-- 右侧部分 -->
        <div class="tabbar_right">
            <Setting></Setting>
        </div>
    </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<style lang="scss" scoped>
.tabbar_container{
    width:100%;
    height:100%;
    display:flex;
    justify-content:space-between;
    .tabbar_left{
        display:flex;
        align-items:center;
        margin-left:20px;
    }
    .tabbar_right{
        display:flex;
        align-items:center;
    }
}
</style>