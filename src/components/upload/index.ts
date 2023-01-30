import { withInstall } from '@/utils'
import Upload from './src/upload.vue'
import ViewFile from './src/viewFile.vue'

export const MUpload = withInstall(Upload)
export const MViewFile = withInstall(ViewFile)
export default MUpload

export * from './src/upload'
