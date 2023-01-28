import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'comment',
  meta: {
    title: '留言',
    icon: 'icon-ChatLineRound',
    sort: 3
  },
  component: () => import('@/views/admin/comment/comment.vue')
} as RouteRecordRaw
