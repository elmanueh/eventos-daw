import { AuthContext } from '@context/AuthContext'
import { useContext, useEffect, useMemo, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

export default function ReservaModal({ show, callback, onHide, evento }) {
  const { user } = useContext(AuthContext)

  const initialFormData = useMemo(
    () => ({
      idEvento: evento.id,
      idUsuario: user.id,
      plazasReservadas: ''
    }),
    [evento, user.id]
  )

  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    if (show) {
      setFormData(initialFormData)
    }
  }, [show, evento, initialFormData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    callback(formData)
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title className="text-primary fw-bold">
          Realizar reserva
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formEvento">
            <Form.Label>Evento</Form.Label>
            <Form.Control
              type="text"
              name="evento"
              value={evento.nombre}
              readOnly
              style={{
                pointerEvents: 'none',
                filter: 'brightness(0.70)'
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlazasReservadas">
            <Form.Label>
              Número de plazas
            </Form.Label>
            <Form.Control
              type="number"
              name="plazasReservadas"
              placeholder="15"
              min={1}
              max={evento.numPlazasDisponibles}
              value={formData.plazasReservadas}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Crear
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
