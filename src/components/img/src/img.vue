<template>
  <div ref="mImgElRef" class="m-img">
    <template v-if="loading">
      <img
        v-show="!showThumb"
        :src="props.src"
        v-bind="$attrs"
        @load="onLoad"
        @error="onError"
      />
      <!-- thumb -->
      <img
        v-if="showThumb"
        class="ground-glass"
        :src="props.thumb"
        v-bind="$attrs"
        @error="onThumbError"
      />
    </template>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { imgProps, imgEmits } from './img'

defineOptions({
  name: 'MImg'
})

const props = defineProps(imgProps)
const emit = defineEmits(imgEmits)

const showThumb = ref(!!props.thumb)
const onLoad = () => {
  showThumb.value = false
  emit('load')
}

const onThumbError = () => {
  showThumb.value = false
}

const onError = () => {
  emit('error')
}

// lazy loading
const loading = ref(!props.lazy)
let observer: IntersectionObserver | null = null
const mImgElRef = ref<HTMLElement>()

onMounted(() => {
  if (!props.lazy) {
    return
  }
  observer = new IntersectionObserver((entries) => {
    if (loading.value) {
      observer!.disconnect()
    }
    if (entries[0].intersectionRatio <= 0) {
      return
    }
    loading.value = true
  })

  // 开始监听一个目标元素
  observer.observe(mImgElRef.value!)
})

// 停止监听
onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style lang="scss" scoped>
.m-img {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 1px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    transition: var(--animate-duration);
    &.ground-glass {
      filter: blur(15px);
      // 隐藏白边
      width: calc(100% + 50px);
      height: calc(100% + 50px);
      top: -25px;
      left: -25px;
    }
  }
}
</style>
