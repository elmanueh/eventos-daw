import EventoCard from '@components/cards/EventoCard'
import Paginacion from '@components/Paginacion'
import { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function MisEventos() {
  const eventos = useLoaderData()._embedded.eventoResumenList

  const [currentPageActivos, setCurrentPageActivos] = useState(1)
  const [currentPageCerrados, setCurrentPageCerrados] = useState(1)
  const [pageSize] = useState(8)

  const eventosActivos = eventos.filter((e) => e.cancelado === false)
  const eventosCancelados = eventos.filter((e) => e.cancelado === true)

  const totalPagesActivos = Math.ceil(eventosActivos.length / pageSize)
  const totalPagesCerrados = Math.ceil(eventosCancelados.length / pageSize)

  const getPaginatedActivos = () => {
    const start = (currentPageActivos - 1) * pageSize
    return eventosActivos.slice(start, start + pageSize)
  }

  const getPaginatedCerrados = () => {
    const start = (currentPageCerrados - 1) * pageSize
    return eventosCancelados.slice(start, start + pageSize)
  }

  return (
    <Container className="py-4 d-flex flex-column gap-2">
      <h1 className="text-center">Mis Eventos</h1>

      <Button variant="primary" className="ms-auto">
        Crear Evento
      </Button>

      <h3>Activos</h3>
      {getPaginatedActivos().length > 0 ? (
        <>
          <Row>
            {getPaginatedActivos().map((evento) => (
              <Col
                key={evento.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
              >
                <EventoCard evento={evento} visible={true} />
              </Col>
            ))}
          </Row>
          <Paginacion
            currentPage={currentPageActivos}
            totalPages={totalPagesActivos}
            onPageChange={(page) => setCurrentPageActivos(page)}
          />
        </>
      ) : (
        <div style={{ marginBottom: '100px' }}>
          <p>No hay eventos activos.</p>
        </div>
      )}

      <h3>Cancelados</h3>
      {getPaginatedCerrados().length > 0 ? (
        <>
          <Row>
            {getPaginatedCerrados().map((evento) => (
              <Col
                key={evento.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
              >
                <EventoCard evento={evento} visible={true} />
              </Col>
            ))}
          </Row>
          <Paginacion
            currentPage={currentPageCerrados}
            totalPages={totalPagesCerrados}
            onPageChange={(page) => setCurrentPageCerrados(page)}
          />
        </>
      ) : (
        <div style={{ marginBottom: '100px' }}>
          <p>No hay eventos cancelados.</p>
        </div>
      )}
    </Container>
  )
}
