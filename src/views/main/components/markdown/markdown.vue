<template>
  <div>
    {{ content }}
    <MMarkdown v-model="content"></MMarkdown>

    <p>Markdown View 组件</p>
    <MMarkdownView :value="content"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'DemoCpnsMMarkdown'
})

const content = ref('# 123')
</script>

<style lang="scss" scoped></style>
