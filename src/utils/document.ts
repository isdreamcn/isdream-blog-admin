export const setDocumentTitle = (title?: string) => {
  document.title = [title, import.meta.env.VITE_APP_TITLE].join(' | ')
}
