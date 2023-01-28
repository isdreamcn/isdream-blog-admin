import { withInstall } from '@/utils'
import Img from './src/img.vue'
import ImgDefault from './src/imgDefault.vue'
import ImgAvatar from './src/imgAvatar.vue'

export const MImg = withInstall(Img)
export const MImgDefault = withInstall(ImgDefault)
export const MImgAvatar = withInstall(ImgAvatar)

export default MImg

export * from './src/img'
export * from './src/imgAvatar'
