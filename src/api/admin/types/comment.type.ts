import type { CommonListParams } from '../../commonTypes'

export interface CommentListParams extends CommonListParams {
  approved?: boolean
}

export interface Comment {
  id: number
  content: string
  approved: boolean
  createdAt: string
  updatedAt: string
  emojis: any[]
}
