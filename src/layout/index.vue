<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <!-- logo -->
      <div class="logo" v-if="setting.logoShow">
        <img :src="setting.logo" alt="" />
        <p>{{ setting.title }}</p>
      </div>
      <!-- 展示菜单 -->
      <el-scrollbar class="scrollbar">
        <el-menu
          :collapse="layoutStore.fond"
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
          active-text-color="green"
        >
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{ fond: layoutStore.fond }">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示 -->
    <div class="layout_main" :class="{ fond: layoutStore.fond }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import setting from "@/setting";
import Menu from "./menu/index.vue";
import useUserStore from "@/store/modules/user";
import Main from "./main/index.vue";
import { useRoute } from "vue-router";
import Tabbar from "./tabbar/index.vue";
import useLayoutStore from "@/store/modules/layout";

let userStore = useUserStore(); // 获取仓库
let layoutStore = useLayoutStore();
let $route = useRoute(); // 获取路由对象


</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;
    .logo {
      height: $base-menu-logo-height;
      display: flex;
      font-size: $base-logo-title-fontSize;
      align-items: center;
      margin-left: 12px;
      font-weight: bold;
      color: #e7e7e7;
      img {
        width: 40px;
        height: 40px;
      }
      p {
        margin-left: 20px;
      }
    }
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout_tabbar {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background: white;
    border-bottom: 1px solid rgb(216, 216, 216);
    box-shadow: 0px 5px 5px -5px #9b9b9b;
    position: fixed;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;
    z-index: 3;
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: white;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
  }
  .fond {
    width: calc(100vw - $base-menu-min-width);
    left: $base-menu-min-width;
  }
}
</style>
