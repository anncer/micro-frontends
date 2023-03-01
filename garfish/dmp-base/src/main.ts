import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Garfish from 'garfish';
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import elementPlus from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import "./styles/index.scss";
import { Config } from './config';

Garfish.run(Config);

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(createPinia())
app.use(router)
app.use(elementPlus, { locale: zhCn });
// app.use(compositeWare);
app.mount('#app')
