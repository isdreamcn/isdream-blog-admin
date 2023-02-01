import { appConfig } from '@/config'

export const setBaseUrlFile = (str: string) => {
  return str
    .replaceAll(/(!\[.*\]\()(?!http)/g, `$1${appConfig.baseUrlFile}`)
    .replaceAll(/(<img src=")(?!http)/g, `$1${appConfig.baseUrlFile}`)
}

export const removeBaseUrlFile = (str: string) => {
  return str.replaceAll(appConfig.baseUrlFile, '')
}

export const joinBaseUrlFile = (url: string) => {
  return /^https?:\/\//.test(url) ? url : appConfig.baseUrlFile + url
}
