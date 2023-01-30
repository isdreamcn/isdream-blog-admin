export interface ArticleTag {
  id: number
  title: string
  description?: string
  color: string
  createdAt: string
  updatedAt: string
}

export type ArticleTagData = Pick<ArticleTag, 'title' | 'description' | 'color'>
