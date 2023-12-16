import type { Emoji, EmojiData, EmojiListParams } from './types/emoji.type'
import service from '@/service'

enum Api {
  List = 'emoji',
  Del = 'emoji',
  Add = 'emoji',
  Details = 'emoji',
  Edit = 'emoji'
}

export const getEmojiList = (params?: EmojiListParams) => {
  return service.request<Service.ResultPagination<Emoji[]>>({
    url: Api.List,
    method: 'GET',
    params
  })
}

export const emojiDel = (id: number) => {
  return service.request({
    url: `${Api.Del}/${id}`,
    method: 'DELETE'
  })
}

export const emojiAdd = (data: EmojiData) => {
  return service.request({
    url: Api.Add,
    method: 'POST',
    data
  })
}

export const emojiDetails = (id: number) => {
  return service
    .request<Service.Result<Emoji>>({
      url: `${Api.Details}/${id}`,
      method: 'GET'
    })
    .then((res) => res.data)
}

export const emojiEdit = (id: number, data: EmojiData) => {
  return service.request({
    url: `${Api.Edit}/${id}`,
    method: 'PUT',
    data
  })
}

export * from './types/emoji.type'
