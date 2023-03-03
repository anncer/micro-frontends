export default  [
  {
    key: 'main',
    path: '/main',
    title: '【主应用】vue3',
    children: [
      { path: '/index', title: '首页', key: 'main-home' },
      { path: '/home', title: 'home' , key: 'main-todo'},
    ],
  },
  {
    key: 'vue3',
    path: '/vue3',
    title: '【子应用】vue3',
    children: [
      { path: 'vue3/home', title: '首页', key: 'v3-home' },
      { path: 'vue3/todo', title: 'todo' , key: 'v3-todo'},
    ],
  },
  {
    key: 'vite',
    path: '/vite',
    title: '【子应用】vite',
    children: [
      { path: 'vite/biweeklyReport', title: '双周报管理', key: 'vite-biweeklyReport' },
      { path: 'vite/biweeklyView', title: '双周报查看' , key: 'vite-biweeklyView'},
      // { path: 'vite/biweeklyBranched', title: '双周报管理' , key: 'vite-biweeklyBranched'},
      // { path: 'vite/biweeklyHistory', title: '双周报管理' , key: 'vite-biweeklyHistory'},
      { path: 'vite/biweeklySetting', title: '双周报配置' , key: 'vite-biweeklySetting'},
    ],
  },
  {
    key: 'vit2',
    path: '/vit2',
    title: '【子应用】vit2',
    children: [
      { path: 'vit2/home', title: '首页' },
      // { path: 'vue2/toDoList', title: '待办任务' },
      // { path: 'vue2/tasks', title: '任务管理' },
      // { path: 'vue2/micro-app', title: '微应用' },
      // { path: 'vue2/remote-component', title: '远程加载' },
    ],
  },

];