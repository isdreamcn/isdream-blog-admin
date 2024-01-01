import dayjs from 'dayjs'
import { appConfig } from '@/config'
import { isFunction } from './plugins'

export const setBaseUrlFile = (str: string) => {
  return str.replaceAll(
    /(!\[.*\]\(|<img.*src=")(?!blob:http|http)/g,
    `$1${appConfig.baseUrlFile}`
  )
}

export const removeBaseUrlFile = (str: string) => {
  return str.replaceAll(appConfig.baseUrlFile, '')
}

export const joinBaseUrlFile = (url: string) => {
  if (/^blob:/.test(url)) return url

  return /^https?:\/\//.test(url) ? url : appConfig.baseUrlFile + url
}

export const dateFormat = (
  value: dayjs.ConfigType,
  template = 'YYYY-MM-DD HH:mm:ss'
) => {
  try {
    return dayjs(value).format(template)
  } catch {
    const toString = value?.toString
    const res = isFunction(toString) ? toString() : ''
    return res || ''
  }
}

const FileFormat = [
  'jpeg',
  'png',
  'webp',
  'gif',
  'jp2',
  'tiff',
  'avif',
  'heif',
  'jxl'
] as const

interface FilePathQuery {
  w?: number
  h?: number
  q?: number
  f?: (typeof FileFormat)[number]
}

function objectToQueryString(obj: Record<string, number | string | undefined>) {
  const params = new URLSearchParams()

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined) {
      params.append(key, `${value}`)
    }
  })

  return params.toString()
}

export const filePathQuery = (
  url?: string,
  { w, h, q, f }: FilePathQuery = {}
) => {
  const queryStr = objectToQueryString({
    w,
    h,
    q,
    f
  })

  if (!url || !queryStr) {
    return url
  }

  return `${url}?${queryStr}`
}
