import type { Link, LinkData } from './types/link.type'
import type { CommonListParams } from '../commonTypes'
import service from '@/service'

enum Api {
  List = 'link',
  Del = 'link',
  Add = 'link',
  Details = 'link',
  Edit = 'link'
}

export const getLinkList = (params?: CommonListParams) => {
  return service.request<Service.ResultPagination<Link[]>>({
    url: Api.List,
    method: 'GET',
    params
  })
}

export const linkDel = (id: number) => {
  return service.request({
    url: `${Api.Del}/${id}`,
    method: 'DELETE'
  })
}

export const linkAdd = (data: LinkData) => {
  return service.request({
    url: Api.Add,
    method: 'POST',
    data
  })
}

export const linkDetails = (id: number) => {
  return service
    .request<Service.Result<Link>>({
      url: `${Api.Details}/${id}`,
      method: 'GET'
    })
    .then((res) => res.data)
}

export const linkEdit = (id: number, data: LinkData) => {
  return service.request({
    url: `${Api.Edit}/${id}`,
    method: 'PUT',
    data
  })
}

export * from './types/link.type'
