// import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
//@ts-ignore
import { portMap } from "../utils";

const appName = 'dev/main';
const port = portMap[appName].port;

//@ts-ignore
export default ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };
  return defineConfig({
    base: `http://localhost:${port}`,
    server: {
      port,
      cors: true,
      origin: `http://localhost:${port}`,
    },
    plugins: [vue(), vueJsx()],
  });
};

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue(), vueJsx()],
//   server: {
//     host: '0.0.0.0',
//     port: 8080,
//     open: false,
//     https: false,
//     headers: {
//       "Access-Control-Allow-Origin": "*"
//     },
//     proxy: {}
//   },
  
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })
