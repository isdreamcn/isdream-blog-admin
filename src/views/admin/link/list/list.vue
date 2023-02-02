<template>
  <div>
    <MForm :fields="fields" @submit="search" @cancel="search"> </MForm>

    <MTable
      :columns="columns"
      :http="getLinkList"
      :params="params"
      v-model:isReload="isReload"
      v-model:selectKeys="selectKeys"
    >
      <template #extra>
        <el-button type="primary" @click="edit(0)">新增</el-button>
        <MDeleteButton
          :http="linkDel"
          :http-key="false"
          :selectKeys="selectKeys"
          @reload="clearSelectKeysReload"
        ></MDeleteButton>
      </template>

      <template #icon="{ value, row }">
        <MImgAvatar :src="value" :username="row.title"></MImgAvatar>
      </template>

      <template #title="{ value, row }">
        <a :href="row.link" :title="value" target="_blank">{{ value }}</a>
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
      :getHandler="getHandler"
      :httpAdd="linkAdd"
      :httpEdit="linkEdit"
      :httpGet="linkDetails"
      @reload="reload"
    ></MFormDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { columns, fields, dialogFields } from './config'
import { getLinkTypeSelect } from '@/api/admin/linkType'
import {
  getLinkList,
  linkDel,
  linkAdd,
  linkDetails,
  linkEdit,
  Link
} from '@/api/admin/link'

defineOptions({
  name: 'LinkList'
})

getLinkTypeSelect().then((res) => {
  const options = res.data.map((item) => ({
    label: item.title,
    value: item.id
  }))
  fields.find((v) => v.key === 'type')!.attrs!.options = options
  dialogFields.find((v) => v.key === 'type')!.attrs!.options = options
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

const getHandler = (data: Link) => {
  return {
    ...data,
    type: data.type.id
  }
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
  linkDel(id).then(clearSelectKeysReload)
}
</script>

<style lang="scss" scoped></style>
