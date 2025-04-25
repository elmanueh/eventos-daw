import { API_URLS } from '@/configs/constant'
import { fetchGet } from '@/utils/fetchGet'
import { AuthContext } from '@context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

export default function ReservaModal({ show, callback, onHide, evento }) {
  const { user } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    idEvento: evento ? evento.idEvento : '',
    idUsuario: user.id,
    numPlazas: ''
  })

  const [errorMessage, setErrorMessage] = useState('')
  const [eventosList, setEventosList] = useState([])

  useEffect(() => {
    const fetchEventos = async () => {
      if (!evento) {
        const data = await fetchGet(API_URLS.EVENTOS_LISTAR)
        setEventosList(
          data._embedded.eventoResumenList.filter((e) => !e.cancelado)
        )
      }
    }

    fetchEventos()
  }, [evento])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    if (!formData.idEvento || !formData.numPlazas) {
      setErrorMessage('Por favor, completa todos los campos obligatorios.')
      return
    }

    console.log('Reserva data:', formData)

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
        {errorMessage && (
          <div className="alert alert-danger mb-3" role="alert">
            {errorMessage}
          </div>
        )}

        <Form>
          <Form.Group className="mb-3" controlId="formEvento">
            <Form.Label>Evento</Form.Label>
            {evento ? (
              <Form.Control type="text" value={evento.nombre} readOnly />
            ) : (
              <Form.Select
                name="idEvento"
                value={formData.idEvento}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un evento</option>
                {eventosList.map((evento) => (
                  <option key={evento.id} value={evento.id}>
                    {evento.nombre}
                  </option>
                ))}
              </Form.Select>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNumPlazas">
            <Form.Label>Número de plazas</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej. 5"
              name="numPlazas"
              value={formData.numPlazas}
              onChange={handleChange}
              required
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
