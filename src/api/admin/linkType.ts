import type { LinkType, LinkTypeData } from './types/linkType.type'
import type { CommonListParams } from '../commonTypes'
import service from '@/service'

enum Api {
  Select = 'link_type/select',
  List = 'link_type',
  Del = 'link_type',
  Add = 'link_type',
  Details = 'link_type',
  Edit = 'link_type'
}

export const getLinkTypeSelect = () => {
  return service.request<Service.Result<LinkType[]>>({
    url: Api.Select,
    method: 'GET'
  })
}

export const getLinkTypeList = (params?: CommonListParams) => {
  return service.request<Service.ResultPagination<LinkType[]>>({
    url: Api.List,
    method: 'GET',
    params
  })
}

export const linkTypeDel = (id: number) => {
  return service.request({
    url: `${Api.Del}/${id}`,
    method: 'DELETE'
  })
}

export const linkTypeAdd = (data: LinkTypeData) => {
  return service.request({
    url: Api.Add,
    method: 'POST',
    data
  })
}

export const linkTypeDetails = (id: number) => {
  return service
    .request<Service.Result<LinkType>>({
      url: `${Api.Details}/${id}`,
      method: 'GET'
    })
    .then((res) => res.data)
}

export const linkTypeEdit = (id: number, data: LinkTypeData) => {
  return service.request({
    url: `${Api.Edit}/${id}`,
    method: 'PUT',
    data
  })
}

export * from './types/article.type'
