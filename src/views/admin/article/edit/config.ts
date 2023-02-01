import type { FormFields } from '@/components'
import type { ArticleData } from '@/api/admin/article'
import { reactive } from 'vue'

export const fields = reactive<FormFields<keyof ArticleData>>([
  {
    key: 'title',
    label: '文章标题',
    tag: 'ElInput',
    validateRules: [
      {
        required: true,
        message: '请输入文章标题',
        trigger: 'change'
      }
    ]
  },
  {
    key: 'tags',
    label: '标签',
    tag: 'ElTreeSelect',
    validateRules: [
      {
        required: true,
        message: '请选择文章标签',
        trigger: 'blur'
      }
    ],
    attrs: {
      data: [],
      'show-checkbox': true,
      multiple: true
    }
  },
  {
    key: 'cover',
    label: '文章封面',
    tag: 'MUpload',
    attrs: {
      max: 1,
      listType: 'picture-card'
    }
  },
  {
    key: 'isTop',
    label: '是否置顶',
    tag: 'ElSwitch'
  },
  {
    key: 'isCommented',
    label: '允许评论',
    tag: 'ElSwitch'
  },
  {
    key: 'render',
    label: '渲染方式',
    tag: 'MRadioGroup',
    attrs: {
      options: [
        {
          label: 'markdown',
          value: 1
        },
        {
          label: '富文本',
          value: 2
        }
      ]
    },
    on: {
      change: () => {}
    }
  },
  {
    key: 'content',
    label: '文章内容',
    tag: 'MMarkdown',
    validateRules: [
      {
        required: true,
        message: '请输入文章内容',
        trigger: 'blur'
      }
    ]
  }
])
