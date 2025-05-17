import { ESTADOS, TARJETA_TIPOS } from '@/configs/constant'
import { useEspacios } from '@/hooks/useEspacios'
import GroupCards from '@components/GroupCards'
import Loading from '@pages/Loading'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

export default function Espacios() {
  const { espacios, loading } = useEspacios()
  const [filtro, setFiltro] = useState({
    nombre: '',
    descripcion: '',
    estadoActivo: false,
    capacidadMinima: ''
  })

  const resetFiltros = () => {
    setFiltro({
      nombre: '',
      descripcion: '',
      estadoActivo: false,
      capacidadMinima: ''
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
  const espaciosFiltrados = espacios.filter((espacio) => {
    return (
      espacio.nombre.toLowerCase().includes(filtro.nombre.toLowerCase()) &&
      espacio.descripcion
        .toLowerCase()
        .includes(filtro.descripcion.toLowerCase()) &&
      espacio.capacidad >= filtro.capacidadMinima &&
      (filtro.estadoActivo ? espacio.estado === ESTADOS.ACTIVO : true)
    )
  })

  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <header className="text-center">
        <h1 className="text-primary fw-bold" id="espacios">
          Espacios Físicos
        </h1>
      </header>

      <section className="w-100 px-3">
        <Form>
          <Row className="g-3 align-items-end">
            <Col md={4}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="nombre"
                type="text"
                value={filtro.nombre}
                onChange={handleInputChange}
                placeholder="Business Center Valencia"
              />
            </Col>

            <Col md={4}>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                name="descripcion"
                type="text"
                value={filtro.descripcion}
                onChange={handleInputChange}
                placeholder="Espacio elegante y moderno"
              />
            </Col>

            <Col md={4}>
              <Form.Label>Capacidad</Form.Label>
              <Form.Control
                name="capacidadMinima"
                type="number"
                value={filtro.capacidadMinima}
                onChange={handleInputChange}
                min="0"
                placeholder="200"
              />
            </Col>

            <Col md={4} className="d-flex align-items-end">
              <Form.Check
                name="estadoActivo"
                type="checkbox"
                label="Mostrar activos"
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

      <section className="w-100 px-3 mt-3">
        <GroupCards
          objetos={espaciosFiltrados}
          tipo={TARJETA_TIPOS.ESPACIOS}
          id={'espacios'}
        />
      </section>
    </div>
  )
}
