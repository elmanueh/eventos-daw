import { useState } from 'react'

export function useToast() {
  const [toasts, setToasts] = useState([])

  const showToast = (toastMessage) => {
    const { title, message, type } = toastMessage
    setToasts([
      ...toasts,
      {
        title: title,
        message: message,
        type: type
      }
    ])
  }

  const hideToast = (index) => {
    setToasts(toasts.filter((_, i) => i !== index))
  }

  return { toasts, showToast, hideToast }
}
