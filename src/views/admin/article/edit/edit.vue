<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>编辑</span>
        <el-button @click="goback">返回</el-button>
      </div>
    </template>
    <MForm
      :fields="fields"
      :modelValue="modelValue"
      :colAttrs="24"
      :inline="false"
      :debounce="false"
      :loading="loading"
      @submit="submit"
      @cancel="goback"
    >
    </MForm>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { removeBaseUrlFile } from '@/utils'
import { getArticleTagSelect } from '@/api/admin/articleTag'
import { articleAdd, articleEdit, articleDetails } from '@/api/admin/article'
import { fields } from './config'

defineOptions({
  name: 'Demo'
})

getArticleTagSelect().then((res) => {
  fields.find((v) => v.key === 'tags')!.attrs!.data = res.data.map((v) => ({
    label: v.title,
    value: v.id
  }))
})

const editorField = fields.find((v) => v.key === 'content')!
fields.find((v) => v.key === 'render')!.on!.change = (v: number) => {
  editorField.tag = v === 1 ? 'MMarkdown' : 'MEditor'
}

const modelValue = ref<any>({
  render: 1,
  isTop: false,
  isCommented: true
})

const id = Number(useRoute().params.id)

if (id) {
  articleDetails(id).then(({ data }) => {
    modelValue.value = {
      ...data,
      tags: data.tags.map((v) => v.id),
      cover: data.cover ? [data.cover] : []
    }
    fields.find((v) => v.key === 'render')!.on!.change(data.render)
  })
}

// 返回
const router = useRouter()
const goback = () => {
  router.back()
}

const loading = ref(false)
const submit = (data: any) => {
  data.cover = data.cover?.[0]?.response?.id
  data.content = removeBaseUrlFile(data.content)
  let request: Promise<any> | null = null

  loading.value = true
  if (id) {
    request = articleEdit(id, data)
  } else {
    request = articleAdd(data)
  }

  request
    .then(() => {
      ElMessage.success('编辑成功')
      goback()
    })
    .catch(() => {
      loading.value = false
    })
}
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
