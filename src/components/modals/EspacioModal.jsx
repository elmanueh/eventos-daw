import { AuthContext } from '@context/AuthContext'
import { useContext, useEffect, useMemo, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

export default function EspacioModal({ show, callback, onHide, espacio }) {
  const { user } = useContext(AuthContext)

  const initialFormData = useMemo(
    () => ({
      nombre: espacio?.nombre || '',
      propietario: espacio?.propietario || user.username,
      capacidad: espacio?.capacidad || 0,
      direccion: espacio?.direccion || '',
      longitud: espacio?.longitud || 0,
      latitud: espacio?.latitud || 0,
      descripcion: espacio?.descripcion || ''
    }),
    [espacio, user.username]
  )

  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    setFormData(initialFormData)
  }, [show, espacio, initialFormData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    if (espacio) {
      const cambios = Object.fromEntries(
        Object.entries(formData).filter(
          ([key, value]) => value !== espacio[key]
        )
      )

      if (Object.keys(cambios).length) callback(cambios)
    } else {
      callback(formData)
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title className="text-primary fw-bold">
          {espacio ? 'Editar espacio físico' : 'Crear espacio físico'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>Nombre del espacio</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Plaza de Toros de Murcia"
              value={formData.nombre}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCapacidad">
            <Form.Label>Capacidad</Form.Label>
            <Form.Control
              type="number"
              name="capacidad"
              placeholder="15000"
              min={1}
              max={Number.MAX_SAFE_INTEGER}
              value={formData.capacidad}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDireccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              placeholder="C/ Apóstoles, 8, 30003 Murcia, España"
              value={formData.direccion}
              onChange={handleChange}
              readOnly={!!espacio}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLatitud">
            <Form.Label>Latitud (N/S)</Form.Label>
            <Form.Control
              type="number"
              name="latitud"
              placeholder="37.9861"
              min={-90}
              max={90}
              value={formData.latitud}
              onChange={handleChange}
              readOnly={!!espacio}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLongitud">
            <Form.Label>Longitud (E/W)</Form.Label>
            <Form.Control
              type="number"
              name="longitud"
              placeholder="-1.1295"
              min={-180}
              max={180}
              value={formData.longitud}
              onChange={handleChange}
              readOnly={!!espacio}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              as="textarea"
              rows={3}
              placeholder="Un histórico recinto para eventos taurinos, conciertos y actividades culturales, con una gran capacidad de público y un ambiente único en el corazón de Murcia."
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
          {espacio ? 'Editar' : 'Crear'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
