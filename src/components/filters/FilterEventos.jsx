import { CATEGORIA_EVENTOS, ESTADOS } from '@/configs/constant'
import { statusEvento } from '@/utils/eventoHelper'
import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

const defaultFiltro = {
  nombre: '',
  descripcion: '',
  plazasMinimas: '',
  fechaMin: '',
  categoria: '',
  nombreEspacio: '',
  mostrarActivo: true,
  mostrarCancelado: false,
  mostrarFinalizado: false,
  mostrarEnCurso: false
}

export default function FilterEventos({ eventos, callback }) {
  const [filtro, setFiltro] = useState(defaultFiltro)
  const [mostrarFiltro, setMostrarFiltro] = useState(false)

  useEffect(() => {
    const filtrados = eventos.filter((evento) => {
      const estado = statusEvento(evento)
      return (
        evento.nombre.toLowerCase().includes(filtro.nombre.toLowerCase()) &&
        evento.descripcion
          .toLowerCase()
          .includes(filtro.descripcion.toLowerCase()) &&
        evento.categoria.includes(filtro.categoria) &&
        evento.numPlazasDisponibles >= filtro.plazasMinimas &&
        evento.fechaInicio >= filtro.fechaMin &&
        ((filtro.mostrarCancelado && estado === ESTADOS.CANCELADO) ||
          (filtro.mostrarActivo && estado === ESTADOS.ACTIVO) ||
          (filtro.mostrarFinalizado && estado === ESTADOS.FINALIZADO) ||
          (filtro.mostrarEnCurso && estado === ESTADOS.EN_CURSO)) &&
        (!filtro.nombreEspacio ||
          (!filtro.mostrarCancelado &&
            evento.espacio.nombre
              .toLowerCase()
              .includes(filtro.nombreEspacio.toLowerCase())))
      )
    })

    callback(filtrados)
  }, [eventos, filtro, callback])

  const resetFiltros = () => {
    setFiltro(defaultFiltro)
    callback(eventos)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFiltro((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <section className="w-100">
      <div className="">
        <i
          className={`bi bi-filter fs-1 ${
            mostrarFiltro ? 'text-primary' : 'text-secondary'
          }`}
          role="button"
          title={mostrarFiltro ? 'Ocultar filtros' : 'Mostrar filtros'}
          onClick={() => setMostrarFiltro((prev) => !prev)}
        />
      </div>

      {mostrarFiltro && (
        <Form className="border rounded p-3 border-secondary">
          <Row className="g-3">
            <Col md={4}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="nombre"
                type="text"
                value={filtro.nombre}
                onChange={handleInputChange}
                placeholder="Maratón Internacional"
              />
            </Col>
            <Col md={4}>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                name="descripcion"
                type="text"
                value={filtro.descripcion}
                onChange={handleInputChange}
                placeholder="Maratón con corredores de todo el mundo"
              />
            </Col>
            <Col md={4}>
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                name="categoria"
                value={filtro.categoria}
                onChange={handleInputChange}
              >
                <option value="">Selecciona una categoría</option>
                {Object.entries(CATEGORIA_EVENTOS).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Label>Número de plazas disponibles</Form.Label>
              <Form.Control
                name="plazasMinimas"
                type="number"
                value={filtro.plazasMinimas}
                onChange={handleInputChange}
                min="0"
                placeholder="50"
              />
            </Col>
            <Col md={4}>
              <Form.Label>Fecha de inicio</Form.Label>
              <Form.Control
                name="fechaMin"
                type="datetime-local"
                value={filtro.fechaMin}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={4}>
              <Form.Label>Nombre del espacio</Form.Label>
              <Form.Control
                name="nombreEspacio"
                type="text"
                value={filtro.nombreEspacio}
                onChange={handleInputChange}
                placeholder="Estadio Olímpico"
              />
            </Col>
            <Col xs="auto" className="d-flex align-items-end">
              <Form.Check
                name="mostrarActivo"
                type="switch"
                label="Mostrar Activos"
                checked={filtro.mostrarActivo}
                onChange={handleInputChange}
              />
            </Col>
            <Col xs="auto" className="d-flex align-items-end">
              <Form.Check
                name="mostrarFinalizado"
                type="switch"
                label="Mostrar Finalizados"
                checked={filtro.mostrarFinalizado}
                onChange={handleInputChange}
              />
            </Col>
            <Col xs="auto" className="d-flex align-items-end">
              <Form.Check
                name="mostrarEnCurso"
                type="switch"
                label="Mostrar En Curso"
                checked={filtro.mostrarEnCurso}
                onChange={handleInputChange}
              />
            </Col>
            <Col xs="auto" className="d-flex align-items-end">
              <Form.Check
                name="mostrarCancelado"
                type="switch"
                label="Mostrar Cancelados"
                checked={filtro.mostrarCancelado}
                onChange={handleInputChange}
              />
            </Col>
            <Col xs="auto" className="d-flex align-items-end ms-auto">
              <Button variant="outline-primary" onClick={resetFiltros}>
                Quitar filtros
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </section>
  )
}
