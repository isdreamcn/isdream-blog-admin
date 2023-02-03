import type { EmojiType, EmojiTypeData } from './types/emojiType.type'
import type { CommonListParams } from '../commonTypes'
import service from '@/service'

enum Api {
  Select = '/api/emoji_type/select',
  List = '/api/emoji_type',
  Del = '/api/emoji_type',
  Add = '/api/emoji_type',
  Details = '/api/emoji_type',
  Edit = '/api/emoji_type'
}

export const getEmojiTypeSelect = () => {
  return service.request<Service.ResultPagination<EmojiType[]>>({
    url: Api.List,
    method: 'Select'
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
