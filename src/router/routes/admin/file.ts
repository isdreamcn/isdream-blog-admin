import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'file',
  meta: {
    title: '文件',
    icon: 'icon-files',
    sort: 4
  },
  component: () => import('@/views/admin/file/file.vue')
} as RouteRecordRaw
