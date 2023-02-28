import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
import Vue3 from "@/views/micro-app/Vue3.vue";
import Vue3Sub from "@/views/micro-app/Vue3-sub.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "main",
    children: [
      {
        path: "/main",
        name: "main",
        component: () => import("@/views/main/index.vue")
      },
      {
        path: "/dmpCliV3",
        name: "dmpCliV3",
        component: Vue3
      },
      {
        path: "/dmpCliV3Sub/:path",
        name: "dmpCliV3Sub",
        component: Vue3Sub
      }
    ]
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@/views/error-page/401.vue")
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error-page/404.vue")
  }
  // {
  //   path: "/login",
  //   component: () => import("@/views/login/index.vue")
  // }
];

export default routes;
