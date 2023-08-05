export interface Article {
  id: number
  title: string
  text: string
  render: 1 | 2
  views: number
  commends: number
  isCommented: boolean
  isTop: boolean
  createdAt: string
  updatedAt: string
  tags: Tag[]
  cover?: Cover
}

export interface ArticleData {
  title: string
  render: 1 | 2
  isCommented: boolean
  isTop: boolean
  content: string
  tags: number[]
  cover?: number
}

interface Cover {
  id: number
  url: string
  filename: string
  mimeType: string
  createdAt: string
  updatedAt: string
}

interface Tag {
  id: number
  title: string
  description: string
  color: string
  createdAt: string
  updatedAt: string
}
