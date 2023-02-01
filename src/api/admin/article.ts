import type { Article, ArticleData } from './types/article.type'
import type { CommonListParams } from '../commonTypes'
import service from '@/service'

enum Api {
  List = '/api/article',
  Commented = '/api/article/commented',
  Top = '/api/article/top',
  Del = '/api/article',
  Add = '/api/article',
  Details = '/api/article',
  Edit = '/api/article'
}

export const getArticleList = (params?: CommonListParams) => {
  return service.request<Service.ResultPagination<Article[]>>({
    url: Api.List,
    method: 'GET',
    params
  })
}

export const articleCommented = (id: number) => {
  return service.request({
    url: `${Api.Commented}/${id}`,
    method: 'POST'
  })
}

export const articleTop = (id: number) => {
  return service.request({
    url: `${Api.Top}/${id}`,
    method: 'POST'
  })
}

export const articleDel = (id: number) => {
  return service.request({
    url: `${Api.Del}/${id}`,
    method: 'DELETE'
  })
}

export const articleAdd = (data: ArticleData) => {
  return service.request({
    url: Api.Add,
    method: 'POST',
    data
  })
}

export const articleDetails = (id: number) => {
  return service.request<Service.Result<Article>>({
    url: `${Api.Details}/${id}`,
    method: 'GET'
  })
}

export const articleEdit = (id: number, data: ArticleData) => {
  return service.request({
    url: `${Api.Edit}/${id}`,
    method: 'PUT',
    data
  })
}

export * from './types/article.type'
