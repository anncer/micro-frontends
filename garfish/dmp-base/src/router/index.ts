import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Layout from "../layout/index.vue";
const routes: RouteRecordRaw[] =  [
  {
    path: "/",
    name: "index",
    component: Layout,
    children: [
      {
        path: "/index",
        name: "index",
        component: AboutView
      },
      // {
      //   path: "/dmpCliV3",
      //   name: "dmpCliV3",
      // },
      // {
      //   path: "/dmpCliV3Sub/:path",
      //   name: "dmpCliV3Sub",
      // }
    ]
  },
  // {
  //   path: "/login",
  //   component: () => import("@/views/login/index.vue")
  // }
];


const index = createRouter({
  history: createWebHistory(),
  routes
})

export default index