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
      { path: 'vue3/toDoList', title: '待办任务' , key: 'v3-todo'},
    ],
  },
  {
    key: 'vue2',
    path: '/vue2',
    title: '【子应用】vue2',
    children: [
      // { path: 'vue2/home', title: '首页' },
      // { path: 'vue2/toDoList', title: '待办任务' },
      // { path: 'vue2/tasks', title: '任务管理' },
      // { path: 'vue2/micro-app', title: '微应用' },
      // { path: 'vue2/remote-component', title: '远程加载' },
    ],
  },
  {
    key: 'vite',
    path: '/vite',
    title: '【子应用】vite',
    children: [],
  },
];