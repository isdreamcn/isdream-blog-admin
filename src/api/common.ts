import type { CommonUploadFile, MediaUploadFile } from './commonTypes'
import service from '@/service'

enum Api {
  Upload = 'file/upload',
  UploadMedia = 'file/upload-media'
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

// 编辑器配图上传：blog-api 转存 media-api，返回绝对 URL 直插正文
export const uploadMediaCommon = (data: FormData) => {
  return service.request<Service.Result<MediaUploadFile>>({
    url: Api.UploadMedia,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

export * from './commonTypes'
