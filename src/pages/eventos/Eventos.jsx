import { TARJETA_TIPOS } from '@/configs/constant'
import GroupCards from '@components/GroupCards'
import { useMemo, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

const Eventos = () => {
  const loaderData = useLoaderData()
  const [eventos] = useState(loaderData._embedded.eventoResumenList)

  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroDescripcion, setFiltroDescripcion] = useState('')
  const [soloNoCancelados, setSoloNoCancelados] = useState(false)
  const [plazasMinimas, setPlazasMinimas] = useState('')
  const [fechaMin, setFechaMin] = useState('')

  const resetFiltros = () => {
    setFiltroNombre('')
    setFiltroDescripcion('')
    setSoloNoCancelados(false)
    setPlazasMinimas('')
    setFechaMin('')
  }

  const eventosFiltrados = useMemo(() => {
    return eventos.filter((evento) => {
      const nombreMatch = evento.nombre
        ?.toLowerCase()
        .includes(filtroNombre.toLowerCase())
      const descripcionMatch = evento.descripcion
        ?.toLowerCase()
        .includes(filtroDescripcion.toLowerCase())
      const canceladoMatch = !soloNoCancelados || !evento.cancelado
      const plazasMatch =
        plazasMinimas === '' || evento.numPlazas >= parseInt(plazasMinimas)
      const fechaMatch =
        fechaMin === '' || new Date(evento.fechaInicio) >= new Date(fechaMin)

      return (
        nombreMatch &&
        descripcionMatch &&
        canceladoMatch &&
        plazasMatch &&
        fechaMatch
      )
    })
  }, [
    filtroNombre,
    filtroDescripcion,
    soloNoCancelados,
    plazasMinimas,
    fechaMin,
    eventos
  ])

  return (
    <div className="d-flex flex-column align-items-center">
      <header className="text-center">
        <h1 className="text-primary fw-bold" id="titulo1-groupCards">
          Eventos
        </h1>
      </header>

      <section className="w-100 px-3">
        <Form>
          <Row className="g-3">
            <Col md={4}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
                placeholder="Nombre del evento"
              />
            </Col>
            <Col md={4}>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={filtroDescripcion}
                onChange={(e) => setFiltroDescripcion(e.target.value)}
                placeholder="Descripción del evento"
              />
            </Col>
            <Col md={4}>
              <Form.Label>Número de plazas</Form.Label>
              <Form.Control
                type="number"
                value={plazasMinimas}
                onChange={(e) => setPlazasMinimas(e.target.value)}
                min="0"
              />
            </Col>
            <Col md={4}>
              <Form.Label>Fecha de inicio</Form.Label>
              <Form.Control
                type="datetime-local"
                value={fechaMin}
                onChange={(e) => setFechaMin(e.target.value)}
              />
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Form.Check
                type="checkbox"
                label="Activos"
                checked={soloNoCancelados}
                onChange={(e) => setSoloNoCancelados(e.target.checked)}
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
          id={'titulo1-groupCards'}
        />
      </section>
    </div>
  )
}

export default Eventos
