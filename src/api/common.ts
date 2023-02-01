import service from '@/service'

enum Api {
  Upload = '/api/file/upload'
}

export const upload = (data: FormData) => {
  return service.request({
    url: Api.Upload,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

export * from './commonTypes'
