import { useState } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

export default function MyToast({ toasts, removeToast }) {
  return (
    <ToastContainer position="top-end" className="p-3 position-fixed">
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          onClose={() => {
            removeToast(index)
          }}
          show={true}
          delay={3000}
          autohide
          className={`border-0 ${
            toast.type === 'danger' ? 'bg-danger' : 'bg-success'
          }`}
        >
          <Toast.Header className="d-flex justify-content-between align-items-center">
            <strong className="me-auto">
              {toast.title || (toast.type === 'danger' ? 'Error' : 'Éxito')}
            </strong>
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  )
}

// Esto ns donde debería ir el hook, pero lo dejo aquí para que funcione
export function useToast() {
  const [toasts, setToasts] = useState([])

  const addToast = (title, message, type = 'danger') => {
    setToasts([...toasts, { title, message, type }])
  }

  const removeToast = (index) => {
    setToasts(toasts.filter((_, i) => i !== index))
  }

  return { toasts, addToast, removeToast }
}
