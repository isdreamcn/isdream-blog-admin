import { appConfig } from '@/config'

export const setBaseUrlFile = (str: string) => {
  return str.replaceAll(
    /(!\[.*\]\(|<img src=")(?!http)/g,
    `$1${appConfig.baseUrlFile}`
  )
}

export const removeBaseUrlFile = (str: string) => {
  return str.replaceAll(appConfig.baseUrlFile, '')
}

export const joinBaseUrlFile = (url: string) => {
  return /^https?:\/\//.test(url) ? url : appConfig.baseUrlFile + url
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
  f?: typeof FileFormat[number]
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
