<template>
  <el-button
    size="small"
    icon="Refresh"
    @click="updateRefresh"
    circle
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    @click="fullScreen"
    circle
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    style="width: 28px; height: 28px; margin: 0px 20px; border-radius: 50%"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logOut">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayoutStore from "@/store/modules/layout";
import useUserStore from "@/store/modules/user";
import { useRouter, useRoute } from "vue-router";
let userStore = useUserStore();
let layoutStore = useLayoutStore();
let $router = useRouter();
let $route = useRoute();
const updateRefresh = () => {
  layoutStore.refresh = !layoutStore.refresh;
};
const fullScreen = () => {
  // 判断是否是全屏
  let isFull = document.fullscreenElement;
  if (!isFull) {
    // 进入全屏
    document.documentElement.requestFullscreen();
  } else {
    // 退出全屏
    document.exitFullscreen();
  }
};
const logOut = async () => {
  await userStore.userLogout();
  $router.push({ path: "/login", query: { redirect: $route.path } });
};
</script>

<style scoped></style>
