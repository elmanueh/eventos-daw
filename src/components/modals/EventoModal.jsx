import { API_URLS, CATEGORIA_EVENTOS, ESTADOS } from '@/configs/constant'
import { fetchGet } from '@/utils/fetchGet'
import { AuthContext } from '@context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

export default function EventoModal({ show, callback, onHide, espacioFisico }) {
  const { user } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    organizador: user.username,
    numPlazas: '',
    categoria: '',
    fechaInicio: '',
    fechaFin: '',
    espacioFisico: espacioFisico ? espacioFisico.id : ''
  })

  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    if (
      !formData.nombre ||
      !formData.descripcion ||
      !formData.numPlazas ||
      !formData.categoria ||
      !formData.fechaInicio ||
      !formData.fechaFin
    ) {
      setErrorMessage('Por favor, completa todos los campos obligatorios.')
      return
    }

    setErrorMessage('')
    callback(formData)
  }

  const [espaciosList, setEspaciosList] = useState([])

  useEffect(() => {
    const fetchEspacios = async () => {
      if (!espacioFisico) {
        const data = await fetchGet(API_URLS.ESPACIOS_LISTAR)
        setEspaciosList(
          data.espacio
            .map((espacio) => espacio.espacioDTO)
            .filter((espacio) => espacio.estado === ESTADOS.ACTIVO)
        )
      }
    }

    fetchEspacios()
  }, [espacioFisico])

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title className="text-primary fw-bold">Crear evento</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorMessage && (
          <div className="alert alert-danger mb-3" role="alert">
            {errorMessage}
          </div>
        )}

        <Form>
          <Form.Group className="mb-3" controlId="formEspacioFisico">
            <Form.Label>Espacio físico</Form.Label>
            {espacioFisico ? (
              <Form.Control type="text" value={espacioFisico.nombre} readOnly />
            ) : (
              <Form.Select
                name="espacioFisico"
                value={formData.espacioFisico}
                onChange={handleChange}
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
            <Form.Label>Nombre del evento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej. Concierto de Rock"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNumPlazas">
            <Form.Label>Número de plazas</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej. 5"
              name="numPlazas"
              value={formData.numPlazas}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCategoria">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            >
              <option value="">Selecciona una categoría</option>
              {Object.entries(CATEGORIA_EVENTOS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFechaInicio">
            <Form.Label>Fecha de inicio</Form.Label>
            <Form.Control
              type="datetime-local"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleChange}
              min={new Date().toISOString()}
              max={formData.fechaFin}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFechaFin">
            <Form.Label>Fecha de finalización</Form.Label>
            <Form.Control
              type="datetime-local"
              name="fechaFin"
              value={formData.fechaFin}
              onChange={handleChange}
              min={formData.fechaInicio}
            />
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
