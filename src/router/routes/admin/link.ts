import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'link',
  meta: {
    title: '友链管理',
    icon: 'icon-link',
    sort: 5
  },
  redirect: 'type',
  children: [
    {
      path: 'type',
      meta: {
        title: '友链分类',
        icon: 'icon-collection',
        sort: 1
      },
      component: () => import('@/views/admin/link/type/type.vue')
    },
    {
      path: 'list',
      meta: {
        title: '友链列表',
        icon: 'icon-link',
        sort: 2
      },
      component: () => import('@/views/admin/link/list/list.vue')
    }
  ]
} as RouteRecordRaw
