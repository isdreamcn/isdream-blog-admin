<template>
  <div class="m-view-file">
    <img
      v-if="props.mimeType?.indexOf('image') !== -1"
      v-viewer
      :src="filePath"
      :alt="props.src"
    />
    <a v-else :href="filePath" target="_blank">{{ props.src }}</a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { appConfig } from '@/config'
import { viewFileProps } from './viewFile'

defineOptions({
  name: 'MViewFile'
})

const props = defineProps(viewFileProps)

const filePath = computed(() => {
  if (/^https?:\/\//.test(props.src)) {
    return props.src
  }
  return appConfig.baseUrlFile + props.src
})
</script>

<style lang="scss" scoped>
.m-view-file {
  img {
    max-width: 100px;
    max-height: 100px;
    cursor: pointer;
    user-select: none;
  }
}
</style>
