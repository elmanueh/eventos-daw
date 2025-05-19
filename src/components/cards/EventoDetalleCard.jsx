import { AUTH_ROLES, ESTADOS, NAV_ROUTES } from '@/configs/constant'
import {
  esEventoMio,
  getEstadoColor,
  getEstadoEvento
} from '@/utils/eventoHelper'
import { AuthContext } from '@context/AuthContext'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { useContext } from 'react'
import { Badge, Card, Col, Row } from 'react-bootstrap'

export default function EventoDetalleCard({ evento }) {
  const { user } = useContext(AuthContext)

  const status = getEstadoEvento(evento)
  const colorStatus = getEstadoColor(status)
  const isUser = user.roles.includes(AUTH_ROLES.USUARIO)
  const esMio = esEventoMio(evento, user)

  const handleNavigate = () => {
    window.location.href = NAV_ROUTES.ESPACIOS_DET(evento.espacioFisico.id)
  }

  return (
    <Card className="bg-secondary bg-opacity-25 border border-primary">
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
                  {evento.espacioFisico ? (
                    <a
                      onClick={handleNavigate}
                      style={{ cursor: 'pointer' }}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      {evento.espacioFisico.nombre}
                    </a>
                  ) : (
                    ''
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
          {!evento.cancelado && (
            <div>
              <i className="bi bi-people-fill me-2 text-primary" />
              <span>
                <strong>Plazas disponibles:</strong>{' '}
                {evento.numPlazasDisponibles}
              </span>
            </div>
          )}

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
                  //onClick={() => setShowEventoModal(true)}
                >
                  Editar
                </button>
                {!evento.cancelado && (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    //onClick={() => setShowConfirmation(true)}
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
                //onClick={() => setShowReservaModal(true)}
                disabled={evento.numPlazasDisponibles <= 0}
              >
                Reservar
              </button>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
