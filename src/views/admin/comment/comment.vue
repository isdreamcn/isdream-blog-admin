<template>
  <div>
    <MForm
      :fields="fields"
      :modelValue="params"
      @submit="search"
      @cancel="search"
    >
    </MForm>

    <MTable
      :columns="columns"
      :http="getCommentList"
      :params="params"
      v-model:isReload="isReload"
      v-model:selectKeys="selectKeys"
    >
      <template #extra>
        <MDeleteButton
          :http="CommentDel"
          :http-key="false"
          :selectKeys="selectKeys"
          @reload="clearSelectKeysReload"
        ></MDeleteButton>
      </template>

      <template #approved="{ value, row }">
        <el-switch :model-value="value" @change="approve(row.id)" />
      </template>

      <template #createdAt="{ value }">
        <span v-dateFormat:YYYY-MM-DD="value"></span>
      </template>

      <template #actions="{ row }">
        <MA type="danger" @click="del(row.id)">删除</MA>
      </template>
    </MTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { columns, fields } from './config'
import { getCommentList, CommentApprove, CommentDel } from '@/api/admin/comment'

defineOptions({
  name: 'Comment'
})

// 搜索
const params = ref<any>({
  approved: false
})
const search = (data: any) => {
  params.value = {
    ...params.value,
    ...data
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
  CommentDel(id).then(clearSelectKeysReload)
}

// 切换审核状态
const approve = (id: number) => {
  CommentApprove(id).then(reload)
}
</script>

<style lang="scss" scoped></style>
