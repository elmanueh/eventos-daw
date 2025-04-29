import { TARJETA_TIPOS } from '@/configs/constant'
import GroupCards from '@components/GroupCards'
import { useMemo, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function Espacios() {
  const loaderData = useLoaderData()
  const [espacios] = useState(
    loaderData.espacio?.map((espacio) => espacio.espacioDTO) || []
  )

  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [estadoActivo, setEstadoActivo] = useState(false)
  const [capacidadMinima, setCapacidadMinima] = useState('')

  const resetFiltros = () => {
    setNombre('')
    setDescripcion('')
    setEstadoActivo(false)
    setCapacidadMinima('')
  }

  const espaciosFiltrados = useMemo(() => {
    return espacios.filter((espacio) => {
      const nombreMatch = espacio.nombre
        ?.toLowerCase()
        .includes(nombre.toLowerCase())
      const descripcionMatch = espacio.descripcion
        ?.toLowerCase()
        .includes(descripcion.toLowerCase())
      const estadoMatch = !estadoActivo || espacio.estado === 'ACTIVO'
      const capacidadMatch =
        capacidadMinima === '' || espacio.capacidad >= parseInt(capacidadMinima)

      return nombreMatch && descripcionMatch && estadoMatch && capacidadMatch
    })
  }, [nombre, descripcion, estadoActivo, capacidadMinima, espacios])

  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <header className="text-center">
        <h1 className="text-primary fw-bold" id="titulo1-groupCards">
          Espacios Físicos
        </h1>
      </header>

      <section className="w-100 px-3">
        <Form>
          <Row className="g-3 align-items-end">
            <Col md={4}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del espacio"
              />
            </Col>

            <Col md={4}>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción"
              />
            </Col>

            <Col md={4}>
              <Form.Label>Capacidad</Form.Label>
              <Form.Control
                type="number"
                value={capacidadMinima}
                onChange={(e) => setCapacidadMinima(e.target.value)}
                min="0"
              />
            </Col>

            <Col md={4} className="d-flex align-items-end">
              <Form.Check
                type="checkbox"
                label="Mostrar Activos"
                checked={estadoActivo}
                onChange={(e) => setEstadoActivo(e.target.checked)}
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
          id={'titulo1-groupCards'}
        />
      </section>
    </div>
  )
}
