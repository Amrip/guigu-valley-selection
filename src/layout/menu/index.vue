<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <el-menu-item
      v-if="!item.children && item.meta.show"
      :index="item.path"
      @click="goRoute"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 只有一个子路由 -->
    <el-menu-item
      v-if="
        item.children && item.children.length == 1 && item.children[0].meta.show
      "
      :index="item.children[0].path"
      @click="goRoute"
    >
      <el-icon>
        <component :is="item.children[0].meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 多于一个子路由 -->
    <el-sub-menu
      v-if="item.children && item.children.length >= 2"
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
defineProps(["menuList"]);
let $router = useRouter();
const goRoute = (vc: any) => {
  $router.push(vc.index);
};
</script>
<script lang="ts">
export default {
  name: "Menu",
};
</script>
<style scoped></style>
