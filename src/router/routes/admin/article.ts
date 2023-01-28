import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'article',
  meta: {
    title: '文章管理',
    icon: 'icon-tickets',
    sort: 5
  },
  redirect: 'tag',
  children: [
    {
      path: 'tag',
      meta: {
        title: '文章标签',
        icon: 'icon-PriceTag',
        sort: 1
      },
      component: () => import('@/views/admin/article/tag/tag.vue')
    },
    {
      path: 'list',
      meta: {
        title: '文章列表',
        icon: 'icon-tickets',
        sort: 2
      },
      component: () => import('@/views/admin/article/list/list.vue')
    }
  ]
} as RouteRecordRaw
