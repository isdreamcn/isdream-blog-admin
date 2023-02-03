<template>
  <div>
    <MForm :fields="fields" @submit="search" @cancel="search"> </MForm>

    <MTable
      :columns="columns"
      :http="getEmojiList"
      :params="params"
      v-model:isReload="isReload"
      v-model:selectKeys="selectKeys"
    >
      <template #extra>
        <el-button type="primary" @click="edit(0)">新增</el-button>
        <MDeleteButton
          :http="emojiDel"
          :http-key="false"
          :selectKeys="selectKeys"
          @reload="clearSelectKeysReload"
        ></MDeleteButton>
      </template>

      <template #file="{ value }">
        <MViewFile :src="value?.url" :mimeType="value?.mimeType"></MViewFile>
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
      :httpAdd="emojiAdd"
      :httpEdit="emojiEdit"
      :httpGet="emojiDetails"
      :getHandler="getHandler"
      :handler="handler"
      @reload="reload"
    ></MFormDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { columns, fields, dialogFields } from './config'
import { getEmojiTypeSelect } from '@/api/admin/emojiType'
import {
  getEmojiList,
  emojiDel,
  emojiAdd,
  emojiDetails,
  emojiEdit
} from '@/api/admin/emoji'

defineOptions({
  name: 'EmojiList'
})

getEmojiTypeSelect().then((res) => {
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

const getHandler = (data: any) => {
  return {
    ...data,
    file: data.file ? [data.file] : [],
    type: data.type.id
  }
}

const handler = (data: any) => {
  return {
    ...data,
    file: data.file?.[0]?.response?.id
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
  emojiDel(id).then(clearSelectKeysReload)
}
</script>

<style lang="scss" scoped></style>
