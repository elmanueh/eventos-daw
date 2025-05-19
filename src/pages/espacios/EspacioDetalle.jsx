import {
  AUTH_ROLES,
  ESPACIOS_REDUCER,
  ESTADOS,
  EVENTOS_REDUCER,
  GROUP_DETALLES_CARDS_TIPOS,
  TARJETA_TIPOS
} from '@/configs/constant'
import { useEspacios } from '@/hooks/useEspacios'
import { useEventos } from '@/hooks/useEventos'
import { decimalToDMS, isMio, statusEspacio } from '@/utils/espacioHelper'
import {
  handleCambiarEstadoEspacio,
  handleCrearEvento,
  handleEditEspacio
} from '@/utils/operations'
import GroupDetallesCards from '@components/GroupDetallesCards'
import ConfirmationModal from '@components/modals/ConfirmationModal'
import EspacioModal from '@components/modals/EspacioModal'
import EventoModal from '@components/modals/EventoModal'
import OthersCards from '@components/OthersCards'
import MyToast, { useToast } from '@components/toast/MyToast'
import { AuthContext } from '@context/AuthContext'
import Loading from '@pages/Loading'
import { useContext, useId, useState } from 'react'
import { Badge, Card, Col, Container, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function EspacioDetalle() {
  const { user } = useContext(AuthContext)
  const espacioId = useLoaderData()
  const { espacios: espacio, loading } = useEspacios(
    ESPACIOS_REDUCER.BY_ID,
    espacioId
  )
  const { espacios: otrosEspacios, loading: otrosLoading } = useEspacios(
    ESPACIOS_REDUCER.RANDOM,
    3
  )
  const { eventos, loading: eventosLoading } = useEventos(
    EVENTOS_REDUCER.BY_ESPACIO,
    espacioId
  )

  const idGroupPuntosInteres = useId()
  const idGroupEventos = useId()

  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showEventoModal, setShowEventoModal] = useState(false)
  const [showEspacioModal, setShowEspacioModal] = useState(false)
  const { addToast, toasts, removeToast } = useToast()

  if (loading || otrosLoading || eventosLoading) return <Loading />

  const isUser = user.roles.includes(AUTH_ROLES.GESTOR_EVENTOS)
  const esMio = isMio(espacio, user)

  const status = statusEspacio(espacio)

  return (
    <Container className="p-0">
      <MyToast toasts={toasts} removeToast={removeToast} />

      <EspacioModal
        show={showEspacioModal}
        callback={(modificados) =>
          handleEditEspacio(
            espacio.id,
            modificados,
            setShowEspacioModal,
            addToast
          )
        }
        onHide={() => setShowEspacioModal(false)}
        espacio={espacio}
      />
      <EventoModal
        show={showEventoModal}
        callback={(evento) =>
          handleCrearEvento(evento, setShowEventoModal, addToast)
        }
        onHide={() => setShowEventoModal(false)}
        espacioFisico={espacio}
      />
      <ConfirmationModal
        show={showConfirmation}
        callback={() =>
          handleCambiarEstadoEspacio(
            espacio,
            status,
            setShowConfirmation,
            addToast
          )
        }
        onHide={() => setShowConfirmation(false)}
        title={espacio.nombre}
        status={status}
        tipo={TARJETA_TIPOS.ESPACIOS}
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
                            onClick={() => setShowEspacioModal(true)}
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
                          onClick={() => setShowEventoModal(true)}
                        >
                          Crear evento
                        </button>
                      )}
                    </div>
                  )}
                </Card.Body>
              </Card>

              <GroupDetallesCards
                objetos={espacio.puntosInteres}
                tipo={GROUP_DETALLES_CARDS_TIPOS.PUNTOS_INTERES}
                id={idGroupPuntosInteres}
              />

              <GroupDetallesCards
                objetos={eventos}
                tipo={GROUP_DETALLES_CARDS_TIPOS.EVENTOS}
                id={idGroupEventos}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}
