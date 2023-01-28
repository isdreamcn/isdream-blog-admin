import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'emoji',
  meta: {
    title: '表情管理',
    icon: 'icon-grid',
    sort: 7
  },
  redirect: 'type',
  children: [
    {
      path: 'type',
      meta: {
        title: '表情分类',
        icon: 'icon-collection',
        sort: 1
      },
      component: () => import('@/views/admin/emoji/type/type.vue')
    },
    {
      path: 'list',
      meta: {
        title: '表情列表',
        icon: 'icon-grid',
        sort: 2
      },
      component: () => import('@/views/admin/emoji/list/list.vue')
    }
  ]
} as RouteRecordRaw
