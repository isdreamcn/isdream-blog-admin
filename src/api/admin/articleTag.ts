import type { ArticleTag, ArticleTagData } from './types/articleTag.type'
import type { CommonListParams } from '../commonTypes'
import service from '@/service'

enum Api {
  Select = 'article_tag/select',
  List = 'article_tag',
  Del = 'article_tag',
  Add = 'article_tag',
  Details = 'article_tag',
  Edit = 'article_tag'
}

export const getArticleTagSelect = (params?: CommonListParams) => {
  return service.request<Service.Result<ArticleTag[]>>({
    url: Api.Select,
    method: 'GET',
    params
  })
}

export const getArticleTagList = (params?: CommonListParams) => {
  return service.request<Service.ResultPagination<ArticleTag[]>>({
    url: Api.List,
    method: 'GET',
    params
  })
}

export const articleTagAdd = (data: ArticleTagData) => {
  return service.request({
    url: Api.Add,
    method: 'POST',
    data
  })
}

export const articleTagDel = (id: number) => {
  return service.request({
    url: `${Api.Del}/${id}`,
    method: 'DELETE'
  })
}

export const articleTagDetails = (id: number) => {
  return service
    .request<Service.Result<ArticleTag>>({
      url: `${Api.Details}/${id}`,
      method: 'GET'
    })
    .then((res) => res.data)
}

export const articleTagEdit = (id: number, data: ArticleTagData) => {
  return service.request({
    url: `${Api.Edit}/${id}`,
    method: 'PUT',
    data
  })
}

export * from './types/articleTag.type'
