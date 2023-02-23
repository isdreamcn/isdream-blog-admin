import type { FormProps } from '../form'
import type { Ref } from 'vue'
import { watch, ref } from 'vue'
import { cloneDeep } from '@/utils'

export const useFormData = (
  props: FormProps,
  showFields: Ref<FormProps['fields']>,
  change: (formData: Ref<Record<string, any>>) => void = () => {}
) => {
  const formData = ref<Record<string, any>>({})

  watch(
    () => showFields.value,
    (fields) => {
      const _formData: Record<string, any> = {}
      fields.forEach(
        (field) => (_formData[field.key] = formData.value[field.key])
      )
      formData.value = _formData
    },
    {
      immediate: true,
      deep: true
    }
  )

  // 默认值
  watch(
    () => props.modelValue,
    (val) => {
      if (!val || val === formData.value) {
        return
      }

      const _val = cloneDeep(val)
      const _formData: Record<string, any> = {}
      for (const key of Object.keys(formData.value)) {
        _formData[key] = _val[key]
      }

      formData.value = _formData
    },
    {
      immediate: true,
      deep: true
    }
  )

  // v-model
  watch(
    () => formData.value,
    () => change(formData),
    {
      immediate: true,
      deep: true
    }
  )

  return {
    formData
  }
}
