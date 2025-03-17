import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

// 定义路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'), // 懒加载
  },
  {
    path: '/signaturePad',
    name: 'SignaturePad',
    component: () => import('../views/SignaturePad.vue'), // 懒加载
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;