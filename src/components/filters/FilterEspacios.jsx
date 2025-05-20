import { ESTADOS } from '@/configs/constant'
import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

const defaultFiltro = {
  nombre: '',
  descripcion: '',
  capacidadMinima: '',
  mostrarActivo: true,
  mostrarCerrado: true
}

export default function FilterEspacios({ espacios, callback }) {
  const [filtro, setFiltro] = useState(defaultFiltro)
  const [mostrarFiltro, setMostrarFiltro] = useState(false)

  useEffect(() => {
    const filtrados = espacios.filter((espacio) => {
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

    callback(filtrados)
  }, [espacios, filtro, callback])

  const resetFiltros = () => {
    setFiltro(defaultFiltro)
    callback(espacios)
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
      )}
    </section>
  )
}
