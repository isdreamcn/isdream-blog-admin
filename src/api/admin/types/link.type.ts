export interface Link {
  id: number
  title: string
  description: string
  link: string
  icon: string
  createdAt: string
  updatedAt: string
  type: Type
}

export interface LinkData {
  title: string
  description: string
  type: number
  link: string
  icon: string
}

interface Type {
  id: number
  title: string
  description: string
  createdAt: string
  updatedAt: string
}
