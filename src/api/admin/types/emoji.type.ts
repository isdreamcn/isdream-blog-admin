import type { CommonListParams } from '../../commonTypes'

export interface EmojiListParams extends CommonListParams {
  type?: number
}

export interface Emoji {
  id: number
  placeholder: string
  description: string
  createdAt: string
  updatedAt: string
  file: File
  type: Type
}

export interface EmojiData {
  placeholder: string
  description?: string
  file: number
  type: number
}

interface Type {
  id: number
  title: string
  createdAt: string
  updatedAt: string
}

interface File {
  id: number
  url: string
  thumbUrl: string
  filename: string
  mimeType: string
  createdAt: string
  updatedAt: string
}
