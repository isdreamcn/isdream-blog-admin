import type { File } from './types/file.type'
import type { CommonListParams } from '../commonTypes'
import service from '@/service'

enum Api {
  List = '/api/file',
  Upload = '/api/file/upload',
  Del = '/api/file'
}

export const getFileList = (params?: CommonListParams) => {
  return service.request<Service.ResultPagination<File[]>>({
    url: Api.List,
    method: 'GET',
    params
  })
}

export const upload = (data: FormData) => {
  return service
    .request({
      url: Api.Upload,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
    })
    .then((res) => res.data)
}

export const fileDel = (id: number) => {
  return service.request({
    url: `${Api.Del}/${id}`,
    method: 'DELETE'
  })
}

export * from './types/file.type'
