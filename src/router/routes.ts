import { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: import(
      /* webpackChunkName: 'index' */ '../pages/index/index'
    ),
  },
];

export default routes;
