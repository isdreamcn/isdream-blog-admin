<template>
  <div v-if="appSetting.showLogo" class="logo-container">
    <img src="/favicon.ico" />
    <span v-if="!appSetting.menu.collapsed">LOGO</span>
  </div>
</template>

<script setup lang="ts">
import { useAppSetting } from '@/store'

defineOptions({
  name: 'LayoutCpnMenuLogo'
})

const { appSetting } = useAppSetting()
</script>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-bottom: solid 1px;
  border-right: solid 1px;
  @include m-menu-theme(true);

  img {
    width: 45px;
    height: 45px;
  }

  span {
    margin-left: 10px;
  }
}
</style>
