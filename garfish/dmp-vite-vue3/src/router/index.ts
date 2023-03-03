import type { RouteRecordRaw } from "vue-router";
// import Layout from "@/layout/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "biweeklyReport",
    redirect: "/biweeklyReport",
    children: [
      // 双周报
      {
        path: "/biweeklyReport",     // 双周报用户上传
        name: 'biweeklyReport',
        component: () => import("@/views/biweeklyReport/index.vue")
      },
      {
        path: "/biweeklyView",     // 双周报领导查看 总览
        name: 'biweeklyView',
        component: () => import("@/views/biweeklyReport/view.vue")
      },
      {
        path: "/biweeklyBranched",     // 双周报领导查看 各部门上传情况
        name: 'biweeklyBranched',
        component: () => import("@/views/biweeklyReport/branched.vue")
      },
      {
        path: "/biweeklyHistory",     // 双周报领导查看 某部门历史情况
        name: 'biweeklyHistory',
        component: () => import("@/views/biweeklyReport/history.vue")
      },
      {
        path: "/biweeklySetting",     // 双周报领导查看 某部门历史情况
        name: 'biweeklySetting',
        component: () => import("@/views/biweeklyReport/biweekly-setting.vue")
      },
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
  },
  // {
  //   path: "/login",
  //   component: () => import("@/views/login/index.vue")
  // }
];

export default routes;
