import { AuthContext } from '@context/AuthContext'
import { useContext, useEffect, useMemo, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

export default function ReservaModal({ show, callback, onHide, evento }) {
  const { user } = useContext(AuthContext)

  const initialFormData = useMemo(
    () => ({
      idEvento: evento.idEvento,
      idUsuario: user.id,
      numPlazas: ''
    }),
    [user, evento]
  )

  useEffect(() => {
    if (show) {
      setFormData({
        idEvento: evento.idEvento,
        idUsuario: user.id,
        numPlazas: ''
      })

      setErrorMessage('')
    }
  }, [show])

  const [formData, setFormData] = useState(initialFormData)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    if (Object.values(formData).some((value) => !value)) {
      setErrorMessage('Este campo es obligatorio')
      return
    }
    setErrorMessage('')
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
              value={evento.nombre}
              readOnly
              style={{
                pointerEvents: 'none',
                filter: 'brightness(0.70)'
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNumPlazas">
            <Form.Label>
              Número de plazas
              {!!errorMessage && !formData.numPlazas && (
                <span className="text-danger ms-2">({errorMessage})</span>
              )}
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej. 5"
              name="numPlazas"
              value={formData.numPlazas}
              onChange={(e) => {
                const value = Math.min(
                  e.target.value,
                  evento.numPlazasDisponibles
                )
                handleChange({ target: { name: e.target.name, value } })
              }}
              required
              min={1}
              max={evento.numPlazasDisponibles}
              isInvalid={!!errorMessage && formData.numPlazas == ''}
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
