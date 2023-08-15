import { useEffect } from "react"

export default function useDocumentTitle(title: string, prevailOnUnmount = false) {
  const defaultTitle = document.title
  useEffect(() => {
    document.title = (title == 'undefined' ? defaultTitle : title)
  }, [title])

  useEffect(() => () => {
    if (!prevailOnUnmount) {
      document.title = defaultTitle;
    }
  }, [])
}
