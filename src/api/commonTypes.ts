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
