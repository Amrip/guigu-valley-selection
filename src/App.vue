<template>
  <div>
    <h1>APP根组件</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import {reqLogin} from './api/user'
onMounted(()=>{
  reqLogin({username:'admin',password:'12311'})
})
</script>

<style scoped lang="scss">
div {
  h1 {
    color: $base-color;
  }
}
</style>
