import type {
  UserLoginMenu,
  UserLoginParams,
  UserOAuthLoginParams,
  UserLoginResult
} from './types/login.type'
import service, { mockService } from '@/service'

enum Api {
  Login = 'user/admin/login',
  OAuthLogin = 'user/admin/oauth_login',
  Signin = 'user/signin',
  Logout = 'user/logout',
  Menu = 'user/menu',
  Permissions = 'user/permissions'
}

export const userLogin = (data: UserLoginParams) => {
  return service.request<Service.Result<UserLoginResult>>({
    url: Api.Login,
    method: 'POST',
    data
  })
}

export const userOAuthLogin = (data: UserOAuthLoginParams) => {
  return service.request<Service.Result<UserLoginResult>>({
    url: Api.OAuthLogin,
    method: 'POST',
    data
  })
}

// 注册
export const userSignin = (data: any) => {
  return mockService.request({
    url: Api.Signin,
    method: 'POST',
    data
  })
}

// 退出登录
export const userLogout = () => {
  return mockService.request({
    url: Api.Logout,
    method: 'POST'
  })
}

// 用户菜单
export const getUserMenu = () => {
  return mockService.request<Service.Result<UserLoginMenu[]>>({
    url: Api.Menu,
    method: 'GET'
  })
}

// 用户按钮权限
export const getUserPermissions = () => {
  return mockService.request<Service.Result<string[]>>({
    url: Api.Permissions,
    method: 'GET'
  })
}

export * from './types/login.type'
