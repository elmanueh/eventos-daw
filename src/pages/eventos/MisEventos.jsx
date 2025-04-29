import { TARJETA_TIPOS } from '@/configs/constant'
import { handleCrearEvento } from '@/utils/operations'
import GroupCards from '@components/GroupCards'
import EventoModal from '@components/modals/EventoModal'
import { useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function MisEventos() {
  const initialEventos = useLoaderData()._embedded.eventoResumenList
  const [eventos] = useState(initialEventos)
  const [showEventoModal, setShowEventoModal] = useState(false)
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroDescripcion, setFiltroDescripcion] = useState('')
  const [filtroPlazas, setFiltroPlazas] = useState('')
  const [mostrarActivos, setMostrarActivos] = useState(true)
  const [mostrarCancelados, setMostrarCancelados] = useState(true)

  const resetFiltros = () => {
    setFiltroNombre('')
    setFiltroDescripcion('')
    setFiltroPlazas('')
    setMostrarActivos(true)
    setMostrarCancelados(true)
  }

  const eventosFiltrados = useMemo(() => {
    return eventos.filter((evento) => {
      const cumpleNombre = evento.nombre
        .toLowerCase()
        .includes(filtroNombre.toLowerCase())
      const cumpleDescripcion = evento.descripcion
        .toLowerCase()
        .includes(filtroDescripcion.toLowerCase())
      const cumplePlazas =
        filtroPlazas === '' || evento.numPlazas >= parseInt(filtroPlazas)
      const esActivo = !evento.cancelado
      const esCancelado = evento.cancelado

      return (
        cumpleNombre &&
        cumpleDescripcion &&
        cumplePlazas &&
        ((esActivo && mostrarActivos) || (esCancelado && mostrarCancelados))
      )
    })
  }, [
    eventos,
    filtroNombre,
    filtroDescripcion,
    filtroPlazas,
    mostrarActivos,
    mostrarCancelados
  ])

  const eventosActivos = eventosFiltrados.filter((e) => !e.cancelado)
  const eventosCancelados = eventosFiltrados.filter((e) => e.cancelado)

  return (
    <Container className="d-flex flex-column gap-3 p-0">
      <EventoModal
        show={showEventoModal}
        callback={(evento) => handleCrearEvento(evento, setShowEventoModal)}
        onHide={() => setShowEventoModal(false)}
      />

      <h1 className="text-center">Mis Eventos</h1>

      <Row className="d-flex justify-content-between">
        <Col xs="auto">
          <i
            className={`bi bi-filter fs-1 me-2 ${
              mostrarFiltros ? 'text-primary' : 'text-secondary'
            }`}
            role="button"
            title={mostrarFiltros ? 'Ocultar filtros' : 'Mostrar filtros'}
            onClick={() => setMostrarFiltros((prev) => !prev)}
          ></i>
        </Col>
        <Col xs="auto">
          <Button onClick={() => setShowEventoModal(true)}>Crear Evento</Button>
        </Col>
      </Row>

      {mostrarFiltros && (
        <Form className="mt-3 border rounded p-3 shadow-sm">
          <Row className="g-3 align-items-end">
            <Col md={4}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={filtroDescripcion}
                onChange={(e) => setFiltroDescripcion(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Label>Número de plazas</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={filtroPlazas}
                onChange={(e) => setFiltroPlazas(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Form.Check
                type="switch"
                label="Mostrar Activos"
                checked={mostrarActivos}
                onChange={(e) => setMostrarActivos(e.target.checked)}
              />
            </Col>
            <Col xs="auto">
              <Form.Check
                type="switch"
                label="Mostrar Cancelados"
                checked={mostrarCancelados}
                onChange={(e) => setMostrarCancelados(e.target.checked)}
              />
            </Col>
            <Col md="auto" className="ms-auto">
              <Button variant="outline-primary" onClick={resetFiltros}>
                Quitar filtros
              </Button>
            </Col>
          </Row>
        </Form>
      )}

      {mostrarActivos && (
        <>
          <h3 id="titulo1-groupCards">Activos</h3>
          <GroupCards
            objetos={eventosActivos}
            tipo={TARJETA_TIPOS.EVENTOS}
            visible={true}
            id={'titulo1-groupCards'}
          />
        </>
      )}
      {mostrarCancelados && (
        <>
          <h3 id="titulo2-groupCards">Cancelados</h3>
          <GroupCards
            objetos={eventosCancelados}
            tipo={TARJETA_TIPOS.EVENTOS}
            visible={true}
            id={'titulo2-groupCards'}
          />
        </>
      )}
    </Container>
  )
}
