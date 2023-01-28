<template>
  <MImg
    v-if="showImg && props.src"
    :src="props.src"
    @error="errorHandler"
  ></MImg>
  <div v-else class="m-img">
    <svg width="100%" height="100%">
      <circle cx="50%" cy="50%" r="50%" :fill="hashColor(props.username)" />
      <text
        x="50%"
        y="50%"
        fill="white"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        {{ props.username.slice(0, 1) }}
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { debounce } from 'lodash-unified'
import { imgAvatarProps, hashColor } from './imgAvatar'

defineOptions({
  name: 'MImgAvatar'
})

const props = defineProps(imgAvatarProps)

const showImg = ref(true)
const errorHandler = () => {
  showImg.value = false
}

watch(
  () => props.src,
  debounce((val) => {
    if (val) {
      showImg.value = true
    }
  }, 500)
)
</script>

<style lang="scss" scoped>
.m-img {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>
