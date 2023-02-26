import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

if (window.__POWERED_BY_WUJIE__) {
  let instance: any;
  window.__WUJIE_MOUNT = () => {
    instance = createApp(App)
      .use(createPinia())
      .use(router);
    instance.mount("#app");
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.unmount();
  };
  // module脚本异步加载，应用主动调用生命周期
  window.__WUJIE.mount();
} else {
    const app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.mount('#app')
}

