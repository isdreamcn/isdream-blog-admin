<template>
  <div class="m-markdown">
    <div :id="vditorId" />
  </div>
</template>

<script setup lang="ts">
//TODO https://b3log.org/vditor/
import '~/public/vditor/ant'
import '~/public/vditor/zh_CN'
import { markdownProps, markdownEmits } from './markdown'
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import Vditor from 'vditor'
import { uniqueId } from 'lodash-unified'
import { setBaseUrlFile } from '@/utils'
import 'vditor/dist/index.css'
import { useVditorTheme, useVditorUpload } from './hooks'

defineOptions({
  name: 'MMarkDown'
})

const props = defineProps(markdownProps)
const emit = defineEmits(markdownEmits)

const vditorId = uniqueId('vditor-')
const vditor = ref<Vditor>()
const { vditorTheme } = useVditorTheme(vditor)

// value
const vditorValue = ref(setBaseUrlFile(props.modelValue))
// 上传图片
const { vditorUploadOptions } = useVditorUpload(props, (imgUrl, filename) => {
  vditorValue.value += `![${filename}](${imgUrl})`
})

watch(
  () => props.modelValue,
  (val) => {
    if (val === vditorValue.value) {
      return
    }

    if (vditor.value) {
      vditor.value.setValue(setBaseUrlFile(val))
    }
  },
  {
    immediate: true
  }
)

watch(
  () => vditorValue.value,
  (val) => {
    emit('update:modelValue', val)
    emit('change', val)
  }
)

const init = () => {
  vditor.value = new Vditor(vditorId, {
    // 设置外观主题
    theme: vditorTheme.theme.value,
    lang: 'zh_CN',
    i18n: window.VditorI18n,
    mode: 'ir',
    toolbar: props.toolbar,
    preview: {
      theme: {
        // 设置内容主题
        current: vditorTheme.content.value
      },
      hljs: {
        // 设置代码块主题
        style: vditorTheme.code.value
      },
      actions: []
    },
    cache: {
      enable: false
    },
    ...vditorUploadOptions,
    ...props.options,
    input: (v) => {
      vditorValue.value = v
    },
    after: () => {
      // vditor.value is a instance of Vditor now and thus can be safely used here
      vditor.value!.setValue(vditorValue.value)
      emit('getVditor', vditor.value!)
    }
  })
}

const destroy = () => {
  vditor.value!.destroy()
  vditor.value = undefined
}

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  destroy()
})
</script>

<style lang="scss" scoped>
.m-markdown {
  width: 100%;
  margin-top: 20px;
}
</style>
