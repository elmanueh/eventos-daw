import EspacioCard from '@components/cards/EspacioCard'
import { Badge, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function EspacioDetalle() {
  const espacio = useLoaderData()[0]

  const otrosEspacios = useLoaderData()[1]
    .espacio.map((espacio) => espacio.espacioDTO)
    .filter((e) => e.id !== espacio.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)

  console.log(otrosEspacios)

  return (
    <Container className="py-5">
      <Row>
        <Col md={8}>
          {!espacio ? (
            <h2 className="text-center">Espacio Físico no encontrado</h2>
          ) : (
            <>
              <Card className="mb-4 bg-secondary bg-opacity-25 border border-primary">
                <Card.Body className="d-flex flex-column gap-2">
                  <Row className="align-items-center">
                    <Col className="d-flex justify-content-between align-items-center">
                      <Card.Title as="h1" className="mb-0">
                        {espacio.nombre}
                      </Card.Title>
                      <Badge
                        bg={espacio.estado === 'ACTIVO' ? 'success' : 'danger'}
                        text={
                          espacio.estado === 'ACTIVO' ? 'success' : 'danger'
                        }
                        className="fs-6 bg-opacity-25 px-3 py-2 rounded-pill"
                      >
                        {espacio.estado}
                      </Badge>
                    </Col>
                  </Row>

                  <Card.Subtitle className="mb-3 text-muted fs-5">
                    {espacio.propietario}
                  </Card.Subtitle>

                  <Card.Text className="fs-6">{espacio.descripcion}</Card.Text>

                  <div className="fs-6 text-muted d-flex flex-column gap-3">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                      <span>
                        <strong>Ubicación:</strong> {espacio.direccion}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-people-fill me-2 text-primary"></i>
                      <span>
                        <strong>Capacidad:</strong> {espacio.capacidad} personas
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-map me-2 text-primary"></i>
                      <span>
                        <strong>Coordenadas:</strong>{' '}
                        <a
                          href={`https://www.google.com/maps?q=${espacio.latitud},${espacio.longitud}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none"
                        >
                          {espacio.latitud}° N, {espacio.longitud}° E
                        </a>
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <Card className="mb-4 border border-primary">
                <Card.Header
                  as="h3"
                  className="bg-secondary bg-opacity-25 text-primary"
                >
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
                        <ListGroup.Item
                          key={index}
                          className="border-top border-primary"
                        >
                          <div>
                            <div className="d-flex align-items-center gap-3">
                              <h4 className="mb-0">
                                <a
                                  href={punto.url}
                                  target="_blank"
                                  className="text-decoration-none text-light"
                                >
                                  {punto.nombre}
                                </a>
                              </h4>
                              <span className="badge bg-primary bg-opacity-25 text-primary rounded-pill px-2 py-1">
                                {punto.distancia} m
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
          <Card className="mb-4 border border-primary">
            <Card.Header
              as="h3"
              className="bg-secondary bg-opacity-25 text-primary"
            >
              Otros espacios físicos
            </Card.Header>
            <Card.Body className="border-top border-primary">
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
