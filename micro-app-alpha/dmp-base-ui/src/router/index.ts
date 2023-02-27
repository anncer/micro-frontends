import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
const basename = process.env.NODE_ENV === "production" ? "/demo-vue3/" : "";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(basename),
  routes,
});

export default router;
