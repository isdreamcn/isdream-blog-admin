<template>
  <transition appear leave-active-class="animate__animated animate__zoomOut">
    <div v-show="props.loading" ref="loadingRef" class="m-loading">
      <slot>Loading~</slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadingProps } from './loading'

defineOptions({
  name: 'MLoading'
})

const props = defineProps(loadingProps)

const loadingRef = ref<Element>()
onMounted(() => {
  const parentElement = loadingRef.value!.parentElement
  if (parentElement) {
    parentElement.style.position = 'relative'
  }
})
</script>

<style lang="scss" scoped>
.m-loading {
  // 全局 loading 铺满视口：fixed 保证不随 #app 滚动容器漂移，
  // lottie 始终居中于当前视口而非文档中部
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  z-index: 9999;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  user-select: none;
}
</style>
