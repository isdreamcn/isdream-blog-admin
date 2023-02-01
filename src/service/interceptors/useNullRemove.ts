import type { RequestInterceptors } from '../types'

const removeNull = (data?: Record<string, any>) => {
  if (!data || Object.prototype.toString.call(data) === '[object FormData]') {
    return data
  }

  const _data: Record<string, any> = {}

  Object.keys(data)
    .filter((key) => data[key] !== null)
    .forEach((key) => (_data[key] = data[key]))

  return _data
}

export const useNullRemove = (): RequestInterceptors => {
  return {
    requestInterceptor(config) {
      if (config.method === 'get') {
        config.params = removeNull(config.params)
      } else {
        config.data = removeNull(config.data)
      }
      return config
    }
  }
}
