<template>
  <MImg
    :src="src"
    :thumb="joinBaseUrlFile(props.thumb) ?? mainImgThumb"
    :lazy="props.lazy"
    @error="errorHandler"
  >
    <slot></slot>
  </MImg>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import mainImg from '@/assets/img/main.png'
import mainImgThumb from '@/assets/img/main-thumb.png'
import { imgProps } from './img'
import app from '@/config'

defineOptions({
  name: 'MImgDefault'
})

const props = defineProps(imgProps)

const joinBaseUrlFile = (url?: string) => {
  if (!url || /^http/.test(url)) {
    return url
  }
  return app.baseUrlFile + url
}

const src = ref<string>(joinBaseUrlFile(props.src) ?? mainImg)
const errorHandler = () => {
  src.value = mainImg
}
</script>

<style lang="scss" scoped></style>
