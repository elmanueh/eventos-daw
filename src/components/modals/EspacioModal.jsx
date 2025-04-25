import { AuthContext } from '@context/AuthContext'
import { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

export default function EspacioModal({ show, callback, onHide }) {
  const { user } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    nombre: '',
    propietario: user.username,
    capacidad: '',
    direccion: '',
    longitud: '',
    latitud: '',
    descripcion: ''
  })

  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    if (
      !formData.nombre ||
      !formData.capacidad ||
      !formData.direccion ||
      !formData.longitud ||
      !formData.latitud ||
      !formData.descripcion
    ) {
      setErrorMessage('Por favor, completa todos los campos obligatorios.')
      return
    }

    setErrorMessage('')
    callback(formData)
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title className="text-primary fw-bold">
          Crear espacio físico
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorMessage && (
          <div className="alert alert-danger mb-3" role="alert">
            {errorMessage}
          </div>
        )}

        <Form>
          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>Nombre del espacio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej. Plaza de Toros de Murcia"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCapacidad">
            <Form.Label>Capacidad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej. 15000"
              name="capacidad"
              value={formData.capacidad}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDireccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej. C/ Apóstoles, 8, 30003 Murcia, España"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLongitud">
            <div className="row">
              <div className="col-md-6">
                <Form.Label>Latitud (N/S)</Form.Label>
                <Form.Control
                  type="number"
                  step="any"
                  placeholder="Ej. 37.9861"
                  name="latitud"
                  value={formData.latitud}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Longitud (E/W)</Form.Label>
                <Form.Control
                  type="number"
                  step="any"
                  placeholder="Ej. -1.1295"
                  name="longitud"
                  value={formData.longitud}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ej. Un histórico recinto para eventos taurinos, conciertos y actividades culturales, con una gran capacidad de público y un ambiente único en el corazón de Murcia."
              name="descripcion"
              value={formData.descripcion}
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
