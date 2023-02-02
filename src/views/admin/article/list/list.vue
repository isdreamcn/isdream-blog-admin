<template>
  <div>
    <MForm :fields="fields" @submit="search" @cancel="search"> </MForm>

    <MTable
      :columns="columns"
      :http="getArticleList"
      :params="params"
      v-model:isReload="isReload"
      v-model:selectKeys="selectKeys"
    >
      <template #extra>
        <el-button type="primary" @click="edit(0)">新增</el-button>
        <MDeleteButton
          :http="articleDel"
          :http-key="false"
          :selectKeys="selectKeys"
          @reload="clearSelectKeysReload"
        ></MDeleteButton>
      </template>

      <template #cover="{ value }">
        <MViewFile :src="value?.url" :mimeType="value?.mimeType"></MViewFile>
      </template>

      <template #isCommented="{ value, row }">
        <el-switch :model-value="value" @change="commented(row.id)" />
      </template>

      <template #isTop="{ value, row }">
        <el-switch :model-value="value" @change="top(row.id)" />
      </template>

      <template #createdAt="{ value }">
        <span v-dateFormat:YYYY-MM-DD="value"></span>
      </template>

      <template #actions="{ row }">
        <MA type="primary" @click="view(row.id)">查看</MA>
        <MA type="primary" @click="edit(row.id)">编辑</MA>
        <MA type="danger" @click="del(row.id)">删除</MA>
      </template>
    </MTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { columns, fields } from './config'
import {
  getArticleList,
  articleCommented,
  articleTop,
  articleDel
} from '@/api/admin/article'

defineOptions({
  name: 'ArticleList'
})

// 搜索
const params = ref<any>({})
const search = (data: any) => {
  params.value = {
    ...params.value,
    ...data
  }
}

// 查看
const view = (id: number) => {
  window.open(`https://isdream.cn/#/article/${id}`)
}

// 新增/编辑
const router = useRouter()
let maybeEdit = false
const edit = (id: number) => {
  maybeEdit = true
  router.push({
    name: 'ArticleEdit',
    params: {
      id
    }
  })
}

onActivated(() => {
  if (maybeEdit) {
    reload()
    maybeEdit = false
  }
})

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
  articleDel(id).then(clearSelectKeysReload)
}

// 允许/禁止评论
const commented = (id: number) => {
  articleCommented(id).then(reload)
}

// 置顶
const top = (id: number) => {
  articleTop(id).then(reload)
}
</script>

<style lang="scss" scoped></style>
