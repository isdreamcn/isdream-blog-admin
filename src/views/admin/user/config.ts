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
    key: 'username',
    label: '昵称'
  },
  {
    key: 'avatar',
    label: '头像',
    slot: true
  },
  {
    key: 'tempAvatar',
    label: '待审核头像',
    slot: true
  },
  {
    key: 'email',
    label: '邮箱'
  },
  {
    key: 'website',
    label: '网址',
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

export const dialogFields: FormFields = [
  {
    key: 'email',
    label: '邮箱',
    tag: 'ElInput',
    validateRules: [
      {
        required: true,
        message: '请输入邮箱',
        trigger: 'change'
      }
    ]
  },
  {
    key: 'username',
    label: '昵称',
    tag: 'ElInput',
    validateRules: [
      {
        required: true,
        message: '请输入昵称',
        trigger: 'change'
      }
    ]
  },
  {
    key: 'avatar',
    label: '头像',
    tag: 'ElInput'
  },
  {
    key: 'website',
    label: '网址',
    tag: 'ElInput'
  }
]
