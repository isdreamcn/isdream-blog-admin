import type { TableColumns, FormFields } from '@/components'
import type { EmojiTypeData } from '@/api/admin/emojiType'

export const fields: FormFields = [
  {
    key: 'q',
    label: '综合搜索',
    tag: 'ElInput'
  }
]

export const columns: TableColumns = [
  {
    key: 'title',
    label: '名称'
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

export const dialogFields: FormFields<keyof EmojiTypeData> = [
  {
    key: 'title',
    label: '名称',
    tag: 'ElInput',
    validateRules: [
      {
        required: true,
        message: '请输入名称',
        trigger: 'change'
      }
    ]
  }
]
