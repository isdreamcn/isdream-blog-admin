import type { CommentListParams, Comment } from './types/comment.type'
import service from '@/service'

enum Api {
  List = '/api/comment',
  Approve = '/api/comment/approve',
  Del = '/api/comment'
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
