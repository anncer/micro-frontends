import type GarfishInstance from 'garfish';
import {portMap} from '../../utils';

export const loadApp = 'loadApp';
export const basename = '';
export const prefixCls = '';

type AppInfo = NonNullable<Parameters<typeof GarfishInstance.run>[0]>['apps'];

const getProxyHost = (appName: string) =>
//@ts-ignore
  `http://localhost:${portMap[appName].port}`;

export const localApps: AppInfo = [
  {
    name: 'vue3',
    activeWhen: '/vue3',
    // 提供不同的挂载点，react 应用使用全局的 domGetter 挂载点
    // domGetter: '#content',
    entry: getProxyHost('dev/vue3'),
  },
  {
    name: 'vue2',
    // activeWhen 函数式写法，当 path 中包含 "/vue2" 时返回 true,app vue2 将会自动挂载至页面中，手动挂在时可不填写该参数
    activeWhen: (path) => path.includes('/vue2'),
    entry: getProxyHost('dev/vue2'),
  },
  {
    name: 'vite',
    activeWhen: '/vite',
    entry: getProxyHost('dev/vite'),
  },
];
