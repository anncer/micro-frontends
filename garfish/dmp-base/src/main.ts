import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Garfish from 'garfish';

import './assets/main.css'

import portMap from '../../config.json';

const getProxyHost = (appName: string) =>
// @ts-ignore
  `http://localhost:${portMap[appName].port}`;


Garfish.run({
  basename: '/',
  domGetter: '#app',
  apps: [
    {
      name: 'vue3',
      activeWhen: '/vue3',
      entry: getProxyHost('dev/vue3'),
    },
    {
      name: 'vite',
      activeWhen: '/vite',
      entry: getProxyHost('dev/vite'),
    },
    {
      name: 'vue2',
      // activeWhen 函数式写法，当 path 中包含 "/vue2" 时返回 true,app vue2 将会自动挂载至页面中，手动挂在时可不填写该参数
      activeWhen: (path) => path.includes('/vue2'),
      entry: getProxyHost('dev/vue2'),
    },
    // {
    //   name: 'vue',
    //   activeWhen: '/vue',
    //   entry: 'http://localhost:8080/index.js', // js入口
    // },
  ],
});

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
