<template>
  <div class="app-setting-container">
    <el-icon @click="updateDrawer(true)"><icon-setting /></el-icon>
    <el-drawer
      ref="drawerRef"
      v-model="drawer"
      size="25%"
      title="项目配置"
      append-to-body
      custom-class="app-setting-container__drawer"
    >
      <el-divider>主题</el-divider>
      <div class="item--center"><ToggleDark></ToggleDark></div>
      <el-divider>系统主题</el-divider>
      <div class="item--center">
        <MColorPickerAppTheme
          app-setting-key="colorPrimary"
        ></MColorPickerAppTheme>
      </div>
      <el-divider>菜单的背景颜色</el-divider>
      <div class="item--center">
        <MColorPickerAppTheme
          app-setting-key="menu.backgroundColor"
        ></MColorPickerAppTheme>
      </div>
      <el-divider>菜单的文字颜色</el-divider>
      <div class="item--center">
        <MColorPickerAppTheme
          app-setting-key="menu.textColor"
        ></MColorPickerAppTheme>
      </div>
      <el-divider>活动菜单项的背景颜色</el-divider>
      <div class="item--center">
        <MColorPickerAppTheme
          app-setting-key="menu.hoverBackgroundColor"
        ></MColorPickerAppTheme>
      </div>
      <el-divider>布局</el-divider>
      <div class="item--center">
        <MSelect
          :options="layoutOptions"
          :model-value="layout"
          @change="layoutChange"
        ></MSelect>
      </div>
      <el-divider>功能</el-divider>
      <div
        v-for="item in functions"
        :key="item.appSettingKey"
        class="item--between"
      >
        <div>
          {{ item.label }}
        </div>
        <el-switch
          :model-value="getAppSetting(item.appSettingKey)"
          @change="(v: any) => setAppSetting(item.appSettingKey, v)"
        />
      </div>
      <el-divider>操作</el-divider>
      <div class="action-buttons">
        <el-button type="primary" @click="copy">
          <MIcon name="icon-copyDocument"></MIcon>拷贝</el-button
        >
        <el-button type="warning" @click="reset"
          ><MIcon name="icon-refresh"></MIcon>重置</el-button
        >
        <el-button type="danger" @click="clearCache"
          ><MIcon name="icon-refreshLeft"></MIcon
          >清空缓存并返回登录页</el-button
        >
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import type { ElDrawer } from 'element-plus'
import type { LayoutKeys } from '../../config'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { useAppStore } from '@/store'
import { getVal, generateObj } from '@/utils'
import db from '@/storage'
import appConfig from '@/config'
import { ToggleDark } from '../index'
import { layoutOptions, getLayout } from '../../config'

defineOptions({
  name: 'AppSetting'
})

// const drawerRef = ref<InstanceType<typeof ElDrawer>>()

// 取消 el-drawer 懒加载
// nextTick(() => {
//   if (drawerRef.value) {
//     drawerRef.value.rendered = true
//   }
// })

// 显示隐藏
const drawer = ref(false)
const updateDrawer = (val: boolean) => {
  drawer.value = val
}

const appStore = useAppStore()
// layout
const layout = computed({
  get: () => appStore.appSetting.layout,
  set: (val) => {
    appStore.setAppSetting({
      layout: val
    })
  }
})

const layoutChange = (key: LayoutKeys) => {
  layout.value = key
  const appSetting = getLayout(key)?.appSetting
  if (appSetting) {
    appStore.setAppSetting(appSetting)
  }
}

const functions = computed(() => getLayout(layout.value)?.functions || [])
const getAppSetting = (key: string) => {
  return getVal(appStore.appSetting, key)
}
const setAppSetting = (key: string, val: any) => {
  appStore.setAppSetting(generateObj(key, val))
}

// actions
const copy = () => {
  navigator.clipboard
    .writeText(JSON.stringify(appStore.appSetting, null, 2))
    .then(() => {
      ElMessageBox.alert(
        '复制成功,请到 src/store/modules/app.ts 中修改配置！',
        '提示',
        {
          confirmButtonText: '确定',
          type: 'success',
          showClose: false
        }
      )
    })
    .catch(() => {
      ElMessageBox.alert('剪贴板拒绝写入', '提示', {
        confirmButtonText: '确定',
        type: 'error',
        showClose: false
      })
    })
}

const reset = () => {
  appStore.resetAppSetting()
}

const router = useRouter()
const clearCache = () => {
  db.clear()
  router.push({
    name: appConfig.routeLoginName
  })
}
</script>

<style lang="scss" scoped>
.app-setting-container {
  font-size: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.app-setting-container__drawer {
  .el-drawer__body {
    padding-top: 0;
  }

  .item--center {
    display: flex;
    justify-content: center;
  }
  .item--between {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    .el-button {
      margin-bottom: 15px;
      margin-left: 0;
      &:last-child {
        margin-bottom: 0;
      }
      .m-icon {
        margin-right: 5px;
      }
    }
  }
}
</style>
