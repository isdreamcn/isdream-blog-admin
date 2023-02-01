import type { ExtractPropTypes } from 'vue'
import type ViewFile from './viewFile.vue'
import { buildProps } from '@/utils'

export const viewFileProps = buildProps({
  src: {
    type: String
  },
  mimeType: {
    type: String,
    default: 'image/png'
  }
} as const)

export type ViewFileProps = ExtractPropTypes<typeof viewFileProps>

export type ViewFileInstance = InstanceType<typeof ViewFile>
