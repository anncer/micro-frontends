import { fileURLToPath, URL } from 'node:url'
import path from 'path'
// import { fileURLToPath, URL } from 'node:url'
import DefineOptions from "unplugin-vue-define-options/vite";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
// import legacy from '@vitejs/plugin-legacy'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'



// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  server: {
    cors: true,
    host: '0.0.0.0',
    port: 7300,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
   plugins: [
    vue(),
    vueJsxPlugin(),
    DefineOptions(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    // legacy({
    //   targets: ['ie >= 11'],
    //   additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
