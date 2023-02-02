<template>
  <div class="m-img-avatar">
    <MImg
      v-if="props.src"
      v-show="showImg"
      :src="props.src"
      @error="errorHandler"
      @load="loadHandler"
    ></MImg>
    <svg v-show="!showImg" width="100%" height="100%">
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

const showImg = ref(false)
const errorHandler = () => {
  showImg.value = false
}
const loadHandler = () => {
  showImg.value = true
}

watch(
  () => props.src,
  debounce((val) => {
    if (val) {
      showImg.value = false
    }
  }, 500)
)
</script>

<style lang="scss" scoped>
.m-img-avatar {
  position: relative;
  overflow: hidden;
  user-select: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
