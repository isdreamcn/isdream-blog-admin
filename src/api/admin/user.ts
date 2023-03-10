import type { User, UserAddData, UserEditData } from './types/user.type'
import type { CommonListParams } from '@/api/commonTypes'
import service from '@/service'

enum Api {
  List = '/api/user',
  Del = '/api/user',
  Add = '/api/user',
  Details = '/api/user',
  Edit = '/api/user'
}

export const getUserList = (params?: CommonListParams) => {
  return service.request<Service.ResultPagination<User[]>>({
    url: Api.List,
    method: 'GET',
    params
  })
}

export const userDel = (id: number) => {
  return service.request({
    url: `${Api.Del}/${id}`,
    method: 'DELETE'
  })
}

export const userAdd = (data: UserAddData) => {
  return service.request({
    url: Api.Add,
    method: 'POST',
    data
  })
}

export const userDetails = (id: number) => {
  return service
    .request<Service.Result<User>>({
      url: `${Api.Details}/${id}`,
      method: 'GET'
    })
    .then((res) => res.data)
}

export const userEdit = (id: number, data: UserEditData) => {
  return service.request({
    url: `${Api.Edit}/${id}`,
    method: 'PUT',
    data
  })
}

export * from './types/user.type'
