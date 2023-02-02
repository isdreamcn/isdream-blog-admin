import type { TableColumns, FormFields } from '@/components'
import type { LinkData } from '@/api/admin/types/link.type'
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
    key: 'icon',
    label: '头像',
    slot: true
  },
  {
    key: 'title',
    label: '名称',
    slot: true
  },
  {
    key: 'description',
    label: '简介'
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

export const dialogFields = reactive<FormFields<keyof LinkData>>([
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
  },
  {
    key: 'description',
    label: '简介',
    tag: 'ElInput',
    validateRules: [
      {
        required: true,
        message: '请输入简介',
        trigger: 'change'
      }
    ]
  },
  {
    key: 'icon',
    label: '头像',
    tag: 'ElInput',
    validateRules: [
      {
        required: true,
        message: '请输入头像地址',
        trigger: 'change'
      }
    ]
  },
  {
    key: 'link',
    label: '网址',
    tag: 'ElInput',
    validateRules: [
      {
        required: true,
        message: '请输入网址',
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
        trigger: 'blur'
      }
    ],
    attrs: {
      options: []
    }
  }
])
