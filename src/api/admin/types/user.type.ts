export interface User {
  id: number
  username: string
  avatar?: string
  website?: string
  createdAt: string
  updatedAt: string
}

export interface UserAddData {
  email: string
  username: string
  avatar?: string
  website?: string
}

export type UserEditData = Omit<UserAddData, 'email'>
