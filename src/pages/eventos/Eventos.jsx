import { ESTADOS, EVENTOS_REDUCER, TARJETA_TIPOS } from '@/configs/constant'
import { useEventos } from '@/hooks/useEventos'
import { getEstadoEvento } from '@/utils/eventoHelper'
import GroupCards from '@components/GroupCards'
import Loading from '@pages/Loading'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

const defaultFiltro = {
  nombre: '',
  descripcion: '',
  plazasMinimas: '',
  fechaMin: '',
  mostrarActivo: true,
  mostrarCancelado: false,
  mostrarFinalizado: false,
  mostrarEnCurso: false
}

export default function Eventos() {
  const { eventos, loading } = useEventos(EVENTOS_REDUCER.ALL)
  const [filtro, setFiltro] = useState(defaultFiltro)

  const resetFiltros = () => {
    setFiltro(defaultFiltro)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFiltro((prev) => {
      const nuevoFiltro = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }

      if (name === 'plazasMinimas' || name === 'fechaMin') {
        nuevoFiltro.mostrarCancelado = false
      }

      if (name === 'mostrarCancelado' && checked) {
        nuevoFiltro.plazasMinimas = ''
        nuevoFiltro.fechaMin = ''
      }

      return nuevoFiltro
    })
  }

  if (loading) return <Loading />

  const eventosFiltrados = eventos.filter((evento) => {
    const estado = getEstadoEvento(evento)

    return (
      evento.nombre.toLowerCase().includes(filtro.nombre.toLowerCase()) &&
      evento.descripcion
        .toLowerCase()
        .includes(filtro.descripcion.toLowerCase()) &&
      evento.numPlazas >= filtro.plazasMinimas &&
      evento.fechaInicio >= filtro.fechaMin &&
      ((filtro.mostrarCancelado && estado === ESTADOS.CANCELADO) ||
        (filtro.mostrarActivo && estado === ESTADOS.ACTIVO) ||
        (filtro.mostrarFinalizado && estado === ESTADOS.FINALIZADO) ||
        (filtro.mostrarEnCurso && estado === ESTADOS.EN_CURSO))
    )
  })

  return (
    <div className="d-flex flex-column align-items-center">
      <header className="text-center">
        <h1 className="text-primary fw-bold" id="eventos">
          Eventos
        </h1>
      </header>

      <section className="w-100 px-3">
        <Form>
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
              <Form.Label>Número de plazas</Form.Label>
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
            <Col md="auto" className="d-flex align-items-end ms-auto">
              <Button variant="outline-primary" onClick={resetFiltros}>
                Quitar filtros
              </Button>
            </Col>
          </Row>
        </Form>
      </section>

      <section className="mt-3 w-100 px-3">
        <GroupCards
          objetos={eventosFiltrados}
          tipo={TARJETA_TIPOS.EVENTOS}
          id={'eventos'}
        />
      </section>
    </div>
  )
}
