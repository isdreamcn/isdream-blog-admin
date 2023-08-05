export interface CommonListParams {
  page?: number
  pageSize?: number
  q?: string | null
}

export interface UploadFile {
  id: number
  url: string
  filename: string
  mimeType: string
  createdAt: string
  updatedAt: string
}
