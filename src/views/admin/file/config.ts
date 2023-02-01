import type { TableColumns, FormFields } from '@/components'
import { File } from '@/api/admin/file'

export const fields: FormFields = [
  {
    key: 'q',
    label: '综合搜索',
    tag: 'ElInput'
  }
]

export const columns: TableColumns<keyof File | 'actions'> = [
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
