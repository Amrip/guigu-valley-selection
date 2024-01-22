<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layoutStore.fond ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      v-show="item.meta.title"
      :to="item.path"
      :key="index"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="margin: 0px 5px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutStore from "@/store/modules/layout";
import { useRoute } from "vue-router";
let layoutStore = useLayoutStore();
let $route = useRoute();
const changeIcon = () => {
  layoutStore.fond = !layoutStore.fond;
};
</script>

<style scoped></style>
