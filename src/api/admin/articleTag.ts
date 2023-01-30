import service from '@/service'

enum Api {
  List = '/api/article_tag',
  Del = '/api/article_tag',
  Add = '/api/article_tag',
  Details = '/api/article_tag',
  Edit = '/api/article_tag'
}

export const getArticleTagList = (params?: any) => {
  return service.request<Service.ResultPagination>({
    url: Api.List,
    method: 'GET',
    params
  })
}

export const articleTagAdd = (data: any) => {
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
    .request({
      url: `${Api.Details}/${id}`,
      method: 'GET'
    })
    .then((res) => res.data)
}

export const articleTagEdit = (id: number, data: any) => {
  return service.request({
    url: `${Api.Edit}/${id}`,
    method: 'PUT',
    data
  })
}
