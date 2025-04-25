import { AUTH_ROLES, ESTADOS, TARJETA_TIPOS } from '@/configs/constant'
import {
  handleCambiarEstadoEspacio,
  handleCrearEvento,
  handleEditEspacio
} from '@/utils/operations'
import ConfirmationModal from '@components/modals/ConfirmationModal'
import OthersCards from '@components/OthersCards'
import { AuthContext } from '@context/AuthContext'
import { useContext, useMemo, useState } from 'react'
import { Badge, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function EspacioDetalle() {
  const loaderData = useLoaderData()
  const espacio = loaderData[0]

  const otrosEspacios = useMemo(() => {
    return loaderData[1].espacio
      .map((espacio) => espacio.espacioDTO)
      .filter((e) => e.id !== espacio.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
  }, [loaderData, espacio.id])

  const { user } = useContext(AuthContext)
  const isUser = user.roles.includes(AUTH_ROLES.GESTOR_EVENTOS)
  const esMio = espacio.propietario == user.username

  const [showConfirmation, setShowConfirmation] = useState(false)
  const status =
    espacio.estado === ESTADOS.ACTIVO ? ESTADOS.ACTIVO : ESTADOS.CERRADO

  function decimalToDMS(coordinate, isLongitude = false) {
    const degrees = Math.floor(coordinate)
    const minutes = Math.floor((coordinate - degrees) * 60)
    const seconds = ((coordinate - degrees - minutes / 60) * 3600).toFixed(1) // Redondeamos a 1 decimal.

    let direction = ''

    if (isLongitude) {
      direction = coordinate < 0 ? 'W' : 'E'
    } else {
      direction = coordinate < 0 ? 'S' : 'N'
    }

    return `${Math.abs(degrees)}°${Math.abs(minutes)}'${Math.abs(
      seconds
    )}"${direction}`
  }

  return (
    <Container className="p-0">
      <ConfirmationModal
        show={showConfirmation}
        callback={() =>
          handleCambiarEstadoEspacio(espacio, status, setShowConfirmation)
        }
        onHide={() => setShowConfirmation(false)}
        title={espacio.nombre}
        status={status}
      />
      <Row>
        <Col md={4} className="order-sm-2 order-md-1">
          <OthersCards
            otros={otrosEspacios}
            tipo={TARJETA_TIPOS.ESPACIOS}
          ></OthersCards>
        </Col>

        <Col md={8} className="order-sm-1 order-md-2">
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
                        bg={status === 'ACTIVO' ? 'success' : 'danger'}
                        text={status === 'ACTIVO' ? 'success' : 'danger'}
                        className="fs-6 fw-medium bg-opacity-25 px-3 py-2 rounded-pill"
                      >
                        {status}
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
                          {decimalToDMS(espacio.latitud)}{' '}
                          {decimalToDMS(espacio.longitud, true)}
                        </a>
                      </span>
                    </div>
                  </div>

                  {(esMio || isUser) && (
                    <div className="d-flex justify-content-end gap-2">
                      {esMio && (
                        <>
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => handleEditEspacio()}
                          >
                            Editar
                          </button>
                          {status === ESTADOS.ACTIVO ? (
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => {
                                setShowConfirmation(true)
                              }}
                            >
                              Desactivar
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-outline-success"
                              onClick={() => {
                                setShowConfirmation(true)
                              }}
                            >
                              Activar
                            </button>
                          )}
                        </>
                      )}
                      {isUser && status === ESTADOS.ACTIVO && (
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            handleCrearEvento()
                          }}
                        >
                          Crear evento
                        </button>
                      )}
                    </div>
                  )}
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
      </Row>
    </Container>
  )
}
