import type { TableColumns, FormFields } from '@/components'
import type { EmojiData } from '@/api/admin/emoji'
import { reactive } from 'vue'

export const fields = reactive<FormFields>([
  {
    key: 'q',
    label: '综合搜索',
    tag: 'ElInput'
  },
  {
    key: 'type',
    label: '分类',
    tag: 'MSelect',
    attrs: {
      options: []
    }
  }
])

export const columns: TableColumns = [
  {
    key: 'file',
    label: '表情',
    slot: true
  },
  {
    key: 'placeholder',
    label: '占位符'
  },
  {
    key: 'description',
    label: '描述'
  },
  {
    key: 'type.title',
    label: '分类'
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

export const dialogFields: FormFields<keyof EmojiData> = [
  {
    key: 'placeholder',
    label: '占位符',
    tag: 'ElInput',
    validateRules: [
      {
        required: true,
        message: '请输入占位符',
        trigger: 'change'
      }
    ]
  },
  {
    key: 'type',
    label: '分类',
    tag: 'MSelect',
    validateRules: [
      {
        required: true,
        message: '请选择分类',
        trigger: 'change'
      }
    ],
    attrs: {
      options: []
    }
  },
  {
    key: 'description',
    label: '描述',
    tag: 'ElInput'
  },
  {
    key: 'file',
    label: '表情',
    tag: 'MUpload',
    attrs: {
      max: 1,
      listType: 'picture-card'
    }
  }
]
