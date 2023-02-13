import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由配置
 * @description 所有路由都在这里集中管理
 */
const routes: RouteRecordRaw[] = [
  /**
   * 首页
   */
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@views/home.vue'),
    meta: {
      title: 'Home',
    },
  },
  /**
   * 子路由示例
   */
  {
    path: '/ball',
    name: 'ball',
    component: () => import(/* webpackChunkName: "foo" */ '@cp/Ball.vue'),
    meta: {
      title: 'Ball',
    },
  },
  {
    path: '/scene',
    name: 'scene',
    component: () =>
      import(/* webpackChunkName: "foo" */ '@views/scene/index.vue'),
    meta: {
      title: 'Scene',
    },
  },
  {
    path: '/rotateBall',
    name: 'rotateBall',
    component: () => import(/* webpackChunkName: "foo" */ '@cp/RotateBall.vue'),
    meta: {
      title: 'RotateBall',
    },
  },
  {
    path: '/:pathMatch(.*)',
    name: 'bad-not-found',
    component: () => import(/* webpackChunkName: "home" */ '@views/home.vue'),
  },
]

export default routes
