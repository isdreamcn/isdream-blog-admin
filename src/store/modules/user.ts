import { defineStore } from 'pinia'
import db, { StorageSetOptions } from '@/storage'
import { appConfig } from '@/config'
import router, { routesHandler } from '@/router'
import { useRouterStore } from './router'
import {
  UserLoginParams,
  UserOAuthLoginParams,
  userLogin,
  userOAuthLogin,
  getUserMenu,
  getUserPermissions
} from '@/api/user/login'

export interface UserMenu {
  title: string
  // 唯一key，多级路由地址拼接，/开头
  path: string
  icon?: string
  link?: string
  children?: UserMenu[]
}

export interface UserInfo {
  id?: number
  username: string
  avatar?: string
}

interface UserState {
  token: string
  userInfo: Nullable<UserInfo>
  userMenu: Nullable<UserMenu[]>
  userPermissions: Nullable<string[]>
  userPermissionMap: Map<string, boolean>
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userInfo: null,
    userMenu: null,
    userPermissions: null,
    // 用于O(1)判断权限
    userPermissionMap: new Map()
  }),
  getters: {},
  actions: {
    setupState() {
      this.token = db.get<string>('token') ?? this.token
      this.userInfo = db.get<UserInfo>('userInfo')

      routesHandler.setupRoutes()

      if (!this.token) return

      // this.reloadCurrentPage(
      //   Promise.all([this.setUserPermissions(), this.setUserMenu()])
      // )
    },
    // 设置用户菜单
    setUserMenu() {
      let http = getUserMenu
      const userMenu = db.get<UserMenu[]>('userMenu')
      if (appConfig.storeConfig.userMenuStorage && userMenu) {
        http = () => Promise.resolve({ data: userMenu })
      }

      return http().then((res) => {
        if (!res.data.length) return res

        if (appConfig.storeConfig.userMenuStorage && !userMenu) {
          db.set('userMenu', res.data)
        }
        // 注册路由
        routesHandler.useRoleMenu(res.data)
        return res
      })
    },
    // 设置用户权限
    setUserPermissions() {
      let http = getUserPermissions
      const userPermissions = db.get<string[]>('userPermissions')
      if (appConfig.storeConfig.userPermissionsStorage && userPermissions) {
        http = () => Promise.resolve({ data: userPermissions })
      }

      return http().then((res) => {
        if (appConfig.storeConfig.userPermissionsStorage && !userPermissions) {
          db.set('userPermissions', res.data)
        }
        this.userPermissions = res.data
        this.generaterPermissionMap()
        return res
      })
    },
    async loginHandler(data: { token: string; user: UserInfo }) {
      routesHandler.setupRoutes()

      this.setToken(data.token, {
        expires: appConfig.serviceTokenConfig.expires
      })
      this.setUserInfo(data.user)

      // await Promise.all([this.setUserPermissions(), this.setUserMenu()])

      return router.push({
        name: appConfig.routeMainName
      })
    },
    // 登录
    async login(params: UserLoginParams) {
      const res = await userLogin(params)
      await this.loginHandler(res.data)
      return res
    },
    // oauth 登录
    async oauthLogin(params: UserOAuthLoginParams) {
      const res = await userOAuthLogin(params)
      await this.loginHandler(res.data)
      return res
    },
    // 退出登录/身份验证失败
    logout() {
      db.removeKeys('token', 'userInfo', 'userPermissions', 'userMenu')
      this.setState({
        token: '',
        userInfo: null,
        userPermissions: null,
        userPermissionMap: new Map(),
        userMenu: null
      })

      // 处理 routerStore
      const routerStore = useRouterStore()
      routerStore.setState({
        keepAliveMap: new Map(),
        routeHistoryMap: new Map()
      })

      router.push({
        name: appConfig.routeLoginName
      })
    },
    setState(state: Partial<UserState>, dbOptions?: StorageSetOptions) {
      this.$patch(state)
      if (dbOptions) {
        db.setData(state, dbOptions)
      }
    },
    setToken(token: string, dbOptions?: StorageSetOptions) {
      this.token = token
      db.set('token', this.token, dbOptions)
    },
    setUserInfo(userInfo: UserInfo, dbOptions?: StorageSetOptions) {
      this.userInfo = userInfo
      db.set('userInfo', this.userInfo, dbOptions)
    },
    // 生成PermissionMap
    generaterPermissionMap() {
      const map = new Map<string, boolean>()
      if (this.userPermissions) {
        for (const permission of this.userPermissions) {
          map.set(permission, true)
        }
      }
      this.userPermissionMap = map
    },
    // 校验权限
    permissionAuth(permission: string) {
      return !!this.userPermissionMap.get(permission)
    },
    // 重载当前页
    async reloadCurrentPage(promise: Promise<any>) {
      const routerStore = useRouterStore()
      routerStore.setState({
        loading: true,
        closeLoading: false
      })

      await promise

      const { hash, pathname } = window.location
      await router.replace(hash ? hash.slice(1) : pathname)

      routerStore.setState({
        loading: false,
        closeLoading: true
      })
    }
  }
})
