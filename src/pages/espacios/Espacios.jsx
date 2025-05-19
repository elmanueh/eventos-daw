import { ESPACIOS_REDUCER, ESTADOS, TARJETA_TIPOS } from '@/configs/constant'
import { useEspacios } from '@/hooks/useEspacios'
import GroupCards from '@components/GroupCards'
import Loading from '@pages/Loading'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

const defaultFiltro = {
  nombre: '',
  descripcion: '',
  mostrarActivo: true,
  mostrarCerrado: true,
  capacidadMinima: ''
}

export default function Espacios() {
  const { espacios, loading } = useEspacios(ESPACIOS_REDUCER.ALL)
  const [filtro, setFiltro] = useState(defaultFiltro)

  const resetFiltros = () => {
    setFiltro(defaultFiltro)
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
      ((filtro.mostrarActivo && espacio.estado === ESTADOS.ACTIVO) ||
        (filtro.mostrarCerrado &&
          espacio.estado === ESTADOS.CERRADO_TEMPORALMENTE))
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

            <Col xs="auto">
              <Form.Check
                name="mostrarActivo"
                type="switch"
                label="Mostrar Activos"
                checked={filtro.mostrarActivo}
                onChange={handleInputChange}
              />
            </Col>
            <Col xs="auto">
              <Form.Check
                name="mostrarCerrado"
                type="switch"
                label="Mostrar Cerrados"
                checked={filtro.mostrarCerrado}
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
