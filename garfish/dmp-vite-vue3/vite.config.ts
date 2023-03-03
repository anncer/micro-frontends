import {  loadEnv } from 'vite'
import type {ConfigEnv, UserConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// @ts-ignore
import { portMap } from "../utils";
import path from 'path'
import DefineOptions from "unplugin-vue-define-options/vite";

const appName = 'dev/vite';
const port = portMap[appName].port;

export default ({ mode }: ConfigEnv): UserConfig=> {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };
  return {
    base: `http://localhost:${port}`,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      }
    },
    server: {
      port,
      cors: true,
      origin: `http://localhost:${8090}`,
    },
    plugins: [
      vue(),
      DefineOptions(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
  };
};