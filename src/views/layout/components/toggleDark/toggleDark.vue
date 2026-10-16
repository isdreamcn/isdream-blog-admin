<template>
  <div class="toggleDark-container" @click="toggleDark">
    <m-icon v-show="!isDark" name="icon-sunny"></m-icon>
    <m-icon v-show="isDark" name="icon-moon"></m-icon>
  </div>
</template>

<script lang="ts" setup>
import { useDark } from '@/hooks'
const { isDark, toggleDark } = useDark()

defineOptions({
  name: 'LayoutCpnToggleDark'
})
</script>

<style lang="scss" scoped>
.toggleDark-container {
  font-size: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
