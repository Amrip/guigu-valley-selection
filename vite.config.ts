// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
export default defineConfig(({command}) => {
  return{
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")], // svg存放地址
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        localEnabled: command === 'serve', // 保证开发阶段可以使用mock接口
      }),
    ],
    
    resolve: {
      alias: {
        "@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
      },
    },
  
    // scss全局配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData:  `
            @import "@/styles/variable.scss";
            @import "@/styles/element.scss"; 
          `,
        }
      },
    },  
  }


});
