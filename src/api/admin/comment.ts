import type { CommentListParams, Comment } from './types/comment.type'
import service from '@/service'

enum Api {
  List = 'comment',
  Approve = 'comment/approve',
  Del = 'comment'
}

export const getCommentList = (params?: CommentListParams) => {
  return service.request<Service.ResultPagination<Comment[]>>({
    url: Api.List,
    method: 'GET',
    params
  })
}

export const CommentApprove = (id: number) => {
  return service.request<Service.ResultPagination<Comment[]>>({
    url: `${Api.Approve}/${id}`,
    method: 'POST'
  })
}

export const CommentDel = (id: number) => {
  return service.request<Service.ResultPagination<Comment[]>>({
    url: `${Api.Del}/${id}`,
    method: 'DELETE'
  })
}

export * from './types/comment.type'
