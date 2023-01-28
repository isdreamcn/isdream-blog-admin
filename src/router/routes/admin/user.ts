import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'user',
  meta: {
    title: '用户',
    icon: 'icon-user',
    sort: 2
  },
  component: () => import('@/views/admin/user/user.vue')
} as RouteRecordRaw
