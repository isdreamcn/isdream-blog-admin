import type { TableColumns, FormFields } from '@/components'

export const fields: FormFields = [
  {
    key: 'q',
    label: '综合搜索',
    tag: 'ElInput'
  }
]

export const columns: TableColumns = [
  {
    key: 'cover',
    label: '封面',
    slot: true
  },
  {
    key: 'title',
    label: '标题'
  },
  {
    key: 'render',
    label: '渲染方式',
    customRender: (v) => ['', 'markdown', '富文本'][v]
  },
  {
    key: 'views',
    label: '浏览量'
  },
  {
    key: 'commends',
    label: '评论量'
  },
  {
    key: 'isCommented',
    label: '允许评论',
    slot: true
  },
  {
    key: 'isTop',
    label: '置顶',
    slot: true
  },
  {
    key: 'createdAt',
    label: '创建日期',
    slot: true
  },
  {
    key: 'actions',
    label: '操作',
    slot: true,
    fixed: 'right'
  }
]
