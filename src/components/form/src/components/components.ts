import type { FormFieldAttrsOptions } from '../form'
import { buildProps, definePropType } from '@/utils'

// 单选
export const formComponentsProps = buildProps({
  modelValue: {
    type: definePropType<any>([String, Number, Boolean])
  },
  options: {
    type: definePropType<FormFieldAttrsOptions[]>(Array),
    default: () => []
  }
} as const)

// 多选
export const formComponentsMultipleProps = buildProps({
  modelValue: {
    type: definePropType<any>([Array])
  },
  options: {
    type: definePropType<FormFieldAttrsOptions[]>(Array),
    default: () => []
  }
} as const)

export const formComponentsEmits = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  'update:modelValue': (val: any) => true
}
