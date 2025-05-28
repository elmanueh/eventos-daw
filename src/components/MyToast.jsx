import { Toast, ToastContainer } from 'react-bootstrap'

const TIME_MILISECONDS = 5000

export default function MyToast({ toasts, hideToast }) {
  return (
    <ToastContainer position="top-end" className="p-3 position-fixed">
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          onClose={() => hideToast(index)}
          delay={TIME_MILISECONDS}
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
