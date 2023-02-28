import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
      path: '/layout',
      name: 'layout',
      component: () => import('../layout/index.vue'), // 注意这里要带上 文件后缀.vue
      // component: () => import('@/layout/index.vue'), // 注意这里要带上 文件后缀.vue
      meta: { title: '首页' }
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
