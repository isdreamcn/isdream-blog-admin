<template>
  <div>
    <MForm :fields="fields" @submit="search" @cancel="search"></MForm>

    <MTable
      :columns="columns"
      :http="getFileList"
      :params="params"
      v-model:isReload="isReload"
      v-model:selectKeys="selectKeys"
    >
      <template #extra>
        <el-button type="primary" @click="edit(0)">上传文件</el-button>
        <MDeleteButton
          :http="fileDel"
          :http-key="false"
          :selectKeys="selectKeys"
          @reload="clearSelectKeysReload"
        ></MDeleteButton>
      </template>

      <template #url="{ value, row }">
        <MViewFile :src="value" :mimeType="row.mimeType"></MViewFile>
      </template>

      <template #createdAt="{ value }">
        <span v-dateFormat:YYYY-MM-DD="value"></span>
      </template>

      <template #actions="{ row }">
        <MA type="danger" @click="del(row.id)">删除</MA>
      </template>
    </MTable>

    <MFormDialog
      v-model="formDialog.visible"
      v-bind="formDialog"
      :fields="dialogFields"
      @reload="reload"
    >
      <template #buttons>&nbsp;</template>
    </MFormDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { columns, fields, dialogFields } from './config'
import { getFileList, fileDel } from '@/api/admin/file'

defineOptions({
  name: 'File'
})

// 搜索
const params = ref<any>({})
const search = (data: any) => {
  params.value = {
    ...params.value,
    ...data
  }
}

// 新增/编辑
const formDialog = reactive({
  visible: false,
  id: 0
})
const edit = (id: number) => {
  formDialog.id = id
  formDialog.visible = true
}

// 重载
const isReload = ref(true)
const reload = () => {
  isReload.value = true
}

// 删除
const selectKeys = ref<number[]>([])
const clearSelectKeysReload = () => {
  selectKeys.value = []
  reload()
}

const del = (id: number) => {
  fileDel(id).then(clearSelectKeysReload)
}

dialogFields.find((v) => v.key === 'file')!.on!.change = reload
</script>

<style lang="scss" scoped></style>
