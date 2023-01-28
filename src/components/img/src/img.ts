import type { ExtractPropTypes } from 'vue'
import type Img from './img.vue'
import { buildProps } from '@/utils'

export const imgProps = buildProps({
  src: {
    type: String,
    required: false
  },
  // 缩略图
  thumb: {
    type: String
  },
  lazy: {
    type: Boolean,
    default: false
  }
} as const)

export const imgEmits = {
  error: () => true,
  load: () => true
}

export type ImgProps = ExtractPropTypes<typeof imgProps>
export type ImgEmits = typeof imgEmits

export type ImgInstance = InstanceType<typeof Img>
