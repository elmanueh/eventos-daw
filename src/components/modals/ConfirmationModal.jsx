import { estado } from '@/configs/constant'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function ConfirmationModal({
  show,
  callback,
  onHide,
  title,
  status
}) {
  const message =
    status === estado.ACTIVO
      ? 'Estás a punto de cerrar este espacio. Una vez cerrado, no estará disponible para la creación de nuevos eventos hasta que se vuelva a activar.'
      : 'Estás a punto de activar este espacio. Una vez activado, estará disponible nuevamente para la creación de eventos en la plataforma.'

  return (
    <Modal show={show} onHide={onHide} backdrop={true}>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary fw-bold">
          {' '}
          <i
            className={`bi ${
              status === estado.ACTIVO
                ? 'bi-x-circle-fill'
                : 'bi-check-circle-fill'
            }`}
          />{' '}
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-3">{message}</p>
        <p className="mt-3">¿Estás seguro de que deseas continuar?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={callback}>
          Continuar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
