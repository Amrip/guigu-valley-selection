<template>
  <div>
    <h1>这是主路由</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();
onMounted(() => {
  userStore.userInfo();
});
</script>

<style scoped></style>
