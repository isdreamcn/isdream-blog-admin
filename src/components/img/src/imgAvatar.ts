import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@/utils'

export const imgAvatarProps = buildProps({
  username: {
    type: String,
    default: ''
  },
  src: String
} as const)

const colours = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#16a085',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#2c3e50',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#ecf0f1',
  '#95a5a6',
  '#f39c12',
  '#d35400',
  '#c0392b',
  '#bdc3c7',
  '#7f8c8d'
]

export const hashColor = (username: string) => {
  // 定义hashCode变量
  const str = username.slice(0, 6)
  let hashCode = 0
  // 霍纳法则，来计算hashCode的值
  // cats => Unicode编码
  for (let i = 0; i < str.length; i++) {
    hashCode = 37 * hashCode + str.charCodeAt(i)
  }
  // 取余操作
  const index = hashCode % 19
  return colours[index]
}

export type ImgAvatarProps = ExtractPropTypes<typeof imgAvatarProps>
