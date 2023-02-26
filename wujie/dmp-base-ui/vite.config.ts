import path from "path";
// import { fileURLToPath, URL } from 'node:url'
import DefineOptions from "unplugin-vue-define-options/vite";
import { ConfigEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsxPlugin from "@vitejs/plugin-vue-jsx";
// import legacy from '@vitejs/plugin-legacy'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import server from "./vite.server";

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  return {
    server,
    plugins: [
      vue(),
      vueJsxPlugin(),
      DefineOptions(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]"
      })
    ],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./"),
        "@": path.resolve(__dirname, "src")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      }
    },
    build: {
      target: "es2015",
      cssTarget: "chrome80",
      outDir: path.resolve(__dirname, "dist"),
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          inlineDynamicImports: false,
          manualChunks: {
            "modules-vue": ["vue", "vue-router", "pinia"]
          }
        }
      }
    },
    optimizeDeps: {
      include: [
        "element-plus/lib/locale/lang/zh-cn",
        "element-plus/lib/locale/lang/en"
      ]
    }
  };
};
