import { h, createApp } from 'vue';
import { createRouter, createWebHistory } from "vue-router";
import { vueBridge } from '@garfish/bridge-vue-v3';
import App from './App.vue';
import routes from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import elementPlus from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

import compositeWare from "composite-ware";
import "element-plus/dist/index.css";
import "composite-ware/theme-chalk/index.css";

function newRouter(basename: string) {
  const router = createRouter({
    history: createWebHistory(basename),
    routes,
  });
  return router;
}

export const provider = vueBridge({
  rootComponent: App,
  appOptions: () => ({
    el: '#app',
    render: () => h(App),
  }),
  handleInstance: (vueInstance, { basename, dom, appName, props }) => {
    console.log(basename, dom, appName, props);
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      vueInstance.component(key, component);
    }
    vueInstance.use(newRouter(basename));
    vueInstance.use(elementPlus, { locale: zhCn });
    vueInstance.use(compositeWare);
  },
});

// There is no running show that the main application execution run, you can perform in micro front-end environment rendering
if (!window.__GARFISH__) {
    const router = newRouter("/");
  const app = createApp(App);
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  app.use(router);
  app.use(elementPlus, { locale: zhCn });
  app.use(compositeWare);
  app.mount("#app");
}
