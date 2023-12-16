import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'userInfo',
  meta: {
    title: '用户信息',
    icon: 'icon-user',
    sort: 2
  },
  component: () => import('@/views/admin/user/user.vue')
} as RouteRecordRaw
