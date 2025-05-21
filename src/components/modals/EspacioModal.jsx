import { EVENTOS_REDUCER } from '@/configs/constant'
import { useEventos } from '@/hooks/useEventos'
import { AuthContext } from '@context/AuthContext'
import { useContext, useEffect, useMemo, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

export default function EspacioModal({ show, callback, onHide, espacio }) {
  const { user } = useContext(AuthContext)

  const { eventos, loading } = useEventos(
    EVENTOS_REDUCER.BY_ESPACIO,
    espacio?.id
  )

  const minPlazas = useMemo(() => {
    if (loading || !eventos) return 1
    return eventos.reduce((acc, evento) => Math.max(acc, evento.numPlazas), 1)
  }, [eventos])

  const initialFormData = useMemo(
    () => ({
      nombre: espacio?.nombre || '',
      propietario: espacio?.propietario || user.username,
      capacidad: espacio?.capacidad || '',
      direccion: espacio?.direccion || '',
      longitud: espacio?.longitud || '',
      latitud: espacio?.latitud || '',
      descripcion: espacio?.descripcion || ''
    }),
    [espacio, user.username]
  )

  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setFormData(initialFormData)
    setErrors({})
  }, [show, espacio, initialFormData])

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
            <Form.Label>
              Nombre del espacio{' '}
              {errors.nombre && (
                <span className="text-danger">({errors.nombre})</span>
              )}
            </Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Plaza de Toros de Murcia"
              value={formData.nombre}
              onChange={handleChange}
              isInvalid={!!errors.nombre}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCapacidad">
            <Form.Label>
              Capacidad{' '}
              {errors.capacidad && (
                <span className="text-danger">({errors.capacidad})</span>
              )}
            </Form.Label>
            <Form.Control
              type="number"
              name="capacidad"
              placeholder="15000"
              min={minPlazas}
              max={Number.MAX_SAFE_INTEGER}
              value={formData.capacidad}
              onChange={handleChange}
              isInvalid={!!errors.capacidad}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDireccion">
            <Form.Label>
              Dirección{' '}
              {errors.direccion && (
                <span className="text-danger">({errors.direccion})</span>
              )}
            </Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              placeholder="C/ Apóstoles, 8, 30003 Murcia, España"
              value={formData.direccion}
              onChange={handleChange}
              readOnly={!!espacio}
              isInvalid={!!errors.direccion}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLatitud">
            <Form.Label>
              Latitud (N/S){' '}
              {errors.latitud && (
                <span className="text-danger">({errors.latitud})</span>
              )}
            </Form.Label>
            <Form.Control
              type="number"
              name="latitud"
              placeholder="37.9861"
              min={-90}
              max={90}
              step={0.0001}
              value={formData.latitud}
              onChange={handleChange}
              readOnly={!!espacio}
              isInvalid={!!errors.latitud}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLongitud">
            <Form.Label>
              Longitud (E/W){' '}
              {errors.longitud && (
                <span className="text-danger">({errors.longitud})</span>
              )}
            </Form.Label>
            <Form.Control
              type="number"
              name="longitud"
              placeholder="-1.1295"
              min={-180}
              max={180}
              step={0.0001}
              value={formData.longitud}
              onChange={handleChange}
              readOnly={!!espacio}
              isInvalid={!!errors.longitud}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescripcion">
            <Form.Label>
              Descripción{' '}
              {errors.descripcion && (
                <span className="text-danger">({errors.descripcion})</span>
              )}
            </Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              as="textarea"
              rows={3}
              placeholder="Un histórico recinto para eventos taurinos, conciertos y actividades culturales, con una gran capacidad de público y un ambiente único en el corazón de Murcia."
              value={formData.descripcion}
              onChange={handleChange}
              isInvalid={!!errors.descripcion}
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
