import { TARJETA_TIPOS } from '@/configs/constant'
import { useEventos } from '@/hooks/useEventos'
import GroupCards from '@components/GroupCards'
import Loading from '@pages/Loading'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

export default function Eventos() {
  const { eventos, loading } = useEventos()
  const [filtro, setFiltro] = useState({
    nombre: '',
    descripcion: '',
    estadoActivo: false,
    plazasMinimas: '',
    fechaMin: ''
  })

  const resetFiltros = () => {
    setFiltro({
      nombre: '',
      descripcion: '',
      estadoActivo: false,
      plazasMinimas: '',
      fechaMin: ''
    })
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFiltro((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  if (loading) return <Loading />
  const eventosFiltrados = eventos.filter((evento) => {
    return (
      evento.nombre.toLowerCase().includes(filtro.nombre.toLowerCase()) &&
      evento.descripcion
        .toLowerCase()
        .includes(filtro.descripcion.toLowerCase()) &&
      evento.numPlazas >= filtro.plazasMinimas &&
      evento.fechaInicio >= filtro.fechaMin &&
      (filtro.estadoActivo ? evento.cancelado === false : true)
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
            <Col md={4} className="d-flex align-items-end">
              <Form.Check
                name="estadoActivo"
                type="checkbox"
                label="Mostrar Activos"
                checked={filtro.estadoActivo}
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
