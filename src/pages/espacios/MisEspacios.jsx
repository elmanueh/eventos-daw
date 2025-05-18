import { ESPACIOS_REDUCER, TARJETA_TIPOS } from '@/configs/constant'
import { useEspacios } from '@/hooks/useEspacios'
import { handleCrearEspacio } from '@/utils/operations'
import GroupCards from '@components/GroupCards'
import EspacioModal from '@components/modals/EspacioModal'
import MyToast, { useToast } from '@components/toast/MyToast'
import Loading from '@pages/Loading'

import { useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

export default function MisEspacios() {
  const { espacios, loading } = useEspacios(ESPACIOS_REDUCER.PROPIETARIO)

  const [showEspacioModal, setShowEspacioModal] = useState(false)
  const { addToast, toasts, removeToast } = useToast()

  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroDescripcion, setFiltroDescripcion] = useState('')
  const [filtroCapacidad, setFiltroCapacidad] = useState('')

  const [mostrarActivos, setMostrarActivos] = useState(true)
  const [mostrarCerrados, setMostrarCerrados] = useState(true)
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  const resetFiltros = () => {
    setFiltroNombre('')
    setFiltroDescripcion('')
    setFiltroCapacidad('')
    setMostrarActivos(true)
    setMostrarCerrados(true)
  }

  const espaciosFiltrados = useMemo(() => {
    return espacios.filter((espacio) => {
      const nombreMatch = espacio.nombre
        .toLowerCase()
        .includes(filtroNombre.toLowerCase())
      const descripcionMatch = espacio.descripcion
        ?.toLowerCase()
        .includes(filtroDescripcion.toLowerCase())
      const capacidadMatch =
        filtroCapacidad === '' || espacio.capacidad >= parseInt(filtroCapacidad)
      return nombreMatch && descripcionMatch && capacidadMatch
    })
  }, [espacios, filtroNombre, filtroDescripcion, filtroCapacidad])

  if (loading) return <Loading />

  const espaciosActivos = espaciosFiltrados.filter(
    (espacio) => espacio.estado === 'ACTIVO'
  )
  const espaciosCerrados = espaciosFiltrados.filter(
    (espacio) => espacio.estado === 'CERRADO_TEMPORALMENTE'
  )

  return (
    <Container className="d-flex flex-column p-0 gap-3">
      <MyToast toasts={toasts} removeToast={removeToast} />

      <EspacioModal
        show={showEspacioModal}
        callback={(espacio) =>
          handleCrearEspacio(espacio, setShowEspacioModal, addToast)
        }
        onHide={() => setShowEspacioModal(false)}
      />

      <h1 className="text-center">Mis Espacios</h1>

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
          <Button className="ms-auto" onClick={() => setShowEspacioModal(true)}>
            Crear Espacio
          </Button>
        </Col>
      </Row>

      {mostrarFiltros && (
        <Form className="mt-3 border rounded p-3">
          <Row className="align-items-end g-3">
            <Col md={4}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del espacio"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción"
                value={filtroDescripcion}
                onChange={(e) => setFiltroDescripcion(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Label>Capacidad</Form.Label>
              <Form.Control
                type="number"
                min="0"
                placeholder="Ej: 30"
                value={filtroCapacidad}
                onChange={(e) => setFiltroCapacidad(e.target.value)}
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
                label="Mostrar Cerrados"
                checked={mostrarCerrados}
                onChange={(e) => setMostrarCerrados(e.target.checked)}
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
          <h3 id="espacios-activos">Activos</h3>
          <GroupCards
            objetos={espaciosActivos}
            tipo={TARJETA_TIPOS.ESPACIOS}
            visible={true}
            id="espacios-activos"
          />
        </>
      )}

      {mostrarCerrados && (
        <>
          <h3 id="espacios-cerrados">Cerrados Temporalmente</h3>
          <GroupCards
            objetos={espaciosCerrados}
            tipo={TARJETA_TIPOS.ESPACIOS}
            visible={true}
            id="espacios-cerrados"
          />
        </>
      )}
    </Container>
  )
}
