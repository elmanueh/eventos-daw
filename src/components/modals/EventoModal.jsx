import {
  API_URLS,
  CATEGORIA_EVENTOS,
  ESTADOS,
  EVENTO_MODIFICABLE
} from '@/configs/constant'
import { HttpService } from '@/services/httpService'
import { AuthContext } from '@context/AuthContext'
import { useContext, useEffect, useMemo, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

export default function EventoModal({
  show,
  callback,
  onHide,
  espacioFisico,
  evento
}) {
  const { user } = useContext(AuthContext)

  const initialFormData = useMemo(
    () => ({
      nombre: '',
      descripcion: '',
      organizador: user?.username || '',
      numPlazas: '',
      categoria: '',
      fechaInicio: '',
      fechaFin: '',
      espacioFisico: espacioFisico?.id || ''
    }),
    [user, espacioFisico]
  )

  const [formData, setFormData] = useState(initialFormData)
  const [espaciosList, setEspaciosList] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const [maxPlazas, setMaxPlazas] = useState(0)

  const plazasOcupadas = evento?.numPlazas - evento?.numPlazasDisponibles

  useEffect(() => {
    setFormData(evento ? { ...evento } : initialFormData)
    setErrorMessage('')
  }, [show])

  useEffect(() => {
    if (evento) {
      const { id, ...eventoSinId } = evento
      setFormData({
        ...eventoSinId
      })
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (evento) => {
    if (
      Object.values(formData).some(
        (value) => value === null || value === undefined || value === ''
      )
    ) {
      setErrorMessage('Este campo es obligatorio')
      return
    }

    setErrorMessage('')

    if (evento) {
      const cambios = Object.fromEntries(
        EVENTO_MODIFICABLE.filter(
          (campo) => formData[campo] !== evento[campo]
        ).map((campo) => [campo, formData[campo]])
      )

      callback(cambios)
    } else {
      callback(formData)
    }
  }

  useEffect(() => {
    const fetchEspacios = async () => {
      const data = await HttpService.get(API_URLS.ESPACIOS_LISTAR)
      setEspaciosList(
        data.espacio
          .map((espacio) => espacio.espacioDTO)
          .filter((espacio) => espacio.estado === ESTADOS.ACTIVO)
      )
    }

    if (!espacioFisico) {
      fetchEspacios()
    }
  }, [])

  useEffect(() => {
    if (espacioFisico) {
      setMaxPlazas(espacioFisico.capacidad)
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
              Espacio físico
              {!!errorMessage && !formData.espacioFisico && (
                <span className="text-danger ms-2">({errorMessage})</span>
              )}
            </Form.Label>
            {espacioFisico ? (
              <Form.Control
                type="text"
                value={espacioFisico.nombre}
                readOnly
                style={{
                  pointerEvents: 'none',
                  filter: 'brightness(0.70)'
                }}
              />
            ) : (
              <Form.Select
                name="espacioFisico"
                value={formData.espacioFisico}
                onChange={handleChange}
                isInvalid={!!errorMessage && formData.espacioFisico === ''}
                required
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
              Nombre del evento
              {!!errorMessage && !formData.nombre && (
                <span className="text-danger ms-2">({errorMessage})</span>
              )}
            </Form.Label>
            {evento ? (
              <Form.Control
                type="text"
                value={formData.nombre}
                readOnly
                style={{
                  pointerEvents: 'none',
                  filter: 'brightness(0.70)'
                }}
              />
            ) : (
              <Form.Control
                type="text"
                placeholder="Ej. Concierto de Rock"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                isInvalid={!!errorMessage && formData.nombre === ''}
                required
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNumPlazas">
            <Form.Label>
              Número de plazas
              {!!errorMessage && !formData.numPlazas && (
                <span className="text-danger ms-2">({errorMessage})</span>
              )}
              {!!evento && (
                <span className="text-muted ms-2">
                  (Plazas disponibles: {formData.numPlazas - plazasOcupadas})
                </span>
              )}
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej. 5"
              name="numPlazas"
              value={formData.numPlazas}
              onChange={(e) => {
                const value = Math.max(
                  plazasOcupadas || 1,
                  Math.min(e.target.value, maxPlazas)
                )
                handleChange({ target: { name: e.target.name, value } })
              }}
              min={plazasOcupadas || 1}
              max={maxPlazas}
              isInvalid={!!errorMessage && formData.numPlazas === ''}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCategoria">
            <Form.Label>
              Categoría
              {!!errorMessage && !formData.categoria && (
                <span className="text-danger ms-2">({errorMessage})</span>
              )}
            </Form.Label>
            {evento ? (
              <Form.Control
                type="text"
                value={formData.categoria}
                readOnly
                style={{
                  pointerEvents: 'none',
                  filter: 'brightness(0.70)'
                }}
              />
            ) : (
              <Form.Select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                isInvalid={!!errorMessage && formData.categoria === ''}
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
              Fecha de inicio
              {!!errorMessage && !formData.fechaInicio && (
                <span className="text-danger ms-2">({errorMessage})</span>
              )}
            </Form.Label>
            <Form.Control
              type="datetime-local"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleChange}
              min={new Date().toISOString()}
              max={formData.fechaFin}
              isInvalid={!!errorMessage && formData.fechaInicio === ''}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFechaFin">
            <Form.Label>
              Fecha de finalización
              {!!errorMessage && !formData.fechaFin && (
                <span className="text-danger ms-2">({errorMessage})</span>
              )}
            </Form.Label>
            <Form.Control
              type="datetime-local"
              name="fechaFin"
              value={formData.fechaFin}
              onChange={handleChange}
              min={formData.fechaInicio}
              isInvalid={!!errorMessage && formData.fechaFin === ''}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescripcion">
            <Form.Label>
              Descripción
              {!!errorMessage && !formData.descripcion && (
                <span className="text-danger ms-2">({errorMessage})</span>
              )}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ej. Un histórico recinto para eventos taurinos, conciertos y actividades culturales, con una gran capacidad de público y un ambiente único en el corazón de Murcia."
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              isInvalid={!!errorMessage && formData.descripcion === ''}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => handleSubmit(evento)}>
          {evento ? 'Editar' : 'Crear'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
