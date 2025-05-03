import {
  API_URLS,
  AUTH_ROLES,
  ESTADOS,
  NAV_ROUTES,
  TARJETA_TIPOS
} from '@/configs/constant'
import { getEstadoColor, getEstadoEvento } from '@/utils/eventoHelper'
import { fetchGet } from '@/utils/fetchGet'
import {
  handleDesactivarEvento,
  handleEditEvento,
  handleResevar
} from '@/utils/operations'
import ConfirmationModal from '@components/modals/ConfirmationModal'
import EventoModal from '@components/modals/EventoModal'
import ReservaModal from '@components/modals/ReservaModal'
import OthersCards from '@components/OthersCards'
import { AuthContext } from '@context/AuthContext'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Badge, Card, Col, Container, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function EventoDetalle() {
  const loaderData = useLoaderData()
  const evento = loaderData[0]

  const otrosEventos = useMemo(() => {
    return loaderData[1]._embedded.eventoResumenList
      .filter((e) => e.id !== evento.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
  }, [loaderData, evento.id])

  const { user } = useContext(AuthContext)
  const isUser = user.roles.includes(AUTH_ROLES.USUARIO)
  const esMio = evento.organizador == user.username

  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showReservaModal, setShowReservaModal] = useState(false)
  const [showEventoModal, setShowEventoModal] = useState(false)

  const status = getEstadoEvento(evento)
  const colorStatus = getEstadoColor(status)

  const [espacio, setEspacio] = useState(null)

  useEffect(() => {
    if (!evento.espacioFisico) return

    async function fetchEspacio() {
      try {
        const data = await fetchGet(
          API_URLS.ESPACIOS_DETALLE(evento.espacioFisico)
        )

        setEspacio(data)
      } catch (error) {
        console.error('Error al cargar los espacios filtrados:', error)
        alert('Error al cargar los espacios filtrados.')
      }
    }

    fetchEspacio()
  }, [evento.espacioFisico])

  const handleNavigate = () => {
    window.location.href = NAV_ROUTES.ESPACIOS_DET(espacio.id)
  }

  return (
    <Container className="p-0">
      <EventoModal
        show={showEventoModal}
        callback={(modificados) =>
          handleEditEvento(evento.idEvento, modificados, setShowEventoModal)
        }
        onHide={() => setShowEventoModal(false)}
        evento={evento}
      />
      <ReservaModal
        show={showReservaModal}
        callback={(reserva) => handleResevar(reserva, setShowReservaModal)}
        onHide={() => setShowReservaModal(false)}
        evento={evento}
      />
      <ConfirmationModal
        show={showConfirmation}
        callback={() =>
          handleDesactivarEvento(evento.idEvento, setShowConfirmation)
        }
        onHide={() => setShowConfirmation(false)}
        title={evento.nombre}
        status={status}
        tipo={TARJETA_TIPOS.EVENTOS}
      />
      <Row>
        <Col md={4} className="order-sm-2 order-md-1">
          <OthersCards
            otros={otrosEventos}
            tipo={TARJETA_TIPOS.EVENTOS}
          ></OthersCards>
        </Col>

        <Col md={8} className="order-sm-1 order-md-2">
          {!evento ? (
            <h2 className="text-center">Evento no encontrado</h2>
          ) : (
            <Card className="mb-4 bg-secondary bg-opacity-25 border border-primary">
              <Card.Body className="d-flex flex-column gap-2">
                <Row className="align-items-center">
                  <Col className="d-flex justify-content-between align-items-center">
                    <Card.Title as="h1" className="mb-0">
                      {evento.nombre}
                    </Card.Title>
                    <Badge
                      bg={colorStatus}
                      text={colorStatus}
                      className="fs-6 fw-medium bg-opacity-25 px-3 py-2 rounded-pill"
                    >
                      {status}
                    </Badge>
                  </Col>
                </Row>

                <Card.Subtitle className="mb-3 text-muted fs-5">
                  {evento.organizador}
                </Card.Subtitle>

                <Card.Text className="fs-6">{evento.descripcion}</Card.Text>

                <div className="fs-6 text-muted d-flex flex-column gap-3">
                  {!evento.cancelado && (
                    <>
                      <div>
                        <i className="bi bi-calendar-event-fill me-2 text-primary"></i>
                        <span>
                          <strong>Inicio:</strong>{' '}
                          {format(
                            new Date(evento.fechaInicio),
                            "dd'/'MM'/'yyyy 'a las' HH:mm",
                            { locale: es }
                          )}
                        </span>
                      </div>
                      <div>
                        <i className="bi bi-calendar-event-fill me-2 text-primary"></i>
                        <span>
                          <strong>Finalización:</strong>{' '}
                          {format(
                            new Date(evento.fechaFin),
                            "dd'/'MM'/'yyyy 'a las' HH:mm",
                            { locale: es }
                          )}
                        </span>
                      </div>
                      <div>
                        <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                        <span>
                          <strong>Espacio:</strong>{' '}
                          {espacio ? (
                            <a
                              onClick={handleNavigate}
                              style={{ cursor: 'pointer' }}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none"
                            >
                              {espacio.nombre}
                            </a>
                          ) : (
                            'No disponible'
                          )}
                        </span>
                      </div>
                    </>
                  )}

                  <div>
                    <i className="bi bi-person-fill me-2 text-primary"></i>
                    <span>
                      <strong>Total de plazas:</strong> {evento.numPlazas}
                    </span>
                  </div>

                  <div>
                    <i className="bi bi-people-fill me-2 text-primary" />
                    <span>
                      <strong>Plazas disponibles:</strong>{' '}
                      {evento.numPlazasDisponibles}
                    </span>
                  </div>

                  <div>
                    <i className="bi bi-tags-fill me-2 text-primary"></i>
                    <span>
                      <strong>Categoría:</strong>{' '}
                      <span className="badge bg-primary bg-opacity-25 text-primary rounded-pill px-2 py-1">
                        {evento.categoria}
                      </span>
                    </span>
                  </div>
                </div>

                {(esMio || isUser) && status == ESTADOS.ACTIVO && (
                  <div className="d-flex justify-content-end gap-2">
                    {esMio && (
                      <>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => setShowEventoModal(true)}
                        >
                          Editar
                        </button>
                        {!evento.cancelado && (
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => setShowConfirmation(true)}
                          >
                            Desactivar
                          </button>
                        )}
                      </>
                    )}
                    {isUser && !evento.cancelado && (
                      <button
                        type="button"
                        className="btn btn-outline-info"
                        onClick={() => setShowReservaModal(true)}
                        disabled={evento.numPlazasDisponibles <= 0}
                      >
                        Reservar
                      </button>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}
