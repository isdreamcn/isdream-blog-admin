import type Form from './form.vue'
import type { GlobalComponents } from '@/plugins/components/components'
import type { FormComponents } from './components'
import type { ExtractPropTypes, Component } from 'vue'
import type {
  ColProps,
  FormItemRule,
  FormInstance as ElFormInstance
} from 'element-plus'
import { buildProps, definePropType, isObject } from '@/utils'

export interface FormFieldAttrsOptions {
  label: string
  value: string | number | boolean
  disabled?: boolean
}

export interface FormPropsField<T = string> {
  tag: GlobalComponents | FormComponents | Component
  key: T
  label?: string
  // show !== false 则显示
  show?: boolean
  slot?: boolean
  attrs?: { options?: FormFieldAttrsOptions[]; [key: string]: any }
  on?: Record<string, (...payload: any[]) => void>
  colAttrs?: number | ColProps
  placeholder?: string
  validateRules?: FormItemRule[]
}

export const formProps = buildProps({
  fields: {
    type: definePropType<FormPropsField[]>(Array),
    required: true
  },
  modelValue: Object,
  labelWidth: {
    type: Number,
    default: 100
  },
  colAttrs: {
    type: definePropType<number | ColProps>([Number, Object]),
    default: 6
  },
  // 按钮放入col
  inline: {
    type: Boolean,
    default: true
  },
  // 提交按钮
  loading: {
    type: Boolean,
    default: false
  },
  // 防抖
  debounce: {
    type: Boolean,
    default: true
  },
  submitText: String,
  cancelText: String,
  submitIcon: String,
  cancelIcon: String
} as const)

export const formEmits = {
  'update:modelValue': (formData: Record<string, any>) => isObject(formData),
  submit: (formData: Record<string, any>) => isObject(formData),
  cancel: (formData: Record<string, any>) => isObject(formData),
  getForm: (elFormRef: ElFormInstance) => !!elFormRef
}

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormEmits = typeof formEmits

export type FormFields<T = string> = FormPropsField<T>[]

export type FormInstance = InstanceType<typeof Form>
