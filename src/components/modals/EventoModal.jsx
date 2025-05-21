import { CATEGORIA_EVENTOS, ESPACIOS_REDUCER } from '@/configs/constant'
import { useEspacios } from '@/hooks/useEspacios'
import { formatDateTimeLocal } from '@/utils/eventoHelper'
import { AuthContext } from '@context/AuthContext'
import { useContext, useEffect, useMemo, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

export default function EventoModal({
  show,
  callback,
  onHide,
  evento,
  espacio
}) {
  const { user } = useContext(AuthContext)

  const { espacios: espaciosList } = useEspacios(ESPACIOS_REDUCER.ALL)

  const initialFormData = useMemo(
    () => ({
      nombre: evento?.nombre || '',
      descripcion: evento?.descripcion || '',
      organizador: evento?.organizador || user.username,
      numPlazas: evento?.numPlazas || '',
      categoria: evento?.categoria || '',
      fechaInicio: evento?.fechaInicio || '',
      fechaFin: evento?.fechaFin || '',
      espacioFisico: espacio?.id || ''
    }),
    [evento, user.username]
  )

  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})

  const [maxPlazas, setMaxPlazas] = useState(0)
  const plazasOcupadas = evento?.numPlazas - evento?.numPlazasDisponibles

  useEffect(() => {
    setFormData(initialFormData)
    setErrors({})
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

    if (evento) {
      const cambios = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => value !== evento[key])
      )

      if (Object.keys(cambios).length) callback(cambios)
    } else {
      callback(formData)
    }
  }

  useEffect(() => {
    if (espacio) {
      setMaxPlazas(espacio.capacidad)
    } else {
      const espacioSeleccionado = espaciosList.find(
        (espacio) => espacio.id === formData.espacioFisico
      )
      setMaxPlazas(espacioSeleccionado?.capacidad || Number.MAX_SAFE_INTEGER)
    }
  }, [formData.espacioFisico, espaciosList])

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title className="text-primary fw-bold">
          {evento ? 'Editar evento' : 'Crear evento'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formEspacioFisico">
            <Form.Label>
              Espacio físico{' '}
              {errors.espacioFisico && (
                <span className="text-danger">({errors.espacioFisico})</span>
              )}
            </Form.Label>
            {espacio ? (
              <Form.Control
                type="text"
                name="espacioFisico"
                value={espacio.nombre}
                readOnly
              />
            ) : (
              <Form.Select
                name="espacioFisico"
                value={formData.espacioFisico}
                onChange={handleChange}
                isInvalid={!!errors.espacioFisico}
              >
                <option value="">Seleccione un espacio físico</option>
                {espaciosList.map((espacio) => (
                  <option key={espacio.id} value={espacio.id}>
                    {espacio.nombre}
                  </option>
                ))}
              </Form.Select>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>
              Nombre del evento{' '}
              {errors.nombre && (
                <span className="text-danger">({errors.nombre})</span>
              )}
            </Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Concierto de Rock"
              value={formData.nombre}
              onChange={handleChange}
              readOnly={!!evento}
              isInvalid={!!errors.nombre}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNumPlazas">
            <Form.Label>
              Número de plazas
              {!!evento && (
                <span className="text-muted ms-2">
                  (Plazas disponibles: {formData.numPlazas - plazasOcupadas})
                </span>
              )}
              {errors.numPlazas && (
                <span className="text-danger">({errors.numPlazas})</span>
              )}
            </Form.Label>
            <Form.Control
              type="number"
              name="numPlazas"
              placeholder="15000"
              min={plazasOcupadas || 1}
              max={maxPlazas}
              value={formData.numPlazas}
              onChange={handleChange}
              isInvalid={!!errors.numPlazas}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCategoria">
            <Form.Label>
              Categoría{' '}
              {errors.categoria && (
                <span className="text-danger">({errors.categoria})</span>
              )}
            </Form.Label>
            {evento ? (
              <Form.Control
                type="text"
                name="categoria"
                value={formData.categoria}
                readOnly
              />
            ) : (
              <Form.Select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                isInvalid={!!errors.categoria}
              >
                <option value="">Selecciona una categoría</option>
                {Object.entries(CATEGORIA_EVENTOS).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Form.Select>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFechaInicio">
            <Form.Label>
              Fecha de inicio{' '}
              {errors.fechaInicio && (
                <span className="text-danger">({errors.fechaInicio})</span>
              )}
            </Form.Label>
            <Form.Control
              type="datetime-local"
              name="fechaInicio"
              min={formatDateTimeLocal(new Date())}
              max={formData.fechaFin}
              value={formData.fechaInicio}
              onChange={handleChange}
              isInvalid={!!errors.fechaInicio}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFechaFin">
            <Form.Label>
              Fecha de finalización{' '}
              {errors.fechaFin && (
                <span className="text-danger">({errors.fechaFin})</span>
              )}
            </Form.Label>
            <Form.Control
              type="datetime-local"
              name="fechaFin"
              min={formData.fechaInicio || formatDateTimeLocal(new Date())}
              value={formData.fechaFin}
              onChange={handleChange}
              isInvalid={!!errors.fechaFin}
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
              as="textarea"
              rows={3}
              name="descripcion"
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
          {evento ? 'Editar' : 'Crear'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
