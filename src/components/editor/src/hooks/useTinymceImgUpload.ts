import type { EditorProps } from '../editor'
import type { RawEditorSettings } from 'tinymce'

export const useTinymceImgUpload = (props: EditorProps) => {
  const handleImgUpload: RawEditorSettings['images_upload_handler'] = (
    blobInfo,
    success,
    failure
  ) => {
    if (props.upload === false) {
      failure('props upload is undefined')
      return
    }

    // const { type: fileType } = blobInfo.blob()
    const filename = blobInfo.filename()
    const formData = new FormData()
    formData.append(props.uploadFileKey, blobInfo.blob())
    formData.append(filename, filename)

    props
      .upload(formData)
      .then((res) => {
        success(res.data.url)
      })
      .catch((err: any) => {
        // 透传后端 message(如 415 白名单外格式),其余错误(含响应结构异常的
        // TypeError)兜底统一文案,不给编辑器抛原生错误噪音
        failure(err?.response?.data?.message || '上传失败')
      })
  }

  return {
    options: (props.upload
      ? {
          // 准许的图片格式
          images_file_types: 'jpeg,jpg,png,gif,bmp,webp',
          images_upload_handler: handleImgUpload
        }
      : {}) as Partial<RawEditorSettings>
  }
}
