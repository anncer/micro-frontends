import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    children: [
      {
        path: "/biweeklyReport", // 双周报用户上传
        name: "biweeklyReport",
        component: () => import("@/views/biweeklyReport/index.vue"),
      },
      // {
      //   path: "/biweeklyView", // 双周报领导查看 总览
      //   name: "biweeklyView",
      //   component: () => import("@/views/biweeklyReport/view.vue"),
      // },
      // {
      //   path: "/biweeklyBranched", // 双周报领导查看 各部门上传情况
      //   name: "biweeklyBranched",
      //   component: () => import("@/views/biweeklyReport/branched.vue"),
      // },
      // {
      //   path: "/biweeklyHistory", // 双周报领导查看 某部门历史情况
      //   name: "biweeklyHistory",
      //   component: () => import("@/views/biweeklyReport/history.vue"),
      // },
      // {
      //   path: "/biweeklySetting", // 双周报领导查看 某部门历史情况
      //   name: "biweeklySetting",
      //   component: () => import("@/views/biweeklyReport/biweekly-setting.vue"),
      // },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

export default routes;
