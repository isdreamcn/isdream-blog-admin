import type { TableColumn, FormFields } from '@/components'
import type { LinkTypeData } from '@/api/admin/types/linkType.type'

export const fields: FormFields = [
  {
    key: 'q',
    label: '综合搜索',
    tag: 'ElInput'
  }
]

export const columns: TableColumn[] = [
  {
    key: 'title',
    label: '标题'
  },
  {
    key: 'description',
    label: '描述'
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

export const dialogFields: FormFields<keyof LinkTypeData> = [
  {
    key: 'title',
    label: '标题',
    tag: 'ElInput',
    validateRules: [
      {
        required: true,
        message: '请输入标题',
        trigger: 'change'
      }
    ]
  },
  {
    key: 'description',
    label: '描述',
    tag: 'ElInput',
    validateRules: [
      {
        required: true,
        message: '请输入描述',
        trigger: 'change'
      }
    ]
  }
]
