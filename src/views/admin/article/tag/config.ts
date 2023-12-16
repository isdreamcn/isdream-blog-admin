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
    key: 'title',
    label: '标签',
    slot: true
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

export const dialogFields: FormFields = [
  {
    key: 'title',
    label: '标签',
    tag: 'ElInput',
    validateRules: [
      {
        required: true,
        message: '请选择标签',
        trigger: 'change'
      }
    ]
  },
  {
    key: 'color',
    label: '颜色',
    tag: 'MColorPicker',
    validateRules: [
      {
        required: true,
        message: '请选择颜色',
        trigger: 'change'
      }
    ]
  },
  {
    key: 'description',
    label: '描述',
    tag: 'ElInput'
  }
]
