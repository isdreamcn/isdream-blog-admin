export interface CommonListParams {
  page?: number
  pageSize?: number
  q?: Nullable<string>
}

export interface CommonUploadFile {
  id: number
  url: string
  filename: string
  mimeType: string
  createdAt: string
  updatedAt: string
}

// 编辑器配图经 media-api 转存的响应（无 File 表 id，url 为绝对地址）
export interface MediaUploadFile {
  url: string
  filename: string
  mimeType: string
}
