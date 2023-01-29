<template>
  <el-checkbox-group v-model="value">
    <el-checkbox
      v-for="item in props.options"
      :key="item.label"
      :label="item.value"
      :disabled="item.disabled"
    >
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formComponentsMultipleProps, formComponentsEmits } from './components'

defineOptions({
  name: 'MCheckboxGroup'
})

const props = defineProps(formComponentsMultipleProps)
const emit = defineEmits(formComponentsEmits)

const value = computed({
  get: () => {
    return props.modelValue
  },
  set: (val: any[]) => {
    emit('update:modelValue', val)
  }
})
</script>

<style lang="scss" scoped></style>
