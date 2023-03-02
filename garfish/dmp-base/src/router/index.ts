import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import MicroApps from '../views/MicroApps.vue'
import Layout from '../views/Layout.vue'

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
      {
        path: "/home",
        name: "home",
        component: HomeView
      },
      {
        name: "vue3App",
        path: 'vue3/:path',
        component: MicroApps
      }
    ],
  },
  {
    path: "/login",
    component: () => import("../views/login.vue")
  }
];


const index = createRouter({
  history: createWebHistory(),
  routes
})

export default index