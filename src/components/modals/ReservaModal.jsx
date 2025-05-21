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
      plazasReservadas: 0
    }),
    [evento, user.id]
  )

  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (show) {
      setFormData(initialFormData)
      setErrors({})
    }
  }, [show, evento, initialFormData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = () => {
    const newErrors = {}
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'Obligatorio'
      }
    })

    if (Object.keys(newErrors).length > 0) {
      return setErrors(newErrors)
    }

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
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlazasReservadas">
            <Form.Label>
              Número de plazas{' '}
              {errors.plazasReservadas && (
                <span className="text-danger">({errors.plazasReservadas})</span>
              )}
            </Form.Label>
            <Form.Control
              type="number"
              name="plazasReservadas"
              min={1}
              max={evento.numPlazasDisponibles}
              value={formData.plazasReservadas}
              onChange={handleChange}
              isInvalid={!!errors.plazasReservadas}
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
