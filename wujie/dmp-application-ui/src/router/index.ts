import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const basename = process.env.NODE_ENV === "production" ? "/demo-vue3/" : "";

const router = createRouter({
  history: createWebHistory(basename),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
