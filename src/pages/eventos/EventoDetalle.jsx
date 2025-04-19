import { Badge, Card, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router'
import EventoCard from '../../components/cards/EventoCard'
import { eventosEstaticos } from '../../data/estaticos'

const EventoDetalle = () => {
  const { id } = useParams()
  const evento = eventosEstaticos.find((e) => e.id === id)
  const otrosEventos = eventosEstaticos.filter((e) => e.id !== id).slice(0, 3)

  return (
    <Container className="py-5">
      <Row>
        <Col md={8}>
          {!evento ? (
            <h2 className="text-center">Evento no encontrado</h2>
          ) : (
            <Card className="mb-4">
              <Card.Body>
                <Row className="align-items-center">
                  <Col className="d-flex justify-content-between align-items-center">
                    <Card.Title as="h1" className="mb-0">
                      {evento.nombre}
                    </Card.Title>
                    <Badge bg={evento.cancelado ? 'danger' : 'success'}>
                      {evento.cancelado ? 'CANCELADO' : 'ACTIVO'}
                    </Badge>
                  </Col>
                </Row>

                <Card.Subtitle className="mb-3 text-muted">
                  {evento.organizador}
                </Card.Subtitle>
                <Card.Text className="fs-6">{evento.descripcion}</Card.Text>

                <div className="fs-6 text-muted d-flex gap-2 flex-column">
                  <div>
                    <span>📅</span>
                    <span className="ms-2">
                      Fecha Inicio: {evento.ocupacion.fechaInicio}
                    </span>
                  </div>
                  <div>
                    <span>📅</span>
                    <span className="ms-2">
                      Fecha Fin: {evento.ocupacion.fechaFin}
                    </span>
                  </div>
                  <div>
                    <span>📍</span>
                    <span className="ms-3">
                      Espacio: {evento.ocupacion.espacioFisico}
                    </span>
                  </div>
                  <div>
                    <span>👥</span>
                    <span className="ms-2">Plazas: {evento.numPlazas}</span>
                  </div>
                  <div>
                    <span>🏷️</span>
                    <span className="ms-2">Categoría: {evento.categoria}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Header as="h4" className="bg-light">
              Otros eventos
            </Card.Header>
            <Card.Body>
              {otrosEventos.length > 0 ? (
                otrosEventos.map((evento) => (
                  <div key={evento.id} className="mb-3">
                    <EventoCard evento={evento} />
                  </div>
                ))
              ) : (
                <p className="text-muted">No hay otros eventos disponibles</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default EventoDetalle
