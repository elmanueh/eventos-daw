import { reservasEstaticas } from '@/data/estaticos'
import ReservaCard from '@components/cards/ReservaCard'
import Paginacion from '@components/ui/Paginacion'
import { useAuth } from '@context/AuthProvider'
import { useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'

const MisReservas = () => {
  const { usuario } = useAuth()

  const [reservas, setReservas] = useState(
    reservasEstaticas.filter((res) => res.idUsuario === usuario.idUsuario)
  )

  const [currentPageActivos, setCurrentPageActivos] = useState(1)
  const [currentPageCerrados, setCurrentPageCerrados] = useState(1)
  const [pageSize] = useState(8)

  const [showModal, setShowModal] = useState(false)
  const [nuevaReserva, setNuevaReserva] = useState({
    id: '',
    idUsuario: usuario.idUsuario,
    plazasReservadas: 1,
    cancelada: false,
    evento: { nombre: '' }
  })

  const handleOpenModal = () => {
    setNuevaReserva({
      id: '',
      idUsuario: usuario,
      plazasReservadas: 1,
      cancelada: false,
      evento: { nombre: '' }
    })
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setShowModal(false)
  }

  const reservasActivas = reservas.filter((r) => !r.cancelada)
  const reservasCanceladas = reservas.filter((r) => r.cancelada)

  const totalPagesActivos = Math.ceil(reservasActivas.length / pageSize)
  const totalPagesCerrados = Math.ceil(reservasCanceladas.length / pageSize)

  const getPaginatedActivos = () => {
    const start = (currentPageActivos - 1) * pageSize
    return reservasActivas.slice(start, start + pageSize)
  }

  const getPaginatedCerrados = () => {
    const start = (currentPageCerrados - 1) * pageSize
    return reservasCanceladas.slice(start, start + pageSize)
  }

  return (
    <Container className="py-4 d-flex flex-column gap-2">
      <h1 className="text-center">Mis Reservas</h1>

      <Button variant="primary" onClick={handleOpenModal} className="ms-auto">
        Crear Reserva
      </Button>

      <h3>Activas</h3>
      {getPaginatedActivos().length > 0 ? (
        <>
          <Row>
            {getPaginatedActivos().map((reserva) => (
              <Col
                key={reserva.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
              >
                <ReservaCard reserva={reserva} />
              </Col>
            ))}
          </Row>
          <Paginacion
            totalPages={totalPagesActivos}
            currentPage={currentPageActivos}
            setCurrentPage={setCurrentPageActivos}
          />
        </>
      ) : (
        <div style={{ marginBottom: '100px' }}>
          <p>No hay reservas activas.</p>
        </div>
      )}

      <h3>Canceladas</h3>
      {getPaginatedCerrados().length > 0 ? (
        <>
          <Row>
            {getPaginatedCerrados().map((reserva) => (
              <Col
                key={reserva.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
              >
                <ReservaCard reserva={reserva} />
              </Col>
            ))}
          </Row>
          <Paginacion
            totalPages={totalPagesCerrados}
            currentPage={currentPageCerrados}
            setCurrentPage={setCurrentPageCerrados}
          />
        </>
      ) : (
        <div style={{ marginBottom: '100px' }}>
          <p>No hay reservas canceladas.</p>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nueva Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombreEvento">
              <Form.Label>Nombre del Evento</Form.Label>
              <Form.Control
                type="text"
                value={nuevaReserva.evento.nombre}
                onChange={(e) =>
                  setNuevaReserva({
                    ...nuevaReserva,
                    evento: { nombre: e.target.value }
                  })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="plazas" className="mt-3">
              <Form.Label>Plazas Reservadas</Form.Label>
              <Form.Control
                type="number"
                min={1}
                value={nuevaReserva.plazasReservadas}
                onChange={(e) =>
                  setNuevaReserva({
                    ...nuevaReserva,
                    plazasReservadas: parseInt(e.target.value)
                  })
                }
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Crear Reserva
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default MisReservas
