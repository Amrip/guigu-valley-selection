<template>
  <div>
    <router-view v-slot="{ Component }">
      <!-- 渲染过度动画 -->
      <transition name="fade">
        <!-- 渲染layout一级路由组件的子路由 -->
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import useLayoutStore from "@/store/modules/layout";
import { ref, watch, nextTick } from "vue";
let layoutStore = useLayoutStore();
let flag = ref(true);
// 监听改变，进行刷新
watch(
  () => layoutStore.refresh,
  () => {
    flag.value = false;
    nextTick(() => {
      // DOM更新后再执行一些操作
      flag.value = true;
    });
  },
);
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
