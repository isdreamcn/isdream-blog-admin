import type { File } from './types/file.type'
import type { CommonListParams } from '../commonTypes'
import service from '@/service'

enum Api {
  List = '/api/file',
  Del = '/api/file'
}

export const getFileList = (params?: CommonListParams) => {
  return service.request<Service.ResultPagination<File[]>>({
    url: Api.List,
    method: 'GET',
    params
  })
}

export const fileDel = (id: number) => {
  return service.request({
    url: `${Api.Del}/${id}`,
    method: 'DELETE'
  })
}

export * from './types/file.type'
