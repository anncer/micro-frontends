import "whatwg-fetch"; // fetch polyfill
import "custom-event-polyfill";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./router/permission";

// import { useRouter } from 'vue-router';

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import elementPlus from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

import compositeWare from "composite-ware";

import "element-plus/dist/index.css";
import "composite-ware/theme-chalk/index.css";

import "normalize.css";
import "./styles/index.scss";
import "virtual:svg-icons-register";

import hostMap from "./micro/hostMap";
import lifecycles from "./micro/lifecycle";
// import plugins from "./micro/plugin";
import credentialsFetch from "./micro/fetch";
import WujieVue from "wujie-vue3";

const { setupApp, preloadApp, bus } = WujieVue;

import type { preOptions } from "wujie";

bus.$on("click", (msg: any) => console.log(`[wujie]: ${msg}`));

// const routerBranch = useRouter();

// 在 xxx-sub 路由下子应用将激活路由同步给主应用，主应用跳转对应路由高亮菜单栏
bus.$on("sub-route-change", (name: any, path: any) => {
  const mainName = `${name}-sub`;
  const mainPath = `/${name}-sub${path}`;
  const currentName = router.currentRoute.value.name;
  const currentPath = router.currentRoute.value.path;
  if (mainName === currentName && mainPath !== currentPath) {
    router.push({ path: mainPath });
  }
});

const degrade =
  window.localStorage.getItem("degrade") === "true" ||
  !window.Proxy ||
  !window.CustomElementRegistry;

const props = {
  jump: (name: any) => {
    router.push({ name });
  }
};
/**
 * 大部分业务无需设置 attrs
 * 此处修正 iframe 的 src，是防止github pages csp报错
 * 因为默认是只有 host+port，没有携带路径
 */
const isProduction = process.env.NODE_ENV === "production";

const attrs = isProduction ? { src: hostMap("//localhost:8000/") } : {};
/**
 * 配置应用，主要是设置默认配置
 * preloadApp、startApp的配置会基于这个配置做覆盖
 */

setupApp({
  name: "dmpCliV3",
  url: hostMap("//localhost:7300/"),
  attrs,
  exec: true,
  alive: true,
  // plugins: plugins.push(),
  plugins: [
    {
      cssExcludes: [
        "https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
      ]
    }
  ],
  props,
  // 引入了的第三方样式不需要添加 credentials
  fetch: (url: any, options: any) =>
    url.includes(hostMap("//localhost:7300/"))
      ? credentialsFetch(url, options)
      : window.fetch(url, options),
  degrade,
  ...lifecycles
});

if (window.localStorage.getItem("preload") !== "false") {
  if (window.Proxy) {
    const obj: preOptions = {
      name: "dmpCliV3",
      url: hostMap("//localhost:7300/")
    };
    preloadApp(obj);
  }
}

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router);
app.use(WujieVue);
app.use(createPinia());
app.use(elementPlus, { locale: zhCn });
app.use(compositeWare);
app.mount("#app");
