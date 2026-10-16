<template>
  <div>
    <MForm :fields="fields" @submit="search" @cancel="search"> </MForm>

    <MTable
      v-model:is-reload="isReload"
      v-model:select-keys="selectKeys"
      :columns="columns"
      :http="getLinkTypeList"
      :params="params"
    >
      <template #extra>
        <el-button type="primary" @click="edit(0)">新增</el-button>
        <MDeleteButton
          :http="linkTypeDel"
          :http-key="false"
          :select-keys="selectKeys"
          @reload="clearSelectKeysReload"
        ></MDeleteButton>
      </template>

      <template #createdAt="{ value }">
        <span v-dateFormat:YYYY-MM-DD="value"></span>
      </template>

      <template #actions="{ row }">
        <MA type="primary" @click="edit(row.id)">编辑</MA>
        <MA type="danger" @click="del(row.id)">删除</MA>
      </template>
    </MTable>

    <MFormDialog
      v-model="formDialog.visible"
      v-bind="formDialog"
      :fields="dialogFields"
      :http-add="linkTypeAdd"
      :http-edit="linkTypeEdit"
      :http-get="linkTypeDetails"
      @reload="reload"
    ></MFormDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { columns, fields, dialogFields } from './config'
import {
  getLinkTypeList,
  linkTypeDel,
  linkTypeAdd,
  linkTypeDetails,
  linkTypeEdit
} from '@/api/admin/linkType'

defineOptions({
  name: 'LinkType'
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
  linkTypeDel(id).then(clearSelectKeysReload)
}
</script>

<style lang="scss" scoped></style>
