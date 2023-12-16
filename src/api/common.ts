import type { CommonUploadFile } from './commonTypes'
import service from '@/service'

enum Api {
  Upload = 'file/upload'
}

export const uploadCommon = (data: FormData) => {
  return service.request<Service.Result<CommonUploadFile>>({
    url: Api.Upload,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

export * from './commonTypes'
