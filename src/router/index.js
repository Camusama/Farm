import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  },
  {
    path: '/dashboard',
    component: Layout,
    meta: { title: '测土配方', icon: 'example' },
    children: [
      {
        name: '测土配方',
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '测土配方', icon: 'home' }
      }
    ]
  },
  {
    path: '/crop',
    component: Layout,
    redirect: '/crop/index',
    meta: { title: '本地作物', icon: 'example' },
    children: [
      {
        path: 'index',
        name: '本地作物',
        component: () => import('@/views/crops/index'),
        meta: { title: '本地作物', icon: 'example' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/grow',
    meta: {
      title: '作物相关',
      icon: 'seed'
    },
    children: [
      {
        path: 'grow',
        name: '作物栽培',
        component: () => import('@/views/CropRel/grow'),
        meta: { title: '作物栽培' }
      },
      {
        path: 'seed',
        name: '良种推介',
        component: () => import('@/views/CropRel/seed'),
        meta: { title: '良种推介' }
      },
      {
        path: 'month',
        name: '每月农事',
        component: () => import('@/views/CropRel/month'),
        meta: { title: '每月农事' }
      },
      {
        path: 'pest',
        name: '病虫诊断',
        component: () => import('@/views/CropRel/pest'),
        meta: { title: '病虫诊断' }
      }
    ]
  },
  {
    path: '/farm',
    component: Layout,
    name: '农事相关',
    redirect: '/nested/menu1',
    meta: {
      title: '农事相关',
      icon: 'farm'
    },
    children: [
      {
        path: 'biocide',
        name: '常用农药',
        component: () => import('@/views/FarmRel/biocide'),
        meta: { title: '常用农药' }
      },
      {
        path: 'fertilizer',
        name: '用肥指南',
        component: () => import('@/views/FarmRel/fertilizer'),
        meta: { title: '用肥指南' }
      },
      {
        path: 'safety',
        name: '安全知识',
        component: () => import('@/views/FarmRel/safety'),
        meta: { title: '安全知识' }
      },
      {
        path: 'weather',
        name: '天气灾害',
        component: () => import('@/views/FarmRel/weather'),
        meta: { title: '天气灾害' }
      }
    ]
  },

  {
    path: '/users',
    component: Layout,
    redirect: '/users/index',
    name: '用户管理',
    meta: {
      title: '用户管理',
      icon: 'form'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/users/index'),
        meta: { title: '用户管理', icon: 'form' }
      }
    ]
  },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
