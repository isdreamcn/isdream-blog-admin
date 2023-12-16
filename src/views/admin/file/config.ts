import type { TableColumn, FormFields } from '@/components'

export const fields: FormFields = [
  {
    key: 'q',
    label: '综合搜索',
    tag: 'ElInput'
  }
]

export const columns: TableColumn[] = [
  {
    key: 'url',
    label: '预览',
    slot: true
  },
  {
    key: 'filename',
    label: '文件名'
  },
  {
    key: 'mimeType',
    label: '文件类型'
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

export const dialogFields: FormFields = [
  {
    key: 'file',
    label: '附件',
    tag: 'MUpload',
    attrs: {
      listType: 'picture-card'
    },
    on: {}
  }
]
