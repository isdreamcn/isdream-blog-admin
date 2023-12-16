import type { User, UserAddData, UserEditData } from './types/user.type'
import type { CommonListParams } from '../commonTypes'
import service from '@/service'

enum Api {
  List = 'user',
  Del = 'user',
  Add = 'user',
  Details = 'user',
  Edit = 'user',
  SetAvatar = 'user/setAvatar'
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

// 审核用户头像
export const setAvatar = (id: number) => {
  return service.request({
    url: `${Api.SetAvatar}/${id}`,
    method: 'POST'
  })
}

export * from './types/user.type'
