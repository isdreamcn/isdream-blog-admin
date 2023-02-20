import type { UploadFile } from './commonTypes'
import service from '@/service'

enum Api {
  Upload = '/api/file/upload'
}

export const uploadCommon = (data: FormData) => {
  return service.request<Service.Result<UploadFile>>({
    url: Api.Upload,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

export * from './commonTypes'
