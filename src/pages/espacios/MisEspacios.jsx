import { ESPACIOS_REDUCER, TARJETA_TIPOS } from '@/configs/constant'
import { useEspacios } from '@/hooks/useEspacios'
import {
  obtenerEspaciosActivos,
  obtenerEspaciosCerrados
} from '@/utils/espacioHelper'
import GroupCards from '@components/GroupCards'
import EspacioModal from '@components/modals/EspacioModal'
import MyToast, { useToast } from '@components/toast/MyToast'
import Loading from '@pages/Loading'

import { useId, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

const defaultFiltro = {
  nombre: '',
  descripcion: '',
  capacidadMinima: '',
  mostrarActivos: true,
  mostrarCerrados: true
}

export default function MisEspacios() {
  const { espacios, loading, addEspacio } = useEspacios(
    ESPACIOS_REDUCER.BY_PROPIETARIO
  )
  const idGroupEspaciosActivos = useId()
  const idGroupEspaciosCerrados = useId()

  const [showEspacioModal, setShowEspacioModal] = useState(false)
  const { addToast, toasts, removeToast } = useToast()

  const [filtro, setFiltro] = useState(defaultFiltro)
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

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

  const handleAddEspacio = (espacio) => {
    try {
      addEspacio(espacio)
      setShowEspacioModal(false)
      addToast(
        'Espacio creado',
        'El espacio ha sido creado correctamente',
        'success'
      )
    } catch {
      addToast('Error', `No se pudo crear el espacio`, 'error')
    }
  }

  if (loading) return <Loading />

  const espaciosFiltrados = espacios.filter((espacio) => {
    return (
      espacio.nombre?.toLowerCase().includes(filtro.nombre.toLowerCase()) &&
      espacio.descripcion
        ?.toLowerCase()
        .includes(filtro.descripcion.toLowerCase()) &&
      espacio.capacidad >= filtro.capacidadMinima
    )
  })

  const espaciosActivos = obtenerEspaciosActivos(espaciosFiltrados)
  const espaciosCerrados = obtenerEspaciosCerrados(espaciosFiltrados)

  return (
    <Container className="d-flex flex-column p-0 gap-3">
      <MyToast toasts={toasts} removeToast={removeToast} />
      <EspacioModal
        show={showEspacioModal}
        onHide={() => setShowEspacioModal(false)}
        callback={handleAddEspacio}
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
                name="nombre"
                placeholder="Sala de Arte"
                value={filtro.nombre}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={4}>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                placeholder="Espacio para talleres artísticos"
                value={filtro.descripcion}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={4}>
              <Form.Label>Capacidad</Form.Label>
              <Form.Control
                type="number"
                name="capacidadMinima"
                placeholder="30"
                min="0"
                value={filtro.capacidadMinima}
                onChange={handleInputChange}
              />
            </Col>

            <Col xs="auto">
              <Form.Check
                type="switch"
                name="mostrarActivos"
                label="Mostrar Activos"
                checked={filtro.mostrarActivos}
                onChange={handleInputChange}
              />
            </Col>
            <Col xs="auto">
              <Form.Check
                type="switch"
                name="mostrarCerrados"
                label="Mostrar Cerrados"
                checked={filtro.mostrarCerrados}
                onChange={handleInputChange}
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

      {filtro.mostrarActivos && (
        <>
          <h3 id={idGroupEspaciosActivos}>Activos</h3>
          <GroupCards
            objetos={espaciosActivos}
            tipo={TARJETA_TIPOS.ESPACIOS}
            visible={true}
            id={idGroupEspaciosActivos}
          />
        </>
      )}

      {filtro.mostrarCerrados && (
        <>
          <h3 id={idGroupEspaciosCerrados}>Cerrados Temporalmente</h3>
          <GroupCards
            objetos={espaciosCerrados}
            tipo={TARJETA_TIPOS.ESPACIOS}
            visible={true}
            id={idGroupEspaciosCerrados}
          />
        </>
      )}
    </Container>
  )
}
