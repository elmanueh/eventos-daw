import EspacioCard from '@components/cards/EspacioCard'
import { Badge, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function EspacioDetalle() {
  const espacio = useLoaderData()
  const otrosEspacios = [espacio, espacio, espacio]
  console.log(espacio)

  return (
    <Container className="py-5">
      <Row>
        <Col md={8}>
          {!espacio ? (
            <h2 className="text-center">Espacio Físico no encontrado</h2>
          ) : (
            <>
              <Card className="mb-4">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col className="d-flex justify-content-between align-items-center">
                      <Card.Title as="h1" className="mb-0">
                        {espacio.nombre}
                      </Card.Title>
                      <Badge
                        bg={
                          espacio.estado === 'ACTIVO' ? 'success' : 'secondary'
                        }
                      >
                        {espacio.estado}
                      </Badge>
                    </Col>
                  </Row>

                  <Card.Subtitle className="mb-3 text-muted">
                    {espacio.propietario}
                  </Card.Subtitle>

                  <Card.Text className="fs-6">{espacio.descripcion}</Card.Text>

                  <div className="fs-6 text-muted d-flex gap-2 flex-column">
                    <div>
                      <span>📍</span>
                      <span className="ms-3">
                        Ubiación: {espacio.direccion}
                      </span>
                    </div>
                    <div>
                      <span>👥</span>
                      <span className="ms-2">
                        Capacidad: {espacio.capacidad} personas
                      </span>
                    </div>
                    <div>
                      <span>🌍</span>
                      <span className="ms-2">
                        Coordenadas: {espacio.latitud}, {espacio.longitud}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Header as="h4" className="bg-light">
                  Puntos de interés cercanos
                </Card.Header>
                <ListGroup variant="flush">
                  {espacio.puntosInteres.length === 0 ? (
                    <ListGroup.Item className="text-muted">
                      No hay puntos de interés cercanos
                    </ListGroup.Item>
                  ) : (
                    espacio.puntosInteres
                      .sort((a, b) => a.distancia - b.distancia)
                      .map((punto, index) => (
                        <ListGroup.Item key={index}>
                          <div>
                            <div className="d-flex align-items-center gap-3">
                              <h6 className="mb-0">
                                <a
                                  href={punto.url}
                                  target="_blank"
                                  className="text-decoration-none text-dark"
                                >
                                  {punto.nombre}
                                </a>
                              </h6>
                              <span className="badge bg-primary text-white">
                                {punto.distancia} km
                              </span>
                            </div>
                            <p className="fs-6 text-muted mt-1">
                              {punto.descripcion}
                            </p>
                          </div>
                        </ListGroup.Item>
                      ))
                  )}
                </ListGroup>
              </Card>
            </>
          )}
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Header as="h4" className="bg-light">
              <i className="bi bi-building me-2"></i>
              Otros espacios físicos
            </Card.Header>
            <Card.Body>
              {otrosEspacios.length > 0 ? (
                otrosEspacios.map((espacio) => (
                  <div key={espacio.id} className="mb-3">
                    <EspacioCard espacio={espacio} />
                  </div>
                ))
              ) : (
                <p className="text-muted">No hay otros espacios disponibles</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
