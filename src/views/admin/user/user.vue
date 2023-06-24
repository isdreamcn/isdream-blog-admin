<template>
  <div>
    <MForm :fields="fields" @submit="search" @cancel="search"> </MForm>
    <MTable
      :columns="columns"
      :http="getUserList"
      :params="params"
      v-model:isReload="isReload"
      v-model:selectKeys="selectKeys"
    >
      <template #extra>
        <el-button type="primary" @click="edit(0)">新增</el-button>
        <MDeleteButton
          :http="userDel"
          :http-key="false"
          :selectKeys="selectKeys"
          @reload="clearSelectKeysReload"
        ></MDeleteButton>
      </template>
      <template #avatar="{ value, row }">
        <MImgAvatar :src="value" :username="row.username"></MImgAvatar>
      </template>
      <template #tempAvatar="{ value, row }">
        <MImgAvatar
          v-if="value"
          :src="value"
          :username="row.username"
        ></MImgAvatar>
      </template>
      <template #website="{ value }">
        <el-link type="primary" :href="value" target="_blank">{{
          value
        }}</el-link>
      </template>
      <template #createdAt="{ value }">
        <span v-dateFormat:YYYY-MM-DD="value"></span>
      </template>
      <template #actions="{ row }">
        <MA
          v-if="row.tempAvatar"
          pop
          type="primary"
          popTitle="确认审核通过？"
          @click="setUserAvatar(row.id)"
          >审核头像</MA
        >
        <MA type="primary" @click="edit(row.id)">编辑</MA>
        <MA type="danger" @click="del(row.id)">删除</MA>
      </template>
    </MTable>

    <MFormDialog
      v-model="formDialog.visible"
      v-bind="formDialog"
      :fields="dialogFields"
      :httpAdd="userAdd"
      :httpEdit="userEdit"
      :httpGet="userDetails"
      @reload="reload"
    ></MFormDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { columns, fields, dialogFields } from './config'
import {
  getUserList,
  userDel,
  userAdd,
  userEdit,
  userDetails,
  setAvatar
} from '@/api/admin/user'

defineOptions({
  name: 'User'
})
const selectKeys = ref<number[]>([])

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
const clearSelectKeysReload = () => {
  selectKeys.value = []
  reload()
}

const del = (id: number) => {
  userDel(id).then(clearSelectKeysReload)
}

const setUserAvatar = (id: number) => {
  setAvatar(id).then(() => {
    reload()
  })
}
</script>

<style lang="scss" scoped></style>
