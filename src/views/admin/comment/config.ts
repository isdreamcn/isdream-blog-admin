import type { TableColumns, FormFields } from '@/components'

export const fields: FormFields = [
  {
    key: 'q',
    label: '综合搜索',
    tag: 'ElInput'
  },
  {
    key: 'approved',
    label: '审核状态',
    tag: 'MSelect',
    attrs: {
      options: [
        {
          label: '待审核',
          value: false
        },
        {
          label: '已通过',
          value: true
        }
      ],
      clearable: true
    }
  }
]

export const columns: TableColumns = [
  {
    key: 'approved',
    label: '审核状态',
    slot: true
  },
  {
    key: 'content',
    label: '留言内容'
  },
  {
    key: 'createdAt',
    label: '留言日期',
    slot: true
  },
  {
    key: 'actions',
    label: '操作',
    slot: true,
    fixed: 'right'
  }
]
