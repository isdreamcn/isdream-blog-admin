<template>
  <div class="m-form">
    <el-form
      ref="elFormRef"
      :label-width="props.labelWidth"
      v-bind="$attrs"
      :model="formData"
      :rules="formRules"
    >
      <el-row :gutter="20">
        <el-col
          v-for="field in fields"
          :key="field.key"
          v-bind="field.colAttrs"
        >
          <el-form-item :label="field.label" :prop="field.key">
            <component
              v-if="field.slot !== true"
              v-bind="field.attrs || {}"
              v-on="field.on || {}"
              :is="field.tag"
              :placeholder="field.placeholder"
              v-model="formData[field.key]"
            ></component>
            <slot
              v-else
              :name="field.key"
              :field="field"
              :value="formData[field.key]"
            ></slot>
          </el-form-item>
        </el-col>
        <!-- buttons -->
        <el-col v-if="props.inline" v-bind="defaultColAttrs">
          <slot name="buttons">
            <el-button-group>
              <el-button @click="cancel">
                <MIcon
                  :name="props.cancelIcon || 'icon-refreshLeft'"
                  v-if="props.cancelIcon || !props.cancelText"
                />
                {{ props.cancelText || '重置' }}
              </el-button>
              <el-button
                type="primary"
                :loading="props.loading"
                @click="submit"
              >
                <MIcon
                  :name="props.submitIcon || 'icon-search'"
                  v-if="props.submitIcon || !props.submitText"
                />
                {{ props.submitText || '搜索' }}
              </el-button>
            </el-button-group>
          </slot>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="!props.inline" class="m-form__buttons">
      <slot name="buttons">
        <el-space :size="20">
          <el-button @click="cancel">
            <MIcon
              :name="props.cancelIcon || 'icon-refreshLeft'"
              v-if="props.cancelIcon || !props.cancelText"
            />
            {{ props.cancelText || '取消' }}
          </el-button>
          <el-button type="primary" @click="submit" :loading="props.loading">
            <MIcon
              :name="props.submitIcon || 'icon-check'"
              v-if="!props.loading && (props.submitIcon || !props.submitText)"
            />
            {{ props.submitText || '提交' }}
          </el-button>
        </el-space>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { ref, onMounted } from 'vue'
import { cloneDeep } from '@/utils'
import { formProps, formEmits } from './form'
import { useFields, useFormData, useFormRules } from './hooks'

defineOptions({
  name: 'MForm',
  inheritAttrs: false
})

const props = defineProps(formProps)
const emit = defineEmits(formEmits)

const { fields, showFields, defaultColAttrs } = useFields(props)

const { formData } = useFormData(props, showFields, (formData) => {
  emit('update:modelValue', formData.value)
})

const { formRules } = useFormRules(props)

// actions
const elFormRef = ref<FormInstance>()

// 防抖
let oldFormValue = ''
const canEmit = (data: any) => {
  if (!props.debounce) {
    return true
  }
  const str = JSON.stringify(data)
  if (str !== oldFormValue) {
    oldFormValue = str
    return true
  }

  return false
}

const submit = () => {
  elFormRef.value?.validate((isValid, invalidFields) => {
    if (isValid && canEmit(formData.value)) {
      emit('submit', cloneDeep(formData.value))
    } else if (invalidFields) {
      // 滚动到验证错误的字段
      const errorFieldKey = Object.keys(invalidFields)[0]
      elFormRef.value!.scrollToField(errorFieldKey)
    }
  })
}

const cancel = () => {
  elFormRef.value?.resetFields()
  if (canEmit(formData.value)) {
    emit('cancel', cloneDeep(formData.value))
  }
}

onMounted(() => {
  if (elFormRef.value) {
    emit('getForm', elFormRef.value)
  }
})
</script>

<style lang="scss" scoped>
.m-form {
  .m-icon {
    margin-right: 5px;
  }
  .m-form__buttons {
    display: flex;
    justify-content: center;
  }
}
</style>
