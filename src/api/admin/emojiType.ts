import type { EmojiType, EmojiTypeData } from './types/emojiType.type'
import type { CommonListParams } from '../commonTypes'
import service from '@/service'

enum Api {
  Select = 'emoji_type/select',
  List = 'emoji_type',
  Del = 'emoji_type',
  Add = 'emoji_type',
  Details = 'emoji_type',
  Edit = 'emoji_type'
}

export const getEmojiTypeSelect = () => {
  return service.request<Service.ResultPagination<EmojiType[]>>({
    url: Api.Select,
    method: 'GET'
  })
}

export const getEmojiTypeList = (params?: CommonListParams) => {
  return service.request<Service.ResultPagination<EmojiType[]>>({
    url: Api.List,
    method: 'GET',
    params
  })
}

export const emojiTypeDel = (id: number) => {
  return service.request({
    url: `${Api.Del}/${id}`,
    method: 'DELETE'
  })
}

export const emojiTypeAdd = (data: EmojiTypeData) => {
  return service.request({
    url: Api.Add,
    method: 'POST',
    data
  })
}

export const emojiTypeDetails = (id: number) => {
  return service
    .request<Service.Result<EmojiType>>({
      url: `${Api.Details}/${id}`,
      method: 'GET'
    })
    .then((res) => res.data)
}

export const emojiTypeEdit = (id: number, data: EmojiTypeData) => {
  return service.request({
    url: `${Api.Edit}/${id}`,
    method: 'PUT',
    data
  })
}

export * from './types/emojiType.type'
