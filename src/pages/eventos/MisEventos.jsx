import { EVENTOS_REDUCER, TARJETA_TIPOS } from '@/configs/constant'
import { useEventos } from '@/hooks/useEventos'
import {
  obtenerEventosActivos,
  obtenerEventosCancelados,
  obtenerEventosEnCurso,
  obtenerEventosFinalizados
} from '@/utils/eventoHelper'
import { handleCrearEvento } from '@/utils/operations'
import GroupCards from '@components/GroupCards'
import EventoModal from '@components/modals/EventoModal'
import MyToast, { useToast } from '@components/toast/MyToast'
import Loading from '@pages/Loading'
import { useId, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

export default function MisEventos() {
  const { eventos, loading, toggleEstado } = useEventos(
    EVENTOS_REDUCER.BY_GESTOR
  )
  const idGroupEventosEnCurso = useId()
  const idGroupEventosFinalizados = useId()
  const idGroupEventosActivos = useId()
  const idGroupEventosCancelados = useId()

  const [showEventoModal, setShowEventoModal] = useState(false)
  const { addToast, toasts, removeToast } = useToast()

  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroDescripcion, setFiltroDescripcion] = useState('')
  const [filtroPlazas, setFiltroPlazas] = useState('')

  const [mostrarCancelados, setMostrarCancelados] = useState(true)
  const [mostrarEnCurso, setMostrarEnCurso] = useState(true)
  const [mostrarProximos, setMostrarProximos] = useState(true)
  const [mostrarFinalizados, setMostrarFinalizados] = useState(true)
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  const resetFiltros = () => {
    setFiltroNombre('')
    setFiltroDescripcion('')
    setFiltroPlazas('')
    setMostrarEnCurso(true)
    setMostrarProximos(true)
    setMostrarFinalizados(true)
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

      return cumpleNombre && cumpleDescripcion && cumplePlazas
    })
  }, [eventos, filtroNombre, filtroDescripcion, filtroPlazas])

  if (loading) return <Loading />

  const eventosEnCurso = obtenerEventosEnCurso(eventosFiltrados)
  const eventosFinalizados = obtenerEventosFinalizados(eventosFiltrados)
  const eventosActivos = obtenerEventosActivos(eventosFiltrados)
  const eventosCancelados = obtenerEventosCancelados(eventosFiltrados)

  return (
    <Container className="d-flex flex-column gap-3 p-0">
      <MyToast toasts={toasts} removeToast={removeToast} />

      <EventoModal
        show={showEventoModal}
        callback={(evento) =>
          handleCrearEvento(evento, setShowEventoModal, addToast)
        }
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
                label="Mostrar En curso"
                checked={mostrarEnCurso}
                onChange={(e) => setMostrarEnCurso(e.target.checked)}
              />
            </Col>
            <Col xs="auto">
              <Form.Check
                type="switch"
                label="Mostrar Próximos"
                checked={mostrarProximos}
                onChange={(e) => setMostrarProximos(e.target.checked)}
              />
            </Col>
            <Col xs="auto">
              <Form.Check
                type="switch"
                label="Mostrar Finalizados"
                checked={mostrarFinalizados}
                onChange={(e) => setMostrarFinalizados(e.target.checked)}
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

      {mostrarEnCurso && eventosEnCurso.length > 0 && (
        <>
          <h3 id={idGroupEventosEnCurso}>En curso</h3>
          <GroupCards
            objetos={eventosEnCurso}
            tipo={TARJETA_TIPOS.EVENTOS}
            visible={true}
            id={idGroupEventosEnCurso}
          />
        </>
      )}

      {mostrarProximos && eventosActivos.length > 0 && (
        <>
          <h3 id={idGroupEventosActivos}>Próximos</h3>
          <GroupCards
            objetos={eventosActivos}
            tipo={TARJETA_TIPOS.EVENTOS}
            visible={true}
            id={idGroupEventosActivos}
            action={{ toggleEstado }}
            addToast={addToast}
          />
        </>
      )}

      {mostrarFinalizados && eventosFinalizados.length > 0 && (
        <>
          <h3 id={idGroupEventosFinalizados}>Finalizados</h3>
          <GroupCards
            objetos={eventosFinalizados}
            tipo={TARJETA_TIPOS.EVENTOS}
            visible={true}
            id={idGroupEventosFinalizados}
          />
        </>
      )}

      {mostrarCancelados && eventosCancelados.length > 0 && (
        <>
          <h3 id={idGroupEventosCancelados}>Cancelados</h3>
          <GroupCards
            objetos={eventosCancelados}
            tipo={TARJETA_TIPOS.EVENTOS}
            visible={true}
            id={idGroupEventosCancelados}
          />
        </>
      )}
    </Container>
  )
}
