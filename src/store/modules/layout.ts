import { defineStore } from "pinia";

const useLayoutStore = defineStore("Layout", {
  state: () => {
    return {
      fond: false, // 左侧菜单折叠控制
      refresh: false, // 组件刷新效果控制
    };
  },
});

export default useLayoutStore;
